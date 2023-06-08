import Image from 'next/image';
import Logo from '@assets/logo-white.svg';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="brand">
          <Image src={Logo} alt="" width={100} height={38} />
          <div>
            Consignataria de Hacienda <br />
            Washington, Córdoba.
          </div>
        </div>
        <div className="links">
          <a target="_blank" rel="noopener noreferrer" href="mailto: darwashsa@gmail.com">
            <i className="fa-regular fa-fw fa-envelope"></i> darwashsa@gmail.com
          </a>
          <br />
          <a target="_blank" rel="noopener noreferrer" href="https://wa.me/+5493584127552">
            <i className="fa-brands fa-fw fa-whatsapp"></i> +54 9 358 4127 552 <br />
          </a>{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/darwash.sa/">
            {' '}
            <i className="fa-brands fa-fw fa-instagram"></i> @darwash.sa
          </a>
        </div>
      </div>
    </footer>
  );
}
