import RemateCard from '@components/RemateCard';
import { createClient } from 'contentful';

export default function Remates({ remates }) {
  console.log(remates);
  return (
    <>
      <div className="container">
        <h1>Remates</h1>
        {remates?.map((remate) => (
          <RemateCard key={remate.sys.id} remate={remate} />
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: 'remates' });

  return {
    props: {
      remates: res.items,
    },
  };
}
