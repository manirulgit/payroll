import { Container, Nav, Navbar } from 'react-bootstrap';
import { AiOutlinePayCircle } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

import "./Navbar.css";

function Nabvar() {
    const style = { color: "black", fontSize: 1 }
    return (
        <div class="wrapper">
            <div className='container-fluid '>
                <div className='row'>
                    <div className='menubar'>
                        <ui className="nav nav-pills flex-coloumn">
                            <li className='nav-item'>
                                <span><CiEdit className='iconstyle' /><a href='dashboard' className='nav-link-active'><span className='menutext glyphicon glyphicon-user'>Payroll</span></a></span>
                            </li> &nbsp;&nbsp;
                            <li className='nav-item'>
                                <span><CiEdit className='iconstyle' /><a href='dashboard' className='nav-link-active'><span className='menutext glyphicon glyphicon-user'>Payroll</span></a></span>
                            </li> &nbsp;&nbsp;
                        
                        </ui>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nabvar;