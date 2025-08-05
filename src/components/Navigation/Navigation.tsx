import { JSX } from "react/jsx-runtime";
import styles from './Navigation.module.css';

interface NavigationProps {
    currentPage: string;
    pages: {
        handle: string;
        label: string;
        component: JSX.Element;
    }[];
    onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, pages, onPageChange }: NavigationProps) {
    return (
        <nav role="navigation">
            <ul>
                {pages.map((page) => (
                    <li className={ currentPage === page.handle ? `${styles.li} ${styles.liActive}` : styles.li} key={page.handle} onClick={() => onPageChange(page.handle)}>{page.label}</li>
                ))}
            </ul>
        </nav>
    );
}