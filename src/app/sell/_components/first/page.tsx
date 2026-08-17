"use client"

import { useState } from "react";
import type { SellStepProps } from "../../types";
import styles from "../sellSteps.module.css";

export default function FirstStep({ setProperty, setPage }: SellStepProps) {
    const [input, setInput] = useState("")

    const sellerOptions = [
        {
            value: "i am a real estate agent for the owner",
            label: "I am a real estate agent for the owner",
        },
        {
            value: "i am a real estate agent and the owner",
            label: "I am a real estate agent and the owner",
        },
        {
            value: "I am working with a home builder",
            label: "I am working with a home builder",
        },
        {
            value: "None of these apply to me",
            label: "None of these apply to me",
        },
    ];

    const submitData = () => {
        setProperty((prev) => ({
            ...prev,
            AboutSeller: input
        }));

        setPage((prev) => prev + 1);
    };

    return (
        <div className={styles.stepPage}>
            <section className={styles.stepPanel}>
                <div className={styles.stepHeader}>
                    <span className={styles.eyebrow}>Step 1 of 4</span>
                    <h1>Before we get started</h1>
                    <p>We may be required to share your selling options with your agent if an agreement has been signed.</p>
                </div>

                <form action="" className={styles.formStack}>
                    <fieldset className={styles.optionList}>
                        <legend>Do any of these apply to you?</legend>
                        {sellerOptions.map((option) => (
                            <label className={styles.radioRow} key={option.value}>
                                <input
                                    type="radio"
                                    name="timeline"
                                    value={option.value}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <span className={styles.radioControl} aria-hidden="true" />
                                <span className={styles.radioText}>{option.label}</span>
                            </label>
                        ))}
                    </fieldset>

                    {/* <input type="radio" name="timeline" value="None" onChange={(e) => setInput(e.target.value)} />None of these apply to me */}
                    <div className={styles.actionRow}>
                        <button onClick={submitData} className={styles.primaryButton}>Next</button>
                    </div>
                </form>
            </section>
        </div>
    )
}
