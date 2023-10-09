import React from "react";
import PropTypes from "prop-types";

function KeyShortcut({ children, className, ...props }) {
    return (
        <div
            className={`bg-gray-200 px-[6px] rounded text-xs py-0.5 pointer-events-none text-black select-none ${className}`}
        >
            {children}
        </div>
    );
}

KeyShortcut.propTypes = {};

export default KeyShortcut;
