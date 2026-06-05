import { useState, useEffect, useRef } from 'react';

export default function Latestseries({ onCardClick }) {
  const [series, setSeries] = useState([]);
  const apikey = import.meta.env.VITE_TMDB_API_KEY;
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        // 🚨 የቲቪ ድራማዎችን (On The Air) መጥሪያ Endpoint
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apikey}&language=en-US&page=1`
        );
        const data = await response.json();
        // 10 ድራማዎችን ብቻ እንቆርጣለን
        setSeries(data.results.slice(0, 10));
      } catch (error) {
        console.log('የቅርብ ጊዜ ድራማዎችን ማግኘት አልተቻለም:', error);
      }
    };
    fetchSeries();
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
    <div className="w-full bg-black p-8 text-white relative group">
      
      {/* 🔵 የክፍሉ ርዕስ ከነ ሰማያዊ ነጥብ ምልክት ጋር */}
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-pulse"></span>
        <h2 className="text-2xl font-bold text-gray-100 tracking-wide">Latest TV Series</h2>
      </div>
      
      {/* ⬅️ የግራ ፍላጻ በተን */}
      <button 
        onClick={() => handleScroll('left')}
        className="absolute left-10 top-[55%] -translate-y-1/2 z-20 bg-black/70 hover:bg-cyan-500 hover:text-black text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-gray-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* ➡️ የቀኝ ፍላጻ በተን */}
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
        {series.map((show) => {
          // 🚨 ለቲቪ ድራማዎች 'first_air_date' ነው የምንጠቀመው
          const airYear = show.first_air_date ? show.first_air_date.split("-")[0] : "N/A";

          return (
            <div 
              key={show.id} 
              onClick={() => onCardClick && onCardClick(show.id)}
              className="min-w-[200px] sm:min-w-[240px] md:min-w-[260px] bg-[#0c111b] rounded-2xl overflow-hidden shadow-2xl border border-gray-900 hover:border-cyan-500/40 hover:scale-105 transition-all duration-300 group cursor-pointer snap-start"
            >
              {/* 📸 የድራማው ፖስተር */}
              <div className="relative h-64 w-full bg-gray-900 overflow-hidden">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path || show.backdrop_path}`} 
                  alt={show.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-cyan-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-md">
                  On The Air
                </span>
              </div>

              {/* 📝 መረጃ ክፍል */}
              <div className="p-4 space-y-1.5">
                {/* 🚨 ለቲቪ ድራማዎች 'show.name' ነው የሚባለው */}
                <h3 className="font-bold text-sm md:text-base text-gray-200 truncate group-hover:text-cyan-400 transition">
                  {show.name}
                </h3>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-semibold text-gray-500">{airYear}</span> 

                  {show.vote_average > 0 && (
                    <div className="flex items-center gap-1 text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-cyan-500/20">
                      <span>★</span>
                      <span>{show.vote_average.toFixed(1)}</span>
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