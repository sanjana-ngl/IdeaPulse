import IdeaForm from "../components/IdeaForm"

export default function ValidatePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_1px,_transparent_1px)] bg-[size:35px_35px] opacity-20"></div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-12 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.4)] w-[90%] max-w-3xl">
        <IdeaForm />
      </div>

    </div>
  )
}