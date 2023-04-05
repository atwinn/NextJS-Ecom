import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    username: string;
    email: string;
    blocked: boolean;
    confirmed: boolean;
    createdAt: string;
    id: number;
    provider: string;
    updatedAt: string;
}

const initialState: UserState = {
    blocked: false,
    confirmed: false,
    createdAt: "",
    email: '',
    id: 0,
    provider: "",
    updatedAt: "",
    username: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.blocked = action.payload.blocked;
            state.confirmed = action.payload.confirmed;
            state.createdAt = action.payload.createdAt;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.provider = action.payload.provider;
            state.updatedAt = action.payload.updatedAt;
            state.username = action.payload.username;
        },
        clearUser: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;