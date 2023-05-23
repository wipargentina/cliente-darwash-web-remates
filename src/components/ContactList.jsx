import React from 'react';
import ContactCard from './ContactCard';
// const contacts = [
//   {
//     id: 1,
//     title: 'German Sayago',
//     email: 'german.sayago@gmail.com',
//     phone: '+54 9 358 6018 552',
//     avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
//   },
//   {
//     id: 2,
//     title: 'Nicolas Llamosas',
//     email: '',
//     phone: '+54 9 358 6018 552',
//     avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
//   },
// ];

export default function ContactList({ contacts }) {
  return (
    <div className="row">
      {contacts.map((contact) => (
        <div key={contact.sys.id} className="col-md-3">
          <ContactCard contact={contact} />
        </div>
      ))}
    </div>
  );
}
