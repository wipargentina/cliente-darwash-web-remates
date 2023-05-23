import Hero from '@components/Hero';
import formatDate from '@utils/formatDate';
import { createClient } from 'contentful';

export default function Home({ remates }) {
  return (
    <>
      <Hero remates={remates} />
    </>
  );
}

export async function getServerSideProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const now = new Date();
  const formatNow = formatDate(now);
  console.log(formatNow);

  const res = await client.getEntries({
    content_type: 'remates',
    order: 'fields.date',
    limit: 2,
    'fields.date[gte]': formatNow,
  });

  return {
    props: {
      remates: res.items,
    },
  };
}
