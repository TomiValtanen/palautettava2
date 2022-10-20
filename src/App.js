import { useEffect, useState } from "react"
import './App.css';
import axios from "axios"
import Card from "./components/card";
import Header from "./components/header";
import Footer from "./components/footer";
import ImageBox from "./components/imageBox";
import uuid from "react-uuid";


function App() {

  const [drinksData, setDrinksData] = useState([])
  const [introText, setIntroText] = useState(true)
  const [toggleRandom, setToggleRandom] = useState(true)
  const [count, setCount] = useState(0)
  //searched drinks data
  const [searchDrinksData, setSearchDrinksData] = useState([])
  const [search, setSearch] = useState("")
  const [datafound, setDataFound] = useState(true)
  const [drinkCards, setDrinkCards] = useState([])
  const [selectedDrink, setSelectedDrink] = useState([])
  const [close, setClose] = useState(false)

  //for random drinks
  useEffect(() => {
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then((response) => {
        const drinks = response.data.drinks
        setDrinksData(drinks)
      }).catch(error => {
        alert(error)
      })
  }, [count])

  //for searched drinks
  useEffect(() => {
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then((response) => {
        const drinks = response.data.drinks
        setSearchDrinksData(drinks)
      }).catch(error => {
        alert(error)
      })
  }, [search])


  function makeDrink(item, i) {
    return {
      drink: item[i].strDrink,
      glass: item[i].strGlass,
      instru: item[i].strInstructions,
      ingredients: [item[i].strMeasure1 + " " + item[i].strIngredient1, item[i].strMeasure2 + " " + item[i].strIngredient2, item[i].strMeasure3 + " " + item[i].strIngredient3, item[i].strMeasure4 + " " + item[i].strIngredient4, item[i].strMeasure5 + " " + item[i].strIngredient5, item[i].strMeasure6 + " " + item[i].strIngredient6, item[i].strMeasure7 + " " + item[i].strIngredient7, item[i].strMeasure8 + " " + item[i].strIngredient8, item[i].strMeasure9 + " " + item[i].strIngredient9, item[i].strMeasure1i + " " + item[i].strIngredient1i, item[i].strMeasure11 + " " + item[i].strIngredient11, item[i].strMeasure12 + " " + item[i].strIngredient12, item[i].strMeasure13 + " " + item[i].strIngredient13, item[i].strMeasure14 + " " + item[i].strIngredient14, item[i].strMeasure15 + " " + item[i].strIngredient15],
      img: item[i].strDrinkThumb,
      testIngre: [item[i].strIngredient1, item[i].strIngredient2, item[i].strIngredient3, item[i].strIngredient4, item[i].strIngredient5, item[i].strIngredient6, item[i].strIngredient7, item[i].strIngredient8, item[i].strIngredient9, item[i].strIngredient1i, item[i].strIngredient11, item[i].strIngredient12, item[i].strIngredient13, item[i].strIngredient14, item[i].strIngredient15],
      testMeasure: [item[i].strMeasure1, item[i].strMeasure2, item[i].strMeasure3, item[i].strMeasure4, item[i].strMeasure5, item[i].strMeasure6, item[i].strMeasure7, item[i].strMeasure8, item[i].strMeasure9, item[i].strMeasure1i, item[i].strMeasure11, item[i].strMeasure12, item[i].strMeasure13, item[i].strMeasure14, item[i].strMeasure15]
    }
  }
  function makeRandom() {
    setCount(prevCount => prevCount + 1)
    setToggleRandom(true)
    setIntroText(false)
  }

  function drinkCard(i) {
    return {
      drink: searchDrinksData[i].strDrink,
      img: searchDrinksData[i].strDrinkThumb,
      id: uuid()
    }
  }
  function card() {
    const arr = []
    if (searchDrinksData !== null) {
      setDataFound(true)
      for (let i = 0; i < searchDrinksData.length; i++) {
        arr.push(drinkCard(i))
      }
    }
    else {
      setDataFound(false)
    }
    setDrinkCards(arr)
    setToggleRandom(false)
    setClose(false)
  }
  function select(drink) {
    for (let i = 0; i < searchDrinksData.length; i++) {
      if (searchDrinksData[i].strDrink === drink) {
        setSelectedDrink(makeDrink(searchDrinksData, i))
        setClose(true)
      }
    }
  }
  function closed() {
    setClose(false)
  }
  const boxElement = drinkCards?.map(card => <ImageBox key={card.id} item={card} select={() => select(card.drink)} />)
  return (
    <>
      <Header value={search} onChange={e => setSearch(e.target.value)} handleClick={card} handleRandom={makeRandom} />
      <main>
        <h1>{toggleRandom ? "Coctail of the day!" : "Your search results!"}</h1>
        <h3 className="main-heading3">{introText ? "So weekend is coming and you need something new to test out ? Don't worry we have solution for you! Press the button and beging your journey with new and fabulous drinks! You are welcome to use search too if you already have something in mind!" : "Don't like what you see ? No need to worry press the button once again, cross your fingers and test it out!"}</h3>
        {toggleRandom && drinksData.map(drink => {
          return <div key={uuid()} className="card-container">
            <h2 className="drink-name">{drink.strDrink}</h2>
            <h3 className="glass-heading">Glass:</h3>
            <p className="glass-text">{drink.strGlass}</p>

            <h3 className="instruction-heading">Instructions:</h3>
            <p className="instruction-text">{drink.strInstructions}</p>
            <h3 className="measures-heading">Measures & ingredients:</h3>
            <ul>
              {[drink.strMeasure1 + " " + drink.strIngredient1, drink.strMeasure2 + " " + drink.strIngredient2, drink.strMeasure3 + " " + drink.strIngredient3, drink.strMeasure4 + " " + drink.strIngredient4, drink.strMeasure5 + " " + drink.strIngredient5, drink.strMeasure6 + " " + drink.strIngredient6, drink.strMeasure7 + " " + drink.strIngredient7, drink.strMeasure8 + " " + drink.strIngredient8, drink.strMeasure9 + " " + drink.strIngredient9, drink.strMeasure10 + " " + drink.strIngredient10, drink.strMeasure11 + " " + drink.strIngredient11, drink.strMeasure12 + " " + drink.strIngredient12, drink.strMeasure13 + " " + drink.strIngredient13, drink.strMeasure14 + " " + drink.strIngredient14, drink.strMeasure15 + " " + drink.strIngredient15].filter((inge => inge !== "null null" && inge !== " null")).map(ingre => <li key={uuid()}>{ingre.replace("null", "")}</li>)}

            </ul>
            <img className="drink-image" src={drink.strDrinkThumb} alt="drink"></img>
          </div>
        })}

        {!toggleRandom && <div>
          {close && <Card item={selectedDrink} handleClick={closed} />}
        </div>}

        {!toggleRandom && <div className="box-container">
          {datafound ? boxElement : <h3 className="nodata-text">Sorry We dont have that drink in our catalog.</h3>}
        </div>}


        <Footer />
      </main>

    </>
  );
}

export default App;
