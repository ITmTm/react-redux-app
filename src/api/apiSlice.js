import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const jsonServer = require('json-server')

const server = jsonServer.create()

// Uncomment to allow write operations
// const fs = require('fs')
// const path = require('path')
// const filePath = path.join('db.json')
// const data = fs.readFileSync(filePath, "utf-8");
// const db = JSON.parse(data);
// const router = jsonServer.router(db)

// Comment out to allow write operations
const router = jsonServer.router('heroes.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
	'/api/*': '/$1',
	'/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
	console.log('JSON Server is running')
})


export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
	tagTypes: ['Heroes'],
	endpoints: builder => ({
		getHeroes: builder.query({
			query: () => '/heroes',
			providesTags: ['Heroes']
		}),
		createHero: builder.mutation({
			query: hero => ({
				url: '/heroes',
				method: 'POST',
				body: hero
			}),
			invalidatesTags: ['Heroes']
		}),
		deleteHero: builder.mutation({
			query: id => ({
				url: `/heroes/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Heroes']
		})
	})
});

export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation} = apiSlice;