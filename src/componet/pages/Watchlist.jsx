import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  // ገጹ ሲከፈት ከ localStorage ላይ ፊልሞቹን ያነባል
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(savedWatchlist);
  }, []);

  // አንድን ፊልም ከሊስቱ ላይ ቀጥታ ለመቀነስ
  const removeMovie = (id, e) => {
    e.stopPropagation(); // ካርዱ እንዳይጫን መከልከል
    const updated = watchlist.filter(item => item.id !== id);
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };

  return (
    <div className="w-full bg-black min-h-screen p-8 text-white">
      <h2 className="text-3xl font-bold mb-8 text-cyan-400 border-b border-gray-900 pb-4">My Watchlist</h2>

      {watchlist.length === 0 ? (
        <div className="text-center py-20 text-gray-500 space-y-4">
          <p className="text-xl">የመረጡት ፊልም የለም!</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-cyan-400 rounded-xl border border-gray-800"
          >
            ፊልሞችን ፈልግ
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <div 
              key={movie.id} 
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="bg-[#0c111b] rounded-2xl overflow-hidden shadow-2xl border border-gray-900 hover:border-cyan-500/40 hover:scale-105 transition-all duration-300 relative group cursor-pointer"
            >
              <div className="relative h-64 w-full bg-gray-950">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* ❌ በፍጥነት ማጥፊያ በተን */}
                <button 
                  onClick={(e) => removeMovie(movie.id, e)}
                  className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition shadow-md"
                >
                  ✕
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-sm truncate text-gray-200">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}