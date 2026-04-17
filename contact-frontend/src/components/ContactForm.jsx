import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createContact,
  getContactById,
  updateContact,
} from "../services/contactService";

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("UPDATING CONTACT:", form);

  if (isEdit) {
    await updateContact(id, form);
  } else {
    await createContact(form);
  }

  navigate("/contacts");
};

export default function ContactForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEdit);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    address: "",
    status: "ACTIVE",
  });

  // 🔥 LOAD CONTACT FOR EDIT
  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      try {
        const res = await getContactById(id);
        const c = res.data;

        // ✅ EXPLICIT MAPPING (THIS IS THE FIX)
        setForm({
          name: c.name ?? "",
          email: c.email ?? "",
          phone: c.phone ?? "",
          title: c.title ?? "",
          address: c.address ?? "",
          status: c.status ?? "ACTIVE",
        });
      } catch (err) {
        console.error("Failed to load contact", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateContact(id, form);
      } else {
        await createContact(form);
      }

      navigate("/contacts");
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  if (loading) {
    return <p className="text-center text-slate-400">Loading contact...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-800 p-6 rounded-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {isEdit ? "Edit Contact" : "Add Contact"}
        </h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 rounded bg-slate-700"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 rounded bg-slate-700"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 rounded bg-slate-700"
        />

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 rounded bg-slate-700"
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 rounded bg-slate-700"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>

        <button className="w-full bg-blue-600 py-2 rounded font-semibold">
          {isEdit ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
}
