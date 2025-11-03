export function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-float"></div>
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-[120px] animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/15 rounded-full blur-[100px] animate-float" style={{animationDelay: '4s'}}></div>
      <div className="absolute top-40 right-1/4 w-72 h-72 bg-violet-500/15 rounded-full blur-[100px] animate-float" style={{animationDelay: '1s'}}></div>
    </div>
  )
}

