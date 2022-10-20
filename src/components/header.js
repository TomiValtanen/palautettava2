
function Header(props) {
    return (
        <header>
            <h2 className="heading-left">Coctail Recipes </h2>
            <button className="random-button" onClick={props.handleRandom}>Random Drink</button>
            <input className="search-input" type="text" value={props.value} onChange={props.onChange} placeholder="Search here"></input>
            <button className="search-button" onClick={props.handleClick}>Search</button>
            <h2 className="heading-right">School Project 2</h2>

        </header>
    )
}
export default Header;