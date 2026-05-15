import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">📬 Contact Us</h1>
      {sent && (
        <p className="text-green-600 text-center font-semibold mb-6">
          ✅ Message sent successfully!
        </p>
      )}
      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            required
          />
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;