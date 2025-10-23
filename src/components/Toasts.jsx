import React from "react";

const Toasts = ({ toasts = [], onRemove }) => {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
            {toasts.map(t => (
                <div
                    key={t.id}
                    className={`min-w-[220px] max-w-sm px-4 py-2 rounded shadow-lg border ${
                        t.type === "error" ? "bg-red-600 border-red-700" : "bg-indigo-600 border-indigo-700"
                    } text-white flex items-center justify-between gap-3`}
                    role="status"
                >
                    <div className="text-sm">{t.message}</div>
                    <button onClick={() => onRemove(t.id)} className="text-white/80 hover:text-white ml-3">
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Toasts;