import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DefaultLayout({ children }) {

    const [collapsed, setCollapsed] = React.useState(false);
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const userMenu = [
        {
            title: "Home",
            icon: <i class="ri-home-4-line"></i>,
            onClick: () => navigate("/"),
            path: "/",
        },
        {
            title: "Transaction",
            icon: <i class="ri-bank-line"></i>,
            onClick: () => navigate("/transactions"),
            path: "/transactions",
        },
        {
            title: "Request",
            icon: <i class="ri-hand-heart-line"></i>,
            onClick: () => navigate("/request"),
            path: "/request",
        },
        {
            title: "Profile",
            icon: <i class="ri-user-3-line"></i>,
            onClick: () => navigate("/profile"),
            path: "/profile",
        },
        {
            title: "Logout",
            icon: <i class="ri-logout-box-line"></i>,
            onClick: () => {
                localStorage.removeItem("token");
                navigate("/login");
            },
            path: "/logout",
        },
    ];

    const adminMenu = [
        {
            title: "Home",
            icon: <i class="ri-home-4-line"></i>,
            onClick: () => navigate("/"),
            path: "/",
        },
        {
            title: "Users",
            icon: <i class="ri-user-settings-line"></i>,
            onClick: () => navigate("/users"),
            path: "/",
        },
        {
            title: "Transaction",
            icon: <i class="ri-bank-line"></i>,
            onClick: () => navigate("/transactions"),
            path: "/transactions",
        },
        {
            title: "Request",
            icon: <i class="ri-hand-heart-line"></i>,
            onClick: () => navigate("/request"),
            path: "/request",
        },
        {
            title: "Profile",
            icon: <i class="ri-user-3-line"></i>,
            onClick: () => navigate("/profile"),
            path: "/profile",
        },
        {
            title: "Logout",
            icon: <i class="ri-logout-box-line"></i>,
            onClick: () => {
                localStorage.removeItem("token");
                navigate("/login");
            },
            path: "/logout",
        },
    ];

    const menuToRender = user?.isAdmin ? adminMenu : userMenu;

    return (
        <div className="layout">
            <div className="sidebar">
                <div className="menu">
                    {menuToRender.map((item) => {
                        const isActive = window.location.pathname === item.path;
                        return <div className={`menu-item ${isActive ? "active-menu-item" : ""}`} onClick={item.onClick}>
                            {item.icon}
                            {!collapsed && <h1 className="text-white text-sm">{item.title}</h1>}
                        </div>
                    })}
                </div>
            </div>
            <div className="body">
                <div className="header flex justify-between items-center">
                    <div className="text-white">
                        {collapsed && <i class="ri-close-circle-line" onClick={() => setCollapsed(!collapsed)}></i>}
                        {!collapsed && <i class="ri-menu-unfold-3-line" onClick={() => setCollapsed(!collapsed)}></i>}
                    </div>
                    <div>
                        <h1 className="text-xl text-white">
                            SpendZy
                        </h1>
                    </div>
                    <div>
                        <h1 className="text-sm underline text-white">
                            {user?.firstName} {user?.lastName}
                        </h1>
                    </div>
                </div>
                <div className="content">{children}</div>
            </div>
        </div>
    )
};

export default DefaultLayout;