import React from "react";
import PropTypes from "prop-types";
import KeyShortcut from "./KeyShortcut";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

function Menu({ list }) {
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef();

    const handleToggle = () => {
        setOpen(!isOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleActiveFunction = (event) => {
        return () => {
            handleClose();
            event();
        };
    };

    useEffect(() => {
        const handleWindowClick = (e) => {
            if (!menuRef.current.contains(e.target)) {
                handleClose();
            }
        };
        if (menuRef.current) {
            window.addEventListener("click", handleWindowClick);
        }
        return () => {
            if (menuRef.current) {
                window.removeEventListener("click", handleWindowClick);
            }
        };
    }, [menuRef, isOpen]);

    return (
        <div className="relative" ref={menuRef}>
            <div
                className={`text-gray-600 p-1 hover:bg-lime-200 hover:text-lime-600 rounded cursor-pointer ${
                    isOpen ? "bg-lime-100 text-lime-600" : ""
                }`}
                onClick={handleToggle}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            </div>
            {isOpen && (
                <div className="absolute w-[240px] bg-white rounded z-50 left-1/2 -translate-x-1/2 before:content-[''] before:absolute before:border-l-[6px] before:border-r-[6px] before:border-b-[6px] before:border-b-white before:border-l-transparent before:border-r-transparent before:left-1/2 before:-translate-x-1/2 before:-top-[6px] filter drop-shadow mt-1 p-1 select-none">
                    {list.map((item, index) => (
                        <div
                            className="p-2 flex justify-between items-center rounded text-sm cursor-pointer hover:bg-lime-500 hover:text-white"
                            key={index}
                            onClick={handleActiveFunction(item.event)}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4">{item.icon}</div>
                                <div>{item.name}</div>
                            </div>
                            <KeyShortcut>{item.key}</KeyShortcut>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

Menu.propTypes = {};

export default Menu;
