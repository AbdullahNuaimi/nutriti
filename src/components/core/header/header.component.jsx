import './header.css';
import { Link, useLocation } from 'react-router-dom';
import { useMemo, useState} from 'react';
import { getUser,LogoutUser} from '../../../services/login-user';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Header = () =>{
    let page= useLocation();
    const navigate= useNavigate();
    const [currentUser,setCurrentUser] =useState (getUser());
    const [showUser,setShowUser] = useState(false);
    useMemo (()=>{
        setCurrentUser(getUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sessionStorage.length]);
    const removeUser = () =>{
        LogoutUser();
        setCurrentUser(getUser());
        setShowUser(false);
        navigate('/login');
    };
    const handleUserPanel = ()=>{
        showUser? setShowUser(false) : setShowUser(true);
    };
    return (
    <div className='header-container'>
        <div className="left-header">
            <Link to= '/main'>
                <div className="logo"></div>
            </Link>
        </div>
        <div className="right-header">
            <div className={showUser? "user-wrapper" : 'hidden'}>
                <span className="user-name">{currentUser?.name}</span>
                <Button type='ghost' onClick={() => removeUser()}>Logout</Button>
            </div>
            <div className={currentUser? "user-avatar" : 'hidden'} onClick={handleUserPanel}
            style={{backgroundImage: `url('${currentUser?.avatar}')`}}></div>
            <Link className={ page.pathname ==='/main' || page.pathname ==='/login' || getUser() === null? 'hidden' : 'header-nav-button'} to='/NewDietProgram'>
                <span>New Diet</span>
            </Link>
            <Link className={ page.pathname ==='/main'|| page.pathname ==='/login' || getUser() === null? 'hidden' : 'header-nav-button'} to='/ViewExistingPrograms'>
                <span>view programs</span>
            </Link>
            <Link className={ page.pathname ==='/main'|| page.pathname ==='/login' || getUser() === null? 'hidden' : 'header-nav-button'} to='/ManageFoodTable'>
                <span>Manage food</span>
            </Link>
        </div>
    </div>
);

};

export default Header;