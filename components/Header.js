import { useContext } from 'react';
import Link from 'next/link';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import Search from './Search';
import styles from '../styles/Header.module.css';
import AuthContext from '@/context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">DJ Events</Link>
      </div>
      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/events/add">Add Event</Link>
              </li>
              <li>
                <Link href="/account/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={logout} className="btn-secondary btn-icon">
                  <span>
                    <FaSignOutAlt /> Log out
                  </span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/account/login">
                  <span className="btn-secondary btn-icon">
                    <FaSignInAlt /> Login
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
