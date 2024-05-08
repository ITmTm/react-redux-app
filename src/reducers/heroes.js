import { createReducer } from "@reduxjs/toolkit";

import {
	heroesFetching,
	heroesFetched,
	heroesFetchingError,
	heroCreated,
	heroDeleted
} from "../actions";

const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle'
}

// 	// Redux Toolkit + TS
const heroes = createReducer(initialState, builder => {
	builder
		.addCase(heroesFetching, state => {
			state.heroesLoadingStatus = 'loading';
		})
		.addCase(heroesFetched, (state, action) => {
			state.heroesLoadingStatus = 'idle';
			state.heroes = action.payload;
		})
		.addCase(heroesFetchingError, state => {
			state.heroesLoadingStatus = 'error';
		})
		.addCase(heroCreated, (state, action) => {
			state.heroes.push(action.payload);
		})
		.addCase(heroDeleted, (state, action) => {
			state.heroes = state.heroes.filter(item => item.id !== action.payload);
		})
		.addDefaultCase(() => {});
})


	// Redux Toolkit native JS
// const heroes = createReducer(initialState, {
// 	// [heroesFetching]: state => state.heroesLoadingStatus = 'loading', // Код не будет работать, т.к мутируем исходное состояние стейта
// 		[heroesFetching]: state => {state.heroesLoadingStatus = 'loading'}, // Так работать будет правильно и соблюдаться иммутабельность
// 		[heroesFetched]: (state, action) => {
// 			state.heroesLoadingStatus = 'idle';
// 			state.heroes = action.payload;
// 		},
// 		[heroesFetchingError]: state => {state.heroesLoadingStatus = 'error'},
// 		[heroCreated]: (state, action) => {
// 			state.heroes.push(action.payload);
// 		},
// 		[heroDeleted]: (state, action) => {
// 			state.heroes = state.heroes.filter(item => item.id !== action.payload);
// 		}
// 	},
// 	[],
// 	state => state
// )







		// Redux
// const heroes = (state = initialState, action) => {
// 	switch (action.type) {
// 		case 'HEROES_FETCHING':
// 			return {
// 				...state,
// 				heroesLoadingStatus: 'loading'
// 			}
// 		case 'HEROES_FETCHED':
// 			return {
// 				...state,
// 				heroes: action.payload,
// 				heroesLoadingStatus: 'idle'
// 			}
// 		case 'HEROES_FETCHING_ERROR':
// 			return {
// 				...state,
// 				heroesLoadingStatus: 'error'
// 			}
// 		case 'HERO_CREATED':
// 			return {
// 				...state,
// 				heroes: [...state.heroes, action.payload]
// 			}
//
// 		case 'HERO_DELETED':
// 			// Формирование нового массива
// 			return {
// 				...state,
// 				heroes: state.heroes.filter(item => item.id !== action.payload)
// 			}
// 		default: return state
// 	}
// }

export default heroes;