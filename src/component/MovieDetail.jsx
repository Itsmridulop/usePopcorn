import { useEffect, useState } from "react"
import Rating from './Rating'
import Loader from './Loader'
import Error from "./Error"
import Button from "./Button"

const KEY = '87c88572'

function MovieDetail({ selectedId, onSetSelectId, watched, onSetWatched }) {
    const [movieData, setMovieData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [userRating, setUserRating] = useState(0)
    const [error, setError] = useState('')
    const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movieData
    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId)
    const watchedRating = watched.find(movie => movie.imdbID === selectedId)?.userRating

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
                if (!res.ok) throw new Error("Unable to load movie")
                const data = await res.json()
                setMovieData(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [selectedId])

    useEffect(() => {
        const callback = e => {
            if (e.code === 'Escape') onSetSelectId(null)
        }
        document.addEventListener('keydown', callback)
        return () => { document.removeEventListener('keydown', callback) }
    }, [])

    useEffect(() => {
        if (!title) return
        document.title = `Movie | ${title}`
        return () => { document.title = 'UsePopcorn' }
    }, [title])

    const handleClick = () => {
        onSetWatched([...watched, { imdbID: selectedId, userRating, title, poster, runtime, imdbRating }])
        onSetSelectId(null)
    }

    return (
        <div className="details">
            {isLoading && <Loader />}
            {error && <Error />}
            {!isLoading && !error && <>
                <header>
                    <Button className='btn-back' onClick={() => onSetSelectId(selectedId)}>&larr;</Button>
                    <img src={poster} alt={title} />
                    <div className="details-overview">
                        <h2>{title}</h2>
                        <p>{released} &bull; {runtime}</p>
                        <p>{genre}</p>
                        <p>
                            <span>⭐️</span>
                            {imdbRating} IMDb rating
                        </p>
                    </div>
                </header>
                <div className="rating">
                    {isWatched ? <p>You allready rated this movie ({watchedRating}) <span>⭐️</span></p> : <Rating maxRating={10} onSetRating={setUserRating} size={15} starSize={24} />}
                    {userRating > 0 && <Button className="btn-add" onClick={handleClick}>+ Add to List</Button>}
                </div>
                <section>
                    <p><em>{plot}</em></p>
                    <p>Starring {actors}</p>
                    <p>Directed by {director}</p>
                </section>
            </>}
        </div>

    )
}

export default MovieDetail