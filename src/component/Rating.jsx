import { useState } from "react"
import Star from "./Star"
import PropTypes from 'prop-types'

const starStyle = {
  display: "flex",
  flexDirection: 'columb',
  gap: "4px",
  cursor: 'pointer'
}

const divStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around'
}

Rating.propTypes = {
  maxRating: PropTypes.number,
  className: PropTypes.string,
  message: PropTypes.array,
  color: PropTypes.string,
  size: PropTypes.number,
  starSize: PropTypes.number,
  onSetRating: PropTypes.func
}

function Rating({
  maxRating = 5,
  className = "",
  message = [],
  color = '#fcc419',
  size = 20,
  starSize = 40,
  onSetRating
}) {
  const [rating, setRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState(0)


  const textStyle = {
    lineHeight: "1",
    margin: "0",
    fontSize: size,
    color: color,
    display: 'flex',
    alignItems: 'center'
  }

  const handleSetRating = rating => {
    setSelectedRating(rating)
    onSetRating(rating)
  }

  return (
<div style={divStyle}>
      <div style={starStyle} className={className}>
        {Array.from(
          { length: maxRating },
          (_, i) =>
            rating >= i + 1 || selectedRating >= i + 1
              ? (<Star key={i} size={starSize} onMouseEnter={() => setRating(i + 1)} onClick={() => handleSetRating(i + 1)} onMouseLeave={() => setRating(0)} >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill={color}
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </Star>)
              : (<Star key={i} size={starSize} onMouseEnter={() => setRating(i + 1)} onClick={() => setSelectedRating(i + 1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={color}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg >
              </Star>)
        )}
      </div>
      <p style={textStyle}>{message.length === maxRating ? message[selectedRating ? selectedRating - 1 : rating - 1] : selectedRating || rating}</p>
    </div>
  )
}

export default Rating
