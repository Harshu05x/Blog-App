import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { Button } from '@/components/ui/button';
import { deleteBlog, getBlogDetails } from '@/services/operations/blogApi';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import parse from "html-react-parser";


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { formatDate } from '@/services/formatDate';
import Loader from '@/components/ui/Loader';
  

function BlogPage(props) {
    const {blogId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {blog, user, loading, editBlog, token} = useSelector((state) => state.auth);

    useEffect( () => {
        dispatch(getBlogDetails(blogId,user));
    },[]);


    function handleDelete() {
        console.log("Deleted");
        dispatch(deleteBlog(blogId,navigate,token));
    }
    return (
        <div>
            <Navbar />
            {
                loading === true ? <Loader /> : 
                <div>
                    {
                        JSON.stringify(blog) !== JSON.stringify({}) ? 
                        (
                        <div className='relative min-h-[50vh] flex flex-col w-9/12 mx-auto mt-6 bg-gray-200 rounded-xl px-10 py-5'>
                            <div className=' flex flex-col text-center mt-6'>
                                <h1 className=' text-4xl font-semibold py-2
                                    border-b border-b-slate-500 border-double
                                '>{blog.title}</h1>
                                <div className='mt-2 flex  flex-col gap-2 text-center items-center justify-center font-medium text-sm'>
                                    <p>{blog.user.firstName + " " + blog.user.lastName}</p>
                                    <p className=' relative'>{formatDate(`${blog.createdAt}`)}</p>
                                </div>
                                    {
                                        editBlog === true && 
                                        (
                                            <div className=' absolute top-1 right-1 flex flex-col items-center gap-2'>
                                                <Button onClick={ () => navigate("/editBlog")}>
                                                    <FaEdit />
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger>
                                                            <Button variant="destructive" className=" text-lg">
                                                                <MdDeleteForever />
                                                            </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete your Blog post
                                                            and remove from our servers.
                                                        </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={ () => handleDelete()}>
                                                            Delete
                                                        </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        )
                                    }
                            </div>
                            <div className=' text-pretty mt-4 border-b border-b-slate-500 border-double px-2 py-2'>
                                <p className=' font-medium'>Summary: </p>
                                { blog.summary }
                            </div>
                            <div className=' mt-4 px-2'>
                                {
                                    parse(String(`${blog.content}`))
                                }
                            </div>
                        </div>
                        )   : 
                        (
                            <p>No Blog Details found</p>
                        )
                    }
                </div>
            }
            <Footer />
        </div>
    );
}

export default BlogPage;