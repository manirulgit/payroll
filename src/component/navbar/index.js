import { Container, Nav, Navbar } from 'react-bootstrap';
import "./Navbar.css";


function Nabvar() {
    const style ={color:"black",fontSize:1}
    return (
        <header>
            <div className='container-fluid '>
                <div className='row'>
                    <div className='menubar'>
                        <ui  className="nav nav-pills flex-coloumn">
                            <li className='nav-item'>
                                <span><a href='' className='nav-link-active' ><span className='menutext'></span>Payroll</a></span>
                            </li>
                            <li className='nav-item'>
                                <span><a href='' className='nav-link-active' ><span className='menutext'></span>Payroll</a></span>
                            </li>
                        </ui>
                    </div>

                </div>
            </div>
        </header >

    );
}

export default Nabvar;