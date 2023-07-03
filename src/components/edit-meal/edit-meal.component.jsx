import './edit-meal.css';
import '../add-meal/add-meal.css';
import Input from '../common/Input/Input.component';
const EditMeal = (props) =>{
    const submitHandler = (e) =>{
        e.preventDefault();
        const name= e.target.name.value;
        const image = e.target.image.value;
        const amount = parseInt(e.target.amount.value);
        const calories = parseFloat(e.target.calories.value);
        const foodItem = {
            name: name,
            image: image,
            amount: amount,
            calories: calories
        };
        const editedList= [...props.foodList];
        editedList[props.index] = foodItem;
        props.setFoodList(editedList);
        props.setHideForm(true);
    };
    const handleCancel = () =>{
        props.setHideForm(true);
        props.setEmpty(true);
    };
    return(
        <div className={props.hideForm? 'hidden' :'add-Meal-container'} onClick={()=> {props.setHideForm(true)}}>
            <form className='meal-form' onSubmit={submitHandler} onClick={(e) =>{e.stopPropagation()}}>
                <Input setEmpty={props.setEmpty} empty={props.empty} type='text' 
                    label ='Name' name='name' 
                    value={props.item.name} required
                    />
                <Input setEmpty={props.setEmpty} empty={props.empty} type="number" 
                    label= 'Amount (g/ml)' id='meal-amount' name='amount' 
                    value={props.item.amount} required
                    />
                <Input setEmpty={props.setEmpty} empty={props.empty} type="number" 
                    label= 'Calories (Kcal)' id='meal-calories' name='calories'
                    step={'0.1'} value={props.item.calories} required
                    />
                <Input setEmpty={props.setEmpty} empty={props.empty} type="text" 
                    label= 'Image Link' id="image-link" name='image' 
                    value={props.item.image}
                    />
                <div className='form-button-wrapper'>
                    <button className='form-button' type='submit' title='Save'>Save</button>
                    <button className='form-button' id= 'cancel' type='button' onClick={()=>{handleCancel()}}
                    title='Cancel'>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditMeal;