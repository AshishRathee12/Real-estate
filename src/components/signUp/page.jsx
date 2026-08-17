"use client";

import React, { useState } from 'react';
import './signup.css';
import axios from "axios"
import { redirect } from "next/dist/server/api-utils"
import { router } from "next/navigation"
import { useRouter } from "next/navigation"



export default function Signup({modal}) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const validateForm = () => {
        const newErrors = {};

        if(!name){
            newErrors.name="Name is required"
        }

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
            const response = await axios.post('/api/signUp', {
                name: name,
                email: email,
                password: password
            });

            setLoading(false)
            setError("")
            if (response.status == 200) {
                router.push("/")
            }
            console.log(response)
        } catch (error) {
            if (error.status == 400) {
                console.log(error.response.data)
                setError(error.response.data)
                setLoading(false)
                console.log("error occured in posting data")
            }
        }
    };

    return (
        // <div className="signup-container">
        <div className={modal}>
            <div className="signup-card" onClick={(e) => e.stopPropagation()}>
                <div className="signup-header">
                    <h1>Create Account</h1>
                    <p>Sign up to get started</p>
                </div>

                {success && (
                    <div className="success-message">
                        ✓ Account created successfully! Welcome aboard.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="signup-form">

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                            className={errors.name ? 'input-error' : ''}
                            disabled={loading}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

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

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter your password"
                            className={errors.confirmPassword ? 'input-error' : ''}
                            disabled={loading}
                        />
                        {errors.confirmPassword && (
                            <span className="error-text">{errors.confirmPassword}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={!email || !password || !name || !confirmPassword}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="signup-footer">
                    <p>
                        Already have an account?{' '}
                        <a href="/login">Sign in here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
