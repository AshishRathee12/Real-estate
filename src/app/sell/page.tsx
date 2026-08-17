"use client"

import { useState } from "react";
import First from "@/src//app/sell/_components/first/page"
import Second from "@/src//app/sell/_components/second/page"
import Third from "@/src//app/sell/_components/third/page"
import Forth from "@/src//app/sell/_components/forth/page"
import Fifth from "@/src//app/sell/_components/fifth/page"
import type { SellProperty } from "./types";
import Sixth from "./_components/sixth/page";

export default function SellPage() {

    const [page, setPage] = useState(1)
    // const { data: session, status } = useSession();

    const [property, setProperty] = useState<SellProperty>({
        AboutSeller: "",
        sellingPeriod: "",
        basic: {
            purpose: "",
            category: "",
            propertyType: "",
        },

        location: {},
        area: "",
        pricing: "",
        images: [],
        propertySpecific: {},
    });
    console.log(property)
    console.log(page)

    // console.log(session?.user?.name)

    return (
        <div>
            {page == 1 && <First setProperty={setProperty} setPage={setPage} />}
            {page == 2 && <Second setProperty={setProperty} setPage={setPage} />}
            {page == 3 && <Third setProperty={setProperty} setPage={setPage} />}
            {page == 4 && <Forth setProperty={setProperty} setPage={setPage} />}
            {page == 5 && <Fifth setProperty={setProperty} setPage={setPage} property={property} />}
            {page == 6 && <Sixth property={property} />}

            {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
            {/* {page < 5 && <button onClick={(e) => setPage(page + 1)}>next</button>} */}

        </div>
    )
}
