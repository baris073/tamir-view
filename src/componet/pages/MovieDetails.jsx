import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MovieDetails() { 
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null); // 🚨 የትርለሩን የዩቲዩብ Key ለመያዝ
  const [loading, setLoading] = useState(true);
  const apikey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetailsAndVideos = async () => {
      try {
        setLoading(true);
        
        // 1. የፊልሙን ዋና መረጃ መጥሪያ
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`
        );
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // 2. 🚨 የፊልሙን ቪዲዮዎች/ትሬለሮች መጥሪያ አዲሱ ሊንክ
        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}&language=en-US`
        );
        const videoData = await videoResponse.json();
        
        // 3. 🚨 ከቪዲዮዎቹ ውስጥ "Trailer" እና "YouTube" የሆነውን መርጦ Key ውን መውሰድ
        const officialTrailer = videoData.results?.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        
        // ኦፊሴላዊ ትሬለር ከጠፋ ዝም ብሎ መጀመሪያ ያገኘውን ቪዲዮ እንዲወስድ ማድረግ
        if (officialTrailer) {
          setTrailerKey(officialTrailer.key);
        } else if (videoData.results?.length > 0) {
          setTrailerKey(videoData.results[0].key);
        }

      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieDetailsAndVideos();
  }, [id]); 

  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!movie) return <div className="text-white text-center p-10">Movie not found!</div>;
const toggleWatchlist = () => {
  // 1. በብሮውዘሩ ውስጥ የተቀመጡትን ፊልሞች ማምጣት
  const savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  
  // 2. ፊልሙ ቀድሞውኑ በሊስቱ ውስጥ ካለ ማረጋገጥ
  const isAlreadyAdded = savedWatchlist.some(item => item.id === movie.id);

  let updatedWatchlist;
  if (isAlreadyAdded) {
    // ካለ ከሊስቱ ውስጥ እናወጣዋለን (Remove)
    updatedWatchlist = savedWatchlist.filter(item => item.id !== movie.id);
    alert(`${movie.title} ከ Watchlist ተወግዷል!`);
  } else {
    // ከሌለ አዲሱን ፊልም እንጨምራለን (Add)
    updatedWatchlist = [...savedWatchlist, {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average
    }];
    alert(`${movie.title} ወደ Watchlist ተጨምሯል!`);
  }

  // 3. የተስተካከለውን ሊስት መልሰን localStorage ውስጥ እናስቀምጣለን
  localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
};
  return (
    <div className="min-h-screen bg-[#040810] text-white relative pb-12">
      
      {/* 📸 ጀርባ ላይ የሚታይ ትልቅ የፊልም ፎቶ */}
      <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`} 
          alt={movie.title} 
          className="w-full h-full object-cover opacity-30 blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040810] via-transparent to-black/50"></div>
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 md:left-12 z-30 flex items-center gap-2 bg-black/60 hover:bg-cyan-500 hover:text-black text-white px-4 py-2 rounded-xl border border-gray-800 font-semibold transition-all cursor-pointer"
        >
          ← Back
        </button>
      </div>

      {/* 📝 የፊልሙ ዝርዝር መረጃ እና ዋናው ፖስተር */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 -mt-32 md:-mt-48 relative z-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start border-b border-gray-900 pb-12">
          
          <div className="w-56 md:w-72 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-gray-800/80">
            <img 
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster"} 
              alt={movie.title} 
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex-1 space-y-6 text-center md:text-left mt-4 md:mt-24">
            <h1 className="text-3xl md:text-5xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-cyan-400">
              {movie.title}
            </h1>
<button 
  onClick={toggleWatchlist}
  className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-black font-bold px-6 py-3 rounded-xl transition shadow-lg cursor-pointer mx-auto md:mx-0">
    like
</button>
            {movie.tagline && <p className="text-cyan-400 italic text-base md:text-lg">"{movie.tagline}"</p>}

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs font-semibold text-gray-400">
              <span className="bg-gray-900 px-3 py-1 rounded-md border border-gray-800">📅 {movie.release_date}</span>
              <span className="bg-gray-900 px-3 py-1 rounded-md border border-gray-800">⏱️ {movie.runtime} min</span>
              {movie.vote_average > 0 && (
                <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-md border border-amber-500/20 font-bold">⭐ {movie.vote_average.toFixed(1)}</span>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-200">Storyline</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-3xl">{movie.overview}</p>
            </div>
          </div>
        </div>

        {/* 🎬 4. 🚨 የቪዲዮ ትሬለር ማሳያ ክፍል (iframe) */}
        {trailerKey ? (
          <div className="mt-12 space-y-4">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide">
              Official Trailer
            </h3>
            {/* 16:9 Aspect Ratio እንዲጠብቅ በ div እናስረዋለን */}
            <div className="w-full aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-900">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title={`${movie.title} Official Trailer`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          <div className="mt-12 text-center text-gray-500 py-8 bg-gray-950 rounded-xl border border-gray-900">
            🎬 Trailer not available for this movie.
          </div>
        )}

      </div>
    </div>
  );
}