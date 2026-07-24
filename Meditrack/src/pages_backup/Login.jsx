import Link from "next/link";



const Login = () => {
  return (
    
    <div className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat"
      style={{backgroundImage: "url('/bg.png')",}}>

      {/* Logo Section */}  
      <div className="w-full lg:w-1/2 flex items-center justify-center pt-3 pb-5 lg:py-0">
        <div className="flex items-center justify-center">

          <img src="/logo.png" alt="MediTrack Logo" className="w-24 md:w-32 lg:w-48"/>

          <div className="text-left mr-10">

            <h1 className="text-7xl text-[#0F588B] leading-none"
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

      {/* Login Section */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center px-4 pb-10"> 

        {/* Tabs */}
        <div className="w-[92%] max-w-md mb-4">
          <div className="flex bg-gray-100 rounded-xl p-1 shadow-md">

            <Link
              to="/"
              className="flex-1 bg-white text-center py-3 rounded-lg font-semibold shadow-sm"
            >
              Log In
            </Link>

            <Link
              to="/signup"
              className="flex-1 text-center py-3 font-semibold text-gray-500"
            >
              Sign Up
            </Link>

          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-[92%] max-w-md">

          <h2 className="text-xl font-bold mb-6">
            Log In
          </h2>

          <input
            type="text"
            placeholder="Email or Username"
            className="w-full p-3 border rounded-lg mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg mb-4"
          />

          <div className="flex justify-between items-center text-sm mb-6">

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Stay signed in
            </label>

            <Link
                to="/forgot-password"
                className="text-[#0F588B] underline"
                >
                Forgot password?
            </Link>

          </div>

          <button
            className="w-full bg-[#0F588B] text-white py-3 rounded-lg mb-4"
          >
            Log In
          </button>

          <div className="text-center text-gray-400 mb-4">
            ── or ──
          </div>

          
          <button className="w-full bg-gray-100 hover:bg-gray-200 transition duration-200 py-3 rounded-lg flex items-center justify-center gap-2">
            <img src="/fb.png" alt="Facebook" className="w-5 h-5 ml-2.5" />
            Continue with Facebook
          </button>


          <button className="w-full bg-gray-100 hover:bg-gray-200 transition duration-200 py-3 rounded-lg flex items-center justify-center gap-0 mt-2">
            <img src="/google.png" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>

          <div className="text-center mt-6 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#0F588B] font-semibold"
            >
              Sign Up
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;