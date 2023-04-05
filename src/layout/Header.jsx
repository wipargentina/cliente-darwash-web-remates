import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>Darwash</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" passHref>
              <Nav.Link>Inicio</Nav.Link>
            </Link>
            <Link href="/remates" passHref>
              <Nav.Link>Remates</Nav.Link>
            </Link>
            <Link href="/nosotros" passHref>
              <Nav.Link>Nosotros</Nav.Link>
            </Link>
            <Link href="/contacto" passHref>
              <Nav.Link>Contacto</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
