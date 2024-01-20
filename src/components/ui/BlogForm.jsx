import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './input';
import RTE from './RTE';
import { Button } from './button';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, editBlog } from '@/services/operations/blogApi';
import { useNavigate } from 'react-router-dom';
// import { Textarea } from './textarea';

function BlogForm({post,create}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token,user} = useSelector((state) => state.auth);
    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            summary: post?.summary || "",
            content: post?.content || "",
        }
    });

    function onSubmit(data) {
        if(create)
            dispatch(createBlog(data,user._id, token,navigate));
        else {
            dispatch(editBlog(data,post._id,user._id ,token,navigate));
        }
    }
    return (
        <div className=' w-9/12 mx-auto mt-4'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap mx-auto w-full ">
                <div className=" gap-2 px-2">
                    <Input
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />

                    <Input
                        placeholder="Summary"
                        className="mb-4 "
                        {...register("summary", { required: true })}
                    />

                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />

                    <div className="px-2 flex w-full items-center justify-end mt-6">
                        <Button type="submit" className="w-fit bg-green-600 text-lg hover:bg-green-800">
                            Save
                        </Button>
                    </div>

                </div>
            </form>
            
        </div>
    );
}

export default BlogForm;