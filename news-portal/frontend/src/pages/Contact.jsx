import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    
    // Auto hide success message after 5 seconds
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans py-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest uppercase bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full mb-3 border border-indigo-100">
            ✉️ Get In Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
            We'd Love to Hear From You
          </h1>
          <p className="text-slate-500 max-w-md mx-auto text-base md:text-lg font-light">
            Have a question, feedback, or a news tip? Drop us a message and our team will reply shortly.
          </p>
        </div>

        {/* Main Content Layout (Form + Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Form Card */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/70 p-8 md:p-10 relative overflow-hidden">
            
            {/* Success Alert Banner */}
            {sent && (
              <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 animate-fadeIn">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">✓</span>
                <div>
                  <p className="font-semibold text-sm">Message sent successfully!</p>
                  <p className="text-xs text-emerald-600 font-light">Thank you, we will get back to you soon.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200/80 px-4 py-3.5 rounded-xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all duration-200"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200/80 px-4 py-3.5 rounded-xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Message</label>
                <textarea
                  placeholder="Type your message here..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200/80 px-4 py-3.5 rounded-xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all duration-200 resize-none"
                  rows={6}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto md:self-end bg-slate-950 text-white px-8 py-4 rounded-xl font-medium shadow-lg shadow-slate-950/10 hover:bg-indigo-600 hover:shadow-indigo-600/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Send Message →
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-900/10 self-stretch flex flex-col justify-between relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <h3 className="text-xl font-bold mb-6 tracking-tight">Contact Information</h3>
              
              <div className="flex flex-col gap-6">
                {/* Info Item 1 */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-sm">📍</div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-0.5">Office</h4>
                    <p className="text-sm text-slate-300 font-light">123 Media Street, News District, NY 10001</p>
                  </div>
                </div>

                {/* Info Item 2 */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-sm">📧</div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-0.5">Email</h4>
                    <p className="text-sm text-slate-300 font-light hover:text-white transition-colors">support@newsportal.com</p>
                  </div>
                </div>

                {/* Info Item 3 */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-sm">📞</div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-0.5">Phone</h4>
                    <p className="text-sm text-slate-300 font-light">+1 (555) 019-2834</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social handles placeholder or short footer text */}
            <div className="pt-8 border-t border-white/10 mt-8">
              <p className="text-xs text-indigo-200/60 font-light leading-relaxed">
                Our support team typically responds within 24 business hours.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;