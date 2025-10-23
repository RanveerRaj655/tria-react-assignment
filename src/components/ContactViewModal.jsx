import React, { useEffect, useState } from "react";

/*
  Read-only contact detail modal. Animated & gradient-styled to match app.
  Props:
   - isOpen (bool)
   - contact (object) - the contact to view
   - onClose (fn)
*/

const ContactViewModal = ({ isOpen, contact, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => {
          setVisible(false);
          setTimeout(() => onClose(), 180);
        }}
      />

      <div
        className={`relative w-full max-w-md transform transition-all duration-250 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <div className="bg-gradient-to-br from-[#07142a] to-[#0b2746] text-white rounded-2xl shadow-2xl overflow-hidden border border-white/5">
          <div className="px-6 py-4 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-indigo-300">
                {contact.name || "Unnamed"}
              </h2>
              <p className="text-sm text-gray-300 mt-1">Contact details</p>
            </div>

            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white p-2 rounded-md"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="px-6 py-5 space-y-4 text-sm text-gray-200">
            <div>
              <div className="text-xs text-gray-400 mb-1">Email</div>
              <div className="break-words text-white">
                {contact.email || "—"}
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-400 mb-1">Phone</div>
              <div className="break-words text-white">
                {contact.phone || "—"}
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-400 mb-1">Tag</div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-gray-200">
                  {contact.tag || "—"}
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-400 mb-1">Favorite</div>
              <div>{contact.favorite ? "Yes" : "No"}</div>
            </div>
          </div>

          <div className="px-6 py-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/6 text-gray-200 hover:bg-white/10"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactViewModal;