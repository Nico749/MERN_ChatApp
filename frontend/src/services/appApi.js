import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

//define a service usere a base URL (make queries to our db)
//REDUX TOOLKIT
const appApi = createApi(
    {
        reducerPath:'appApi',
        baseQuery: fetchBaseQuery({
            baseUrl:'http://localhost:5001'
        }),
        endpoints: (builder) =>(
            {
                //mutation is a POST request, creating an user
                signupUser: builder.mutation({
                    query: (user)=>({
                        url: '/users',
                        method:'POST',
                        body:user,
                    })
                }),//login
                loginUser: builder.mutation({
                    query:(user)=>({
                        url: '/users/login',
                        method:'POST',
                        body:user, 
                    })
                }), //logout
                logoutUser: builder.mutation({
                    query:(payload)=>({
                        url: '/logout',
                        method:'DELETE',
                        body:payload, 
                    })
                })
            }
        )
    }
)

export const {useLoginUserMutation, useSignupUserMutation, useLogoutUserMutation } = appApi

export default appApi