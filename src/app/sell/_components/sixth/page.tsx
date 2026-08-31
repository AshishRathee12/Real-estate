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
    console.log(property)
    return (
        <form>
            <fieldset disabled>
                <legend>
                    Seller & availability</legend>
                <input type="text" value={property.AboutSeller} />
                <input type="text" value={property.sellingPeriod} />
            </fieldset>

            <fieldset>
                <legend>Basic Details</legend>
                <input type="text" value={property.basic.purpose} />
                <input type="text" value={property.basic.category} />
                <input type="text" value={property.basic.propertyType} />
            </fieldset>
            <fieldset>
                <legend>Location</legend>
                <input type="text" value={property.location.
                    State
                } />
                <input type="text" value={property.basic.District} />
                <input type="text" value={property.basic.Locality} />
                <input type="text" value={property.basic.Town} />
            </fieldset>
            <fieldset>
                <legend>Area & Pricing</legend>
                <input type="text" value={property.area} />
                <input type="text" value={property.pricing} />
            </fieldset>

            <button type="submit">Submit Property</button>
        </form>
    )
}
