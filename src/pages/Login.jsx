import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import styles from './Login.module.css';

function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your authentication logic here
        // For now, just navigate to dashboard
        navigate('/dashboard');
    };

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

                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={styles.formInput}
                            required
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
                            required
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