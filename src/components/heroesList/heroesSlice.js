import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter()

// const initialState = {
// 		heroes: [],
// 		heroesLoadingStatus: 'idle'
// }

const initialState = heroesAdapter.getInitialState({
	heroesLoadingStatus: 'idle'
});

export const fetchHeroes = createAsyncThunk(
	'heroes/fetchHeroes',
	() => {

		const {request} = useHttp();
		return request("http://localhost:3001/heroes");
	}
);

const heroesSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {
				// Удален т.к он больше не нужен, за их состоянием теперь отвечает extraReducers
		// heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
		// heroesFetched: (state, action) => {
		// 	state.heroesLoadingStatus = 'idle';
		// 	state.heroes = action.payload;
		// },
		// heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
		heroCreated: (state, action) => {
			// state.heroes.push(action.payload); -- Вместо этого теперь .addOne
			heroesAdapter.addOne(state, action.payload);
		},
		heroDeleted: (state, action) => {
			// state.heroes = state.heroes.filter(item => item.id !== action.payload); -- Аналогично, .removeOne
			heroesAdapter.removeOne(state, action.payload);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				state.heroesLoadingStatus = 'idle';
				heroesAdapter.setAll(state, action.payload);
				// state.heroes = action.payload;  Удален, вместо его heroesAdapter
			})
			.addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
			.addDefaultCase(() => {})
	}
});

const {actions, reducer} = heroesSlice;

export default reducer;

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

export const filteredHeroesSelector = createSelector(
	(state) => state.filters.activeFilter,
	selectAll,
	(filter, heroes) => {
		if (filter === 'all') {
			return heroes;
		} else {
			return heroes.filter(item => item.element === filter);
		}
	}
);

export const {heroCreated, heroDeleted} = actions;