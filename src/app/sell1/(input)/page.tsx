import axios from "axios";
import { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"

type LocationResult = {
  place_id: number;
  display_name: string;
  type: string;
  address: {
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
    town?: string;
    village?: string;
    suburb?: string;
    county?: string;
  };
  lat: string;
  lon: string;
};

type PinResult = {
  Name: string;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
};

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const PostIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="spinner-animate" viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20, color: "#6366f1" }}>
    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function App() {
  const [input, setInput] = useState("");
  const [name, setName] = useState<LocationResult[]>([]);
  const [pin, setPin] = useState<PinResult[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"location" | "pincode" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    setName([]);
    setPin([]);
    setError("");
    setMode(null);

    if (input.trim() === "") {
      setLoading(false);
      setPin([])
      setName([])
      return;
    }
    console.log("loading start")
    setLoading(true);


    const timer = setTimeout(async () => {
      const search = input.trim();
      const firstChar = search[0];

      try {

        // location api 
        if (isNaN(Number(firstChar))) {
          setMode("location");
          const response = await axios.get<LocationResult[]>(
            `https://nominatim.openstreetmap.org/search?q=${input}&countrycodes=in&format=jsonv2&addressdetails=1`
          );
          console.log(response)
          setName(response.data);
        } else {
          setMode("pincode");
          if (input.trim().length !== 6) {
            setError("Please enter a valid 6-digit pincode");
            setLoading(false);
            return;
          }
          if (isNaN(Number(input.trim()))) {
            setError("Pincode must contain numbers only");
            setLoading(false);
            return;
          }

          // pincode api 
          const response = await axios.get(`https://api.postalpincode.in/pincode/${input}`);
          console.log(response)
          if (response.data[0].Status === "Error" || !response.data[0].PostOffice) {
            setError("No results found for this pincode");
          } else {
            setPin(response.data[0].PostOffice);
          }
        }
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        console.log("loading close")
        setLoading(false);
      }
    }, 1000);


    return () => clearTimeout(timer);
  }, [input]);



  const clearInput = () => {
    setInput("");
    setName([]);
    setPin([]);
    setError("");
    setMode(null);
    inputRef.current?.focus();
  };

  const hasResults = name.length > 0 || pin.length > 0;

  return (
    <div className="app-bg">
      {/* <div className="app-overlay" /> */}
      <div className="app-content container d-flex flex-column align-items-center pt-5 pb-5 px-3">

        <div className="search-wrapper position-relative">
          <div className="search-glow" />
          <div className="search-input-wrapper">
            <div className="ps-3" style={{ color: "#94a3b8" }}>
              <SearchIcon />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              placeholder="Enter city, area or 6-digit pincode..."
              onChange={(e) => setInput(e.target.value)}
              className="search-input"
            />
            <div className="d-flex align-items-center gap-2 pe-3">
              {loading && <SpinnerIcon />}
              {input && !loading && (
                <button onClick={clearInput} className="icon-btn">
                  <XIcon />
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Search Box */}
        <div className="w-100 position-relative d-flex justify-content-center" style={{ maxWidth: 672 }}>



          {/* Mode Badge */}
          {mode && !loading && (
            <div className="d-flex align-items-center gap-2 mt-2 px-1 justify-content-center">
              <span
                className="d-inline-flex align-items-center gap-1 fw-medium px-2 py-1 rounded-pill"
                style={{
                  fontSize: "0.75rem",
                  background: mode === "pincode" ? "rgba(245, 159, 11, 0.8)" : "rgba(106, 106, 244, 0.69)",
                  color: mode === "pincode" ? "#f1f39f" : "#dddeed",
                  border: `1px solid ${mode === "pincode" ? "rgba(245, 158, 11, 0.2)" : "rgba(99, 102, 241, 0.2)"}`,
                }}
              >
                {mode === "pincode" ? <PostIcon /> : <MapPinIcon />}
                {mode === "pincode" ? "Pincode Lookup" : "Location Search"}
              </span>
              {hasResults && (
                <span style={{ fontSize: "1rem", color: "#eff0f3" }}>
                  {name.length > 0
                    ? `${name.length} result${name.length > 1 ? "s" : ""} found`
                    : `${pin.length} post office${pin.length > 1 ? "s" : ""} found`}
                </span>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              className="d-flex align-items-center gap-2 mt-3 px-3 py-3 rounded-3"
              style={{
                background: "#3b5898b5",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#fffdfd",
                backdropFilter: "blur(4px)",
              }}
            >
              <AlertIcon />
              <p className="mb-0 fw-medium" style={{ fontSize: "0.875rem" }}>
                {error}
              </p>
            </div>
          )}

          {/* Skeleton Loader */}
          {loading && (
            <div className="mt-3 d-flex flex-column gap-2" style={{ width: "100%" }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-3 rounded-3"
                  style={{
                    background: "rgba(30, 41, 59, 0.6)",
                    border: "1px solid rgba(71, 85, 105, 0.5)",
                  }}
                >
                  <div
                    className="rounded mb-2"
                    style={{
                      height: 16,
                      width: "75%",
                      background: "rgba(71, 85, 105, 0.6)",
                      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  />
                  <div
                    className="rounded"
                    style={{
                      height: 12,
                      width: "50%",
                      background: "rgba(71, 85, 105, 0.4)",
                      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Location Results */}
          {!loading && name.length > 0 && (
            <div className="mt-3 d-flex flex-column gap-2 site-listing">
              {name.map((loc) => {
                console.log(loc)
                return (
                  <div
                    key={loc.place_id}
                    className="glass-card glass-card-hover p-3"
                    style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                  >
                    <div className="d-flex align-items-start gap-3">
                      <div
                        className="flex-shrink-0 d-flex align-items-center justify-content-center"
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "rgba(99, 102, 241, 0.15)",
                          border: "1px solid rgba(99, 102, 241, 0.2)",
                          color: "#818cf8",
                        }}
                      >
                        <MapPinIcon />
                      </div>
                      <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        <p className="text-white fw-medium mb-2 line-clamp-2" style={{ fontSize: "0.875rem", lineHeight: 1.4 }}>
                          {loc.display_name}
                        </p>
                        <div className="d-flex flex-wrap gap-1">
                          {loc.address?.city || loc.address?.town || loc.address?.village ? (
                            <span className="badge badge-indigo" style={{ fontSize: "0.6875rem" }}>
                              {loc.address.city || loc.address.town || loc.address.village}
                            </span>
                          ) : null}
                          {loc.address?.state && (
                            <span className="badge badge-slate" style={{ fontSize: "0.6875rem" }}>
                              {loc.address.state}
                            </span>
                          )}
                          {loc.address?.postcode && (
                            <span className="badge badge-amber" style={{ fontSize: "0.6875rem" }}>
                              &#128235; {loc.address.postcode}
                            </span>
                          )}
                          {loc.type && (
                            <span className="badge badge-slate-light text-capitalize" style={{ fontSize: "0.6875rem" }}>
                              {loc.type}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                )
              })}
            </div>
          )}

          {/* Pincode Results */}
          {!loading && pin.length > 0 && (
            <div className="mt-5 d-flex flex-column gap-2 position-absolute site-listing">
              {pin.map((office, idx) => {
                console.log(office)
                return (
                  <div
                    key={idx}
                    className="glass-card p-3"
                    style={{
                      transition: "all 0.2s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(30, 41, 59, 0.85)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245, 158, 11, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(30, 41, 59, 0.7)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(71, 85, 105, 0.6)";
                    }}
                  >
                    <div className="d-flex align-items-start gap-3">
                      <div
                        className="flex-shrink-0 d-flex align-items-center justify-content-center"
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "rgba(245, 158, 11, 0.15)",
                          border: "1px solid rgba(245, 158, 11, 0.2)",
                          color: "#ffffff",
                        }}
                      >
                        <PostIcon />
                      </div>
                      <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                          <p className="text-white fw-semibold mb-0 text-truncate" style={{ fontSize: "0.875rem" }}>
                            {office.Name}
                          </p>
                          {/* <span
                          className="flex-shrink-0 badge fw-medium px-2 py-1 rounded-pill"
                          style={{
                            fontSize: "0.6875rem",
                            background: office.DeliveryStatus === "Delivery" ? "rgba(16, 185, 129, 0.1)" : "rgba(71, 85, 105, 0.4)",
                            color: office.DeliveryStatus === "Delivery" ? "#34d399" : "#94a3b8",
                            border: `1px solid ${office.DeliveryStatus === "Delivery" ? "rgba(16, 185, 129, 0.2)" : "rgba(71, 85, 105, 0.3)"}`,
                          }}
                        >
                          {office.DeliveryStatus}
                        </span> */}
                        </div>
                        <div className="d-flex flex-wrap gap-1">
                          <span className="badge badge-amber" style={{ fontSize: "0.6875rem" }}>
                            &#128235; {office.Pincode}
                          </span>
                          <span className="badge badge-slate" style={{ fontSize: "0.6875rem" }}>
                            {office.District}
                          </span>
                          <span className="badge badge-slate" style={{ fontSize: "0.6875rem" }}>
                            {office.State}
                          </span>
                          <span className="badge badge-slate-light text-capitalize" style={{ fontSize: "0.6875rem" }}>
                            {office.BranchType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <p className="mt-5 text-center mb-0" style={{ color: "rgba(148, 163, 184, 0.4)", fontSize: "0.75rem" }}>
                Powered by Nominatim & PostalPincode.in
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && input && !hasResults && mode && (
            <div className="text-center mt-4 py-5">
              <div style={{ fontSize: "2.25rem", marginBottom: 12 }}>&#128269;</div>
              <p className="mb-1" style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                No results found for <span className="text-white fw-medium">"{input}"</span>
              </p>
              <p className="mb-0" style={{ color: "#475569", fontSize: "0.75rem" }}>
                Try a different name or pincode
              </p>
            </div>
          )}

          {/* Hint */}
          {!input && (
            <div className="mt-4 row g-2" style={{ width: "90%" }}>
              <div className="col-12 col-md-6">
                <div className="glass-card p-3 h-100">
                  <div className="mb-2" style={{ color: "#60A5FA" }}>
                    <MapPinIcon />
                  </div>
                  <p className="fw-semibold mb-1" style={{ color: "#F8FAFC", fontSize: "0.75rem" }}>
                    Search by Location
                  </p>
                  <p className="mb-2" style={{ color: "#CBD5E1", fontSize: "0.75rem" }}>
                    Type any city, area, or landmark in India
                  </p>
                  <p className="mb-0 font-monospace" style={{ color: "#60A5FA", fontSize: "0.75rem" }}>
                    e.g. Mumbai, Connaught Place
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="glass-card p-3 h-100">
                  <div className="mb-2" style={{ color: "#FBBF24" }}>
                    <PostIcon />
                  </div>
                  <p className="fw-semibold mb-1" style={{ color: "#F8FAFC", fontSize: "0.75rem" }}>
                    Search by Pincode
                  </p>
                  <p className="mb-2" style={{ color: "#CBD5E1", fontSize: "0.75rem" }}>
                    Enter a valid 6-digit Indian pincode
                  </p>
                  <p className="mb-0 font-monospace" style={{ color: "#fbbf24", fontSize: "0.75rem" }}>
                    e.g. 110001, 400001
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}

      </div>
    </div>
  );
}
