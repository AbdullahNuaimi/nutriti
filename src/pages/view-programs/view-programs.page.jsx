import './view-programs.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Report from '../../components/report/report.component';
import JsPDF from 'jspdf';
import { Input } from 'antd';
import { VscFilePdf } from 'react-icons/vsc';
import { TiDelete } from 'react-icons/ti';
const ViewPrograms = () =>{
    const navigate = useNavigate();
    const [patients,setPatients] = useState(JSON.parse(localStorage.getItem('patients')) || []);
    const [prgIndex,setPrgIndex] = useState(0);
    const [hideReport,setHideReport] = useState(true);
    const [search,setSearch] = useState('');
    const [filterdList,setFilterdList] = useState(patients);
    useEffect(() => {
        if(JSON.parse(sessionStorage.getItem('user')) === null){
            navigate('/login', {replace: true});
        }
    });
    useEffect(()=>{
        const editedList = patients.filter((value) =>{
            if(search.length){
                return value.name.toLowerCase().includes(search.toLowerCase());
            }else{
                return true;
            }
        });
        setFilterdList(editedList);
        console.log(editedList);
    },[search,patients]);
    useEffect(()=>{
        localStorage.setItem('patients', JSON.stringify(patients));
    },[patients]);
    const removeProgram =(index) =>{
        let editedList = [...patients];
        console.log(editedList[index]);
        editedList.splice(index,1);
        setPatients(editedList);
        console.log(patients);
    };
    const handlePdf = (num) =>{
        setHideReport(false);
        setPrgIndex(num);
        const report = new JsPDF('landscape','pt','a4');
        setTimeout(()=>{
            report.html(document.querySelector('#report')).then(()=>{
            report.save(`${patients[num].name}.pdf`);
            setHideReport(true);
        });
    },'1000')
    }
    return (
    <> 
        <h1 className={patients.length? 'hidden' : 'no-programs-heading'}>No items were found in this page</h1>
        <div className={patients.length? "view-programs-container" :'hidden'}>
            <div className="search-input-wrapper">
                <Input className="search-name-input" id='search'
                onChange={(e) =>{setSearch(e.target.value)}} value={search}
                placeholder='🔎 Search By Name'
                />
            </div>
            <table className="programs-table">
               <thead className='programs-table-header'>
                    <tr className='table-header-row'>
                        <td>Patient</td>
                        <td>Total calories</td>
                        <td>Actions</td>
                    </tr>
                </thead> 
                <tbody className="table-body">
                    {filterdList.map((item,index)=>{
                        return(
                        <tr key={index + Math.random()} className='table-body-row'>
                            <td key={index + Math.random()}>{item.name}</td>
                            <td key={index + Math.random()} className='calories-cell'>
                                {item.calories.toFixed(2)}&nbsp; kCal
                            </td>
                            <td key={index + Math.random()} className='control-buttons-cell'>
                                <button key={index + Math.random()} className="download-pdf-button"
                                onClick={()=>{handlePdf(index)}}><VscFilePdf/></button>
                                <button key={index + Math.random()} className="delete-button"
                                onClick={()=>{removeProgram(index)}}><TiDelete/></button>
                            </td>
                        </tr>     
                    );})}
                </tbody>
            </table>
        </div>
        <div className="report-wrapper">
            <Report patients={patients} id="report" index = {prgIndex} hideReport={hideReport}></Report>
        </div>
    </>);
};

export default ViewPrograms;