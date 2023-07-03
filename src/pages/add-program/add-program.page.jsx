import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './add-program.css';
import { cities } from '../../data/cities';
import { weekDAys } from '../../data/weekDays';
import DayList from '../../components/day-list/day-list.component';
import { DatePicker,Input,Form,Select,ConfigProvider,Button } from 'antd';

const AddProgram =() =>{
    const navigate = useNavigate();
    const foodList = (JSON.parse(localStorage.getItem('foodList')) || ['']);
    const [weekList, setWeekList] = useState([[],[],[],[],[],[],[]]);
    const [index,setIndex] = useState(0);
    const initial = localStorage.getItem('patients');
    const [patients,setPatients] = useState(initial? JSON.parse(localStorage.getItem('patients')) : []);
    const [nameValue,setNameValue] = useState('');
    const [phoneValue,setPhoneValue] = useState('');
    const [emailValue,setEmailValue] = useState('');
    const [cityValue,setCityValue] = useState(cities[0]);
    useEffect(()=>{
        setWeekList(weekList);
        localStorage.setItem('patients',JSON.stringify(patients));
    },[weekList,patients]);
    const display = (num) =>{
        setIndex(num);
    };
    useEffect(() => {
        if(JSON.parse(sessionStorage.getItem('user')) === null){
            navigate('/login', {replace: true});
        }
    });
    const submitHandler = (e) =>{
        e.preventDefault();
        const name = e.target.name.value;
        const phone = e.target.phone.value;
        const email = e.target.email.value;
        const dob = e.target.dob.value;
        const city = cityValue;
        let calories = 0;
        for(let i =0; i<7;i++){
            const sumlist = [...weekList[i]];
            for(let j =0; j<sumlist.length;j++){
                calories += parseFloat(sumlist[j].calories);
            }
        }
        const patient ={
            name: name,
            phone: phone,
            email: email,
            dob: dob,
            city: city,
            program: weekList,
            calories: calories
        }
        setPatients([patient,...patients]);
        setWeekList([[],[],[],[],[],[],[]]);
        setNameValue('');
        setPhoneValue('');
        setEmailValue('');
        setTimeout(()=>{
            navigate('/ViewExistingPrograms');
        },'10')
    };
    const emptyFields =()=>{
        setNameValue('');
        setPhoneValue('');
        setEmailValue('');
        setWeekList([[],[],[],[],[],[],[]]);
    };
    const dailyCalories = () =>{
        let sum=0;
        for(let i =0;i<weekList[index].length;i++){
            sum +=parseFloat(weekList[index][i].calories);
        }
        return sum.toFixed(2);
    };
    return (
        <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#16697a'
            },
        }}
        >
            <div className="new-program-page-container">
                <form className='program-form' onSubmit={submitHandler}>
                    <div className="control-buttons">
                    <Button htmlType='button' onClick={()=>{emptyFields()}}>Cancel</Button>
                    <Button type='primary' htmlType='submit'>Save</Button>
                    </div>
                    <fieldset>
                        <legend>Patient Info</legend>
                        <div className="form-content-wrapper">
                            <div className="patient-name">
                                <Form.Item label='Name: ' required>
                                    <Input type="text" className="patient-name" name='name'
                                    onChange={e => {setNameValue(e.target.value)}} value={nameValue}
                                    />
                                </Form.Item>
                            </div>
                            <div className="patient-phone">
                                <Form.Item label='Phone Number: ' required>
                                    <Input type="text" className="patient-phone" name='phone' 
                                    onChange={(e) => {setPhoneValue(e.target.value)}} value={phoneValue}
                                    />
                                </Form.Item>
                            </div>
                            <div className="patient-email">
                                <Form.Item label='Email: ' rules={[{ required: true }]} required>
                                    <Input type="email" className="patient-email" name='email'
                                    onChange={e =>{setEmailValue(e.target.value)}} value={emailValue}
                                    />
                                </Form.Item>
                            </div>
                            <div className="patient-dob">
                                <Form.Item label='DOB'>
                                    <DatePicker name='dob' className='patient-dob' />
                                </Form.Item>
                            </div>
                                <div className="patient-city">
                                    <Form.Item label='City'>
                                        <Select name="city" id="patient-city" className="patient-city"
                                        onChange={(value) => {setCityValue(value)}} value={cityValue}>
                                            {cities.map((city,index) =>{
                                                return(
                                                    <Select.Option key={index} value={city}>
                                                        {city}
                                                    </Select.Option> 
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <fieldset>
                <legend>Program</legend>
                <table>
                        <tbody>
                            <tr className='week-days'>
                                {weekDAys.map((day,i)=>{
                                    return(
                                        <td key={i}>
                                            <button key={day} type='button' onClick={()=>{display(i)}}
                                                className={index === i? 'selected':''}>
                                                {day}
                                            </button>
                                        </td> 
                                    );
                                })}
                            </tr>
                            <tr className='program-row'>
                                <td colSpan="7">
                                    <DayList foodList={foodList}
                                    weekList={weekList} setWeekList={setWeekList}
                                    index={index}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='7'>{weekList[index].length}&nbsp;Meals</td>
                            </tr>
                            <tr>
                                <td colSpan='7'>{dailyCalories()}&nbsp;KCal</td>
                            </tr>
                        </tbody>
                    </table>
                    </fieldset>
            </div>
        </ConfigProvider>
    );
};


export default AddProgram;