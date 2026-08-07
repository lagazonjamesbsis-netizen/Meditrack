import Link from "next/link";


const ResidenceDetails = () => {
  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      {/* Logo Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center pt-4 pb-0 lg:py-0">
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

      {/* Form Area */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 pb-10">

        {/* Back Button */}
        <div className="w-[90%] max-w-md flex items-center mb-1">
          <Link
            to="/signup"
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
                1
              </div>

              <span className="text-xs mt-1">
                Residence
              </span>
            </div>

           <div className="flex-1 h-px bg-gray-300 mx-2"></div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
                2
              </div>

              <span className="text-xs mt-1">
                Verification
              </span>
            </div>

            <div className="flex-1 h-px bg-gray-300 mx-2"></div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
                3
              </div>

              <span className="text-xs mt-1">
                Done
              </span>
            </div>

          </div>
        </div>

        {/* Residence Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-[92%] max-w-md">

          <h2 className="text-lg font-bold mb-4">
            Residence Details
          </h2>

          <input
            type="text"
            placeholder="Province"
            className="w-full py-3 border-b mb-3 text-sm outline-none"
          />

          <input
            type="text"
            placeholder="City / Municipality"
            className="w-full py-3 border-b mb-3 text-sm outline-none"
          />

          <input
            type="text"
            placeholder="Barangay"
            className="w-full py-3 border-b mb-3 text-sm outline-none"
          />

          <input
            type="text"
            placeholder="Street"
            className="w-full py-3 border-b mb-3 text-sm outline-none"
          />

          <input
            type="text"
            placeholder="House No., Building, Floor and Others"
            className="w-full py-3 border-b mb-3 text-sm outline-none"
          />

          <input
            type="text"
            placeholder="ZIP / Postal Code"
            className="w-full py-3 border-b mb-6 text-sm outline-none"
          />

          <Link
            to="/verification"
            className="
              block
              w-full
              bg-[#0F588B]
              text-white
              text-center
              py-3
              rounded-lg
            "
          >
            Next
          </Link>

        </div>

      </div>
    </div>
  );
};

export default ResidenceDetails;
