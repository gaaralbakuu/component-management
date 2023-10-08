import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { setSidebarWidth } from "../store/reducers/main";

function Sidebar(props) {
    const { sidebar } = useSelector((state) => state.main);
    const dispatch = useDispatch();
    const sidebarResizeRef = useRef();
    const [isDrag, setDrag] = useState(false);
    const [clientDragX, setClientDragX] = useState(0);

    useEffect(() => {
        const drag = (e) => {
            setClientDragX(e.clientX);
            setDrag(true);
        };

        const move = (e) => {
            if (isDrag) {
                const total = sidebar.width + (e.clientX - clientDragX);

                if (total >= sidebar.min && total <= sidebar.max) {
                    dispatch(setSidebarWidth(total));
                }
            }
        };

        const drop = () => {
            setDrag(false);
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
    }, [sidebarResizeRef, isDrag, clientDragX]);

    useEffect(() => {
        if (isDrag) {
            document.body.classList.add("cursor-col-resize", "select-none");
        } else {
            document.body.classList.remove("cursor-col-resize", "select-none");
        }
    }, [isDrag]);

    return (
        <div
            className="relative flex flex-col bg-[#f5fbff]"
            style={{ width: sidebar.width }}
        >
            <div
                className={`absolute right-0 w-[10px] h-full hover:[background-image:_radial-gradient(at_center_center,rgba(0,0,0,0.2)_0%,transparent_70%,transparent_100%);] hover:[background-size:_50px_100%;] cursor-col-resize border-r border-solid border-[#e1e6ea] ${isDrag ? "[background-image:_radial-gradient(at_center_center,rgba(0,0,0,0.2)_0%,transparent_70%,transparent_100%);] [background-size:_50px_100%;]" : ""}`}
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
                    <div className="text-gray-600 p-1 hover:bg-lime-200 hover:text-lime-600 rounded cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
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
                </div>
            </div>
            <div className="px-[20px] mt-4">
                <div className="border border-solid border-black/20  rounded-3xl flex items-center gap-2 px-2 py-1">
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

                    <div className="flex-1">
                        <input
                            type="text"
                            className=" bg-transparent outline-none text-sm w-full"
                            placeholder="Find components"
                        />
                    </div>

                    <div className="bg-gray-200 px-[6px] rounded text-xs py-1 pointer-events-none">/</div>
                </div>
            </div>
        </div>
    );
}

Sidebar.propTypes = {};

export default Sidebar;
