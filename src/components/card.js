import uuid from "react-uuid"


function Card(props){
  function checkNull(nul) {
    return nul !=="null null" && nul !==" null";
  }
const arr=[]
const array=props.item.testIngre
const array2=props.item.testMeasure

  for(let i=0; i < array.length;i++ ){
    if(array2[i]===null && array[i]!==null ){
      arr.push(array[i])
    }
    else if(array2[i]===null && array[i]===null){
      break
    }
    else{
      arr.push(array2[i]+" "+ array[i])
    }
  
  }
const liElements=arr?.filter(checkNull).map(ingredients => <li key={uuid()}>{ingredients}</li>)


console.log(array[10])

return(
<div className="card-container">
<h2 className="drink-name">{props.item.drink}</h2>
<h3 className="glass-heading">Glass:</h3>
<p className="glass-text">{props.item.glass}</p>

<h3 className="instruction-heading">Instructions:</h3>
<p className="instruction-text">{props.item.instru}</p>
<h3 className="measures-heading">Measures & ingredients:</h3>
<ul>
{liElements}
</ul>
<img className="drink-image" src={props.item.img} alt="drink"></img>

{!props.toggle && <button className="close-button" onClick={props.handleClick}>Close</button>}

</div>


)


}


export default Card;