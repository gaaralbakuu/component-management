import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setFullscreen,
    setSidebarMax,
    setSidebarWidth,
} from "../store/reducers/main";
import Header from "./Header";
import { useCallback } from "react";

function Layout() {
    const { container, sidebar } = useSelector((state) => state.main);
    const dispatch = useDispatch();

    const handleToggleFullscreen = useCallback(() => {
        dispatch(setFullscreen(!container.isFullscreen));
    }, [container]);

    useEffect(() => {
        const resize = () => {
            dispatch(setSidebarMax(window.innerWidth - sidebar.min));
            if (
                sidebar.width > window.innerWidth - sidebar.min &&
                sidebar.width > sidebar.min
            ) {
                dispatch(setSidebarWidth(window.innerWidth - sidebar.min));
            }
        };

        const handleTest = (e) => {
            if (e.keyCode === 32) {
                console.log(e);
            }
        };

        window.addEventListener("resize", resize);
        window.addEventListener("keydown", handleTest);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("keydown", handleTest);
        };
    });

    return (
        <div className="h-full flex-1 flex relative">
            <Sidebar onFullscreen={handleToggleFullscreen} />
            <div
                className={`absolute 
                top-0 right-0 bottom-0 bg-white flex flex-col ${
                    sidebar.isDrag ? "" : "transition-all duration-50"
                }`}
                style={{
                    ...(!container.isFullscreen
                        ? { left: sidebar.width }
                        : { left: 0 }),
                }}
            >
                <Header onFullscreen={handleToggleFullscreen} />
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
