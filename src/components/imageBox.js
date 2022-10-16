function ImageBox(props){

    return(
        <div className="box" onClick={props.select}>
            <img className="box-image" src={props.item.img} alt="drink"></img>
            <h3 className="box-image-name">{props.item.drink}</h3>
            
        </div>
    )
}

export default ImageBox;