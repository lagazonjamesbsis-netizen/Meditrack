import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-violet-100 to-white">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src="/meditrack-logo.png"
            alt="MediTrack"
            className="w-12 h-12 object-contain"
          />
          <div>
            <p className="font-bebas text-2xl leading-none text-[#0F588B] m-0">
              MEDITRACK
            </p>
            <p className="font-asap text-[11px] tracking-[2px] leading-none text-[#0F588B] -mt-1">
              Stay On Track With Us
            </p>
          </div>
        </div>
        <Link
          href="/login"
          className="font-poppins text-sm font-semibold text-[#4E69D3] hover:text-[#3a50b8] no-underline"
        >
          Log in
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16 text-center">
        <span className="font-poppins text-xs font-bold text-[#4E69D3] uppercase tracking-[3px] mb-4">
          Coming soon
        </span>
        <h1 className="font-bebas text-6xl text-[#0F588B] m-0">
          MEDITRACK
        </h1>
        <p className="font-poppins text-base text-gray-500 mt-3 max-w-md">
          Your barangay health tracking platform is on the way. Check back
          soon to book appointments, manage health records, and stay on
          track.
        </p>
      </main>
    </div>
  )
}
