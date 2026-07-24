import Link from "next/link";


const Done = () => {
  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/purplebackground.png')",
      }}
    >
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

      {/* Form Area */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 pb-10">

        {/* Back Button */}
        <div className="w-[92%] max-w-md flex items-center mb-1">
          <Link
            href="/verification"
            className="text-2xl text-black mr-3"
          >
            ←
          </Link>
        </div>

        {/* Step Indicator */}
        <div className="w-[92%] max-w-md mb-4">
          <div className="flex bg-white rounded-xl p-3 shadow-md items-center justify-between">

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
                ✓
              </div>

              <span className="text-xs mt-1">
                Residence
              </span>
            </div>

            <div className="flex-1 h-px bg-green-500 mx-2"></div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
                ✓
              </div>

              <span className="text-xs mt-1">
                Verification
              </span>
            </div>

            <div className="flex-1 h-px bg-green-500 mx-2"></div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#0F588B] text-white flex items-center justify-center font-semibold">
                ✓
              </div>

              <span className="text-xs mt-1">
                Done
              </span>
            </div>

          </div>
        </div>

        {/* Success Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 w-[92%] max-w-md text-center">

          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Done, You're all set!
          </h2>

          <p className="text-gray-500 mb-8">
            Your account has been successfully created.
          </p>

          <Link
            href="/"
            className="
              block
              w-full
              bg-[#0F588B]
              text-white
              py-3
              rounded-lg
            "
          >
            Go to Login
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Done;
