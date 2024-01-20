import { logout } from '@/services/operations/authApi';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './button';
import { HiOutlineMenu } from "react-icons/hi";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Logo from './Logo';
  

function Navbar(props) {
    const {user} = useSelector((state) => state.auth);
    console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // dispatch(logout(navigate));

    return (
        <div className='  bg-slate-900 '>
            <div className=' w-10/12 mx-auto flex justify-between items-center text-white py-4'>
                <div>
                    <Logo />
                </div>
                <Sheet>
                    <SheetTrigger className=' text-white text-4xl'>
                        <HiOutlineMenu />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetDescription>
                                <div className=' flex flex-col items-center gap-5'>
                                    <div className=' flex flex-col'>
                                        <Button variant="link" className=" text-base">
                                            <Link to={"/"} className=' text-black'>
                                                All Blogs
                                            </Link>
                                        </Button>
                                        <Button variant="link" className=" text-base text-black">
                                            {
                                                user !== null ? 
                                                (
                                                    <Link to={"/createBlog"}>
                                                        Create Blog
                                                    </Link>
                                                )   : 
                                                (
                                                    <Link to={"/login"}>
                                                        Create Blog
                                                    </Link>
                                                )
                                            }
                                        </Button>
                                    </div>
                                    {
                                        user ? 
                                        (
                                            <Button variant="destructive" className=" text-base"
                                                onClick={ () => dispatch(logout(navigate))}
                                            >
                                                Logout
                                            </Button>

                                        )   :
                                        (
                                            <Button variant="destructive" className=" text-base bg-green-600 hover:bg-green-800"
                                                onClick={ () => navigate("/login")}
                                            >
                                                Log In
                                            </Button>
                                        )
                                    }
                                </div>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}

export default Navbar;
