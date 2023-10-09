import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import KeyShortcut from "./KeyShortcut";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFocus } from "../store/reducers/main";

function Search({ searchRef }) {
    const { search } = useSelector((state) => state.main);
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const handleFocus = () => {
        dispatch(setSearchFocus(true));
    };

    const handleBlur = () => {
        dispatch(setSearchFocus(false));
    };

    const handleClear = () => {
        setValue("");
    };

    useEffect(() => {
        const handleSidebarKeyDown = (e) => {
            if (search.isFocused) {
                if (e.keyCode === 27) {
                    e.preventDefault();
                    searchRef.current.blur();
                }
            }
        };

        if (searchRef.current)
            window.addEventListener("keydown", handleSidebarKeyDown);
        return () => {
            if (searchRef.current)
                window.removeEventListener("keydown", handleSidebarKeyDown);
        };
    }, [searchRef, search.isFocused]);

    return (
        <div className="px-[20px] mt-4">
            <div className={`relative`}>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
                    <div className="text-gray-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </div>
                    {value.length ? (
                        <div
                            onClick={handleClear}
                            className="pointer-events-auto cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    ) : (
                        !search.isFocused && <KeyShortcut>/</KeyShortcut>
                    )}
                </div>

                <div className="flex-1">
                    <input
                        type="text"
                        className={`bg-transparent border border-solid pl-7 pr-6
                        }  rounded-3xl px-2 py-1 outline-none text-sm w-full ${
                            search.isFocused
                                ? "border-lime-500 placeholder:text-lime-600"
                                : "border-black/20"
                        }`}
                        placeholder={
                            search.isFocused
                                ? "Type to find components..."
                                : "Find components"
                        }
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        value={value}
                        ref={searchRef}
                        aria-autocomplete="list"
                    />
                </div>
            </div>
        </div>
    );
}

export default Search;
