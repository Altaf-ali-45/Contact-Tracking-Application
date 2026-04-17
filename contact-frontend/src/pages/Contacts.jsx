import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import CreateContact from "../components/CreateContact";
import { deleteContact } from "../services/contactService";

export default function Contacts() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const loadContacts = async () => {
    setLoading(true);
    const res = await api.get("/contacts?page=0&size=10");
    setContacts(res.data.content);
    setLoading(false);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleDelete = async (id) => {
    await deleteContact(id);
    loadContacts();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Contacts</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setShowCreate(true)}
            className="bg-blue-600 px-4 py-2 rounded-lg"
          >
            + Add Contact
          </button>

          <button onClick={logout} className="text-red-400 hover:underline">
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {loading && <p>Loading...</p>}

      {!loading && contacts.length === 0 && (
        <p className="text-slate-400">
          No contacts yet. Create your first one.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contacts.map((c) => (
          <div key={c.id} className="bg-slate-800 p-4 rounded-lg">
            <h2 className="font-semibold">{c.name}</h2>
            <p className="text-sm text-slate-400">{c.email}</p>
            <p className="text-sm">{c.phone}</p>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-3">
              <button
                onClick={() => navigate(`/contacts/edit/${c.id}`)}
                className="text-blue-400 text-sm hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(c.id)}
                className="text-red-400 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE MODAL */}
      {showCreate && (
        <CreateContact
          onClose={() => setShowCreate(false)}
          onCreated={(c) => setContacts([c, ...contacts])}
        />
      )}
    </div>
  );
}
