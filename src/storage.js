// Import Components/Requirements
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

//#region User

// Define the initial state for the 'user' slice
const userInitialState = {
    userData: null,
};

// Define a slice for managing user-related state
const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        resetUserData: (state) => {
            state.userData = null;
        },
    },
});
//#endregion

//#region Reducers

// Combine all reducers into the root reducer
const rootReducer = combineReducers({
    user: userSlice.reducer,
});

// Configuration for persisting the Redux state
const persistConfig = {
    // Key for the root of the persisted state
    key: 'root',

    //Storage engine
    storage,

    // List of slices to persist
    whitelist: ['user'],
};

// Define the persisted reducer with the specified configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);
//#endregion

// Define Redux storage with the persisted reducer and default middleware, disable serializableCheck
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: false,
});

// Define a persistor for managing state persistence
const persistor = persistStore(store);

export const { setUserData, resetUserData } = userSlice.actions;

export { store, persistor };
