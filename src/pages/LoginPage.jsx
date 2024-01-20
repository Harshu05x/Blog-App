import LoginForm from '@/components/ui/LoginForm';
import React from 'react';

function LoginPage(props) {
    return (
        <div className=' flex justify-center sm:w-10/12 lg:w-8/12 h-[100vh] items-center mx-auto'>
            <LoginForm />
        </div>
    );
}

export default LoginPage;