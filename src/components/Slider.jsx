import Carousel from 'react-bootstrap/Carousel';
import Slides from './Slides';
import Link from 'next/link';

const slides = [
  { image: '/images/background-1.png' },
  { image: '/images/background-2.png' },
  { image: '/images/background-3.png' },
  { image: '/images/background-4.png' },
  { image: '/images/background-5.png' },
];

export default function Slider({ remates }) {
  return (
    <div className="slider">
      <Carousel fade indicators={false} controls={false}>
        {slides.map((slide) => (
          <Carousel.Item key={slide.image} style={{ backgroundImage: `url(${slide.image})` }}></Carousel.Item>
        ))}
      </Carousel>
      <div className="content">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-5 col-lg-6 col-xl-6">
              <div className="content-data">
                <h1>Líderes en el mercado ganadero</h1>
                <h4>Trabajamos para lograr buenos negocios, sólidas relaciones comerciales y amistades duraderas</h4>
                <p>Remates Ferias - Consignaciones - Operaciones Particulares - Remates Televisados - Remates de Reproductores</p>
                <Link href="/nosotros">
                  <p className="btn btn-outline-light">Más información</p>
                </Link>
              </div>
            </div>
            <div className="col-md-7 col-lg-6 col-xl-5">
              <div className={remates.length != 0 ? 'content-remates' : 'd-none'}>
                <Slides remates={remates} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
