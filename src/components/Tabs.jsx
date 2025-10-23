import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
    const tabs = ["All", "Frequent", "Recent", "Favorite"];

    return (
        <div className="flex gap-2 mb-4">
            {tabs.map(tab => {
                const isActive = tab.toLowerCase() === activeTab.toLowerCase();
                return (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-sm ${
                            isActive ? "bg-indigo-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                    >
                        {tab}
                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;
