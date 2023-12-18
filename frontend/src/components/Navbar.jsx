import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar({ isLogger, setisLogger, userName }) {

  const handleLogout = () => {
    setisLogger(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className='justify-content-center'>
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Si el usuario quiere salir de su cuenta le permitimos mediante logout manejando el state de islogger */}
          <Nav className="me-auto">
            {isLogger && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
          </Nav>
          {/* Si el usuario esta logueado traemos userName de app.jsx y lo mostramos*/}
          {isLogger && (
            <div>
              <p className="mb-0">Bienvenido {userName}!</p>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
