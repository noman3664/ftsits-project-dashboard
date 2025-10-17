import React from "react";
import logo from '../assets/logo.png';
import styles from './Login.module.css';

function Login() {
    return (
        <div className={styles.loginContainer}>
            {/* Background Circles */}
            <div className={styles.backgroundCircles}>
                <div className={`${styles.circle} ${styles.circleTopLeft}`}></div>
                <div className={`${styles.circle} ${styles.circleBottomLeft}`}></div>
                <div className={`${styles.circle} ${styles.circleBottomRight}`}></div>
                <div className={`${styles.circle} ${styles.circleTopRight}`}></div>
            </div>

            {/* Login Card */}
            <div className={styles.loginCard}>
                <img src={logo} alt="Logo" className={styles.loginLogo} />
                <h2 className={styles.loginTitle}>Login</h2>
                <p className={styles.loginSubtitle}>
                    How do I get started lorem ipsum dolor sit?
                </p>

                <form className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={styles.formInput}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            className={styles.formInput}
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.submitButton}
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;