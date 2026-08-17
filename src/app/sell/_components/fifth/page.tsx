"use client";

import axios from "axios";
import { useState } from "react";
import type { property, SellStepProps } from "../../types";

type UploadedImage = {
    secure_url: string;
};

export default function Fifth({ setProperty, setPage, property }: property) {
    // void props;
    console.log(property)
    const [img, setImg] = useState<File[]>([]);

    const changevalue = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (img.length === 0) return;

        const formData = new FormData();
        img.forEach((image) => {
            formData.append("file", image);
        });

        try {
            const response = await axios.post("/api/images", formData);

            const urls = (response.data as UploadedImage[]).map((image) => image.secure_url);

            setProperty((prev) => ({
                ...prev,
                images: [...prev.images, ...urls],
            }))
            setImg([])

            console.log(urls);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <form onSubmit={changevalue}>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                    setImg(Array.from(e.target.files || []));
                }}
            />

            <button type="submit">
                Upload
            </button>

            <button onClick={() => setPage((prev) => prev + 1)}>Review Details</button>
            {property?.images.map((img: string, index: any) => {
                return (
                    <img src={img} key={index} width={300}></img>
                )
            }
            )}
        </form>
    );
}
