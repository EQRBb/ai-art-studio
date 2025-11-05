import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 md:px-6 lg:px-8 pt-2 sm:pt-4 backdrop-blur-sm filter-[url(#glass-distortion)]">
      <div className="max-w-7xl mx-auto glass-effect rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur group-hover:blur-md transition-all"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-1 sm:p-1.5 rounded-lg">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold text-white">AI Studio</span>
              <span className="text-[9px] sm:text-[10px] text-purple-300 hidden xs:block">Powered by SDXL</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-0.5 sm:space-x-1.5">
            <Link
              href="/"
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <span className="hidden sm:inline">Home</span>
              <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
            <Link
              href="/create"
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <span className="hidden sm:inline">Create</span>
              <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
            <Link
              href="/gallery"
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <span className="hidden sm:inline">Gallery</span>
              <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
            <button className="ml-0.5 sm:ml-1.5 px-2 sm:px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105 shadow-lg shadow-purple-500/25">
              Pro
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

