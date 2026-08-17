'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import {
    FiChevronDown,
    FiClock,
    FiHome,
    FiKey,
    FiLogOut,
    FiMapPin,
    FiMenu,
    FiSettings,
    FiUserPlus,
    FiUsers,
    FiX,
} from 'react-icons/fi'
import styles from './navbar.module.css'

export function Navbar() {
    const [loged] = useState(true)
    const [isAccountOpen, setIsAccountOpen] = useState(false)
    const navLinks = [
        { label: 'Buy', href: '/#buy' },
        { label: 'Sell', href: '/sell' },
        { label: 'Rent', href: '/#rent' },
        { label: 'Find an agent', href: '/#agents' },
        { label: 'Advertise', href: '/#advertise' },
        { label: 'Get help', href: '/#help' },
    ]

    const accountLinks = [
        { label: 'Your Home', href: '/#your-home', icon: FiHome },
        { label: 'Your Team', href: '/#your-team', icon: FiUsers },
        { label: 'Recently Viewed', href: '/#recently-viewed', icon: FiClock },
        { label: 'Your Rental', href: '/#your-rental', icon: FiKey },
        { label: 'Account Setting', href: '/#account-setting', icon: FiSettings },
    ]

    const { data: session } = useSession();
    const accountName = session?.user?.name ?? 'Account'
    const accountInitial = accountName.trim().charAt(0).toUpperCase() || 'U'

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const closeMenu = () => {
        setIsMenuOpen(false)
        setIsAccountOpen(false)
    }

    const handleSignOut = () => {
        closeMenu()
        void signOut()
    }

    return (
        <header className={styles.shell}>
            <nav className={styles.navbar} aria-label="Main navigation">
                <Link href="/" className={styles.brand} onClick={closeMenu}>
                    <span className={styles.brandIcon} aria-hidden="true">
                        <FiHome size={21} />
                    </span>
                    <span className={styles.brandText}>HomeFinder</span>
                </Link>

                <button
                    type="button"
                    className={styles.menuButton}
                    onClick={() => {
                        setIsMenuOpen((open) => !open)
                        setIsAccountOpen(false)
                    }}
                    aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>

                <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
                    <div className={styles.locationPill}>
                        <FiMapPin size={16} aria-hidden="true" />
                        <span>Explore listings</span>
                    </div>

                    <ul className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className={styles.navLink} onClick={closeMenu}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.actions}>
                        {/* <Link href="/login" className={styles.secondaryAction} onClick={closeMenu}>
                            <FiLogIn size={17} aria-hidden="true" />
                            <span>Sign In</span>
                        </Link> */}
                        {!loged ? <Link href="/Signup" className={styles.primaryAction} onClick={closeMenu}>
                            <FiUserPlus size={17} aria-hidden="true" />
                            <span>Sign Up</span>
                        </Link> : (
                            <div className={styles.accountMenuWrap}>
                                <button
                                    type="button"
                                    className={styles.accountButton}
                                    onClick={() => setIsAccountOpen((open) => !open)}
                                    aria-haspopup="menu"
                                    aria-expanded={isAccountOpen}
                                >
                                    <span className={styles.accountAvatar} aria-hidden="true">
                                        {accountInitial}
                                    </span>
                                    <span className={styles.accountName}>{session?.user?.name}</span>
                                    <FiChevronDown
                                        className={`${styles.accountChevron} ${isAccountOpen ? styles.accountChevronOpen : ''}`}
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </button>

                                {isAccountOpen && (
                                    <div className={styles.accountDropdown} role="menu">
                                        <div className={styles.accountHeader}>
                                            <span className={styles.accountHeaderName}>{accountName}</span>
                                            {session?.user?.email && (
                                                <span className={styles.accountHeaderEmail}>{session.user.email}</span>
                                            )}
                                        </div>

                                        <div className={styles.accountItems}>
                                            {accountLinks.map((item) => {
                                                const Icon = item.icon

                                                return (
                                                    <Link
                                                        href={item.href}
                                                        className={styles.accountItem}
                                                        key={item.label}
                                                        onClick={closeMenu}
                                                        role="menuitem"
                                                    >
                                                        <Icon size={17} aria-hidden="true" />
                                                        <span>{item.label}</span>
                                                    </Link>
                                                )
                                            })}
                                        </div>

                                        <button
                                            type="button"
                                            className={styles.signOutButton}
                                            onClick={handleSignOut}
                                            role="menuitem"
                                        >
                                            <FiLogOut size={17} aria-hidden="true" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </nav>
        </header>
    )
}
