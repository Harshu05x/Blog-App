import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loading: false,
    blogs: [],
    blog: {},
    editBlog: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
        setBlogs: (state, value) => {
            state.blogs = value.payload
        },
        setEditBlog: (state, value) => {
            console.log(state.editBlog);
            state.editBlog = value.payload
        },        
        setUser(state, value) {
            state.user = value.payload;
        },
        setBlog: (state, value) => {
            state.blog = value.payload;
        },
    },
});
  
  export const { setBlogs, setLoading, setToken, setEditBlog, setUser,setBlog } = authSlice.actions;
  
  export default authSlice.reducer;

