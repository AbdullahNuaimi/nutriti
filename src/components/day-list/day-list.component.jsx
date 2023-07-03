import './day-list.css';
import MiniCard from '../mini-card/mini-card.component';
import {IoMdAddCircle} from 'react-icons/io'
import { useState } from 'react';
import { Select,Input,Button } from 'antd';

const DayList = (props) =>{
    const [selectedFood,setSelectedFood] = useState(props.foodList[0].name);
    const [selectedamount,setSelectedamount] = useState(1);
    const [hideForm,setHideForm] = useState(true);
    const handleCancel = () =>{
        setHideForm(true);
        setSelectedamount(1);
        setSelectedFood(props.foodList[0].name);
    };
    const handleSubmit = () =>{
        let editedList = [...props.weekList];
        const item = props.foodList.find(item => item.name === selectedFood);
        if(!props.weekList[props.index].includes(item)){
            item.calories = parseFloat((item.amount / item.calories) * selectedamount).toFixed(2);
            item.amount = selectedamount;
            editedList[props.index]=[item,...editedList[props.index]];
            props.setWeekList([...editedList]);
            handleCancel();
        }
        else{
            alert('item already existed!');
        }
    }
    return (
        <div className="day-list-container">
            <button type='button' className="add-new-food" onClick={()=>{setHideForm(false)}}><IoMdAddCircle/></button>
                {props.weekList[props.index]?.map((item,index) =>{
                    return <MiniCard item={item} index = {index} key= {index}/>
                })}
                <div className={hideForm? 'hidden' : "select-food-container"} onClick={()=>{setHideForm(true)}}>
                    <div className="select-food-wrapper" onClick={(e)=>{e.stopPropagation()}}>
                        <h1>Add New Meal</h1>
                        <br/>
                        <div className="select-wrapper">
                            <Select onChange={(e)=>{setSelectedFood(e)}} value={selectedFood}
                            className='day-list-select'
                            >
                                {props.foodList.map((item,index)=>{
                                    return (
                                        <Select.Option key={index} value={item.name}>
                                            {item.name}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="amount-selected">Select amount</label>
                            <Input type="number"  placeholder='amount gm/ml' min={1} 
                            onChange={e => setSelectedamount(parseFloat(e.target.value))}
                            value={selectedamount || 1} id='amount-selected' className='day-list-input'
                            />
                        </div>
                        <div className="button-wrapper">
                            <Button htmlType='button' type='primary' onClick={()=>{handleSubmit()}} >Add</Button>
                            <Button htmlType='button' type='default' onClick={()=>handleCancel()}>Cancel</Button>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default DayList;