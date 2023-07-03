import './login.css';
// import Input from '../../components/common/Input/Input.component';
import { LoginUser } from '../../services/login-user';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
const Login = () =>{
    const [showWrongLogin,setShowWrongLogin] = useState(false);
    const navigate = useNavigate();
    const submintHandler = (e) =>{
        e.preventDefault();
        const user = LoginUser(e.target.email.value,e.target.password.value);
        if (user !== null){
            navigate('/main', {replace: true});
        }
        else{
            setShowWrongLogin(true);
        }
    };
    useEffect(()=>{
        if(showWrongLogin){
            setTimeout(()=>{
                setShowWrongLogin(false);
            },'2500');  
        }
    },[showWrongLogin])
    return(
        <div className="login-page-container">
            <div className="login-form-wrapper">
            <div className="login-stamp"></div>
            <div className="form-header">
                <p>Login</p>
            </div>
                <form onSubmit={submintHandler} className="login-form">
                    <div className="email-input">
                    <Input name='email' placeholder='Email'></Input>
                    </div>
                    <div className="password-input">
                    <Input.Password name='password' placeholder="input password"/>
                    </div>
                    <span className={showWrongLogin? "wrong-login-message" : 'hidden'}>
                        Email or password is wrong, Try again
                    </span>
                    <Button htmlType='submit'>Login</Button>

                </form>
            </div>
        </div>
    );
};

export default Login;