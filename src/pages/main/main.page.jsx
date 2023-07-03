import './main.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main =()=>{
    const navigate = useNavigate();
    useEffect(() => {
        if(JSON.parse(sessionStorage.getItem('user')) === null){
            navigate('/login', {replace: true});
        }
    });
    return (
        <div className='main-page-container'>
            <div className="main-page-wrapper">
                <div className="add-program-wrapper" onClick={()=>{navigate('/NewDietProgram')}}>
                    <div className="add-program-button">
                        <Link className='nav-button' to="/NewDietProgram" />
                    </div>
                    <span>Add new diet program</span>
                </div>
                <div className="manage-food-wrapper" onClick={()=>{navigate('/ManageFoodTable')}}>
                    <div className="manage-food-button">
                        <Link className='nav-button' to="/ManageFoodTable" />
                    </div>
                    <span>Manage Food Table</span>
                </div>
                <div className="view-programs-wrapper" onClick={()=>{navigate('/ViewExistingPrograms')}}>
                    <div className="view-programs-button">
                        <Link className='nav-button' to="/ViewExistingPrograms" />
                    </div>
                    <span>View Existing Programs</span>
                </div>
            </div>
        </div>
    );
};

export default Main;