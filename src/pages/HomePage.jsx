import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '@/services/operations/blogApi';
import BlogCard from '@/components/ui/BlogCard';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Loader from '@/components/ui/Loader';

function HomePage(props) {
    const { blogs,loading } = useSelector( (state) => state.auth);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getAllBlogs());
    },[]);

    return (
        <div className=' flex flex-col gap-1' >
            <Navbar className=""/>
            {
                loading ? <Loader /> :
                (   
                    <div> 
                        {
                            blogs.length === 0 ?
                            (
                                <div className=' flex justify-center text-4xl text-white font-semibold h-[50vh] items-center mx-auto'>
                                    No Blogs Found
                                </div>
                            ):
                            (
                                <div className=' grid  grid-col-1
                                md:grid-cols-2 w-9/12 mx-auto gap-5 mt-4'>
                                    { blogs.map( (blog,i) => (
                                        <BlogCard blog={blog} key={i}/>
                                    ))}
                                </div>
                            )
                        }    
                    </div>
                )
            }
            <Footer />            
        </div>
    );
}

export default HomePage;