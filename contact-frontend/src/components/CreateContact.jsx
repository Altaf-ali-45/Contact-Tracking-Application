import { useState } from "react";
import api from "../api/axios";

export default function CreateContact({ onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    address: "",
    status: "ACTIVE",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/contacts", form);
    onCreated(res.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Contact</h2>

        <form className="space-y-3" onSubmit={submit}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
