import { useState, useEffect } from "react";
import ContactCard from "../components/ContactCard";
import ContactModal from "../components/ContactModal";
import Tabs from "../components/Tabs";
import Toasts from "../components/Toasts";
import { initialContacts } from "../data";

const Home = () => {
    const [contacts, setContacts] = useState(() => {
        try {
            const stored = localStorage.getItem('contacts');
            return stored ? JSON.parse(stored) : initialContacts;
        } catch (e) {
            console.error("Failed to read contacts from localStorage:", e);
            return initialContacts;
        }
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const [contactToEdit, setContactToEdit] = useState(null);
    const [activeTab, setActiveTab] = useState("All");

    // search: typed vs applied (Enter/button)
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedSearch, setAppliedSearch] = useState(''); // used for filtering

    const [sortOrder, setSortOrder] = useState('none'); // 'none' | 'asc' | 'desc'

    // toasts state
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        try {
            localStorage.setItem('contacts', JSON.stringify(contacts));
        } catch (e) {
            console.error("Failed to save contacts to localStorage:", e);
        }
    }, [contacts]);

    const addToast = (message, type = 'success', ttl = 3000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, ttl);
    };
    const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

    const openAddModal = () => { setContactToEdit(null); setModalOpen(true); };
    const handleSave = (data) => {
        if (contactToEdit) {
            setContacts(prev => prev.map(c => c.id === contactToEdit.id ? { ...c, ...data } : c));
            addToast("Contact updated successfully", "success");
        } else {
            setContacts(prev => [...prev, { id: Date.now(), ...data, favorite: false }]);
            addToast("Contact added successfully", "success");
        }

        setModalOpen(false);
        setContactToEdit(null);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this contact?")) {
            setContacts(prev => prev.filter(c => c.id !== id));
            addToast("Contact deleted successfully", "success");
        }
    };

    const handleFavorite = (id) => {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, favorite: !c.favorite } : c));
    };

    // filtering uses appliedSearch (only updates when user clicks Enter or button)
    const filteredContacts = contacts
        .filter(c =>
            (activeTab === 'All' || (activeTab === 'Favorite' && c.favorite) || c.tag.toLowerCase() === activeTab.toLowerCase()) &&
            (appliedSearch === '' ||
                c.name.toLowerCase().includes(appliedSearch.toLowerCase()) ||
                c.email.toLowerCase().includes(appliedSearch.toLowerCase()) ||
                c.phone.toLowerCase().includes(appliedSearch.toLowerCase()) ||
                c.tag.toLowerCase().includes(appliedSearch.toLowerCase()))
        );

    // Apply sorting by name if requested
    const sortedContacts = (() => {
        if (sortOrder === 'none') return filteredContacts;
        const copy = [...filteredContacts];
        copy.sort((a, b) => {
            const na = (a.name || "").toLowerCase();
            const nb = (b.name || "").toLowerCase();
            if (na < nb) return sortOrder === 'asc' ? -1 : 1;
            if (na > nb) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        return copy;
    })();

    // handlers for search submit / clear
    const applySearch = () => setAppliedSearch(searchQuery.trim());
    const clearSearch = () => { setSearchQuery(''); setAppliedSearch(''); };

    const hasAnyContacts = contacts.length > 0;
    const searchActive = appliedSearch !== '';

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1b1b1b] text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-indigo-400">Tria Neobank Contacts</h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="flex items-center gap-3 w-full sm:w-1/2">
                    <input
                        type="text"
                        placeholder="Search contact..."
                        className="p-2 bg-gray-800 rounded w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") applySearch(); }}
                    />
                    {/* small Enter button next to search */}
                    <button
                        onClick={applySearch}
                        className="px-3 py-2 bg-indigo-600 rounded text-white hover:bg-indigo-700 text-sm"
                        title="Search"
                    >
                        Enter
                    </button>

                    {/* show clear-search when a search is applied */}
                    {searchActive && (
                        <button
                            onClick={clearSearch}
                            className="px-3 py-2 bg-gray-700 rounded text-gray-200 hover:bg-gray-600 text-sm"
                            title="Clear search"
                        >
                            Clear
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {/* hide sort & add controls when there are no contacts at all */}
                    {hasAnyContacts && (
                        <>
                            <label className="text-sm text-gray-300">Sort</label>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="bg-gray-800 text-white p-2 rounded border border-gray-700"
                            >
                                <option value="none">None</option>
                                <option value="asc">Name (A → Z)</option>
                                <option value="desc">Name (Z → A)</option>
                            </select>
                            {/* hide main Add Contact button when search is active and no results (per request) */}
                            {!(searchActive && filteredContacts.length === 0) && (
                                <button onClick={openAddModal} className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700">
                                    + Add Contact
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="grid gap-4">
                {/* No contacts in storage -> show empty state with Add CTA */}
                {!hasAnyContacts ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 border border-gray-800 rounded-lg bg-gradient-to-br from-[#071025] to-[#0b1320]">
                        <div className="text-gray-300 text-lg mb-3">No contacts available</div>
                        <div className="text-sm text-gray-400 mb-6">Start by adding a new contact to see it here.</div>
                        <button
                            onClick={openAddModal}
                            className="bg-indigo-500 px-5 py-2 rounded-full text-white hover:bg-indigo-600"
                        >
                            + Add contacts
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Search applied but no results -> show "No contact found" and do not show main Add button */}
                        {searchActive && sortedContacts.length === 0 ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-8 border border-gray-800 rounded-lg bg-gradient-to-br from-[#071025] to-[#0b1320]">
                                <div className="text-gray-300 text-lg mb-2">No contact found</div>
                                <div className="text-sm text-gray-400 mb-4">Try a different search or clear the search.</div>
                                <button
                                    onClick={clearSearch}
                                    className="bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-600"
                                >
                                    Clear search
                                </button>
                            </div>
                        ) : (
                            // normal list
                            sortedContacts.map(c => (
                                <ContactCard
                                    key={c.id}
                                    contact={c}
                                    onEdit={() => { setContactToEdit(c); setModalOpen(true); }}
                                    onDelete={handleDelete}
                                    onFavorite={handleFavorite}
                                />
                            ))
                        )}
                    </>
                )}
            </div>

            <ContactModal
                isOpen={isModalOpen}
                onClose={() => { setModalOpen(false); setContactToEdit(null); }}
                onSave={handleSave}
                contactToEdit={contactToEdit}
            />

            <Toasts toasts={toasts} onRemove={removeToast} />
        </div>
    );
};

export default Home;
