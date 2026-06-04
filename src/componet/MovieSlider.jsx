import React, { useEffect, useState, useRef } from 'react';

export default function MoviesSlider() {
  const [slider, setSlider] = useState([]);
  const apikey = import.meta.env.VITE_TMDB_API_KEY;
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const request = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`);
        const data = await request.json();
        setSlider(data.results.slice(0, 5)); // 5 ፊልም
      } catch (error) {
        console.error('not found :', error);
      }
    };
    fetchMovies();
  }, []);

  // 🚨 1. የ Loop ሎጂክ የተጨመረበት የሴክሽን ማሸብለያ ፈንክሽን
  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      
      if (direction === 'right') {
        // 💡 ወደ ቀኝ ሲጫን፡ ወደ መጨረሻው ተጠግቶ ከሆነ (ከጠቅላላው ስፋት አንድ ስክሪን ሲቀረው) ወደ 0 (መጀመሪያ) ይመልሰዋል
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      } else {
        // 💡 ወደ ግራ ሲጫን፡ መጀመሪያ ላይ (0 ላይ) ከሆነ ወደ መጨረሻው ፊልም ይወስደዋል
        if (scrollLeft <= 10) {
          sliderRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' });
        }
      }
    }
  };

  // 🚨 2. በየ 5 ሰከንዱ ስላይደሩ በራሱ እንዲንቀሳቀስ (Auto-Play) ለማድረግ (ይህንን ከፈለግከው ጨምረው)
  useEffect(() => {
    const autoPlay = setInterval(() => {
      handleScroll('right');
    }, 5000); // 5000ms ማለት 5 ሰከንድ ነው

    return () => clearInterval(autoPlay); // Component ቱ ሲዘጋ ኢንተርቫሉን ያጠፋዋል (Memory leak ለመከላከል)
  }, [slider]); // slider ዳታው ሲመጣ መሥራት ይጀምራል

  return (
    <div className="w-full bg-black relative group">
      
      {/* የግራ በተን */}
      <button 
        onClick={() => handleScroll('left')}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-105 transition-all duration-300 border border-gray-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* የቀኝ በተን */}
      <button 
        onClick={() => handleScroll('right')}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-105 transition-all duration-300 border border-gray-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* ዋናው የስላይደር ገጽ */}
      <div 
        ref={sliderRef}
        className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
      >
        {slider.map((movie) => (
          <div 
            key={movie.id} 
            className="min-w-full h-screen relative flex items-center bg-cover bg-center snap-start"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.3) 100%), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`
            }}
          >
            <div className="max-w-4xl px-8 md:px-24 space-y-6 z-10">
              <h1 className="text-white font-bold text-4xl md:text-6xl tracking-wide leading-tight drop-shadow-md">
                {movie.title}
              </h1>
              <p className="text-gray-300 font-light text-sm md:text-lg max-w-2xl leading-relaxed">
                {movie.overview}
              </p>
              <div className="flex items-center gap-3">
                <img src="https://img.icons8.com/?size=100&id=19417&format=png&color=ffd800" alt="star" className="w-6 h-6 object-contain"/>
                <span className="text-white font-semibold text-lg">{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="pt-4">
                <button className="text-black font-bold rounded-full bg-[#ffd800] hover:bg-[#e6c200] transition-all duration-300 w-[200px] h-[50px] shadow-lg flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M8 5v14l11-7z"/></svg>
                  Watch Trailer
                </button>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
        ))}
      </div>

    </div>
  );
}