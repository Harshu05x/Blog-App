const BASE_URL = import.meta.env.VITE_BASE_URL;

// Auth endpoints
export const authEndpoints = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}

// Blog endpoints
export const blogEndpoints = {
    GET_BLOG_DETAILS_API: BASE_URL + "/getblog",
    GET_ALL_BLOGS_API: BASE_URL + "/getAllblogs",
    CREATE_BLOG_API: BASE_URL + "/createBlog",
    EDIT_BLOG_API: BASE_URL + "/editblog",
    DELETE_BLOG_API: BASE_URL + "/deleteblog", 
}
