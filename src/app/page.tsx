"use client"
import type { FormEvent } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowRight, FiGrid, FiHome, FiMapPin, FiSearch, FiSun } from "react-icons/fi";
import styles from "./page.module.css";

export default function Home() {

  const { status } = useSession()
  const Router = useRouter();
  // const { update } = useSession();

  const searchModes = ["Buy"];
  const serviceCards = [
    {
      title: "Buy a home",
      description: "Browse trusted listings and connect with local experts who know the market.",
      action: "Find a local agent",
      href: "/#buy",
      image: "/illustration-buy-home.svg",
      imageAlt: "Colorful illustration of a home buyer meeting an agent",
    },
    {
      title: "Rent a home",
      description: "Find rentals that match your budget, commute, and lifestyle in less time.",
      action: "Find rentals",
      href: "/#rent",
      image: "/illustration-rent-home.svg",
      imageAlt: "Colorful illustration of apartment buildings and a rental key",
    },
    {
      title: "Sell a home",
      description: "Compare your options, prepare your listing, and move toward a confident sale.",
      action: "See your options",
      href: "/#sell",
      image: "/illustration-sell-home.svg",
      imageAlt: "Colorful illustration of a sold home sign and garden",
    },
  ];
  const propertyTypes = [
    {
      label: "Apartments",
      icon: FiGrid,
    },
    {
      label: "Villas",
      icon: FiHome,
    },
    {
      label: "Town houses",
      icon: FiHome,
    },
    {
      label: "Country houses",
      icon: FiMapPin,
    },
    {
      label: "Near the beach",
      icon: FiSun,
    },
    {
      label: "With pool",
      icon: FiGrid,
    },
  ];
  const [activeMode, setActiveMode] = useState(searchModes[0]);
  const searchPlaceholder = "Search homes to buy";

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  console.log(status)

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      const timer = setTimeout(() => {
        Router.push("/login");
      }, 1300);

      return () => clearTimeout(timer);
    }
  }, [status, Router]);


  if (status === "loading") {
    return <p className={styles.loading}>loading ...</p>
  }


  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>HomeFinder Real Estate</p>
          <h1 className={styles.title}>Find your next home</h1>
          <p className={styles.subtitle}>
            Search homes, rentals, and recently sold properties in one place.
          </p>

          <form className={styles.searchPanel} onSubmit={handleSearchSubmit}>
            <div className={styles.segmentedControl} aria-label="Search type">
              {searchModes.map((mode) => (
                <button
                  type="button"
                  className={`${styles.modeButton} ${activeMode === mode ? styles.modeButtonActive : ""}`}
                  onClick={() => setActiveMode(mode)}
                  aria-pressed={activeMode === mode}
                  key={mode}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className={styles.searchBar}>
              <label className={styles.searchField}>
                <FiMapPin size={20} aria-hidden="true" />
                <span className={styles.visuallyHidden}>Search location</span>
                <input
                  type="search"
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                />
              </label>

              <button type="submit" className={styles.searchButton}>
                <FiSearch size={19} aria-hidden="true" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </section>


 <section className={styles.services} aria-labelledby="services-title">
        <div className={styles.servicesHeader}>
          <p className={styles.sectionEyebrow}>How HomeFinder helps</p>
          <h2 id="services-title">Start with the move you want to make</h2>
        </div>

        <div className={styles.serviceGrid}>
          {serviceCards.map((card) => (
            <article className={styles.serviceCard} key={card.title}>
              <div className={styles.serviceVisual}>
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  width={210}
                  height={150}
                  className={styles.serviceImage}
                />
              </div>

              <h3>{card.title}</h3>
              <p>{card.description}</p>

              <a href={card.href} className={styles.serviceLink}>
                <span>{card.action}</span>
                <FiArrowRight size={17} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>


      <section className={styles.browseProperties} aria-labelledby="browse-properties-title">
        <div className={styles.browseHeader}>
          <p className={styles.sectionEyebrow}>Browse properties</p>
          <h2 id="browse-properties-title">Top properties in India</h2>
          <p>Browse by property type to find your perfect home</p>
        </div>

        <div className={styles.browseLayout}>
          <div className={styles.propertyTypes} aria-label="Property types">
            {propertyTypes.map((type, index) => {
              const Icon = type.icon;

              return (
                <button
                  type="button"
                  className={`${styles.propertyTypeButton} ${index === 4 ? styles.propertyTypeActive : ""}`}
                  key={type.label}
                >
                  <span className={styles.propertyTypeIcon}>
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span>{type.label}</span>
                </button>
              )
            })}
          </div>

          <div className={styles.propertyShowcase} aria-label="Featured properties"></div>
        </div>
      </section>

     

    </main>
  )

}
