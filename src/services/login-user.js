import { users } from "../data/users"
/**
 * @params const users: {
    pid: never[];
    name: string;
    avatar: string;
    password: string;
    email: string;
    id: string;
}[]
 */
let user = null;
const LoginUser = (email,password) =>{
    user = users.find(item => item.email === email);
    if(user && user.password === password){
        sessionStorage.setItem('user',JSON.stringify(user));
        return user;
    }
    else {
        sessionStorage.removeItem('user');
        return null;
    }
};
const getUser =()=>{
    user = JSON.parse(sessionStorage.getItem('user'));
    return user;
};
const LogoutUser = () =>{
    sessionStorage.removeItem('user');
};


export {LoginUser, getUser, LogoutUser};