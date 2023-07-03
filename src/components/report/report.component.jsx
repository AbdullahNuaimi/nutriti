import './report.css';
import { weekDAys } from '../../data/weekDays';

const Report = (props) =>{
    const current = new Date();
    const day = weekDAys[((current.getDay()+1)%6)];
    const date = `${day}\t${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    return(
        <div className={props.hideReport? 'hidden':"report-container"} id={props.id}>
        <div className="report-header">
            <p>{date}</p>
            <div className="person-info-wrapper">
                <span>Name: &nbsp;{props.patients[props.index]?.name}.&nbsp;</span>
                <span>City: &nbsp;{props.patients[props.index]?.city}.&nbsp;</span>
                <span>Phone:&nbsp; {props.patients[props.index]?.phone}.&nbsp;</span>
                <span>Email:&nbsp; {props.patients[props.index]?.email}.&nbsp;</span>
            </div>
        </div>
        <div className="report-body">
            <table>
                <tbody>
                    {props.patients[props.index]?.program.map((row,rIndex)=>{
                        return(
                            <tr key={rIndex} className='report-table-row'>
                                <td key={rIndex + Math.random()} className='week-days-cell'>
                                    {weekDAys[rIndex]}
                                </td>
                                {row.map((cell,cIndex)=>{
                                    return(
                                        <td key={cIndex + Math.random()}>
                                        {cell.name || ' '}&nbsp;{cell.amount || ' '}gm
                                    </td>
                                );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <p>Total Calories Allowed per week:&nbsp;{props.patients[props.index]?.calories}kCal</p>
        </div>
        <hr />
        <div className="clinic-info-wrapper">
            <span className='clinic-name'>NEO ANTHROPOS clinics</span>
            {/* <br /> */}
            <span className='clinic-adress'>Our Adress: Hebron, Ein sara st.</span>
            <span className='clinic-phone'>Customer service: 2752345</span>
            <span className='clinic-email'>Email: NEO@Anthropos.com</span>
        </div>
    </div>
    );
}


export default Report