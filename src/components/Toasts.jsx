import React, { useEffect, useState } from "react";

/*
  Animated toast list. Each ToastItem handles its own entry/exit animation and
  auto-dismiss based on toast.ttl (ms). onRemove is called after exit animation.
*/

const ToastItem = ({ toast, onRemove }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // play entry animation
        requestAnimationFrame(() => setVisible(true));

        // schedule auto-dismiss
        const ttl = typeof toast.ttl === "number" ? toast.ttl : 3000;
        const hideTimer = setTimeout(() => {
            setVisible(false);
            // wait for exit animation then remove
            setTimeout(() => onRemove(toast.id), 300);
        }, ttl);

        return () => clearTimeout(hideTimer);
    }, [toast, onRemove]);

    const bg =
        toast.type === "delete"
            ? "bg-gradient-to-r from-red-600 to-red-500"
            : toast.type === "error"
            ? "bg-gradient-to-r from-pink-600 to-rose-500"
            : "bg-gradient-to-r from-indigo-600 to-indigo-500";

    return (
        <div
            className={`transform transition-all duration-300 ease-out pointer-events-auto flex items-center gap-3 min-w-[220px] max-w-sm px-4 py-3 rounded-lg shadow-2xl text-white ${bg} ${
                visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-3 scale-95"
            }`}
            role="status"
        >
            <div className="flex-shrink-0">
                {toast.type === "delete" ? (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M9 3h6l1 2h4v2H4V5h4l1-2z" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 11v6M14 11v6" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
            </div>

            <div className="text-sm leading-tight break-words">{toast.message}</div>

            <button
                onClick={() => {
                    setVisible(false);
                    setTimeout(() => onRemove(toast.id), 300);
                }}
                className="ml-auto text-white/90 hover:text-white rounded p-1"
                aria-label="Dismiss"
            >
                ✕
            </button>
        </div>
    );
};

const Toasts = ({ toasts = [], onRemove }) => {
    return (
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 items-end">
            {toasts.map(t => (
                <ToastItem key={t.id} toast={t} onRemove={onRemove} />
            ))}
        </div>
    );
};

export default Toasts;