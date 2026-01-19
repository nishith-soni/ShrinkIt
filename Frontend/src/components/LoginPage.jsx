import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-hot-toast';
import { useStoreContext } from '../contextApi/ContextApi';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const { setToken } = useStoreContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
        mode: 'onTouched',
    });

    const loginHandler = async(data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post(
                "/api/auth/public/login",
                data
            );
            setToken(response.token);
            localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
            toast.success("Login Successful");
            reset();
            navigate('/');
        } catch (error) {
            console.log("Login Error: ", error);
            toast.error("Login Failed.");
        } finally {
            setLoader(false);
        }
    }

    return (
        <div
            className='min-h-[calc(100vh-64px)] flex items-center justify-center'>
            <form onSubmit={handleSubmit(loginHandler)}
                className='sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md'>
                    <h1 className='text-center font-serif text-btn-color font-bold lg:text-3xl text-2xl'>
                        Login Here
                    </h1>

                    <hr className='mt-2 mb-5 text-black'/>
                    
                    <div className='flex flex-col gap-3'>
                        <TextField 
                            label="Username"
                            required
                            id="username"
                            type="text"
                            message="Username is required"
                            placeholder="Enter your username"
                            errors={errors}
                            register={register}
                        />

                        {/* <TextField 
                            label="Email"
                            required
                            id="email"
                            type="text"
                            message="Email is required"
                            placeholder="Enter your email"
                            errors={errors}
                            register={register}
                        /> */}

                        <TextField 
                            label="Password"
                            required
                            id="password"
                            type="password"
                            message="Password is required"
                            placeholder="Enter your password"
                            min={6}
                            errors={errors}
                            register={register}
                        />
                    </div>

                    <button
                        disabled={loader}
                        type="submit"
                        className='bg-customRed font-semibold text-white  bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'>
                        {loader ? 'Logging in...' : 'Login'}
                    </button>

                    <p className='text-center text-sm text-slate-700 mt-6'>
                        Don't have an account?
                        <Link 
                            className='font-semibold underline hover:text-black' 
                            to="/register">
                                <span className='text-btn-color'>Register</span>
                        </Link>
                    </p>
            </form>
        </div>
    );
}

export default LoginPage;