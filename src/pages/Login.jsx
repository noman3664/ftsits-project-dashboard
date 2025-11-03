import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import api from "../api/Api"; // Comment out for now
import { mockLogin } from "../api/mockApi";
import logo from '../assets/logo.png';
import styles from './Login.module.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);


        try {
            // Using mock API for testing
            const response = await mockLogin(email, password);
            const { token, user } = response.data;

            // Store token and user data
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Navigate to dashboard
            navigate('/dashboard');
            console.log("Login response:", response);

        } catch (err) {
            console.error('Login error:', err);
            setError(
                err.response?.data?.message ||
                'Invalid email or password. Please try again.'
            );
        } finally {
            setLoading(false);
        }
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
                    Test Credentials: admin@test.com / admin123
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    {error && <p className={styles.errorText}>{error}</p>}

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;