import { Routes, Route } from 'react-router-dom'
import Navbar from './componet/common/Navbar'
import Footer from './componet/common/Footer'
import Pagination from './componet/pages/pagination'
import MovieDetails from './componet/pages/MovieDetails'
import Home from './componet/pages/Home'
import SeriesGrid from './componet/pages/SeriesGrid'
import Watchlist from './componet/pages/Watchlist'

export default function App(){
  return(
    <div className="bg-black min-h-screen flex flex-col">
     
      {/* 🧭 የናቭባር ሜኑ */}
      <Navbar />
      
      {/* 🎞️ ዋናው የገጾች ማሳያ ቦታ */}
      <main className="grow">
        <Routes>
           {/* ዋናው መነሻ ገጽ (ሆም ፔጅ) */}
           <Route path="/" element={<Home />} />
           
           {/* የፊልሞች ዝርዝር በ Grid እና በPagination */}
           <Route path="/movies" element={<Pagination />} />
           
           {/* የቲቪ ድራማዎች ገጽ */}
           <Route path="/series" element={<SeriesGrid />} />
           
           {/* 🚨 አዲሱ የ Movie Details ገጽ በ ID (Dynamic Route) */}
           <Route path="/movie/:id" element={<MovieDetails />} />
           <Route path="/Watchlist" element={<Watchlist />} />
        </Routes>
      </main>
      
      {/* 👣 ፉተር ሁልጊዜ ከስር */}
      <Footer />
    </div>
  )
}