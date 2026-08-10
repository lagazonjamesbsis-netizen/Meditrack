export default function WelcomeCard({ name, className = '' }: { name: string; className?: string }) {
  return (
    <div className={`bg-card rounded-3xl shadow-card p-5 ${className}`}>
      <h2 className="text-2xl font-bold text-brand">
        Welcome, {name}!
      </h2>
      <p className="text-brand font-semibold mt-1.5">Upcoming Appointment</p>
    </div>
  )
}
