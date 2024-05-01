import React, { useState } from 'react'
import RegisterImg from '../../assets/image/iconss/register.png'
import { Link  , useNavigate} from 'react-router-dom'
import 'react-toastify/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../firebase/config'
import Loader from '../../components/loader/loader'
const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fpassword, setFpassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const registerUser = (e) => {
    e.preventDefault()
    if (password !== fpassword) {
      toast.error("password yanlis")
    }
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false)
        toast.success("Register basarili")
        navigate("/login")
      })
      .catch((error) => {
        toast.error(error.message)
        setIsLoading(false)
      });
  }
  return (
    <>
      <ToastContainer />
      { isLoading &&  <Loader/>}
      <section className='w-full h-auto'>
        <div className='max-[1320px] w-full mx-auto flex justify-center gap-[40px] items-center h-[600px]'>
          <form className="w-full flex justify-center items-center flex-col max-w-[450px]" onSubmit={registerUser}>
            <h2 className="lg:mb-[55px] relative text-center capitalize text-[2rem]">Qeydiyyat</h2>
            <div className="w-[40px]  h-[5px] rounded-lg bg-[#106853] block lg:hidden mt-[10px]"></div>
            <div className="flex flex-row gap-[20px] w-full mt-[40px] lg:mt-[0]">
              <div className="w-[100%] flex items-center justify-center flex-col">
                <div className="w-[100%] mb-[25px]">
                  <input type="text" className="block w-[100%] p-2 text-base font-normal leading-6 text-gray-700 bg-white border border-gray-300 appearance-none rounded-md px-[12px] py-[16px]" id="company" placeholder="E-poct ünvanı *" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="w-[100%] mb-[25px]">
                  <input type="password" className="block w-full p-2 text-base font-normal leading-6 text-gray-700 bg-white border border-gray-300 appearance-none rounded-md px-[12px] py-[16px]" id="password" placeholder="Şifrə *" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="w-[100%] mb-[25px]">
                  <input type="password" className="block w-full p-2 text-base font-normal leading-6 text-gray-700 bg-white border border-gray-300 appearance-none rounded-md px-[12px] py-[16px]" id="password" placeholder="tekrar Şifrə *" value={fpassword} onChange={(e) => setFpassword(e.target.value)} />
                </div>
              </div>
            </div>
            <button type='submit' className="mt-[30px] bg-[#fc8410] text-[#fff] px-[20px] py-[15px] w-full max-w-[240px] rounded-[5px] flex flex-row justify-center items-center text-center text-[18px] font-bold hover:bg-[#106853]">Qeydiyyat
            </button>
            <div className='flex items-center  justify-center flex-col lg:flex-row max-w-[600px] w-full'>
              <span>Hesabınız yoxdur?</span>
              <Link to='/login' className='text-[#106853]'>Daxil ol</Link>
            </div>
          </form>
          <div className='login w-[full]'>
            <img src={RegisterImg} alt="RegisterImg" className='w-[400px] object-cover' />
          </div>
        </div>
      </section>
    </>
  )
}

export default Register