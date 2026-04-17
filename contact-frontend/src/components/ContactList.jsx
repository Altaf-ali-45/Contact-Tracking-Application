import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContacts, deleteContact } from "../services/contactService";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const loadContacts = async () => {
    const res = await getContacts();
    setContacts(res.data.content);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleDelete = async (id) => {
    await deleteContact(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2>Contacts</h2>

      <button onClick={() => navigate("/contacts/new")}>Add Contact</button>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <button onClick={() => navigate(`/contacts/edit/${c.id}`)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
