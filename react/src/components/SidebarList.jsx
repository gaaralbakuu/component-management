import React from "react";
import PropTypes from "prop-types";
import KeyShortcut from "./KeyShortcut";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarTab } from "../store/reducers/main";

function SidebarList(props) {
    const dispatch = useDispatch();
    const { sidebar, search } = useSelector((state) => state.main);

    const handleBackToComponents = () => {
        dispatch(setSidebarTab(1));
    };

    const list = [
        {
            id: 1,
            name: "BUTTON",
            children: [
                {
                    id: 1,
                    name: "iOS style",
                },
            ],
        },
    ];

    useEffect(() => {
        const handleSidebarListKeydown = (e) => {
            if (e.keyCode === 27) {
                handleBackToComponents();
            }
        };
        window.addEventListener("keydown", handleSidebarListKeydown);
        return () => {
            window.removeEventListener("keydown", handleSidebarListKeydown);
        };
    }, []);

    return (
        <div>
            {sidebar.tab === 1 && (
                <div className="mt-4">
                    {list.map((item, index) => (
                        <div className="flex flex-col">
                            <div className="flex gap-1 items-center cursor-pointer select-none">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1}
                                        stroke="currentColor"
                                        className="w-3 h-3"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </div>
                                <div className="tracking-[4px] text-xs font-bold text-gray-600">
                                    {item.name}
                                </div>
                            </div>
                            <div className="flex px-[20px]">
                                {item.children.map((child, indexChild) => (
                                    <div className="flex items-center gap-1">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1}
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
                                        <div>{child.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {sidebar.tab === 2 && (
                <div>
                    {search.text.length === 0 ? (
                        <div>
                            <div className="px-[20px] mt-4">
                                <div className="tracking-[4px] text-xs font-bold text-gray-600">
                                    RECENTLY OPENED
                                </div>
                            </div>
                            <div
                                className="px-[20px] flex justify-between items-center hover:bg-lime-100 py-1 cursor-pointer text-gray-600"
                                onClick={handleBackToComponents}
                            >
                                <div className="flex gap-1 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1}
                                        stroke="currentColor"
                                        className="w-3 h-3"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 19.5L8.25 12l7.5-7.5"
                                        />
                                    </svg>

                                    <div className="text-xs">
                                        Back to components
                                    </div>
                                </div>
                                <div>
                                    <KeyShortcut size="sm">ESC</KeyShortcut>
                                </div>
                            </div>
                            <div className="px-[20px] flex justify-between items-center hover:bg-lime-100 py-1 cursor-pointer text-gray-600">
                                <div className="flex gap-1 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1}
                                        stroke="currentColor"
                                        className="w-3 h-3"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>

                                    <div className="text-xs">Clear history</div>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-3 text-center px-[20px]">
                            <div className="font-bold text-sm">
                                No components found
                            </div>
                            <div className="text-xs text-gray-400 font-semibold">
                                Find components by name or path
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

SidebarList.propTypes = {};

export default SidebarList;
