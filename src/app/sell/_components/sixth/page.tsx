import axios from 'axios';
import React from 'react'

type property = {
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
}

export default function Sixth({ property }: any) {
    console.log(property);

    const senddata = async () => {

        try {
            const response = await axios.post("/api/uploadData", property)
            console.log(response)
        } catch (error) {
            console.log(error)
        }

        // console.log(property)
    }

    return (
        <form >
            <fieldset disabled>
                <legend>
                    Seller & availability</legend>
                <input type="text" defaultValue={property.AboutSeller} />
                <input type="text" defaultValue={property.sellingPeriod} />
            </fieldset>

            <fieldset disabled>
                <legend>Basic Details</legend>
                <input type="text" defaultValue={property.basic.purpose} readOnly />
                <input type="text" defaultValue={property.basic.category} readOnly />
                <input type="text" defaultValue={property.basic.propertyType} readOnly />
            </fieldset>
            <fieldset disabled>
                <legend>Location</legend>
                <input type="text" defaultValue={property.location.
                    State
                } readOnly />
                <input type="text" defaultValue={property.basic.District} readOnly />
                <input type="text" defaultValue={property.basic.Locality} readOnly />
                <input type="text" defaultValue={property.basic.Town} readOnly />
            </fieldset>
            <fieldset disabled>
                <legend>Area & Pricing</legend>
                <input type="text" defaultValue={property.area} readOnly />
                <input type="text" defaultValue={property.pricing} readOnly />
            </fieldset>

            <button type="button" onClick={senddata}>Submit Property</button>
        </form>
    )
}
