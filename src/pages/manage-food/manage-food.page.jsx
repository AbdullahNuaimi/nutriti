import './manage-food.css';
import AddMeal from '../../components/add-meal/add-meal.component';
import FoodTable from '../../components/food-table/food-table.component';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
const ManageFood =() =>{
    const navigate = useNavigate();
    useEffect(() => {
        if(JSON.parse(sessionStorage.getItem('user')) === null){
            navigate('/login', {replace: true});
        }
    });
    const initial = localStorage.getItem('foodList');
    const [foodList,setFoodList] = useState(initial? JSON.parse(localStorage.getItem('foodList')) : []);
    const [hideForm,setHideForm] = useState(true);
    useEffect (()=>{
        localStorage.setItem('foodList', JSON.stringify(foodList))
    },[foodList]);
    return (
        <div className='manage-food-container'>
            <div className='add-food-wrapper'>
                <button className='add-food' title='Add New Food' >
                    <IoMdAddCircle onClick={()=>hideForm?setHideForm(false) : setHideForm(true)}/>
                </button>
            </div>
            <h1 className={foodList.length===0? '' : 'hidden'} style={{color: '#16697A'}}>
                No items has been added yet..
            </h1>
            <AddMeal setFoodList={setFoodList} foodList={foodList} hideForm={hideForm}
             setHideForm={setHideForm}></AddMeal>
            <FoodTable foodList={foodList} setFoodList={setFoodList}></FoodTable>
        </div>
    );
};


export default ManageFood;