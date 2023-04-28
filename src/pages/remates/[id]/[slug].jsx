import FormRegister from '@components/FormRegister';
import { createClient } from 'contentful';

export default function Remate({ remate }) {
  const { title, cover, place, date } = remate;
  //console.log(remate);
  return (
    <section className="remate">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 col-xl-5">
            <h1>{title}</h1>
            <h4>{date}</h4>
            <p>{place}</p>
            <img src={cover.fields.file.url} alt="" className="img-fluid" />
          </div>
          <div className="d-none d-xl-block col-sm-1"></div>
          <div className="col-6 col-xl-4">
            <FormRegister remate={remate} />
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const { id } = context.params;
  const res = await client.getEntry({ id });

  return {
    props: {
      remate: res.fields,
    },
  };
}
