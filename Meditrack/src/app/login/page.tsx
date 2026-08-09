'use client'

import Link from "next/link";
import FormLogin from "@/components/forms/FormLogin";
import MediTrackBrand from "@/components/globals/MediTrackBrand";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat"
      style={{backgroundImage: "url('/purplebackground.png')",}}>

      {/* Logo Section */}  
      <div className="w-full lg:w-1/2 flex items-center justify-center pt-4 pb-1 mb-6 md:pt-5 md:pb-1.5 lg:py-0 lg:mb-0">
        <MediTrackBrand />
      </div>

      {/* Login Section */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center px-4 pb-10"> 
        {/* Tabs */}
        <div className="w-[92%] max-w-md mb-3">
          <div className="flex bg-gray-100 rounded-xl p-1 shadow-md">
            <Link href="/login" className="flex-1 bg-white text-center py-3 rounded-lg font-semibold shadow-sm">Log In</Link>
            <Link href="/signup" className="flex-1 text-center py-3 font-semibold text-gray-500">Sign Up</Link>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-[92%] max-w-md">
          <h2 className="text-xl font-bold mb-6">Log In</h2>
          <FormLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
