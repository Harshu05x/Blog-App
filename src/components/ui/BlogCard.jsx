import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  

function BlogCard({blog}) {
    return (
        <div className=' max-h-40vh'>
            <Link to={`/blog/${blog._id}`}>
                <Card className=" flex justify-between hover:scale-95 transition-all duration-300
                 hover:shadow-black hover:shadow-xl w-full
                ">
                    <div className=' flex flex-col justify-between px-2 w-full'>
                        <CardHeader>
                            <CardTitle>{blog.title}</CardTitle>
                            <CardContent>
                                {
                                    blog.summary.length <= 200 ? 
                                    blog.summary : blog.summary.substr(0,200) + "..."
                                }
                            </CardContent>
                        </CardHeader>
                        <CardFooter className=" flex justify-between items-center border-t-2 
                             border-t-slate-300 border-dashed pt-2 text-sm">
                            <p className=' flex justify-center items-center gap-2'>
                                <Avatar>
                                    <AvatarImage src={`https://api.dicebear.com/5.x/initials/svg?seed=${blog.user.firstName+" "+blog.user.lastName}`} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                    {blog.user.firstName + " " + blog.user.lastName}
                            </p>
                            <p>{moment(blog.createdAt).startOf('ss').fromNow()}</p>
                        </CardFooter>
                    </div>
                </Card>
            </Link>
        </div>
    );
}

export default BlogCard;

