import React from 'react';
import styles from './Header.module.css';
import { PatchSearch } from '../../PatchSearch/PatchSearch';
export default function Header() {
    return (
        <div className={styles['header-bar'] + ' d-flex'}>
            <div className="d-flex center-child-xy">
                <div className={styles['app-title']}>
                    Tonix
                    <span className={styles['number']}>2</span>
                </div>
                <PatchSearch />
            </div>
        </div>
    );
}