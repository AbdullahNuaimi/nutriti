import './Input.css';
import { useState,useEffect } from 'react';

const Input =(props)=>{
    const [name,setName] = useState(props.value || '');
    const inputChangeHandler = (e) =>{
        let value= e.target.value;
        setName(value);
    };
    useEffect (()=>{
        if(props.empty){
            setName(props.value || '');
            props.setEmpty(false);
        }
    },[props])
    return (
        <div className="input-container">
            <label className='input-label' htmlFor={props.name}>{props.label || ""}
                {props.required? <span className='requirnment-star' title='required'>*</span>
                : <span></span>}
            </label>
            <input type={props.type || "text"} id={props.name} className='input-field' 
                onChange={inputChangeHandler} value={name} name={props.name} required={props.required}
            />
        </div>
    )
}


export default Input;