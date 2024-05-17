import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
// import {useHttp} from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter();

// const initialState = {
// 	filters: [],
// 	filtersLoadingStatus: 'idle',
// 	activeFilter: 'all'
// }

const initialState = filtersAdapter.getInitialState({
	filtersLoadingStatus: 'idle',
	activeFilter: 'all'
});


export const fetchFilters = createAsyncThunk(
	'filters/fetchFilters',
	async () => {
		const response = await fetch('/api/heroes');
		if (!response.ok) {
			throw new Error('Failed to fetch filters');
		}
		const data = await response.json();
		return data.filters;
	}
);

	// local
// export const fetchFilters = createAsyncThunk(
// 	'filters/fetchFilters',
// 	async () => {
// 		const {request} = useHttp();
// 		return await request('http://localhost:3001/filters');
// 	}
// );

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		filtersChanged: (state, action) => {
			state.activeFilter = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
			.addCase(fetchFilters.fulfilled, (state, action) => {
				state.filtersLoadingStatus = 'idle';
				filtersAdapter.setAll(state, action.payload)
				// state.filters = action.payload; Удален, вместо его filtersAdapter
			})
			.addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
			.addDefaultCase(() => {})
	}
});

const {actions, reducer} = filtersSlice;

export default reducer;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

export const {filtersChanged} = actions;