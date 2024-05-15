import { configureStore } from "@reduxjs/toolkit";
import heroes from "../components/heroesList/heroesSlice";
import filters from "../components/heroesFilters/filtersSlice";
import {apiSlice} from "../api/apiSlice";

const stringMiddleware = () => (next) => (action) => {
	if (typeof action === 'string') {
		return next({
			type: action
		})
	}
	return next(action)
};


	// Redux Toolkit
const store = configureStore({
	reducer: {
		heroes,
		filters,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
	devTools: process.env.NODE_ENV !== 'production'
})




  // Redux

// import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from "redux";
// import { thunk as ReduxThunk } from "redux-thunk";

// const store = createStore(
// 	combineReducers({heroes, filters}),
// 	compose(applyMiddleware(ReduxThunk, stringMiddleware),
// 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// );







// const enhancer = (createStore) => (...args) => {
// 	const store = createStore(...args);
//
// 	const oldDispatch = store.dispatch;
// 	store.dispatch = (action) => {
// 		if (typeof action === 'string') {
// 			return oldDispatch({
// 				type: action
// 			})
// 		}
// 		return oldDispatch(action)
// 	}
// 	return store;
// }

// const store = createStore(
// 																		combineReducers({heroes, filters}),
// 																		compose(applyMiddleware(ReduxThunk, stringMiddleware),
// 																			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//
// 																		// compose(
// 																		// 	enhancer,
// 																		// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// 																		// )
// 																		);

export default store;
