import RemateCard from '@components/RemateCard';
import formatDate from '@utils/formatDate';
import { createClient } from 'contentful';

export default function Remates({ remates }) {
  return (
    <section>
      <div className="container">
        <h1>Remates</h1>
        <div className="row">
          {remates?.map((remate) => (
            <div key={remate.sys.id} className="col-md-3">
              <RemateCard remate={remate} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const now = new Date();
  const formatNow = formatDate(now);

  const res = await client.getEntries({
    content_type: 'remates',
    'fields.date[gte]': formatNow,
  });

  return {
    props: {
      remates: res.items,
    },
  };
}
