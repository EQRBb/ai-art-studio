import Link from 'next/link'

export function Footer() {
  return (
    <footer className="relative glass-effect border-t border-white/10 mt-12 sm:mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Logo Column */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 mb-3 sm:mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1 sm:p-1.5 rounded-lg">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white">AI Studio</span>
            </Link>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-white font-semibold text-xs sm:text-sm mb-2 sm:mb-3">Pages</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Affiliate</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Learn & get help */}
          <div>
            <h4 className="text-white font-semibold text-xs sm:text-sm mb-2 sm:mb-3">Learn & get help</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Support</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Docs</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Developers</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Marketing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="hidden sm:block">
            <h4 className="text-white font-semibold text-xs sm:text-sm mb-2 sm:mb-3">Company</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Customers</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Marketing</Link></li>
            </ul>
          </div>

          {/* Term & Policies */}
          <div className="hidden sm:block">
            <h4 className="text-white font-semibold text-xs sm:text-sm mb-2 sm:mb-3">Term & Policies</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Privacy policy</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Cookie policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-4 sm:pt-6 text-center">
          <p className="text-[10px] sm:text-xs text-white/50">
            © Copyright dex.ai 2025
          </p>
        </div>
      </div>
    </footer>
  )
}

