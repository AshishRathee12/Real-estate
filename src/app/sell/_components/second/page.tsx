"use client"

import type { SellStepProps } from "../../types";
import styles from "../sellSteps.module.css";

export default function TimelineStep({ setProperty, setPage }: SellStepProps) {
    const timelineOptions = [
        "As soon as possible",
        "within 1 month",
        "2-3 month",
        "4+ month",
        "Just browsing",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setTimeLine(e.target.value);
        setProperty((prev => ({
            ...prev,
            sellingPeriod: e.target.value
        })))
    }
    const submitData = () => {
        setPage((prev) => prev + 1)
    }
    return (
        <div className={styles.stepPage}>
            <section className={styles.stepPanel}>
                <div className={styles.stepHeader}>
                    <span className={styles.eyebrow}>Step 2 of 4</span>
                    <h1>How soon would you like to sell?</h1>
                </div>

                <form action="" className={styles.formStack}>
                    <fieldset className={styles.optionList}>
                        <legend>Choose a timeline</legend>
                        {timelineOptions.map((option) => (
                            <label className={styles.radioRow} key={option}>
                                <input type="radio" name="timeline" value={option} onChange={handleChange} />
                                <span className={styles.radioControl} aria-hidden="true" />
                                <span className={styles.radioText}>{option}</span>
                            </label>
                        ))}
                    </fieldset>

                    <div className={styles.actionRow}>
                        <button onClick={submitData} className={styles.primaryButton}>Next</button>
                    </div>
                </form>
            </section>
        </div>
    )
}
