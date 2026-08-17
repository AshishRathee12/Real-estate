"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import type { SellStepProps } from "../../types";
import styles from "../sellSteps.module.css";

type Town = {
  name: string;
  localities: string[];
  pincode: string;
};

type District = {
  district: string;
  headquarters: string;
  towns: Town[];
};

type StateData = {
  state: string;
  country: string;
  capital: string;
  total_districts: number;
  districts: District[];
};

export default function Page({ setProperty, setPage }: SellStepProps) {
  const [data, setData] = useState<StateData[]>([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");



  const [number, setNumber] = useState({
    Bedroom: 0,
    Bathroom: 0,
    Balconies: 0,
    Floor: 0

  })
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [buildDate, setBuildDate] = useState("")



  // Fetch data once
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await axios.get<StateData[]>("/api/location");
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocation();
  }, []);

  // States
  const states = data.map((item) => item.state);

  // Selected state object
  const stateData = data.find((item) => item.state === selectedState);

  // Districts
  const districts = stateData?.districts ?? [];

  // Selected district object
  const districtData = districts.find(
    (item) => item.district === selectedDistrict
  );

  // Towns
  const towns = districtData?.towns ?? [];

  // Selected town object
  const townData = towns.find((item) => item.name === selectedTown);

  // Localities
  const localities = townData?.localities ?? [];

  const submitData = () => {
    setProperty((prev) => ({
      ...prev,
      area,
      pricing: price,
      propertySpecific: number,
      location: {
        State: selectedState,
        District: selectedDistrict,
        Town: selectedTown,
        Locality: selectedLocality,
      },
    }));

    setPage((prev) => prev + 1);
  };





  const features = [
    {
      label: "No. of Bedroom",
      key: "Bedroom",
    },
    {
      label: "No. of Bathroom",
      key: "Bathroom",
    },
    {
      label: "Balconies",
      key: "Balconies",
    },
    {
      label: "Floor above ground",
      key: "Floor",
    },
  ] as const;


  const increment = (key: keyof typeof number, keyvalue: number) => {
    setNumber((prev) => ({
      ...prev,
      [key]: keyvalue + 1
    }))

  }
  const Decrement = (key: keyof typeof number, keyvalue: number) => {
    if (keyvalue > 0) {
      setNumber((prev) => ({
        ...prev,
        [key]: keyvalue - 1
      }))
    }

  }






  return (
    <div className={styles.stepPage}>
      <section className={`${styles.stepPanel} ${styles.widePanel}`}>
        <div className={styles.stepHeader}>
          <span className={styles.eyebrow}>Step 4 of 4</span>
          <h1>Property details</h1>
          <p>Add the address area and the main facts buyers compare first.</p>
        </div>

        <form className={styles.formStack}>
          <div className={styles.sectionBlock}>
            <p className={styles.sectionTitle}>Location</p>
            <div className={styles.fieldGrid}>

              <label className={styles.fieldControl}>
                <span>State</span>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedDistrict("");
                    setSelectedTown("");
                    setSelectedLocality("");
                  }}
                >
                  <option value="">Select State</option>

                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.fieldControl}>
                <span>District</span>
                <select
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedTown("");
                    setSelectedLocality("");
                  }}
                  disabled={!selectedState}
                >
                  <option value="">Select District</option>

                  {districts.map((district) => (
                    <option
                      key={district.district}
                      value={district.district}
                    >
                      {district.district}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.fieldControl}>
                <span>Town</span>
                <select
                  value={selectedTown}
                  onChange={(e) => {
                    setSelectedTown(e.target.value);
                    setSelectedLocality("");
                  }}
                  disabled={!selectedDistrict}
                >
                  <option value="">Select Town</option>

                  {towns.map((town,i) => (
                    <option key={i} value={town.name}>
                      {town.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.fieldControl}>
                <span>Locality</span>
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  disabled={!selectedTown}
                >
                  <option value="">Select Locality</option>

                  {localities.map((locality) => (
                    <option key={locality} value={locality}>
                      {locality}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionTitle}>Home facts</p>
              <span>Update any missing or incorrect info.</span>
            </div>

            <div className={styles.detailsGrid}>
              <label className={styles.fieldControl}>
                <span>Square footage</span>
                <input type="number" placeholder="Enter total area in sqft" value={area} onChange={(e) =>
                  setArea(e.target.value === "" ? "" : e.target.value)
                } />
                <small>Do not include basements, non-permitted additions, or non-heated square footage.</small>
              </label>

              <label className={styles.fieldControl}>
                <span>Year built</span>
                <input type="date" value={buildDate} onChange={(e) => setBuildDate(e.target.value)} />
              </label>

              <label className={styles.fieldControl}>
                <span>Expected price</span>
                <input type="number" placeholder="Enter price for your house" value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : e.target.value)} />
              </label>
            </div>

            <div className={styles.counterList}>
              {features.map((feature) => (
                <div className={styles.counterRow} key={feature.key}>
                  <span>{feature.label}</span>

                  <div className={styles.counterControl}>
                    <button type="button" onClick={() => Decrement(feature.key, number[feature.key])}>-</button>
                    <strong>{number[feature.key]}</strong>
                    <button type="button" onClick={() => increment(feature.key, number[feature.key])}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>

        <div className={styles.actionRow}>
          <button
            type="button"
            onClick={submitData}
            className={styles.primaryButton}
            disabled={
              !selectedState ||
              !selectedDistrict ||
              !selectedTown ||
              !selectedLocality
            }
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
