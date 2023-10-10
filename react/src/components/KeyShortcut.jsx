import React from "react";
import PropTypes from "prop-types";

function KeyShortcut({ children, className, size = "normal", ...props }) {
    return (
        <div
            className={`rounded text-[9px] pointer-events-none text-black select-none bg-gray-200 px-1 py-0.5 leading-3 ${className}`}
        >
            {children}
        </div>
    );
}

KeyShortcut.propTypes = {
    size: PropTypes.oneOf(["sm", "normal", "lg"]),
};

export default KeyShortcut;
