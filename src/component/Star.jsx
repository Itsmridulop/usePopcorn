
export default function Star({onMouseEnter, size, onClick, onMouseLeave, children}) {
    const starStyle = {
        heigth: size,
        width: size
    }

    return (
        <span style={starStyle} onMouseEnter={onMouseEnter} onClick={onClick} onMouseLeave={onMouseLeave}>
           {children}
        </span>
    )
}