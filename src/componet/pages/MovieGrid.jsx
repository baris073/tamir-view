import {useEffect,useState,React} from "react"

export default function MovieGrid() {
  const [movieGrid , setmovieGrid]=useState([])
  const apikey = import.meta.env.VITE_TMDB_API_KEY;
  
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  
    useEffect(() => {
      const fetchmovie = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=1`);
          const data = await response.json();
          setmovieGrid(data.results); // 20 ፊልም
        } catch (error) {
          console.log('not found :', error);
        }
      };
      fetchmovie();
    }, []);
  
    return (
      
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movieGrid.map((movie) => (
        <div
          key={movie.id}
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
        >
          <img
            src={movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}` 
            : "https://via.placeholder.com/500x750?text=No+Image+Available"
            }
            alt={movie.title}
            className="w-full h-80 object-cover"
          />

          <div className="p-4">
            <h3 className="font-semibold text-lg">{movie.title}</h3>

            <div className="flex justify-between mt-2 text-sm">
              <span>{movie.year}</span>
              <span>⭐ {movie.vote_average}</span>
            </div>

            <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}