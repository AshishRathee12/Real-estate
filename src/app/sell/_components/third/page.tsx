"use client"

import { useSession } from "next-auth/react"
import { useState } from "react";
import type { SellStepProps } from "../../types";
import styles from "../sellSteps.module.css";

export default function BasicDetailsStep({ setProperty, setPage }: SellStepProps) {

    const { data: session } = useSession();
    // console.log(session);

    const [purpose, setPurpose] = useState("Sell");
    const [category, setCategory] = useState("Residential");
    const [propertyType, setPropertyType] = useState("");
    const [error, setError] = useState("")

    const purposes = ["Sell", "Rent/Lease"];

    const categories = [
        {
            type: "Residential",
            property: ["Flat/Apartment", "Farmhouse", "Independent House/Villa"]
        },
        {
            type: "Commercial",
            property: ["office", "Retail", "Plot/land", "Storage", "Industry"]
        }
    ]
    const changePurpose = (
        item: string
    ) => {
        setPurpose(item);
    };
    // console.log(setProperty)
    // console.log(setPage)

    const increment = () => {

        setProperty((prev) => ({
            ...prev,
            basic: {
                purpose,
                category,
                propertyType
            }
        }))

        if (propertyType == "") {
            setError("Select propertyType");
            return
        }

        setPage((prev) => prev + 1)
    }

    return (
        <div className={styles.stepPage}>
            <section className={styles.stepPanel}>
                <div className={styles.stepHeader}>
                    <span className={styles.eyebrow}>Step 3 of 4</span>
                    <h1>Basic details</h1>
                    <p>Welcome back {session?.user?.name}. Tell us what kind of listing this is.</p>
                </div>

                <form action="" className={styles.formStack}>
                    <div className={styles.sectionBlock}>
                        <p className={styles.sectionTitle}>I&apos;m looking to</p>
                        <div className={styles.segmentGroup}>
                            {purposes.map((item) => {
                                return (
                                    <button
                                        type="button"
                                        onClick={() => changePurpose(item)}
                                        className={`${styles.segmentButton} ${item == purpose ? styles.isActive : ""}`}
                                        key={item}
                                    >
                                        {item}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className={styles.sectionBlock}>
                        <p className={styles.sectionTitle}>What kind of property do you have?</p>
                        <div className={styles.inlineOptions}>
                            <label className={styles.radioPill}>
                                <input type="radio" name="category" value="residential" onChange={() => setCategory("Residential")} checked={category == "Residential"} />
                                <span>Residential</span>
                            </label>
                            <label className={styles.radioPill}>
                                <input type="radio" name="category" value="commercial " onChange={() => setCategory("Commercial")} checked={category == "Commercial"} />
                                <span>Commercial</span>
                            </label>
                        </div>

                        <div className={styles.choiceGrid}>
                            {categories.filter((item) => item.type == category).map((elem) => {
                                return elem.property.map((listitem, index) => {
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            onClick={() => setPropertyType(listitem)}
                                            className={`${styles.choiceButton} ${listitem == propertyType ? styles.isActive : ""}`}
                                        >
                                            {listitem}
                                        </button>
                                    )
                                })

                            })}
                        </div>
                        {error && <p className={styles.errorText}>{error}</p>}
                    </div>

                </form>
                <div className={styles.actionRow}>
                    <button type="button" onClick={increment} className={styles.primaryButton}>Continue</button>
                </div>
            </section>
        </div>
    )
}
