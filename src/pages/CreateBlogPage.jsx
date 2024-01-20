import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import BlogForm from '@/components/ui/blogForm';
import React from 'react';

function CreateBlogPage(props) {
    return (
        <div>
            <Navbar />
            <BlogForm create={true}/>
            <Footer />
        </div>
    );
}

export default CreateBlogPage;