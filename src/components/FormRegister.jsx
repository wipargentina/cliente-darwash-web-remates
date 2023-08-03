import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'hooks/useForm';
import leads from 'services/leads';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import moment from 'moment';

const makeRandomId = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default function FormRegister({ remate }) {
  const router = useRouter();
  const { title, date, document, videos } = remate;

  const [download, setDownload] = useState(false);
  const { query } = router;

  const initialValues = {
    id: query.id,
    trackId: makeRandomId(16),
    fname: '',
    lname: '',
    email: '',
    phone: '',
    remate: title,
    payload: 'create',
    date,
  };

  const [values, handleInputChange, reset] = useForm(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [goal, setGoal] = useState(false);

  const { fname, lname, email, phone } = values;

  const handelSubmit = (e) => {
    e.preventDefault();

    //console.log('send');

    //console.log(values);

    if (fname == '' || lname == '' || email == '' || phone == '') {
      setError(true);
    } else {
      setLoading(true);

      if (router.query.utm_campaign) {
        values.utm_campaign = router.query.utm_campaign;
      }
      if (router.query.utm_medium) {
        values.utm_medium = router.query.utm_medium;
      }
      if (router.query.utm_source) {
        values.utm_source = router.query.utm_source;
      }

      leads(values).then((res) => {
        if (res.status === 200) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'custom.gtm.submittedForm',
            category: 'goals',
          });
          setGoal(true);
          setDownload(true);
          reset();
        } else {
          setError(true);
        }
        reset();
        setLoading(false);
      });

      //console.log(values);
      // console.log(goal);
    }
  };

  return (
    <div className="form-register">
      <Form onSubmit={handelSubmit}>
        {document || videos ? (
          <>
            <h4>Accede al contenido</h4>
            <p>
              Completá el formulario y accede a los contenido del remate:{' '}
              <b>
                {title} (<span className="">{moment(date).format('dddd D MMMM')}</span>)
              </b>
            </p>
            {download ? (
              <>
                {document ? (
                  <a href={document} className="btn btn-warning text-uppercase text-white mb-4 me-2">
                    Descargar Catalogo <i className="fa-solid fa-fw fa-file-pdf"></i>
                  </a>
                ) : (
                  ''
                )}
                {videos ? (
                  <a href={videos} className="btn btn-warning text-uppercase text-white mb-4 me-2">
                    Ver Videos <i className="fa-solid fa-fw fa-tv"></i>
                  </a>
                ) : (
                  ''
                )}
              </>
            ) : (
              ''
            )}
          </>
        ) : (
          <>
            <h4>Solicitá más información</h4>
            <p>
              Completá el formulario para recibir más información sobre el remate:{' '}
              <b>
                {title} (<span className="">{moment(date).format('dddd D MMMM')}</span>)
              </b>
            </p>
          </>
        )}
        {goal ? (
          <>
            <div className="alert alert-success">Su formulario fue enviado exitosamente</div>
            <button className="btn btn-outline-primary" onClick={() => setGoal(false)}>
              volver
            </button>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="fname">
                    Nombre <small className="text-danger">*</small>
                  </label>
                  <input type="text" name="fname" value={fname} onChange={handleInputChange} className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="lname">
                    Apellido <small className="text-danger">*</small>
                  </label>
                  <input type="text" name="lname" value={lname} onChange={handleInputChange} className="form-control" />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                Email <small className="text-danger">*</small>
              </label>
              <input type="text" name="email" value={email} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="phone">
                Telefono <small className="text-danger">*</small>
              </label>
              <input type="text" name="phone" value={phone} onChange={handleInputChange} className="form-control" />
            </div>
            <Button variant="primary" type="submit">
              {loading ? 'Enviando...' : 'Enviar'}
            </Button>
            {error ? <div className="alert alert-danger mt-3">Debe completar todos los campos</div> : ''}
          </>
        )}
      </Form>
    </div>
  );
}
