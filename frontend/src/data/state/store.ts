/**
 * store.ts
 * version 1.0.0
 * 
 * Created on the 18/01/2023
 */

import { configureStore } from '@reduxjs/toolkit';
import { MAIN_CONFIG } from '../../utils/main';
import analyticsSlice from './slices/analyticsSlice';
import mainSlice from './slices/mainSlice';

const { DEVELOPMENT } = MAIN_CONFIG

const store = configureStore({
    reducer: {
        analyticsValues: analyticsSlice,
        mainValues: mainSlice,
    },
    // DISABLES redux DevTools on production
    devTools: DEVELOPMENT,
})

export default store

// FOR TYPESCRIPT
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch