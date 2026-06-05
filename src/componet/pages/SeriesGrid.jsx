import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


export default function SeriesGrid({ onCardClick }) {
  // 🚨 1. የገጽ ቁጥሩን የሚይዝ ስቴት (መጀመሪያ 1 ነው)
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [Series, setSeries] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const apikey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        // 🚨 2. ሊንኩ መጨረሻ ላይ '&page=${page}' ተብሎ ተቀይሯል
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apikey}&language=en-US&page=${page}`
        );
        const data = await response.json();
        setSeries(data.results); // የዛን ገጽ 20 ፊልሞች ብቻ ይይዛል
        setTotalPages(data.total_pages || 1); // የአጠቃላይ ገጾችን እንዲያውቅ
        
        // ወደ ቀጣይ ገጽ ሲሄድ ስክሪኑ ወደ ላይ (Top) እንዲመለስ ማድረግ
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.log('Error fetching movies:', error);
      }
    };
    fetchSeries();
  }, [page]); // 🚨 3. 'page' በተቀየረ ቁጥር ይህ useEffect እንደገና ይሠራል

  return (
    
    
   
    <div className="w-full bg-black min-h-screen p-8 text-white">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Series Movies</h2>
      
      {/* የፊልም ካርዶች Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {Series.map((movie) => (
          <div 
            key={movie.id} 
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer border border-gray-800 hover:border-cyan-500 transition"
          >
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-72 object-cover" />
            <div className="p-3">
              <h3 className="font-semibold text-sm truncate">{movie.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 🚨 4. የገጽ መቀየሪያ በተኖች (Pagination Buttons) */}
      <div className="flex items-center justify-center gap-6 mt-12">
        
        {/* ወደ ኋላ መመለሻ በተን */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} // ከገጽ 1 በታች እንዳይወርድ መከላከል
          disabled={page === 1} // ገጽ 1 ላይ ከሆነ በተኑ አይሠራም (Disabled)
          className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold border border-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          ← Previous
        </button>

        {/* የአሁኑ ገጽ ቁጥር ማሳያ */}
        <span className="text-cyan-400 font-bold bg-cyan-500/10 px-4 py-2 rounded-lg border border-cyan-500/30">
          Page {page} / {totalPages}
        </span>

        {/* ወደ ፊት መሄጃ በተን */}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} // ገጹን በ 1 ይጨምራል
          disabled={page === totalPages}
          className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-black rounded-lg font-bold transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next →
        </button>

      </div>

    </div>
    
  );
}