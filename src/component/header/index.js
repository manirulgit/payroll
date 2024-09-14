import { Container, Nav, Navbar } from 'react-bootstrap';
import homeIcon from '../../assets/home-icon.png';
import logo from '../../assets/logo.png';
import './Header.css';

function Header() {
    return (
        <header>
            <div className='container-fluid w-100 h-100'>
                <div className='row d-flex align-items-center'>
                    <Navbar expand="lg">
                        <Container>
                            <div class='row topmanubar'>
                                <div className='col-md-2 align-items-center'>
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
                                                <Nav.Link href='dashboard'><img src={homeIcon} className='imgclass'></img><div className='menu-text'>Home</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={homeIcon} className='imgclass'></img><div className='menu-text'>Home</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={homeIcon} className='imgclass'></img><div className='menu-text'>Home</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={homeIcon} className='imgclass'></img><div className='menu-text'>Home</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={homeIcon} className='imgclass'></img><div className='menu-text'>Home</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={homeIcon} className='imgclass'></img><div className='menu-text'>Home</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={homeIcon} className='imgclass'></img><div className='menu-text'>Home</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={homeIcon} className='imgclass'></img><div className='menu-text'>Home</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={homeIcon} className='imgclass'></img><div className='menu-text'>Home</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={homeIcon} className='imgclass'></img><div className='menu-text'>Home</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'><img src={homeIcon} className='imgclass'></img><div className='menu-text'>Home</div>
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