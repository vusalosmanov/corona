import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import LoginImg from '../../assets/image/iconss/login.png'
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
                navigate('/dashboard'); // Admins are redirected to the dashboard
            } else {
                toast.success('Login successful');
                navigate('/'); // Regular users are redirected to the home page
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
                    <div className='login w-[full]'>
                        <img src={LoginImg} alt="LoginImg" className='w-[400px] object-cover' />
                    </div>
                    <form className="w-full flex justify-center items-center flex-col max-w-[450px]" onSubmit={signIn}>
                        <h2 className="lg:mb-[55px] relative text-center capitalize text-[2rem]">Daxil ol</h2>
                        <div className="w-[40px]  h-[5px] rounded-lg bg-[#106853] block lg:hidden mt-[10px]"></div>
                        <div className="flex flex-row gap-[20px] w-full mt-[40px] lg:mt-[0]">
                            <div className="w-[100%] flex items-center justify-center flex-col">
                                <div className="w-[100%] mb-[25px]">
                                    <input
                                        type="email"
                                        className="block w-[100%] p-2 text-base font-normal leading-6 text-gray-700 bg-white border border-gray-300 appearance-none rounded-md px-[12px] py-[16px]"
                                        placeholder="E-poçt ünvanı *"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="w-[100%] mb-[25px]">
                                    <input
                                        type="password"
                                        className="block w-full p-2 text-base font-normal leading-6 text-gray-700 bg-white border border-gray-300 appearance-none rounded-md px-[12px] py-[16px]"
                                        placeholder="Şifrə *"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center lg:justify-between justify-center flex-col lg:flex-row max-w-[600px] w-full'>
                            <Link to='/reset' className='text-[#106853]'>Şifrəmi unutdum</Link>
                        </div>
                        <button
                            type='submit'
                            className="mt-[30px] bg-[#fc8410] text-[#fff] px-[20px] py-[15px] w-full max-w-[240px] rounded-[5px] flex flex-row justify-center items-center text-center text-[18px] font-bold hover:bg-[#106853]"
                        >
                            Daxil ol
                        </button>
                        {/* <button
                            type='button'
                            className="mt-[30px] bg-[#fc8410] text-[#fff] px-[20px] py-[15px] w-full max-w-[240px] rounded-[5px] flex flex-row justify-center items-center text-center text-[18px] font-bold hover:bg-[#106853]"
                            onClick={() => { }}
                        >
                            Google
                        </button> */}
                        <div className='flex items-center justify-center flex-col lg:flex-row max-w-[600px] w-full'>
                            <span>Hesabınız yoxdur?</span>
                            <Link to='/register' className='text-[#106853]'>Qeydiyyat</Link>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Login;
