import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ResetImg from '../../assets/image/iconss/forgot.png'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/loader'
import Swal from "sweetalert2"
const Reset = () => {

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const Alert = () => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Chek your email for a reset link",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false)
        Alert();
        toast.success("Chek your email for a reset link ")
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
      });
  }
  return (
    <>
      {isLoading && <Loader />}
      <section className='w-full h-auto'>
        <div className='max-[1320px] w-full mx-auto flex justify-center gap-[40px] items-center h-[600px]'>
          <form className="w-full flex justify-center items-center flex-col max-w-[450px] bg-white p-6 rounded-lg" onSubmit={resetPassword}>
            <h2 className="lg:mb-[55px] relative text-center capitalize text-[2rem] font-semibold text-[#0B1739]">Reset Password</h2>
            <div className="w-[40px]  h-[5px] rounded-lg bg-[#106853] block lg:hidden mt-[10px]"></div>
            <div className="flex flex-row gap-[20px] w-full mt-[40px] lg:mt-[0]">
              <div className="w-[100%] flex items-center justify-center flex-col">
                <div className="w-[100%] mb-[25px]">
                  <input type="text" className="block w-[100%] p-2 text-base font-normal leading-6 text-white bg-[#0B1739] border border-[#0B1739] appearance-none rounded-md px-[12px] py-[16px]" id="company" placeholder="Email adress *" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
            </div>
            <button
              type='submit'
              className="mt-[30px] bg-gradient-to-r from-[#cb3cff] to-[#7f25fb] text-[#fff] px-[20px] py-[15px] w-full max-w-[240px] rounded-[5px] flex flex-row justify-center items-center text-center text-[18px] font-bold  transition-all"
            >
              Reset Password
            </button>
            <div className='flex items-center lg:justify-between justify-center flex-col lg:flex-row max-w-[600px] w-full'>
              <Link to='/login' className='text-[#106853]'>Login</Link>
              <Link to='/register' className='text-[#106853]'>Register</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Reset