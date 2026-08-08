'use client'

import { useState } from "react";
import Link from "next/link";
import FormSignup from "@/components/forms/FormSignup";

const Signup = () => {

const countries = [
  { name: "Philippines", code: "+63", flag: "/ph.png" },
  { name: "United States", code: "+1", flag: "/us.png" },
  { name: "Canada", code: "+1", flag: "/ca.png" },
  { name: "United Kingdom", code: "+44", flag: "/gb.png" },
  { name: "China", code: "+86", flag: "/cn.png" },
];

const [selectedCountry, setSelectedCountry] = useState(countries[0]);
const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/purplebackground.png')" }}>
      {/* Logo Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center pt-4 pb-1 mb-6 md:pt-5 md:pb-1.5 lg:py-0 lg:mb-0">
        <div className="flex items-center justify-center">
          <img src="/logo.png" alt="MediTrack Logo" className="w-19 md:w-38 lg:w-38 -mr-1"/>
          <div className="flex flex-col items-start text-left mr-2 md:mr-6 lg:mr-10">
            <h1 className="text-[3.75rem] font-bold text-[#0F588B] leading-none"
              style={{ fontFamily: "Bebas Neue" }}>MEDITRACK</h1>
            <p className="text-[1.125rem] text-[#0F588B] tracking-[0.18em] mt-0 leading-none whitespace-nowrap"
              style={{ fontFamily: "Asap Condensed" }}>Stay On Track With Us</p>
          </div>
        </div>
      </div>

      {/* Signup Area */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center px-4 pb-10">
        {/* Tabs */}
        <div className="w-[92%] max-w-md mb-3">
          <div className="flex bg-gray-100 rounded-xl p-1 shadow-md">
            <Link href="/login" className="flex-1 text-center py-3 font-semibold text-gray-500">Log In</Link>
            <Link href="/signup" className="flex-1 bg-white text-center py-3 rounded-lg font-semibold shadow-sm">Sign Up</Link>
          </div>
        </div>

        {/* Signup Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-[92%] max-w-md">
          <h2 className="text-base font-bold mb-3">Sign Up</h2>
          <input type="text" placeholder="First Name" className="w-full py-2 border-b mb-2 text-sm outline-none" />
          <input type="text" placeholder="Last Name" className="w-full py-2 border-b mb-2 text-sm outline-none" />
          <label className="text-sm font-medium">Birthday</label>
          <input type="date" className="w-full py-2 border-b mb-2 text-sm outline-none" />
          <label className="text-sm font-medium">Gender</label>
          <div className="flex gap-4 md:gap-10 mt-2 mb-3">
            <label className="flex items-center gap-1 text-sm font-medium cursor-pointer">
              <input type="radio" name="gender" className="w-4 h-4 accent-[#0F588B]" /> <span>Male</span>
            </label>
            <label className="flex items-center gap-1 text-sm font-medium cursor-pointer">
              <input type="radio" name="gender" className="w-4 h-4 accent-[#0F588B]" /> <span>Female</span>
            </label>
          </div>
       
            <label className="text-sm font-medium">Mobile Number</label>
            <div className="relative mb-2 mt-1">
            <div className="flex items-center border-b">
                <button type="button" onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 py-2 pr-3">
                <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-6 h-4 object-cover" />
                <span className="text-sm">{selectedCountry.code}</span>
                <span className="text-xs">▼</span>
                </button>
                <input type="text" placeholder="Mobile Number" className="flex-1 py-2 text-sm outline-none" />
            </div>
            {isOpen && (
                <div className="absolute left-0 top-full mt-2 w-full sm:w-64 bg-white border rounded-lg shadow-lg z-50">
                {countries.map((country) => (
                    <button key={country.name} type="button"
                    onClick={() => { setSelectedCountry(country); setIsOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100">
                    <img src={country.flag} alt={country.name} className="w-6 h-4 object-cover"/>
                    <span className="text-sm">{country.name}</span>
                    <span className="ml-auto text-gray-500 text-sm">{country.code}</span>
                    </button>
                ))}
                </div>
            )}
        </div>

          <FormSignup />
        </div>
      </div>
    </div>
  );
};

export default Signup;
