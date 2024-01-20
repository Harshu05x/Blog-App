import { setBlog, setBlogs, setEditBlog, setLoading } from "@/slices/authSlice";
import { blogEndpoints } from "../api";
import { toast } from "sonner";
import axios from "axios";
import { apiConnector } from "../apiConnector";

const  {
    GET_BLOG_DETAILS_API,
    GET_ALL_BLOGS_API,
    CREATE_BLOG_API,
    EDIT_BLOG_API,
    DELETE_BLOG_API
} = blogEndpoints;

export function getAllBlogs() {
    return async (dispatch) => {
        dispatch(setLoading(true));
        let result;
        try {
            
            // const response = await apiConnector("GET", GET_ALL_BLOGS_API);
            const response = await axios.get(GET_ALL_BLOGS_API);

            console.log("GET ALL BLOGS API RESPONSE............", response);
            if (!response.data.success) {
                toast.error(response.data.message);
                throw new Error(response.data)
            }

            dispatch(setBlogs([...response.data.data]));
        

        } catch (error) {
            console.log("GET ALL BLOGS API ............", error.response);
            // toast.error(error.response?.data?.message || "Blogs Fetching failed");
        }
        dispatch(setLoading(false));
    }
};

export function getBlogDetails(blogId,user) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        let result;
        try {
            console.log(user);
            const response = await axios.get(GET_BLOG_DETAILS_API + `/${blogId}`);

            console.log("GET_BLOG_DETAILS_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setBlog(response.data.data));

            if(user?._id === response.data.data.user._id){
                dispatch(setEditBlog(true));
            }
            else{
                dispatch(setEditBlog(false));
            }
        } catch (error) {
            console.log("GET_BLOG_DETAILS_API ............", error);
            toast.error(error.response || "Blog Details Fetching failed");
        }
        dispatch(setLoading(false));
    }
};

export function deleteBlog(blogId,navigate,token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        let result;
        try {
            console.log(token);
            const response = await apiConnector(
                "DELETE", DELETE_BLOG_API, { blogId, token }
            )

            console.log("DELETE BLOG API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setBlog({}));
            navigate("/");
            toast.success("Blog deleted successfully.");

        } catch (error) {
            console.log("DELETE BLOG API API ............", error);
            toast.error(error.response || "Blog Deletion failed");
        }
        dispatch(setLoading(false));
    }
};


export function createBlog({title,summary,content},id, token,navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        let result;
        try {
            const response = await apiConnector(
                "POST", CREATE_BLOG_API, {title,summary,content,id,token}
            )

            console.log("CREATE_BLOG_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setBlog({}));
            navigate(`/`);
            toast.success("Blog Created successfully.");

        } catch (error) {
            console.log("CREATE_BLOG_API ............", error);
            toast.error(error.response || "Blog Creation failed");
        }
        dispatch(setLoading(false));
    }
};


export function editBlog({title,summary,content},blogId,id, token,navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        let result;
        try {
            const response = await apiConnector(
                "POST", EDIT_BLOG_API, {title,summary,content,blogId,id,token}
            )

            console.log("EDIT_BLOG_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setBlog({}));
            navigate("/");
            toast.success("Blog Edited successfully.");

        } catch (error) {
            console.log("CREATE_BLOG_API ............", error);
            toast.error(error.response || "BEditing Blog failed");
        }
        dispatch(setLoading(false));
    }
};