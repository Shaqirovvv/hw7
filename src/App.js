import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, removeContact, editContact } from './redux/contactsSlice';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleAddContact = () => {
    if (name && phone) {
      dispatch(addContact({ id: uuidv4(), name, phone }));
      setName('');
      setPhone('');
    }
  };

  const handleDeleteContact = (id) => {
    dispatch(removeContact(id));
  };

  const handleEditContact = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setCurrentId(contact.id);
    setEditMode(true);
  };

  const handleUpdateContact = () => {
    dispatch(editContact({ id: currentId, name, phone }));
    setName('');
    setPhone('');
    setEditMode(false);
    setCurrentId(null);
  };

  return (
    <div>
      <h1>Контакт менеджер</h1>
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Номер"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {editMode ? (
        <button onClick={handleUpdateContact}>Изменить контакт</button>
      ) : (
        <button onClick={handleAddContact}>Добавить</button>
      )}
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.phone}
            <button onClick={() => handleEditContact(contact)}>Edit</button>
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
