import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useRef, useEffect } from "react";

import { setSidebarDrag, setSidebarWidth } from "../store/reducers/main";
import Search from "./Search";
import { useCallback } from "react";
import Menu from "./Menu";
import KeyShortcut from "./KeyShortcut";
import SidebarList from "./SidebarList";

function Sidebar({ onFullscreen, ...props }) {
    const { sidebar, search, container } = useSelector((state) => state.main);
    const dispatch = useDispatch();
    const sidebarResizeRef = useRef();
    const searchRef = useRef();
    const sidebarRef = useRef();

    const [clientDragX, setClientDragX] = useState(0);

    const handleSearchFocus = useCallback(
        (e) => {
            searchRef.current.focus();
        },
        [searchRef]
    );

    const listMenu = [
        {
            icon: (
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
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            ),
            name: "Search",
            key: "/",
            event: handleSearchFocus,
        },
        {
            icon: (
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
                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                    />
                </svg>
            ),
            name: "Fullscreen",
            key: "F",
            event: onFullscreen,
        },
    ];
    // effect trigger event keydown
    useEffect(() => {
        const handleSidebarKeyDown = (e) => {
            if (!search.isFocused)
                if (e.keyCode === 191) {
                    e.preventDefault();
                    searchRef.current.focus();
                } else if (e.keyCode === 70) {
                    e.preventDefault();
                    onFullscreen();
                }

            console.log(e, search);
        };

        if (searchRef.current) {
            window.addEventListener("keydown", handleSidebarKeyDown);
        }
        return () => {
            window.removeEventListener("keydown", handleSidebarKeyDown);
        };
    }, [search, searchRef, container]);

    // effect trigger event drag and move size width sidebar
    useEffect(() => {
        const drag = (e) => {
            setClientDragX(e.clientX);
            dispatch(setSidebarDrag(true));
        };

        const move = (e) => {
            if (sidebar.isDrag) {
                const total = sidebar.width + (e.clientX - clientDragX);

                if (total >= sidebar.min && total <= sidebar.max) {
                    dispatch(setSidebarWidth(total));
                }
            }
        };

        const drop = () => {
            dispatch(setSidebarDrag(false));
        };

        if (sidebarResizeRef.current) {
            sidebarResizeRef.current.addEventListener("mousedown", drag);
            window.addEventListener("mousemove", move);
            window.addEventListener("mouseup", drop);
        }
        return () => {
            if (sidebarResizeRef.current) {
                sidebarResizeRef.current.removeEventListener("mousedown", drag);
                window.removeEventListener("mousemove", move);
                window.removeEventListener("mouseup", drop);
            }
        };
    }, [sidebarResizeRef, sidebar.isDrag, clientDragX]);

    // effect add class when dragging
    useEffect(() => {
        if (sidebar.isDrag) {
            document.body.classList.add("cursor-col-resize", "select-none");
        } else {
            document.body.classList.remove("cursor-col-resize", "select-none");
        }
    }, [sidebar.isDrag]);

    useEffect(() => {
        const handleSidebarBlurSearch = (e) => {
            if (search.isFocused) {
                if (!sidebarRef.current.contains(e.target)) {
                    console.log(123);
                }
            }
        };

        if (sidebarRef.current) {
            searchRef.current.addEventListener("blur", handleSidebarBlurSearch);
        }

        return () => {
            if (sidebarRef.current)
                searchRef.current.removeEventListener(
                    "blur",
                    handleSidebarBlurSearch
                );
        };
    }, [sidebarRef, searchRef, search]);

    return (
        <div
            className="relative flex flex-col bg-lime-50/50"
            style={{ width: sidebar.width }}
            ref={sidebarRef}
        >
            <div
                className={`absolute right-0 w-[10px] h-full hover:[background-image:_radial-gradient(at_center_center,rgba(0,0,0,0.2)_0%,transparent_70%,transparent_100%);] hover:[background-size:_50px_100%;] cursor-col-resize border-r border-solid border-gray-200 ${
                    sidebar.isDrag
                        ? "[background-image:_radial-gradient(at_center_center,rgba(0,0,0,0.2)_0%,transparent_70%,transparent_100%);] [background-size:_50px_100%;]"
                        : ""
                }`}
                ref={sidebarResizeRef}
            ></div>
            <div className="p-[20px] pb-0 flex justify-between items-center">
                <div className="flex items-center gap-2 select-none">
                    <div className="text-white bg-[#00D222] rounded flex items-center py-[2px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 12l3 3l3 -3l-3 -3z" />
                            <path d="M15 12l3 3l3 -3l-3 -3z" />
                            <path d="M9 6l3 3l3 -3l-3 -3z" />
                            <path d="M9 18l3 3l3 -3l-3 -3z" />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold">Components</div>
                </div>
                <div>
                    <Menu list={listMenu} />
                </div>
            </div>
            <Search searchRef={searchRef} />
            <SidebarList />
        </div>
    );
}

Sidebar.propTypes = {};

export default Sidebar;
