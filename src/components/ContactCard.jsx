import React from "react";

/*
  Modern contact card with gradient accents and button animations.
  Props:
    - contact
    - onEdit (fn)
    - onDelete (fn that accepts id)
    - onFavorite (fn that accepts id)
*/

const ContactCard = ({ contact, onEdit, onDelete, onFavorite, onView }) => {
  return (
    <div
      className="relative card-glow card-hover bg-gradient-to-br from-[#07142a] to-[#071b2f] border border-white/5 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-start gap-4 w-full"
      role="group"
    >
      <div
        className="flex items-start gap-4 w-full cursor-pointer"
        onClick={() => onView && onView(contact)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") onView && onView(contact);
        }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg shadow-md flex-shrink-0">
          {contact.name ? contact.name[0].toUpperCase() : "?"}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                <span className="text-gradient-animated">{contact.name || "Unnamed"}</span>
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{contact.email || "No email"}</div>
            </div>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="min-w-0">
              <div className="text-xs text-gray-400">Phone</div>
              <div className="text-sm text-white break-words whitespace-normal">{contact.phone || "—"}</div>
            </div>

            <div className="min-w-[100px]">
              <div className="text-xs text-gray-400">Tag</div>
              <div className="inline-block mt-1 px-3 py-1 text-sm rounded-full bg-white/6 text-gray-200 break-words whitespace-normal">
                {contact.tag || "—"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite && onFavorite(contact.id);
          }}
          className={`p-2 rounded-md transition-transform active:scale-95 ${contact.favorite ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"}`}
          title="Toggle favorite"
        >
          {contact.favorite ? "★" : "☆"}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit && onEdit();
          }}
          className="p-2 rounded-md text-indigo-200 hover:text-white"
          title="Edit"
        >
          ✎
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete && onDelete(contact.id);
          }}
          className="p-2 rounded-md text-red-300 hover:text-white"
          title="Delete"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
