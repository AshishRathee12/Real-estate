"use client";

import React, { useEffect, useState } from 'react';
import './page.css';
import { redirect } from "next/dist/server/api-utils"
import { router } from "next/navigation"
import { useRouter } from "next/navigation"
import { docredentilas } from "@/src/app/action/authActions"
import { useSession } from 'next-auth/react';





export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter()
    const { update } = useSession();
    const validateForm = () => {
        const newErrors = {};



        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);

        if (!validateForm()) {
            return;
        }

        setLoading(true)
        try {
            const response = await docredentilas({ email, password })
            // console.log(response, "from login page")
            // if (response.success == false) {
            //     console.log(response.message)
            //     setError(response.message)
            // }
            console.log(response)
            if (response.success) {
                await update();
                router.refresh();
                console.log("page refresh")
                router.replace("/");
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h1>Welcome back </h1>
                    <p>Login to get started</p>
                </div>

                {success && (
                    <div className="success-message">
                        ✓ login successfully! Welcome .
                    </div>
                )}

                <form onSubmit={handleSubmit} className="signup-form">



                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className={errors.email ? 'input-error' : ''}
                            disabled={loading}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter a strong password"
                            className={errors.password ? 'input-error' : ''}
                            disabled={loading}
                        />
                        {errors.password && (
                            <span className="error-text">{errors.password}</span>
                        )}
                    </div>

                    {error && (
                        <span className="error-text">{error}</span>
                    )}


                    <button
                        type="submit"
                        className="submit-button"
                        disabled={!email || !password || loading}
                    >
                        Login
                    </button>
                </form>

                <div className="signup-footer">
                    <p>
                        Don't have an account?{' '}
                        <a href="/Signup">Sign up here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
