import { useState, useEffect } from 'react';

export default function Navbar() {
  // ለተጠቃሚው ፕሮፋይል Dropdown State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // ለሞባይል ሜኑ (Hamburger) State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ከDropdownኑ ውጭ ሲነካ በራሱ እንዲዘጋ ለማድረግ
  useEffect(() => {
    const handleOutsideClick = () => {
      setIsProfileOpen(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/90 text-white backdrop-blur-md border-b border-gray-900 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LEFT SIDE: Logo & Navigation Links */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="text-xl font-black tracking-wider text-cyan-400 uppercase cursor-pointer">
            Tamir View
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="text-white hover:text-cyan-400 transition">Home</a>
            <a href="#" className="hover:text-cyan-400 transition">Movies</a>
            <a href="#" className="hover:text-cyan-400 transition">TV Shows</a>
            <a href="#" className="hover:text-cyan-400 transition">Watchlist</a>
      
          </div>
        </div>

        {/* RIGHT SIDE: Search, Profile & Mobile Buger Button */}
        <div className="flex items-center gap-4">
          
          {/* Search Bar (Desktop) */}
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Search movies..." 
              className="w-48 lg:w-64 bg-gray-900 border border-gray-800 text-xs rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-gray-200"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className  ="w-4 h-4 text-gray-500 absolute right-3.5 top-2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.602Z" />
            </svg>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation(); // ወደ window click እንዳይተላለፍ
                setIsProfileOpen(!isProfileOpen);
              }}
              className="flex items-center focus:outline-none rounded-full"
            >
              <img 
                className="h-9 w-9 rounded-full object-cover border-2 border-gray-800 hover:border-cyan-400 transition" 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
                alt="Profile"
              />
            </button>

            {/* Dropdown Menu Item */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-52 origin-top-right rounded-xl bg-gray-900 border border-gray-800 shadow-2xl p-1.5 space-y-0.5 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-gray-800 mb-1">
                  <p className="text-[11px] text-gray-500">Signed in as</p>
                  <p className="text-xs font-semibold text-gray-200 truncate">ዮናስ አበበ</p>
                </div>
                <a href="#" className="block px-3 py-2 text-xs text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition">Your Profile</a>
                <a href="#" className="block px-3 py-2 text-xs text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition">Account Settings</a>
                <hr className="border-gray-800 my-1" />
                <button className="w-full text-left px-3 py-2 text-xs text-red-400 rounded-lg hover:bg-red-500/10 transition">Sign out</button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1 text-gray-400 hover:text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
              {isMobileMenuOpen ? (
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /> // የኤክስ (X) ምልክት
              ) : (
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /> // የሃምበርገር ምልክት
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* MOBILE MENU LINKS (በትናንሽ ስክሪን ብቻ የሚታይ) */}
      {isMobileMenuOpen && (
        <div class="md:hidden mt-4 pt-4 border-t border-gray-900 space-y-3 px-2 text-sm text-gray-400 animate-in slide-in-from-top duration-200">
          <a href="#" class="block text-white">Home</a>
          <a href="#" class="block hover:text-white">Movies</a>
          <a href="#" class="block hover:text-white">TV Shows</a>
          <a href="#" class="block hover:text-white">Watchlist</a>
          {/* Search bar ለሞባይል */}
          <div class="relative pt-2">
            <input 
              type="text" 
              placeholder="Search..." 
              class="w-full bg-gray-900 border border-gray-800 text-xs rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-cyan-500 text-gray-200"
            />
          </div>
        </div>
      )}
    </nav>
  );
}