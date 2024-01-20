import React from 'react';
import SignupForm from "@/components/ui/SignupForm"

function SignupPage(props) {
    return (
        <div className=' flex justify-center sm:w-10/12 lg:w-8/12 h-[100vh] items-center mx-auto'>
            <SignupForm />
        </div>
    );
}

export default SignupPage;