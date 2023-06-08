import FormRegister from '@components/FormRegister';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import moment from 'moment';

export default function Remate({ remate }) {
  const { title, cover, place, date, body, flyer, document, videos } = remate;
  console.log(document);
  return (
    <section className="remate">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-xl-5 mb-5 mb-sm-0">
            <div className="remate-info">
              <h1 className="title mb-3">{title}</h1>
              <img src={cover?.fields.file.url} alt="" className="img-fluid image" />

              <h4 className="date text-uppercase">{moment(date).format('dddd D MMMM')}</h4>
              <p className="place text-uppercase">
                <i className="fa-solid fa-fw fa-location-dot"></i>
                {place}
              </p>

              {body ? <div className="body">{documentToReactComponents(body)}</div> : ''}

              {videos ? (
                <>
                  <a className="btn btn-primary" target="_blank" rel="noopener noreferrer" href={videos}>
                    Ver Videos
                  </a>
                </>
              ) : (
                'no hay videos'
              )}

              {videos ? (
                <>
                  <a className="btn btn-primary" target="_blank" rel="noopener noreferrer" href={videos}>
                    Ver Videos
                  </a>
                </>
              ) : (
                'no hay documentos'
              )}
            </div>
          </div>
          <div className="d-none d-xl-block col-sm-1"></div>
          <div className="col-md-6 col-xl-4">
            <FormRegister remate={remate} />
            <img src={flyer?.fields.file.url} alt="" className="img-fluid mb-3 image" />
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
  const res = await client.getEntry(id);

  return {
    props: {
      remate: res.fields,
    },
  };
}
