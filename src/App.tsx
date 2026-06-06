import { useState, useRef, MouseEvent as ReactMouseEvent } from "react";
import "./App.css";

// BANNER ASSETS
import desktopBanner from "./assets/hero-banner/ready-set-glow-website-banner.jpg";
import mobileBanner from "./assets/hero-banner/ready-set-glow-mobile-banner.jpg";

// SHADES VARIATION ASSETS
import pinkBefore from "./assets/Shades Variation/blush-lens-pale-pink-before.jpg";
import pinkAfter from "./assets/Shades Variation/blush-lens-pale-pink-after.jpg";
import pinkCircle from "./assets/Shades Variation/blush-lens-pale-pink.jpg";

import orangeBefore from "./assets/Shades Variation/blush-lens-tan-red orange-before.jpg";
import orangeAfter from "./assets/Shades Variation/blush-lens-tan-red orange-after.jpg";
import orangeCircle from "./assets/Shades Variation/blush-lens-tan-red orange.jpg";

import redBefore from "./assets/Shades Variation/blush-lens-dark-red-before.jpg";
import redAfter from "./assets/Shades Variation/blush-lens-dark-red-after.jpg";
import redCircle from "./assets/Shades Variation/blush-lens-dark-red.jpg";

// GLOW RESULTS FOOTER ASSETS
import brightensIcon from "./assets/Glow Results/glow results_brigtens dull skin.png";
import flattersIcon from "./assets/Glow Results/glow results_flatters asian understones.png";
import softensIcon from "./assets/Glow Results/glow results_softens dark circles.png";

// 3 EASY STEPS ASSETS
import step1Img from "./assets/3 Easy Steps/step 1-ready-sunscreen.png";
import step2Img from "./assets/3 Easy Steps/step 2-set-humble matte lip mate.png";
import step3Img from "./assets/3 Easy Steps/step 3-glow-blush lens shades.png";

// CO-BRANDING SECTION IMAGES (Fixed to match image_6d6f25.png)
import fopticsBrandImg from "./assets/About brands/foptics-about-brand.jpg"; 
import pastelsBrandImg from "./assets/About brands/the pastels shop-about-brand.jpg";

interface GlowProfile {
  id: string;
  tag: string;
  tagClass: string;
  titleName: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  circleImg: string;
  price: string;
}

export default function App() {
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);
  
  // Quiz states
  const [skinTone, setSkinTone] = useState<string | null>(null);
  const [styleVibe, setStyleVibe] = useState<string | null>(null);
  const [wearTime, setWearTime] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<string | null>(null);
  
  // Checkout Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const profiles: GlowProfile[] = [
    {
      id: "pink",
      tag: "PINK",
      tagClass: "tag-pink",
      titleName: "Blush Lens — Pale Pink",
      description: "A soft, natural blush that brightens up cool-toned skin, giving a youthful, fresh glow.",
      beforeImg: pinkBefore,
      afterImg: pinkAfter,
      circleImg: pinkCircle,
      price: "$39.00"
    },
    {
      id: "red-orange",
      tag: "RED-ORANGE",
      tagClass: "tag-orange",
      titleName: "Blush Lens — Red Orange",
      description: "A warm vibrant, healthy glow that perfects medium-to-tan skin, hiding subtle dullness and dark circles.",
      beforeImg: orangeBefore,
      afterImg: orangeAfter,
      circleImg: orangeCircle,
      price: "$39.00"
    },
    {
      id: "red",
      tag: "RED",
      tagClass: "tag-red",
      titleName: "Blush Lens — Deep Red",
      description: "A bold, deep crimson vibe that delivers maximum rich depth, giving dark skin a bold, sculpted look.",
      beforeImg: redBefore,
      afterImg: redAfter,
      circleImg: redCircle,
      price: "$39.00"
    }
  ];

  const handleQuizSelection = (category: string, value: string) => {
    let currentSkin = skinTone;
    let currentVibe = styleVibe;

    if (category === "skin") { setSkinTone(value); currentSkin = value; }
    if (category === "vibe") { setStyleVibe(value); currentVibe = value; }
    if (category === "wear") { setWearTime(value); }

    // Quiz logic matching rules
    if (currentSkin && currentVibe) {
      let finalMatch = "red"; 

      if (currentSkin === "Pale" && currentVibe !== "Bold & Confident") {
        finalMatch = "pink";
      } else if (currentSkin === "Tan" && currentVibe !== "Bold & Confident") {
        finalMatch = "red-orange";
      } else if (currentSkin === "Dark" || currentVibe === "Bold & Confident") {
        finalMatch = "red";
      }

      setMatchResult(finalMatch);
      setActiveHighlight(finalMatch);

      // Instantly open the conversion checkout popup card
      setTimeout(() => {
        setIsModalOpen(true);
      }, 350);
    }
  };

  const resetQuiz = () => {
    setSkinTone(null);
    setStyleVibe(null);
    setWearTime(null);
    setMatchResult(null);
    setActiveHighlight(null);
    setIsModalOpen(false);
  };

  const matchedProduct = profiles.find(p => p.id === matchResult);

  return (
    <div className="app-container">
      
      {/* GLOBAL HEADER BAR */}
      <nav className="navbar">
        <div className="logo">foptics</div>
        <div className="nav-menu-desktop">
          <a href="#glow-section">See the Instant Glow</a>
          <a href="#steps-section">3 Easy Steps</a>
          <a href="#quiz-section">Find Match</a>
          <a href="#partnership-section">Our Story</a>
        </div>
        <div className="cart-status">🛒 (0)</div>
      </nav>

      {/* HERO HERO SECTION */}
      <section id="banner" className="hero-section">
        <div className="hero-viewport-desktop">
          <img src={desktopBanner} alt="Desktop Banner" className="full-width-banner" />
        </div>
        <div className="hero-viewport-mobile">
          <img src={mobileBanner} alt="Mobile Banner" className="full-width-banner" />
        </div>
      </section>

      {/* INTERACTIVE SHADES COMPONENT */}
      <section id="glow-section" className="instant-glow-section">
        <div className="section-title-container">
          <h2>See the <span className="highlight-pink">Instant Glow</span></h2>
          <p className="slider-instruction">Drag the slider to see the results!</p>
        </div>

        <div className="glow-matrix-grid">
          {profiles.map((profile) => (
            <div 
              key={profile.id} 
              className={`glow-profile-card ${activeHighlight === profile.id ? "matched-highlight" : ""}`}
            >
              {activeHighlight === profile.id && <div className="match-banner-badge">YOUR PERFECT MATCH! ✨</div>}
              <ComparisonSlider before={profile.beforeImg} after={profile.afterImg} />
              
              <div className="lens-showcase-box">
                <img src={profile.circleImg} alt={profile.tag} className="lens-large-display" />
              </div>

              <div className="profile-text-block">
                <span className={`profile-tag ${profile.tagClass}`}>{profile.tag}</span>
                <div className="description-bubble">
                  <p>{profile.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GLOW RESULTS FOOTER */}
        <div className="glow-results-footer">
          <h3>Glow Results</h3>
          <div className="badge-pills-row">
            <div className="badge-pill">
              <div className="pill-graphic-circle">
                <img src={brightensIcon} alt="Brightens" className="footer-badge-icon" />
              </div>
              <span className="pill-text">Brightens dull skin tones</span>
            </div>
            <div className="badge-pill">
              <div className="pill-graphic-circle">
                <img src={softensIcon} alt="Softens" className="footer-badge-icon" />
              </div>
              <span className="pill-text">Softens dark circles</span>
            </div>
            <div className="badge-pill">
              <div className="pill-graphic-circle">
                <img src={flattersIcon} alt="Flatters" className="footer-badge-icon" />
              </div>
              <span className="pill-text">Flatters Asian undertones</span>
            </div>
          </div>
        </div>

        {/* 3 EASY STEPS BLOCK */}
        <div id="steps-section" className="steps-showcase-container">
          <h2 className="steps-main-title">Get glow-ready in <br className="mobile-break" /> <span className="highlight-pink">3 easy steps</span></h2>
          <p className="steps-subtitle">a simple routine that leaves you looking fresh, bright, and effortless.</p>
          
          <div className="steps-grid-layout">
            <div className="step-card-item">
              <div className="step-image-frame"><img src={step1Img} alt="Step 1" /></div>
              <div className="step-badge-wrapper">
                <span className="step-badge-pill">STEP 01</span>
                <span className="step-badge-title">READY</span>
              </div>
              <p className="step-card-text">from strongly prepping your skin with a glow-giving sunscreen.</p>
            </div>

            <div className="step-card-item">
              <div className="step-image-frame"><img src={step2Img} alt="Step 2" /></div>
              <div className="step-badge-wrapper">
                <span className="step-badge-pill">STEP 02</span>
                <span className="step-badge-title">SET</span>
              </div>
              <p className="step-card-text">bring in the look; a quick lip-matte to add color and keep you looking put-together.</p>
            </div>

            <div className="step-card-item">
              <div className="step-image-frame"><img src={step3Img} alt="Step 3" /></div>
              <div className="step-badge-wrapper">
                <span className="step-badge-pill">STEP 03</span>
                <span className="step-badge-title">GLOW!</span>
              </div>
              <p className="step-card-text">finish it off with look! search visually matching look for your soft, effortless glow!</p>
            </div>
          </div>

          <div className="cta-action-row">
            <h4 className="cta-footer-heading">Glow essentials for <br className="mobile-break" /> on-the-go days</h4>
            <p className="cta-footer-subtext">Get yours before it's gone!</p>
            <button className="shop-now-cta-button">SHOP NOW!</button>
          </div>
        </div>

        {/* QUIZ MODULE CONTAINER */}
        <div id="quiz-section" className="quiz-showcase-container">
          <h2 className="quiz-main-title">Find Your <span className="highlight-pink">Perfect Match</span></h2>
          <p className="quiz-subtitle">Take our quick quiz to discover your ideal blush lens</p>
          
          <div className="quiz-pink-box-card">
            <div className="quiz-question-block">
              <p className="quiz-question-heading">What's your skin tone?</p>
              <div className="quiz-options-vertical">
                {["Pale", "Tan", "Dark"].map((opt) => (
                  <button 
                    key={opt}
                    className={`quiz-option-btn ${skinTone === opt ? "selected" : ""}`}
                    onClick={() => handleQuizSelection("skin", opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="quiz-question-block">
              <p className="quiz-question-heading">What's your style vibes?</p>
              <div className="quiz-options-vertical">
                {["Minimalist Chic", "Bold & Confident", "Soft & Romantic"].map((opt) => (
                  <button 
                    key={opt}
                    className={`quiz-option-btn ${styleVibe === opt ? "selected" : ""}`}
                    onClick={() => handleQuizSelection("vibe", opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="quiz-question-block">
              <p className="quiz-question-heading">When will you wear them most?</p>
              <div className="quiz-options-vertical">
                {["Daily Commute", "Outdoor Activities", "Special Occasions"].map((opt) => (
                  <button 
                    key={opt}
                    className={`quiz-option-btn ${wearTime === opt ? "selected" : ""}`}
                    onClick={() => handleQuizSelection("wear", opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {matchResult && (
              <div className="quiz-result-inline-message">
                <p>✨ Match Detected! Your window is open below. ✨</p>
                <button className="open-popup-trigger-btn" onClick={() => setIsModalOpen(true)}>
                  Re-Open Match Product Window 🛍️
                </button>
                <br />
                <button className="reset-quiz-btn" onClick={resetQuiz}>Retake Quiz 🔄</button>
              </div>
            )}
          </div>
        </div>

        {/* NEW CO-BRANDING COLLABORATION SHOWCASE */}
        <div id="partnership-section" className="partnership-showcase-container">
          <h2 className="partnership-main-title">foptics x the pastels shop</h2>
          <p className="partnership-subtitle">Eyewear Purpose | Beauty Purpose</p>
          
          <div className="partnership-grid-layout">
            <div className="partner-brand-card">
              <div className="partner-image-viewport">
                <img src={fopticsBrandImg} alt="foptics collective lifestyle" />
              </div>
              <div className="partner-label-pill">foptics</div>
              <p className="partner-body-description">
                foptics is all about making eyewear fun again. Always stylishly positive, up-to-the-moment shapes customized for your confidence.
              </p>
            </div>

            <div className="partner-brand-card">
              <div className="partner-image-viewport">
                <img src={pastelsBrandImg} alt="the pastels shop skincare items" />
              </div>
              <div className="partner-label-pill">the pastels shop</div>
              <p className="partner-body-description">
                The Pastels Shop is all about skin barrier health, clear formulation science, and recipes that focus on low management requirements with maximum glow and clarity!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHECKOUT POPUP MODAL COMPONENT */}
      {isModalOpen && matchedProduct && (
        <div className="modal-overlay-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-surface-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-x-btn" onClick={() => setIsModalOpen(false)}>×</button>
            
            <div className="modal-layout-body">
              <div className="modal-product-image-pane">
                <img src={matchedProduct.circleImg} alt={matchedProduct.titleName} className="modal-lens-preview" />
                <div className="modal-sparkle-badge">YOUR MATCH ✨</div>
              </div>

              <div className="modal-details-pane">
                <span className={`modal-mini-tag ${matchedProduct.tagClass}`}>{matchedProduct.tag} LOOK</span>
                <h3 className="modal-product-title">{matchedProduct.titleName}</h3>
                <p className="modal-product-price">{matchedProduct.price}</p>
                <p className="modal-product-explanation">{matchedProduct.description}</p>
                
                <div className="modal-incentive-box">
                  ⚡ Free shipping included on this customized match!
                </div>

                <button className="modal-checkout-cta-btn" onClick={() => alert("Forwarding user to shopify checkout with: " + matchedProduct.titleName)}>
                  ADD TO CART & CHECKOUT NOW
                </button>
                
                <button className="modal-continue-shopping" onClick={() => setIsModalOpen(false)}>
                  Keep exploring options
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function ComparisonSlider({ before, after }: { before: string; after: string }) {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const processMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (e.buttons === 1) processMove(e.clientX);
  };

  const handleTouchMove = (e: any) => {
    if (e.touches && e.touches[0]) processMove(e.touches[0].clientX);
  };

  return (
    <div className="slider-wrapper-component" ref={containerRef} onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
      <img src={after} alt="After" className="slider-img img-after" />
      <div className="slider-clipped-layer" style={{ width: `${sliderPos}%` }}>
        <img src={before} alt="Before" className="slider-img img-before" />
      </div>
      <div className="slider-handle-bar" style={{ left: `${sliderPos}%` }}>
        <div className="slider-handle-button"><span>‹›</span></div>
      </div>
    </div>
  );
}