"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiBell, FiHeart, FiInbox, FiPlus, FiSearch } from "react-icons/fi";
import styles from "./sidebar.module.css";

export default function Sidebar() {
    const navItems = [
        { label: "Search", href: "/#search", icon: FiSearch },
        { label: "Updates", href: "/#updates", icon: FiBell, badge: "3" },
        { label: "Favourites", href: "/#favourites", icon: FiHeart },
        { label: "Inbox", href: "/#inbox", icon: FiInbox, badge: "2" },
    ];

    const [activeHref, setActiveHref] = useState("/");

    useEffect(() => {
        const updateActiveHref = () => {
            setActiveHref(`${window.location.pathname}${window.location.hash}`);
        };

        updateActiveHref();
        window.addEventListener("hashchange", updateActiveHref);

        return () => window.removeEventListener("hashchange", updateActiveHref);
    }, []);

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav} aria-label="Property shortcuts">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeHref === item.href || (activeHref === "/" && item.href === "/#search");

                    return (
                        <Link
                            href={item.href}
                            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                            aria-current={isActive ? "page" : undefined}
                            key={item.label}
                        >
                            <span className={styles.iconWrap}>
                                <Icon size={21} aria-hidden="true" />
                                {item.badge && <span className={styles.badge}>{item.badge}</span>}
                            </span>
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <Link href="/#list-property" className={styles.createButton}>
                <FiPlus size={19} aria-hidden="true" />
                <span>List</span>
            </Link>
        </aside>
    );
}
