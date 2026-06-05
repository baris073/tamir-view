import { useState, useEffect, useRef } from 'react'; // 🚨 useRef ተጨምሯል

export default function UpcomingMovies({ onCardClick }) {
  const [card, setcard] = useState([]);
  const apikey = import.meta.env.VITE_TMDB_API_KEY;
  
  // 🚨 1. የስላይደሩን ዲቭ በኮድ ለመቆጣጠር useRef እንፈጥራለን
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchcard = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=1`);
        const data = await response.json();
        setcard(data.results.slice(0, 10)); // 10 ፊልም
      } catch (error) {
        console.log('not found :', error);
      }
    };
    fetchcard();
  }, []);

  // 🚨 2. በተኖቹ ሲጫኑ ስላይደሩን ወደ ግራና ቀኝ የሚያንሸራትት ፈንክሽን
  const handleScroll = (direction) => {
    if (sliderRef.current) {
      // ስላይደሩ አሁን ካለበት ስፋት ላይ ግማሹን ያህል (300px) ወደ ጎን እንዲያልፍ ያደርጋል
      const scrollAmount = direction === 'left' ? -300 : 300;
      
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth', // ለስላሳ አኒሜሽን
      });
    }
  };

  return (
    // 'group' ክላስ የተጨመረው ማውሱ ሲያርፍበት ብቻ ፍላጻዎቹ እንዲታዩ ነው
    <div className="w-full bg-black py-6 px-8  text-white relative group">
      
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Upcoming Movies</h2>
      
      {/* 🚨 3. የግራ በተን (Left Arrow) */}
      <button 
        onClick={() => handleScroll('left')}
        className="absolute left-10 top-[55%] -translate-y-1/2 z-20 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-gray-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* 🚨 4. የቀኝ በተን (Right Arrow) */}
      <button 
        onClick={() => handleScroll('right')}
        className="absolute right-10 top-[55%] -translate-y-1/2 z-20 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-gray-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* 🚨 5. 'ref={sliderRef}' ተጨምሯል (ዋናው የስላይደር ክፍል) */}
      <div 
        ref={sliderRef}
        className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth gap-6 py-4"
      >
        {card.map((singleCard) => (
          <div 
            key={singleCard.id} 
            onClick={() => onCardClick && onCardClick(singleCard.id)}
            className="min-w-[200px] sm:min-w-[240px] md:min-w-[260px] bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300 group cursor-pointer snap-start"
          >
            {/* የፊልሙ ፎቶ ክፍል */}
            <div className="relative h-36 w-full bg-gray-800">
              <img 
                src={`https://image.tmdb.org/t/p/w500${singleCard.backdrop_path || singleCard.poster_path}`} 
                alt={singleCard.title} 
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-black/70 text-cyan-400 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                Upcoming
              </span>
            </div>

            {/* የፊልሙ መረጃ ክፍል */}
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-sm text-gray-100 truncate group-hover:text-cyan-400 transition">
                {singleCard.title}
              </h3>

              <div className="flex items-center justify-between pt-1">
                {/* 📅 መውጫ ቀኑ */}
                <div className="flex items-center gap-1.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-cyan-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  <span className="text-xs font-medium">{singleCard.release_date}</span> 
                </div>

                {/* Rating */}
                {singleCard.vote_average > 0 && (
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                    ⭐ {singleCard.vote_average.toFixed(1)}
                  </span>
                )}
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}