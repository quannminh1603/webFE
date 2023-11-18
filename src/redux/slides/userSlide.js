import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    hoTenKH: '',
    email: '',
    sdt: '',
    diaChi: '',
    avatar: '',
    access_token: '',
    id: '',
    role: false,
    refreshToken: ''
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { hoTenKH = '', email = '', access_token = '', diaChi = '', sdt = '', avatar = '', _id = '', role, refreshToken = '' } = action.payload
            state.hoTenKH = hoTenKH ? hoTenKH : state.hoTenKH;
            state.email = email ? email : state.email;
            state.diaChi = diaChi ? diaChi : state.diaChi;
            state.sdt = sdt ? sdt : state.sdt;
            state.avatar = avatar ? avatar : state.avatar;
            state.id = _id ? _id : state.id
            state.access_token = access_token ? access_token : state.access_token;
            state.role = role ? role : state.role;
            state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
        },
        resetUser: (state) => {
            state.hoTenKH = '';
            state.email = '';
            state.diaChi = '';
            state.sdt = '';
            state.avatar = '';
            state.id = '';
            state.access_token = '';
            state.role = false;
            state.refreshToken = ''
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer