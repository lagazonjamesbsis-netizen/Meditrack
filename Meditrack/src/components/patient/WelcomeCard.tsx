export default function WelcomeCard({ name }: { name: string }) {
  return (
    <div className="bg-card rounded-3xl shadow-card p-5">
      <h2 className="text-2xl font-bold text-brand">
        Welcome, {name}!
      </h2>
      <p className="text-brand font-semibold mt-1.5">Upcoming Appointment</p>
    </div>
  )
}
