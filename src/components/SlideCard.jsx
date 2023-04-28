import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function SlideCard({ remate }) {
  const { id } = remate.sys;
  const { title, place, slug, cover, date } = remate.fields;
  const event = new Date(date);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  //console.log(event.toLocaleDateString('de-DE', options));
  return (
    <div className="slide-item">
      <Link href={`/remates/${id}/${slug}`}>
        <Button variant="secondary" className="slide-image">
          <img src={cover.fields.file.url} alt={title} />
        </Button>
      </Link>
      <div className="slide-text">
        <h5>{title}</h5>
        <p>{date}</p>
        <p>{place}</p>
      </div>
    </div>
  );
}
