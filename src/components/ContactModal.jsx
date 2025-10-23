import React, { useEffect, useState } from "react";

const emptyForm = { name: "", email: "", phone: "", tag: "" };

const ContactModal = ({ isOpen, onClose, onSave, contactToEdit }) => {
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        if (isOpen) {
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="w-full max-w-md mx-4">
                <div className="bg-gradient-to-br from-[#0b1220] to-[#0f1724] text-white rounded-lg shadow-xl ring-1 ring-gray-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h2 className="text-lg font-semibold text-indigo-300">
                            {contactToEdit ? "Edit Contact" : "Add Contact"}
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                            {contactToEdit ? "Update the details and save." : "Add a new contact to your list."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Full name"
                                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Email</label>
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Phone</label>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+1 234 567 890"
                                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Tag</label>
                            <input
                                name="tag"
                                value={form.tag}
                                onChange={handleChange}
                                placeholder="e.g. Frequent, Recent"
                                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-2">
                            <button
                                type="button"
                                onClick={() => { onClose(); setForm(emptyForm); }}
                                className="px-4 py-2 rounded bg-gray-700 text-gray-200 hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:opacity-95"
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
