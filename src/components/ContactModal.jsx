import React, { useEffect, useState } from "react";

const emptyForm = { name: "", email: "", phone: "", tag: "" };

const ContactModal = ({ isOpen, onClose, onSave, contactToEdit }) => {
    const [form, setForm] = useState(emptyForm);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            if (contactToEdit) {
                setForm({
                    name: contactToEdit.name || "",
                    email: contactToEdit.email || "",
                    phone: contactToEdit.phone || "",
                    tag: contactToEdit.tag || "",
                });
            } else {
                setForm(emptyForm);
            }
        } else {
            // hide animation
            setVisible(false);
        }
    }, [contactToEdit, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center`}>
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => { setVisible(false); setTimeout(() => onClose(), 220); }}
            />

            <div
                className={`relative w-full max-w-lg mx-4 transform transition-all duration-300 ${
                    visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"
                }`}
            >
                <div className="bg-gradient-to-br from-[#07142a] to-[#0b2746] text-white rounded-2xl shadow-2xl overflow-hidden border border-white/5">
                    <div className="px-6 py-4 flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-indigo-300">
                                {contactToEdit ? "Edit Contact" : "Add Contact"}
                            </h2>
                            <p className="text-sm text-gray-300 mt-1">
                                {contactToEdit ? "Update the details below." : "Add a new contact to your list."}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => { setVisible(false); setTimeout(() => onClose(), 220); }}
                                className="text-gray-300 hover:text-white p-2 rounded-md"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-6 grid gap-4">
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Full name"
                                className="w-full p-3 bg-white/5 border border-white/6 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">Email</label>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="email@example.com"
                                    className="w-full p-3 bg-white/5 border border-white/6 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    type="email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-1">Phone</label>
                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+1 234 567 890"
                                    className="w-full p-3 bg-white/5 border border-white/6 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    type="tel"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Tag</label>
                            <input
                                name="tag"
                                value={form.tag}
                                onChange={handleChange}
                                placeholder="e.g. Frequent, Recent"
                                className="w-full p-3 bg-white/5 border border-white/6 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-2">
                            <button
                                type="button"
                                onClick={() => { setVisible(false); setTimeout(() => { onClose(); setForm(emptyForm); }, 220); }}
                                className="px-4 py-2 rounded-lg bg-white/6 text-gray-200 hover:bg-white/10 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-400 text-white hover:opacity-95 transition"
                            >
                                {contactToEdit ? "Save" : "Add"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
