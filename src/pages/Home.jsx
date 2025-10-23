import { useState, useEffect } from "react";
import ContactCard from "../components/ContactCard";
import ContactModal from "../components/ContactModal";
import ContactViewModal from "../components/ContactViewModal";
import Tabs from "../components/Tabs";
import Toasts from "../components/Toasts";
import { initialContacts } from "../data";

const Home = () => {
  const [contacts, setContacts] = useState(() => {
    try {
      const stored = localStorage.getItem("contacts");
      return stored ? JSON.parse(stored) : initialContacts;
    } catch {
      return initialContacts;
    }
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [viewContact, setViewContact] = useState(null);
  const [activeTab, setActiveTab] = useState("All");

  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    } catch {}
  }, [contacts]);

  const addToast = (message, type = "success", ttl = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((s) => [...s, { id, message, type, ttl }]);
  };
  const removeToast = (id) => setToasts((s) => s.filter((t) => t.id !== id));

  const openAddModal = () => {
    setContactToEdit(null);
    setModalOpen(true);
  };
  const handleSave = (data) => {
    if (contactToEdit) {
      setContacts((prev) => prev.map((c) => (c.id === contactToEdit.id ? { ...c, ...data } : c)));
      addToast("Contact edited successfully", "success");
    } else {
      setContacts((prev) => [...prev, { id: Date.now(), ...data, favorite: false }]);
      addToast("Contact added successfully", "success");
    }
    setModalOpen(false);
    setContactToEdit(null);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this contact?")) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      addToast("Contact deleted successfully", "delete");
    }
  };

  const handleFavorite = (id) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)));
  };

  const applySearch = () => setAppliedSearch(searchQuery.trim());
  const clearSearch = () => {
    setSearchQuery("");
    setAppliedSearch("");
  };

  const filteredContacts = contacts.filter((c) => {
    const matchesTab =
      activeTab === "All" || (activeTab === "Favorite" && c.favorite) || c.tag.toLowerCase() === activeTab.toLowerCase();
    const q = appliedSearch.toLowerCase();
    const matchesSearch =
      appliedSearch === "" ||
      c.name.toLowerCase().includes(q) ||
      (c.email || "").toLowerCase().includes(q) ||
      (c.phone || "").toLowerCase().includes(q) ||
      (c.tag || "").toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  const hasAnyContacts = contacts.length > 0;
  const searchActive = appliedSearch !== "";

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-[#020617] via-[#07112a] to-[#071b2f] text-white">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
              Tria Neobank — Contacts
            </h1>
            <p className="text-sm text-gray-400 mt-1">Manage contacts with a modern responsive UI.</p>
          </div>

          {hasAnyContacts && (
            <div className="flex gap-3 items-center">
              <button onClick={openAddModal} className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow">
                + Add Contact
              </button>
            </div>
          )}
        </header>

        <div className="bg-white/3 border border-white/5 rounded-2xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
            <div className="flex gap-2 w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search contact..."
                className="flex-1 p-3 bg-white/5 border border-white/6 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") applySearch();
                }}
              />
              <button onClick={applySearch} className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md text-white">
                Enter
              </button>
              {appliedSearch && (
                <button onClick={clearSearch} className="px-3 py-2 bg-gray-700 rounded-md text-gray-200">
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* increased spacing below search area so tabs don't crowd it */}
          <div className="mb-6">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="mt-4 space-y-4">
            {!hasAnyContacts ? (
              <div className="py-12 border border-white/6 rounded-2xl bg-gradient-to-br from-[#071025] to-[#0b1320] text-center">
                <div className="text-gray-300 text-lg mb-2">No contacts available</div>
                <button onClick={openAddModal} className="mt-3 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
                  + Add contacts
                </button>
              </div>
            ) : searchActive && filteredContacts.length === 0 ? (
              <div className="py-8 border border-white/6 rounded-2xl bg-gradient-to-br from-[#071025] to-[#0b1320] text-center">
                <div className="text-gray-300 text-lg mb-2">No contact found</div>
                <button onClick={clearSearch} className="mt-3 px-4 py-2 rounded-md bg-gray-700">
                  Clear search
                </button>
              </div>
            ) : (
              filteredContacts.map((c) => (
                <ContactCard
                  key={c.id}
                  contact={c}
                  onEdit={() => {
                    setContactToEdit(c);
                    setModalOpen(true);
                  }}
                  onDelete={handleDelete}
                  onFavorite={handleFavorite}
                  onView={(contact) => setViewContact(contact)}
                />
              ))
            )}
          </div>
        </div>

        <ContactModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} contactToEdit={contactToEdit} />

        <ContactViewModal isOpen={!!viewContact} contact={viewContact} onClose={() => setViewContact(null)} />

        <Toasts toasts={toasts} onRemove={removeToast} />
      </div>
    </div>
  );
};

export default Home;
