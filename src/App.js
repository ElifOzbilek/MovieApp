
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import "./lib/fontawesome/css/all.min.css";
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import MovieCard from './components/MovieCard/MovieCard';
import EmptyPage from './components/EmptyPage';
import { useEffect, useState, useRef } from 'react';


  const MoviesPage = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const cancelToken = useRef(null);

  const getMovies = async (pageNumber, query) => {
    
    cancelToken.current = axios.CancelToken.source();

    try {
      const response = await axios.get('https://api.unsplash.com/search/photos/', {
        params: {
          client_id: 'Z2Sq8A3ZZB57XIC5jKuDaQ7tB5z03EtpY4pPkTpvcTg',
          query: query || 'movie', 
          orientation: 'squarish',
          page: pageNumber,
          per_page: 20
        },
        cancelToken: cancelToken.current.token
      });

      if (Array.isArray(response.data.results)) {
        setMovies(response.data.results);
      } else {
        console.error('Expected results:', response.data);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled', err.message);
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const pageNumber = parseInt(page) || 1;
    getMovies(pageNumber, searchQuery);

    window.scrollTo(0, 0);
  }, [page, searchQuery]);

  useEffect(() => {
    if (!page || page === '1') {
      navigate(`/1`);
    }
  }, [page, navigate]);

  const handlePrevious = () => {
    const currentPage = parseInt(page) || 1;
    if (currentPage > 1) {
      navigate(`/${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    const currentPage = parseInt(page) || 1;
    navigate(`/${currentPage + 1}`);
  };

  const handleSearch = (query) => {
  
      setSearchQuery(query);
      navigate(`/1`);
    
  };

  return (
    <div>
      <Header />
      <Search onSearch={handleSearch} />
      <div className="movie-list">
        {
          movies && movies.length > 0 && movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        }
      </div>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={parseInt(page) <= 1}className='previous' ><i class="fa-solid fa-chevron-left"></i></button>
        <button onClick={handleNext} className='next'><i class="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:page" element={<MoviesPage />} />
        <Route path="/" element={<MoviesPage />} />
        <Route path="/izlenecekler" element={EmptyPage} />
        <Route path="/film" element={EmptyPage} />
        <Route path="/dizi" element={EmptyPage} />
        <Route path="/kirala&&satinal" element={EmptyPage} />
        <Route path="/cocuk" element={EmptyPage} />
        <Route path="/canlitv" element={EmptyPage} />
        <Route path="/film/:id" element={EmptyPage} />

      </Routes>
    </Router>
  );
}

export default App;
