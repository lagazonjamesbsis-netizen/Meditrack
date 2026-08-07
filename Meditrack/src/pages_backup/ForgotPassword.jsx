import Link from "next/link";


const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/bg.png')",}}>

      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center pt-3 pb-5 lg:py-0">
        <div className="flex items-center justify-center">

          <img src="/logo.png" alt="MediTrack Logo" className="w-24 md:w-32 lg:w-48"/>

          <div className="text-left mr-10">

            <h1 
              className="text-4xl md:text-5xl lg:text-7xl text-[#0F588B] leading-none mb-0"
              style={{ fontFamily: "Bebas Neue" }}
            >
              MEDITRACK
            </h1>
            
            <p
              className="text-base md:text-lg lg:text-2xl text-[#0F588B] mt-0 leading-none"
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
            to="/"
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
