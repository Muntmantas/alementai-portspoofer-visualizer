import React, { useContext, useState } from "react";
import {
    SDivider,
    SLink,
    SLinkContainer,
    SLinkIcon,
    SLinkLabel,
    SLinkNotification,
    SLogo,
    SSidebar,
    SSidebarButton,
    STheme,
    SThemeLabel,
    SThemeToggler,
    SToggleThumb,
} from "./styles";

import { logoSVG } from "../../assets";

import {AiOutlineLeft} from "react-icons/ai";
import { MdOutlineAnalytics, MdOutlineDashboard } from "react-icons/md";
import { FiCodesandbox } from "react-icons/fi";
//import { CgList } from "react-icons/cg";
import { HiOutlineTerminal } from "react-icons/hi";

import { ThemeContext } from "./../../App";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
    const { setTheme, theme } = useContext(ThemeContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();

    return (
        <SSidebar isOpen={sidebarOpen}>
            <>
                <SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
                    <AiOutlineLeft />
                </SSidebarButton>
            </>
            <SLogo>
                <SLink to="/" className=''>
                    <img src={logoSVG} alt="logo" />
                </SLink>
            </SLogo>
            
            <SDivider />
            {linksArray.map(({ icon, label, notification, to }) => (
                <SLinkContainer key={label} isActive={pathname === to}>
                    <SLink to={to} className='' style={!sidebarOpen ? { width: `auto` } : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && (
                            <>
                                <SLinkLabel>{label}</SLinkLabel>
                                {/* if notifications are at 0 or null, dont display it*/}
                                {!!notification && (
                                    <SLinkNotification>{notification}</SLinkNotification>
                                )}
                            </>
                        )}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
            {secondaryLinksArray.map(({ icon, label }) => (
                <SLinkContainer key={label}>
                    <SLink to="/" className='' style={!sidebarOpen ? { width: `fit-content` } : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
                    </SLink>
                </SLinkContainer>
            ))}
            
            
            <STheme>
                {sidebarOpen && <SThemeLabel>Dark Mode</SThemeLabel>}
                <SThemeToggler
                    isActive={theme === "dark"}
                    onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
                >
                    <SToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
                </SThemeToggler>
            </STheme>
        </SSidebar>
    );
};

const linksArray = [
    {
        label: "Dashboard",
        icon: <MdOutlineDashboard />,
        to: "/dashboard",
        notification: 0,
    },
    {
        label: "Statistics",
        icon: <MdOutlineAnalytics />,
        to: "/statistics",
        notification: 0,
    }, 
    {
        label: "Commands",
        icon: <HiOutlineTerminal />,
        to: "/commands",
        notification: 0,
    },
    {
        label: "Honeypots",
        icon: <FiCodesandbox />,
        to: "/honeypots",
        notification: 0,
    },

   
];

const secondaryLinksArray = [
  /*  {
        label: "Settings",
        icon: <AiOutlineSetting />,
    },
    {
        label: "Logout",
        icon: <MdLogout />,
    },
        {
        label: "Diagrams",
        icon: <CgList />,
        to: "/diagrams",
        notification: 0,
    },
    */
];

export default Sidebar;
