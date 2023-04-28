import React from 'react';
import Slides from './Slides';
import Link from 'next/link';

export default function Hero({ remates }) {
  console.log(remates.length);
  return (
    <div className="hero">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-5 col-lg-6 col-xl-6">
            <div className="hero-content">
              <h1>Lorem ipsum dolor sit amet</h1>
              <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, dignissimos?</h4>
              <Link href="/nosotros">
                <p className="btn btn-outline-light">Más información</p>
              </Link>
            </div>
          </div>
          <div className="col-md-7 col-lg-6 col-xl-5">
            <div className={remates.length != 0 ? 'hero-remates' : 'd-none'}>
              <Slides remates={remates} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
