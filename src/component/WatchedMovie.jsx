import Button from "./Button"

function WatchedMovie({movie, onDeleteWatched}) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime}</span>
                </p>
            <Button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>x</Button>
            </div>
        </li>
    )
}

export default WatchedMovie
