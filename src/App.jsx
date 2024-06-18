import { useEffect, useState } from "react";
import NavBar from "./component/NavBar";
import Main from "./component/Main";
import Logo from "./component/Logo";
import Box from "./component/Box";
import Summary from "./component/Summary";
import WatchedMovie from "./component/WatchedMovie";
import MovieDetail from './component/MovieDetail'
import MovieList from "./component/MovieList";
import NumResults from "./component/NumResults";
import Sreach from "./component/Sreach";
import Loader from "./component/Loader";
import Error from './component/Error'

const KEY = '87c88572'

export default function App() {
  const [watched, setWatched] = useState(() =>JSON.parse(localStorage.getItem('watchedMovie')))
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const fectData = async () => {
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query || 'interstellar'}`, {signal: controller.signal})
        if (!res.ok) throw new Error("Unable to fetch data!!!")
        const data = await res.json()
        if (!data.Search) throw new Error("Query is invalid!")
        setMovies(data.Search)
        setError('')
        setSelectedId(null)
      } catch (error) {
        if(error.name !== 'AbortError'){
          setError(error.message)
          setMovies([])
        }
      } finally {
        setIsLoading(false)
      }
    }
    fectData()
    return () => {controller.abort()}
  }, [query])

  useEffect(() => {
    localStorage.setItem('watchedMovie', JSON.stringify(watched))
  },[watched])
 
  const handleSelect = id => {
    if(selectedId === id) setSelectedId(null)
    else setSelectedId(id)
  }

  const handleDeleteWatched = id => {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Sreach query={query} setQuery={setQuery} />
        <NumResults>Found <strong>{movies.length}</strong> results</NumResults>
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <Error message={error} />}
          {error === undefined && <Error message={'Query is invalid!'} />}
          {!isLoading && !error && <ul className="list list-movies">
            {movies?.map((movie) => (
              <MovieList key={movie.imdbID} movie={movie} onSetSelectId={handleSelect}/>
            ))}
          </ul>}
        </Box>
        <Box>
          {selectedId ? <MovieDetail watched={watched} onSetWatched={setWatched} selectedId={selectedId} onSetSelectId={handleSelect} /> : <><Summary watched={watched} />
            <ul className="list list-movies">
              {watched.map((movie) => (
                <WatchedMovie key={movie.imdbID} movie={movie} onDeleteWatched={handleDeleteWatched}/>
              ))}
            </ul></>}
        </Box>
      </Main>
    </>
  );
}