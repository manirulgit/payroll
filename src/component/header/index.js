import { Container, Nav, Navbar } from 'react-bootstrap';
import homeIcon from '../../assets/home-icon.png';
import employeeIcon from '../../assets/employee-icon.png';
import ticketIcon from '../../assets/ticket-icon.png';
import seetingIcon from '../../assets/seeting-icon.png';
import customerIcon from '../../assets/customer-icon.png';
import productIcon from '../../assets/product-icon.png';
import attandanceIcon from '../../assets/attandence-icon.png';
import locationIcon from '../../assets/location-icon.png';
import videoIcon from '../../assets/video-icon.png';
import payrollIcon from '../../assets/payroll-icon.png';
import expenseIcon from '../../assets/expense-icon.png';
import logoutIcon from '../../assets/logout.png';


import logo from '../../assets/logo.png';
import './Header.css';

function Header() {
    return (
        <header>
            <div className='container-fluid w-100 h-100'>
                <div className='row'>
                    <Navbar expand="lg">
                        <Container>
                            <div class='row'>
                                <div className='col-md-2'>
                                    <img src={logo} className='logo'></img>
                                </div>
                                <div className='col-md-8 lign-items-center'>
                                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className='me-auto'>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={homeIcon} className='imgclass'></img><div className='menu-text'>Home</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='employee'><img src={employeeIcon} className='imgclass'></img><div className='menu-text'>Employee</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='addTicket'><img src={ticketIcon} className='imgclass'></img><div className='menu-text'>Ticket</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={customerIcon} className='imgclass'></img><div className='menu-text'>Customer</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={productIcon} className='imgclass'></img><div className='menu-text'>Product</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={attandanceIcon} className='imgclass'></img><div className='menu-text'>Attandence</div>
                                                </Nav.Link>
                                            </div>
                                            
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={locationIcon} className='imgclass'></img><div className='menu-text'>Location</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={videoIcon} className='imgclass'></img><div className='menu-text'>Video</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={payrollIcon} className='imgclass'></img><div className='menu-text'>Payroll</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={expenseIcon} className='imgclass'></img><div className='menu-text'>Expense</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={seetingIcon} className='imgclass'></img><div className='menu-text'>Seeting</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={seetingIcon} className='imgclass'></img><div className='menu-text'>Seeting</div>
                                                </Nav.Link>
                                            </div>

                                            <div className='menubox'>
                                                <Nav.Link href='logout'><img src={logoutIcon} className='imgclass'></img><div className='menu-text'>Logout</div>
                                                </Nav.Link>
                                            </div>


                                        </Nav>
                                    </Navbar.Collapse>
                                </div>
                            </div>
                        </Container>
                    </Navbar>

                </div>
            </div>
        </header >

    );
}

export default Header;