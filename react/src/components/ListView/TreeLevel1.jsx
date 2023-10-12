import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

function TreeLevel1({ name, children }) {
    const [isOpen, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!isOpen);
    };

    return (
        <div className="flex flex-col">
            <div
                className="flex gap-1 items-center cursor-pointer select-none px-1"
                onClick={handleToggle}
            >
                <div className="h-6 w-3 flex items-center justify-center text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-2 h-2 transition-transform ${isOpen ? "rotate-90" : ""}`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </div>
                <div className="tracking-[4px] text-xs font-bold text-gray-500">
                    {name}
                </div>
            </div>
            {isOpen && <div className="flex flex-col flex-1">{children}</div>}
        </div>
    );
}

TreeLevel1.propTypes = {};

export default TreeLevel1;
