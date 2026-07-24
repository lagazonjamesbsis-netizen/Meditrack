import Link from "next/link";


const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/purplebackground.png')",}}>

      {/* Logo Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center pt-4 pb-3 md:pt-6 md:pb-4 lg:py-0">
        <div className="flex items-center justify-center">

          <img src="/logo.png" alt="MediTrack Logo" className="w-15 md:w-32 lg:w-30 -mr-1"/>

          <div className="grid grid-cols-1 text-left mr-2 md:mr-6 lg:mr-10">

            <h1 
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#0F588B] leading-none"
              style={{ fontFamily: "Bebas Neue" }}
            >
              MEDITRACK
            </h1>
            
            <p
              className="text-base md:text-lg lg:text-2xl text-[#0F588B] tracking-[0.13em] -mt-2 leading-none whitespace-nowrap"
              style={{ fontFamily: "Asap Condensed" }}>
              Stay On Track With Us
            </p>
          </div>

        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center px-4 pb-10">

        <div className="bg-white shadow-xl rounded-2xl p-6 w-[92%] max-w-md">

          <h2 className="text-xl font-bold mb-4">
            Forgot Password
          </h2>

          <p className="text-gray-500 mb-6">
            Enter your email address and we'll send a password reset link.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg mb-6"
          />

          <button
            className="w-full bg-[#0F588B] text-white py-3 rounded-lg mb-4 hover:bg-[#0c4b75] transition"
          >
            Send Reset Link
          </button>

          <Link
            href="/"
            className="block text-center text-[#0F588B] font-semibold"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;
