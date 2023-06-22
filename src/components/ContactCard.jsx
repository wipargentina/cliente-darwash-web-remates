import React from 'react';

export default function ContactCard({ contact }) {
  const { avatar, title, email, phone } = contact.fields;
  return (
    <div className="card mb-3">
      {/* eslint-disable-next-line */}
      <img src={avatar.fields.file.url} alt="" className="card-img-top" />
      <div className="card-body">
        <h4>{title}</h4>
        <p className="card-text mb-0">{email}</p>
        <p className="card-text">{phone}</p>
        <a href={`https://wa.me/${phone}`} target="_blank" className="btn btn-success text-white" rel="noopener noreferrer">
          <i class="fa-brands fa-whatsapp"></i> Contactar
        </a>
      </div>
    </div>
  );
}
