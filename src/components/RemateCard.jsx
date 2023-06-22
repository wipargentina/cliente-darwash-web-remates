import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import moment from 'moment';

function RemateCard({ remate }) {
  //console.log(remate);
  const { id } = remate.sys;
  const { title, date, place, slug, cover } = remate.fields;

  console.log(remate.fields);
  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={cover.fields.file.url} />
      <Card.Body>
        <h4 className="card-title mb-0">{title}</h4>
        <div className="card-text text-uppercase">{moment(date).format('dddd D MMMM')}</div>
        <Card.Text>{place}</Card.Text>
        <Link href={`/remates/${id}/${slug}`}>
          <Button variant="primary">Más Información</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default RemateCard;
