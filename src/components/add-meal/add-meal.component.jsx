import './add-meal.css';
import { useState } from 'react';
import Input from '../common/Input/Input.component';

const AddMeal = (props) =>{
    const[empty,setEmpty] = useState(false);
    const submitHandler = (e) =>{
        e.preventDefault();
        const name= e.target.meal.value;
        const image = e.target.link.value;
        const amount = parseInt(e.target.amount.value);
        const calories = parseFloat(e.target.calories.value);
        const foodItem = {
            name: name,
            image: image,
            amount: amount,
            calories: calories
        };
        if (!props.hideForm){
            props.setFoodList([foodItem,...props.foodList]);
            setEmpty(true);
            props.setHideForm(true);
        }
    };
    const handleCancel = () =>{
        props.setHideForm(true);
        setEmpty(true);
    };
    return (
        <div className={props.hideForm? 'hidden' :'add-Meal-container'}
        onClick={() =>{props.setHideForm(true)}}
        >
            <form className='meal-form' onSubmit={submitHandler} onClick ={(e) =>{e.stopPropagation()}}>
                <h1 className='form-title'>Add Item</h1>
                <Input setEmpty={setEmpty} empty={empty} type='text' 
                    label ='Name' name='meal' required></Input>
                <Input setEmpty={setEmpty} empty={empty} type="number" 
                    label= 'Amount (g/ml)' id='meal-amount' name='amount' required/>
                <Input setEmpty={setEmpty} empty={empty} type="number" 
                    label= 'Calories (Kcal)' id='meal-calories' name='calories' step={'0.1'} required/>
                <Input setEmpty={setEmpty} empty={empty} type="text" 
                    label= 'Image Link' id="image-link" name={"link"} />
                <div className='form-button-wrapper'>
                    <button className='form-button' type='submit' title='Add'>Add</button>
                    <button className='form-button' id='cancel' type='button' onClick={()=>{handleCancel()}}
                    title='Cancel'>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddMeal;