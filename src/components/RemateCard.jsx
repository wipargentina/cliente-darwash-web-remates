import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function RemateCard({ remate }) {
  //console.log(remate);
  const { id } = remate.sys;
  const { title, place, slug, cover } = remate.fields;
  return (
    <Card>
      <Card.Img variant="top" src={cover.fields.file.url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{place}</Card.Text>
        <Link href={`/remates/${id}/${slug}`}>
          <Button variant="primary">Mas Información</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default RemateCard;
