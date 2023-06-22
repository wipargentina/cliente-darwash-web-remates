import Link from 'next/link';
import SlideCard from './SlideCard';

export default function Slides({ remates }) {
  // console.log(remates);
  const rematesFilter = remates.slice(0, 2);
  return (
    <div className="slide">
      <div className="slide-content">
        <h3>Próximos Remates</h3>
        {rematesFilter.map((remate) => (
          <SlideCard key={remate.sys.id} remate={remate} />
        ))}
        {remates.length > 2 ? (
          <Link href="/remates">
            <a className="btn btn-sm btn-outline-light">Ver más</a>
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
