import ContactList from '@components/ContactList';
import { createClient } from 'contentful';

export default function Contacto({ contacts }) {
  console.log(contacts);
  return (
    <section className="contact">
      <div className="container">
        <h1>Contacto</h1>
        <ContactList contacts={contacts} />
      </div>
    </section>
  );
}

export async function getServerSideProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({
    content_type: 'contactos',
    order: 'fields.position',
  });

  console.log(res.items);

  return {
    props: {
      contacts: res.items,
    },
  };
}
