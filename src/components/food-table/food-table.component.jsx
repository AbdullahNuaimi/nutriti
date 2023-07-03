import './food-table.css';
import Card from '../common/card/card.component';

const FoodTable= (props) =>{ 
    return (
        <div className="food-table-container">
            <>
        {
            props.foodList?.map((item,index) => {
                return (
                    <Card key={index} item={item} foodList={props.foodList} setFoodList={props.setFoodList}
                        index={index}></Card>
                );
            })
        }
        </>
        </div>
    );
};

export default FoodTable;