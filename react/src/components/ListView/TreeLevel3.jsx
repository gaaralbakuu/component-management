import React from "react";
import PropTypes from "prop-types";

function TreeLevel3({ name, selected, onClick = () => {} }) {
    return (
        <div
            className={`hover:bg-lime-100 flex pl-[20px] items-center gap-1 cursor-pointer select-none pr-1 ${
                selected ? "bg-lime-500 text-white hover:bg-lime-500" : "text-gray-500"
            }`}
            onClick={onClick}
        >
            <div className={`h-6 flex items-center ${
                selected ? "text-white" : "text-green-600"
            }`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                </svg>
            </div>
            <div className="text-xs font-medium">{name}</div>
        </div>
    );
}

TreeLevel3.propTypes = {
    onClick: PropTypes.func,
    selected: PropTypes.bool,
};

export default TreeLevel3;
