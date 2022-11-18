export const GlobalFilter = ({filter, setFilter}) => {
    return( 
        <div className="p-2" style={{backgroundColor: " #a7a4e0", width: "100%"}} >
    <span style={{fontWeight: "bold"}}>
        Search: {""}
        <input style={{outline: "none", border: "none"}} value={filter || ''} onChange={e => setFilter(e.target.value)}></input>
    </span>
    </div>
    )
}