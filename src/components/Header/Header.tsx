import { JSX } from "react/jsx-runtime";
import styles from './Header.module.css';

interface HeaderProps {
    currentPage: string;
    pages: {
        handle: string;
        label: string;
        component: JSX.Element;
    }[];
    onPageChange: (page: string) => void;
}

export function Header({ currentPage, pages, onPageChange } : HeaderProps) {
  return (
    <header className={`${styles.header}`}>
        <div className={`${styles["header-inner"]} container`}>
            {/* <div className={`${styles.logo}`}></div> */}
            <nav role="navigation">
                <ul>
                    {pages.map((page) => (
                        <li 
                            className={
                                currentPage === page.handle 
                                    ? styles.active
                                    : ""
                            } 
                            key={page.handle} 
                        >
                            <a onClick={() => onPageChange(page.handle)}>{page.label}</a>
                            {/* <a href={`/${page.handle}`}>{page.label}</a> */}
                        </li>
                    ))}
                </ul>
            </nav>
          </div>
      </header>
  );
}