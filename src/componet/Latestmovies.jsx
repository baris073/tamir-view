import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ በትክክል መጥቷል

export default function Latestmovies() { // 🚨 onCardClick props ማለፍ አይጠበቅበትም፣ ሙሉ በሙሉ ጠፍቷል
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const apikey = import.meta.env.VITE_TMDB_API_KEY;
  
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`
        );
        const data = await response.json();
        setMovies(data.results.slice(0, 10));
      } catch (error) {
        console.log('የቅርብ ጊዜ ፊልሞችን ማግኘት አልተቻለም:', error);
      }
    };
    fetchLatest();
  }, []);

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full bg-black py-6 px-8 text-white relative group">
      
      {/* 🔴 ርዕስ */}
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
        <h2 className="text-2xl font-bold text-gray-100 tracking-wide">Latest Releases</h2>
      </div>
      
      {/* ⬅️ የግራ በተን */}
      <button 
        onClick={() => handleScroll('left')}
        className="absolute left-10 top-[55%] -translate-y-1/2 z-20 bg-black/70 hover:bg-cyan-500 hover:text-black text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-gray-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* ➡️ የቀኝ በተን */}
      <button 
        onClick={() => handleScroll('right')}
        className="absolute right-10 top-[55%] -translate-y-1/2 z-20 bg-black/70 hover:bg-cyan-500 hover:text-black text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-gray-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* 🎞️ ዋናው የስላይደር ይዘት መያዣ */}
      <div 
        ref={sliderRef}
        className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth gap-6 py-4"
      >
        {movies.map((movie) => {
          const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "N/A";

          return (
            <div 
              key={movie.id} 
              // 🚨 ማስተካከያ፦ ክሊክ ሲደረግ ቀጥታ ወደ አዲሱ Route ሊንክ እንዲሄድ አዘዝነው!
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="min-w-[200px] sm:min-w-[240px] md:min-w-[260px] bg-[#0c111b] rounded-2xl overflow-hidden shadow-2xl border border-gray-900 hover:border-emerald-500/40 hover:scale-105 transition-all duration-300 group cursor-pointer snap-start"
            >
              {/* 📸 ፖስተር */}
              <div className="relative h-64 w-full bg-gray-900 overflow-hidden">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`} 
                  alt={movie.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-md">
                  In Theaters
                </span>
              </div>

              {/* 📝 መረጃ */}
              <div className="p-4 space-y-1.5">
                <h3 className="font-bold text-sm md:text-base text-gray-200 truncate group-hover:text-emerald-400 transition">
                  {movie.title}
                </h3>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-semibold text-gray-500">{releaseYear}</span> 

                  {movie.vote_average > 0 && (
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                      <span>★</span>
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}