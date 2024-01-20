import { toast } from "sonner"
import { apiConnector } from "../apiConnector"
import { authEndpoints } from "../api"
import { setEditBlog, setLoading, setToken, setUser } from "@/slices/authSlice";
const { SIGNUP_API, LOGIN_API} = authEndpoints;

export function signup(
    {    
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    },
    navigate
){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            });
        
            console.log("SIGNUP API RESPONSE............", response);
    
            if (!response.data.success) {
                console.log(response);
                throw new Error(response.data.message)
            }
            
            toast.success("Signup Successful");
            navigate("/login");
        } catch (error) {
            console.log("SIGNUP API ERROR............", error.response.data.message)
            toast.error(error.response.data.message || "Signup Failed");
        }
        dispatch(setLoading(false))
    }
}


export function login({email, password}, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });

            console.log("LOGIN API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successful")
            dispatch(setToken(response.data.token));
        
            dispatch(setUser({ ...response.data.user}))
        
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/");

        } catch (error) {
            console.log("LOGIN API ERROR............", error.response.data.message)
            toast.error(error.response.data.message || "Login Failed")
        }
        dispatch(setLoading(false));
    }
}


export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(setEditBlog(false));
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}