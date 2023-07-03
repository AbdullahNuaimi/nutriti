import './mini-card.css';


const MiniCard = (props) =>{

    return(
        <div className="mini-card-container">
            <div className="left-mini-card-wrapper" style={{backgroundImage: `url('${props.item.image}'`}}></div>
            <div className="right-mini-card-wrapper">
                <p>Food: 
                    <span>&nbsp;{props.item.name}</span>
                </p>
                <p>Amount: 
                    <span>&nbsp;{props.item.amount}gm</span>
                </p>
                <p>Calories: 
                    <span>&nbsp;{props.item.calories}kcal</span>
                </p>
            </div>
        </div>
    );
};


export default MiniCard;