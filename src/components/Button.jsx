import React from 'react';
import styles from '@styles/Button.module.scss';

export function Button({ children, ...props }) {
    return (
        <button className={styles.container} {...props}>
            {children}
        </button>
    );
}
