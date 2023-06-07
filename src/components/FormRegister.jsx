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
  // console.log(router);
  const { query } = router;
  const { title, date } = remate;

  //console.log(query.id);

  const initialValues = {
    id: query.id,
    trackId: makeRandomId(16),
    fname: '',
    lname: '',
    email: '',
    phone: '',
    remate: title,
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
        // console.log(res);
        if (res.status === 200) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'custom.gtm.submittedForm',
            category: 'goals',
          });
          setGoal(true);
          reset();
          //router.push(`/remates/${query.id}/${query.slug}/gracias`);
        } else {
          setError(true);
        }
        reset();
        setLoading(false);
      });

      //console.log(values);
      console.log(goal);
    }
  };
  return (
    <div className="form-register">
      {goal ? (
        <>
          <div className="alert alert-success">Su formulario fue enviado exitosamente</div>
          <button className="btn btn-outline-primary" onClick={() => setGoal(false)}>
            volver
          </button>
        </>
      ) : (
        <Form onSubmit={handelSubmit}>
          <h4>Solitá más información</h4>
          <p>
            Remate: {title} (<span className="">{moment(date).format('dddd D MMMM')}</span>)
          </p>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="fname">Nombre</label>
                <input type="text" name="fname" value={fname} onChange={handleInputChange} className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="lname">Apellido</label>
                <input type="text" name="lname" value={lname} onChange={handleInputChange} className="form-control" />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={email} onChange={handleInputChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Telefono</label>
            <input type="text" name="phone" value={phone} onChange={handleInputChange} className="form-control" />
          </div>
          <Button variant="primary" type="submit">
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
          {error ? <div className="alert alert-danger mt-3">Debe completar todos los campos</div> : ''}
        </Form>
      )}
    </div>
  );
}
