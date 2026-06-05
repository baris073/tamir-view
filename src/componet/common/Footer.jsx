import { Link } from 'react-router-dom';
import Pagination from '../pages/pagination';
export default function Footer() {
  // የአሁኑን አመት በራሱ እንዲያሰላ ማድረግ (ሁልጊዜ አዲስ ሆኖ እንዲቀጥል)
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#080d14] text-gray-400 border-t border-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* 1. የሎጎ እና የኩባንያው መግለጫ ክፍል */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider">
            TAMIR VIEW
          </h2>
          <p className="text-sm leading-relaxed text-gray-500">
            የቅርብ ጊዜ እና ተወዳጅ ፊልሞችን፣ የትያትር ትሬለሮችን እና ተከታታይ ድራማዎችን በአንድ ቦታ የሚያገኙበት ዘመናዊ የፊልም መረጃ ቋት።
          </p>
        </div>

        {/* 2. ፈጣን ሊንኮች (Navigation) */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-base tracking-wide border-b border-gray-800 pb-2">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition duration-200"> <Link to="/">Home</Link></a></li>
            <li><a href="#" className="hover:text-cyan-400 transition duration-200"> <Link to="/movies">Movies</Link></a></li>
            <li><a href="#" className="hover:text-cyan-400 transition duration-200"> <Link to="/series"> TV Series</Link></a></li>
            <li><a href="#" className="hover:text-cyan-400 transition duration-200">Upcoming</a></li>
          </ul>
        </div>

        {/* 3. ህጋዊ መረጃዎች (Legals) */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-base tracking-wide border-b border-gray-800 pb-2">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition duration-200">Terms of Service</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition duration-200">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition duration-200">Cookie Preferences</a></li>
          </ul>
        </div>

        {/* 4. የእውቅና ክፍል (API Attribution) */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-base tracking-wide border-b border-gray-800 pb-2">Powered By</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            ይህ ድረ-ገጽ የፊልም መረጃዎችን ለማቅረብ የ <span className="text-cyan-500 font-semibold">TMDB API</span> አገልግሎትን ይጠቀማል።
          </p>
        </div>

      </div>

      {/* ከስር ያለው ጠባብ መስመር (Copyright እና ማህበራዊ ሚዲያ) */}
      <div className="w-full border-t border-gray-900 bg-[#060a0f] py-6 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          
          <p>© {currentYear} Tamir View. All rights reserved. Developed with ❤️</p>
          
          {/* ማህበራዊ ሚዲያ ሊንኮች (Icons) */}
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-cyan-400 transition" aria-label="Telegram">
              <span className="font-semibold">Telegram</span>
            </a>
            <a href="#" className="hover:text-cyan-400 transition" aria-label="GitHub">
              <span className="font-semibold">GitHub</span>
            </a>
            <a href="#" className="hover:text-cyan-400 transition" aria-label="LinkedIn">
              <span className="font-semibold">LinkedIn</span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}