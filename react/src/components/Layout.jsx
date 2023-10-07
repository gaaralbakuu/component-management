import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarMax, setSidebarWidth } from "../store/reducers/main";

function Layout() {
    const { sidebar } = useSelector((state) => state.main);
    const dispatch = useDispatch();

    useEffect(() => {
        const resize = () => {
            dispatch(setSidebarMax(window.innerWidth - sidebar.min));
            if (sidebar.width > window.innerWidth - sidebar.min && sidebar.width > sidebar.min) {
                dispatch(setSidebarWidth(window.innerWidth - sidebar.min));
            }
        };

        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
        };
    });

    return (
        <div className="h-full flex-1 flex">
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default Layout;
