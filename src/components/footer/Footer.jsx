import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="redfin-footer">
      <div className="container-fluid px-4 pt-5 pb-3">

        {/* ── ROW 1: Navigation columns ── */}
        <div className="row g-4 mb-4">

          {/* Column 1 - Join us */}
          <div className="col-12 col-sm-6 col-lg-3">
            <h6 className="footer-section-title mb-3">Join us</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#">Become an Agent</a></li>
              <li><a href="#">Get referrals</a></li>
              <li><a href="#">Careers</a></li>
            </ul>

            <h6 className="footer-section-title mt-4 mb-3">Find homes faster</h6>
            <div className="d-flex flex-column gap-2">
              {/* App Store Button */}
              <a href="#" className="app-store-btn d-inline-flex align-items-center">
                <i className="bi bi-apple me-2 fs-5"></i>
                <div className="d-flex flex-column">
                  <span className="app-store-sub">Download on the</span>
                  <span className="app-store-main">App Store</span>
                </div>
              </a>
              {/* Google Play Button */}
              <a href="#" className="app-store-btn d-inline-flex align-items-center">
                <svg className="me-2" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.18 1.56L13.58 12 3.18 22.44A2 2 0 012 20.73V3.27a2 2 0 011.18-1.71z" fill="#EA4335"/>
                  <path d="M20.4 10.24l-2.94-1.68-4.12 3.44 4.12 3.44 2.97-1.7a1.5 1.5 0 000-2.6l-.03-.9z" fill="#FBBC04"/>
                  <path d="M13.58 12L3.18 1.56a2 2 0 012.14.24l11.14 6.36L13.58 12z" fill="#34A853"/>
                  <path d="M3.18 22.44a2 2 0 002.14-.24l11.14-6.36L13.58 12 3.18 22.44z" fill="#4285F4"/>
                </svg>
                <div className="d-flex flex-column">
                  <span className="app-store-sub">GET IT ON</span>
                  <span className="app-store-main">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Column 2 - About us */}
          <div className="col-12 col-sm-6 col-lg-3">
            <h6 className="footer-section-title mb-3">About us</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#">Why Redfin?</a></li>
              <li><a href="#">Community Impact</a></li>
              <li><a href="#">Inclusion</a></li>
              <li><a href="#">Culture</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Real Estate News</a></li>
            </ul>
          </div>

          {/* Column 3 - Find us / Socials / Subsidiaries */}
          <div className="col-12 col-sm-6 col-lg-3">
            <h6 className="footer-section-title mb-3">Find us</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Advertise</a></li>
            </ul>

            {/* Social Icons */}
            <div className="d-flex gap-3 my-3">
              <a href="#" className="social-icon" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-icon" aria-label="X (Twitter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.835L2.187 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="TikTok">
                <i className="bi bi-tiktok"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
            </div>

            <h6 className="footer-section-title mt-3 mb-3">Subsidiaries</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#" className="fw-semibold">Rent.</a></li>
              <li><a href="#">ApartmentGuide</a></li>
            </ul>
          </div>

          {/* Column 4 - Affiliated Business / Countries */}
          <div className="col-12 col-sm-6 col-lg-3">
            <h6 className="footer-section-title mb-3">Affiliated Business</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#">Rocket Close</a></li>
              <li><a href="#">Rocket Mortgage</a></li>
            </ul>

            <h6 className="footer-section-title mt-4 mb-3">Countries</h6>
            <ul className="list-unstyled footer-links">
              <li className="d-flex align-items-center gap-2">
                <span>🇺🇸</span>
                <a href="#">United States</a>
              </li>
              <li className="d-flex align-items-center gap-2 mt-1">
                <span>🇨🇦</span>
                <a href="#" className="canada-link fw-semibold">Canada</a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── DIVIDER ── */}
        <hr className="footer-divider" />

        {/* ── ROW 2: Legal / Copyright ── */}
        <div className="row mt-3">
          <div className="col-12">
            <div className="legal-section text-center">

              <p className="legal-text">
                Copyright: © 2026 Redfin. All rights reserved.
              </p>
              <p className="legal-text">
                Updated September 2025: By searching, you agree to the{" "}
                <a href="#" className="legal-link fw-semibold">Terms of Use</a>, and{" "}
                <a href="#" className="legal-link fw-semibold">Privacy Policy</a>.
              </p>
              <p className="legal-text">
                <a href="#" className="legal-link fw-semibold">
                  Do not sell or share my personal information.
                </a>
              </p>
              <p className="legal-text">
                REDFIN and all REDFIN variants, WALK SCORE, and the R logos, are trademarks of
                Redfin Corporation, registered or pending in the USPTO.
              </p>
              <p className="legal-text">California DRE #01521930</p>
              <p className="legal-text">
                Redfin is licensed to do business in New York as Redfin Real Estate.{" "}
                <a href="#" className="legal-link fw-semibold">NY Standard Operating Procedures</a>
              </p>
              <p className="legal-text">
                New Mexico{" "}
                <a href="#" className="legal-link fw-semibold">Real Estate Licenses</a>
              </p>
              <p className="legal-text">
                TREC:{" "}
                <a href="#" className="legal-link fw-semibold">Info About Brokerage Services</a>,{" "}
                <a href="#" className="legal-link fw-semibold">Consumer Protection Notice</a>
              </p>
              <p className="legal-text">
                All mortgage lending products and information are provided by Rocket Mortgage, LLC |
                NMLS #3030;{" "}
                <a href="#" className="legal-link fw-semibold">www.NMLSConsumerAccess.org</a>.{" "}
                <span className="fw-semibold">Licensed in 50 states.</span> This site is not
                authorized by the New York State Department of Financial Services for mortgage
                solicitation or loan applications activities related to properties located in the
                State of New York.
              </p>
              <p className="legal-text">
                Redfin Corporation is an affiliated business of Rocket Limited Partnership. Each
                company, and their subsidiaries, are separate legal entities operated and managed
                through its own management and governance structures.
              </p>
              <p className="legal-text">
                If you are using a screen reader, or having trouble reading this website, please
                call Redfin Customer Support for help at{" "}
                <a href="tel:18447597732" className="legal-link fw-semibold">
                  1-844-759-7732
                </a>.
              </p>

              {/* Fair Housing Notice */}
              <div className="d-flex align-items-start justify-content-center gap-3 mt-3 fair-housing">
                <div className="fair-housing-logo flex-shrink-0">
                  <svg width="52" height="52" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="80" height="80" rx="4" fill="#e8e8e8"/>
                    <polygon points="40,10 70,35 65,35 65,70 15,70 15,35 10,35" fill="none" stroke="#333" strokeWidth="3"/>
                    <rect x="30" y="50" width="20" height="20" fill="none" stroke="#333" strokeWidth="2.5"/>
                    <rect x="22" y="35" width="12" height="12" fill="none" stroke="#333" strokeWidth="2"/>
                    <rect x="46" y="35" width="12" height="12" fill="none" stroke="#333" strokeWidth="2"/>
                    <text x="40" y="25" textAnchor="middle" fontSize="7" fill="#333" fontWeight="bold">EQUAL</text>
                    <text x="40" y="78" textAnchor="middle" fontSize="5.5" fill="#333">HOUSING</text>
                  </svg>
                </div>
                <p className="legal-text mb-0">
                  <span className="fw-bold">
                    REDFIN IS COMMITTED TO AND ABIDES BY THE FAIR HOUSING ACT AND EQUAL
                    OPPORTUNITY ACT. READ REDFIN'S{" "}
                  </span>
                  <a href="#" className="legal-link fw-bold">FAIR HOUSING POLICY</a>
                  <span className="fw-bold"> AND THE </span>
                  <a href="#" className="legal-link fw-bold">NEW YORK STATE FAIR HOUSING NOTICE</a>
                  <span className="fw-bold">.</span>
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
