import { useEffect, useRef } from "react"

function Sreach({ query, setQuery }) {
    const inputEle = useRef(null)

    useEffect(() => {
        const callBack = e => {
            if (document.activeElement === inputEle.current) return
            if (e.code === 'Enter') {
                inputEle.current.focus()
                setQuery("")
            }
        }
        document.addEventListener('keydown', callBack)
        return () => document.removeEventListener('keydown', callBack)
    }, [])

    return (
        <input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)} ref={inputEle} />
    )
}

export default Sreach
