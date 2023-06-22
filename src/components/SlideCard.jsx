import Link from 'next/link';
import { Button } from 'react-bootstrap';
import moment from 'moment';

export default function SlideCard({ remate }) {
  const { id } = remate.sys;
  const { title, place, slug, cover, date } = remate.fields;
  //console.log(event.toLocaleDateString('de-DE', options));
  return (
    <div className="slide-item">
      <Link href={`/remates/${id}/${slug}`}>
        <Button variant="secondary" className="slide-image">
          {/* eslint-disable-next-line */}
          <img src={cover.fields.file.url} alt={title} />
        </Button>
      </Link>
      <div className="slide-text">
        <h5 className="mb-0">{title}</h5>
        <p className=" text-uppercase">{moment(date).format('dddd D MMMM')}</p>
        <p>{place}</p>
      </div>
    </div>
  );
}
