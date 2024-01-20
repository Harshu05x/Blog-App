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
import { login, signup } from '@/services/operations/authApi';
import { Link } from 'react-router-dom';

 



function LoginForm(props) {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {register,handleSubmit} = useForm();

    
    const  onSubmit = async (values) => {
        try {    
            console.log(values);
            dispatch(login(values,navigate));

        } catch (error) {
            alert("Error");
        }
    }

    return (
        <div className=' flex justify-center w-full'>
            <Card className="w-10/12 sm:w-8/12 lg:w-6/12">
                <CardHeader className="text-center">
                    <CardTitle>Log in to your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-5'>
                            <Input
                            placeholder="Enter email"
                            {...register("email", {
                                required: true,
                            })}
                            />

                            <Input
                            type="password"
                            placeholder="Enter password"
                            {...register("password", {
                                required: true,})}
                            />  

                            <Button type="submit" className="w-full">
                               Login
                            </Button>
                        </div>
                    </form>
                    <div className=' mt-4 text-center'>
                        Don't have an account? 
                        <Link to={"/signup"} className=' text-blue-600 font-medium'>
                            {" Sign up"}
                        </Link>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}

export default LoginForm;


