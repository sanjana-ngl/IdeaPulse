export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">

      <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <h2 className="mt-6 text-2xl font-semibold">
          Analyzing Your Idea...
        </h2>
        <p className="mt-2 text-gray-400">
          AI is evaluating market demand & competition ⚡
        </p>
      </div>
    </div>
  )
}