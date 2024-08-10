import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/loader';
import { cartActions } from '../../redux/slice/cartSlice';
import { addUser } from '../../firebase/adminSetup';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(cartActions.setLoggedIn(true));

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await addUser(email);

            const isAdmin = email === "vusal.osmanov66@gmail.com";

            setLoading(false);
            if (isAdmin) {
                toast.success('Login successful as Admin');
                navigate('/dashboard');
            } else {
                toast.success('Login successful');
                navigate('/');
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <>
            {loading && <Loader />}
            <section className='w-full h-auto'>
                <div className='max-[1320px] w-full mx-auto flex justify-center gap-[40px] items-center h-[600px]'>
                    <form className="w-full flex mx-auto justify-center items-center flex-col max-w-[450px] bg-white rounded-lg p-7" onSubmit={signIn}>
                        <h2 className="lg:mb-[55px] relative text-center capitalize text-[2rem] text-[#0B1739] font-bold ">Login</h2>
                        <div className="w-[40px]  h-[5px] rounded-lg bg-[#106853] block lg:hidden mt-[10px]"></div>
                        <div className="flex flex-row gap-[20px] w-full mt-[40px] lg:mt-[0]">
                            <div className="w-[100%] flex items-center justify-center flex-col">
                                <div className="w-[100%] mb-[25px]">
                                    <input
                                        type="email"
                                        className="block w-[100%] p-2 text-base font-normal leading-6 text-gray-700 bg-white border border-[#0B1739] appearance-none rounded-md px-[12px] py-[16px]"
                                        placeholder="Email adress *"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="w-[100%] mb-[25px]">
                                    <input
                                        type="password"
                                        className="block w-full p-2 text-base font-normal leading-6 text-gray-700 bg-white border border-[#0B1739] appearance-none rounded-md px-[12px] py-[16px]"
                                        placeholder="Password*"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center lg:justify-between justify-center flex-col lg:flex-row max-w-[600px] w-full'>
                            <Link to='/reset' className='text-[#0B1739]'>Forgot your password</Link>
                        </div>
                        <button
                            type='submit'
                            className="mt-[30px] bg-gradient-to-r from-[#cb3cff] to-[#7f25fb] text-[#fff] px-[20px] py-[15px] w-full max-w-[240px] rounded-[5px] flex flex-row justify-center items-center text-center text-[18px] font-bold  transition-all"
                        >
                            Login
                        </button>
                        <div className='flex items-center justify-center flex-col lg:flex-row max-w-[600px] w-full'>
                            <span>Don't have an account yet?</span>
                            <Link to='/register' className='text-[#0B1739]'>Sign up</Link>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Login;
