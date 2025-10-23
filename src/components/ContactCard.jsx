import { Edit, Trash2, Star } from "lucide-react";

const ContactCard = ({ contact, onEdit, onDelete, onFavorite }) => (
  <div className="bg-[#111] text-white p-4 rounded-2xl shadow-md flex justify-between items-center border border-gray-700 card-hover">
    <div>
      <h3 className="text-lg font-semibold">{contact.name}</h3>
      <p className="text-gray-400">{contact.email}</p>
      <p className="text-gray-400">{contact.phone}</p>
      <p className="text-sm text-indigo-400">{contact.tag}</p>
    </div>
    <div className="flex gap-3">
      <button onClick={() => onFavorite(contact.id)}>
        <Star className={`w-5 h-5 ${contact.favorite ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`} />
      </button>
      <button onClick={() => onEdit(contact)} className="text-indigo-400 hover:text-indigo-300">
        <Edit className="w-5 h-5" />
      </button>
      <button onClick={() => onDelete(contact.id)} className="text-red-400 hover:text-red-300">
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default ContactCard;
