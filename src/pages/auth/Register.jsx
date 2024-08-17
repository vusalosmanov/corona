import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { auth, storage, db } from '../../firebase/config';
import Loader from '../../components/loader/loader';

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // const storageRef = ref(storage, `images/${Date.now()}_${username}`);
      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          toast.error(error.message);
          setIsLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL,
          });

          setIsLoading(false);
          toast.success('Registration successful');
          navigate('/login');
        }
      );
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className='w-full h-auto mt-[40px] lg:mt-[0]'>
        <div className='max-[1320px] w-full mx-auto flex justify-center gap-[40px] items-center h-auto'>
          <form className='w-full flex justify-center items-center flex-col max-w-[450px] bg-white p-6 rounded-lg' onSubmit={register}>
            <h2 className='lg:mb-[40px] relative text-center capitalize text-[2rem] text-[#0B1739] font-bold'>Sign up</h2>
            <div className='w-[40px] h-[5px] rounded-lg bg-[#106853] block lg:hidden mt-[10px]'></div>
            <div className='flex flex-row gap-[20px] w-full mt-[40px] lg:mt-[0]'>
              <div className='w-[100%] flex items-center justify-center flex-col'>
                <div className='w-[100%] mb-[25px]'>
                  <input
                    type='text'
                    className='block w-full p-2 text-base  leading-6 text-gray-700 font-medium bg-white border border-[#0B1739] appearance-none rounded-md px-[12px] py-[16px]'
                    placeholder='Name'
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className='w-[100%] mb-[25px]'>
                  <input
                    type='text'
                    className='block w-[100%] p-2 text-base font-medium leading-6 text-gray-700 bg-white border border-[#0B1739] appearance-none rounded-md px-[12px] py-[16px]'
                    placeholder='Email adress *'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='w-[100%] mb-[25px]'>
                  <input
                    type='password'
                    className='block w-full p-2 text-base font-medium leading-6 text-gray-700 bg-white border border-[#0B1739] appearance-none rounded-md px-[12px] py-[16px]'
                    placeholder='Password *'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='w-[100%] mb-[25px]'>
                  <input
                    type='file'
                    className='block w-full p-2 text-base font-normal leading-6 text-gray-700 bg-white border border-gray-300 appearance-none rounded-md px-[12px] py-[16px]'
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
            <button
              type='submit'
              className="mt-[30px] bg-gradient-to-r from-[#cb3cff] to-[#7f25fb] text-[#fff] px-[20px] py-[15px] w-full max-w-[240px] rounded-[5px] flex flex-row justify-center items-center text-center text-[18px] font-bold  transition-all"
            >
              Create Account
            </button>
            <div className='flex items-center justify-center flex-col lg:flex-row max-w-[600px] w-full'>
              <span>Already have an account?</span>
              <Link to='/login' className='text-[#0B1739]'>Log in</Link>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Register;
