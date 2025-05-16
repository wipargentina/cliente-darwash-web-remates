import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Logo from '@assets/logo-white.svg';
import Image from 'next/image';

function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="md" sticky="top">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>
            <Image src={Logo} alt="" width={160} height={60} />
          </Navbar.Brand>
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
            <a className="nav-link" href="https://www.instagram.com/darwash.sa/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a className="nav-link nav-session" href="https://darwash.clientes.physis.com.ar/phy2web/auth/usuario" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-lock"></i> Iniciar Sesion
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
