import SlideCard from './SlideCard';

export default function Slides({ remates }) {
  // console.log(remates);
  return (
    <div className="slide">
      <div className="slide-content">
        <h3>Próximos Remates</h3>
        {remates.map((remate) => (
          <SlideCard key={remate.sys.id} remate={remate} />
        ))}
      </div>
    </div>
  );
}
