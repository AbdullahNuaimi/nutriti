import './card.css';
import { useState } from 'react';
import EditMeal from '../../edit-meal/edit-meal.component';
import {FaEdit} from 'react-icons/fa';
import {AiFillDelete} from 'react-icons/ai';
const Card = (props) =>{
    const item = props.item;
    const foodList = props.foodList;
    const setFoodList = props.setFoodList;
    const index= props.index
    const [hideForm,setHideForm] = useState(true);
    const[empty,setEmpty] = useState(false);
    const [showDeleteMessage,setShowDeleteMessage] = useState(false);
    const deleteItem = () =>{
        const editedList = [...foodList];
        editedList.splice(props.index,1);
        setFoodList(editedList);
        setEmpty(true);
        setShowDeleteMessage(false);
    };
    const editItem= () =>{
        setHideForm(false);
        setEmpty(true);
    };
    const handleDeleteMessage = () =>{
        setShowDeleteMessage(true);
        setTimeout(()=>setShowDeleteMessage(false),'3000');
    };
    return(
        <>
            <EditMeal hideForm={hideForm} setHideForm={setHideForm} index={index}
            foodList={props.foodList} setFoodList={props.setFoodList} item={item}
            empty={empty} setEmpty={setEmpty}
            />
            <div className="card-container">
                <div className="upper-card" style={{backgroundImage: `url('${item?.image}')`}}></div>
                <div className="lower-card">
                    <span className='food-name'>{item?.name}</span>
                    <span className="food-amount">amount: {item?.amount} g/ml</span>
                    <span className="food-calories">Calories: {item?.calories}.2 Kcal</span>
                    <div className="edit-delete-card">
                        <button className="edit-card" title='Edit' onClick={()=>{editItem()}}><FaEdit/></button>
                        <button className="delete-card" title='Delete' onClick={()=>{handleDeleteMessage()}}><AiFillDelete/></button>
                    </div>
                </div>
                <div className={showDeleteMessage? 'delete-confirmation' : 'hidden'}>
                    <span>Delete item?</span>
                    <button className='popup-button' id = 'yes-button' onClick={()=>{deleteItem()}}>Yes</button>
                    <button className='popup-button' onClick={()=>{setShowDeleteMessage(false)}}>Cancel</button>    
                </div>
            </div>
        </>
    );
};

export default Card;