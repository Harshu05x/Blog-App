import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from "sonner"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { signup } from '@/services/operations/authApi';
import { Link } from 'react-router-dom';

 



function signupForm(props) {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {register,handleSubmit} = useForm();

    
    const  onSubmit = async (values) => {
        try {
            
            if (values.password !== values.confirmPassword) {
                toast.error("Passwords Do Not Match")
                return
            }
            
            dispatch(signup(values,navigate));

        } catch (error) {
            alert("Error");
        }
    }

    return (
        <div className=' flex justify-center w-full'>
            <Card className=" w-10/12 sm:w-8/12 lg:w-6/12">
                <CardHeader className="text-center">
                    <CardTitle>Register</CardTitle>
                    <CardDescription>start a beautiful journey with us</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-5'>
                            <Input
                            placeholder="Enter your first name"
                            {...register("firstName", {
                                required: true,
                            })}
                            />

                            <Input
                            placeholder="Enter your last name"
                            {...register("lastName", {
                                required: true,
                            })}
                            />

                            <Input
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                            />

                            <Input
                            type="password"
                            placeholder="Enter password"
                            {...register("password", {
                                required: true,})}
                            />

                            <Input
                            type="password"
                            placeholder="Confirm password"
                            {...register("confirmPassword", {
                                required: true,})}
                            />

                            <Button type="submit" className="w-full">
                                Create Account
                            </Button>
                        </div>
                    </form>
                    <div className=' mt-4 text-center'>
                        Have an account? 
                        <Link to={"/login"} className=' text-blue-600 font-medium'>
                            {" Log In Now"}
                        </Link>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}

export default signupForm;