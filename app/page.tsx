"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
});

/* =========================================================
   HERO SLIDES
========================================================= */

const heroSlides = [
  {
    top: "Extraordinary",
    bottom: "Dining Experiences",
    description:
      "Discover exceptional flavours, beautiful presentation and memorable moments created around the table.",
  },
  {
    top: "Unforgettable",
    bottom: "Culinary Moments",
    description:
      "A refined dining experience where fresh ingredients, creativity and atmosphere come together.",
  },
  {
    top: "Authentic",
    bottom: "Local Flavours",
    description:
      "Inspired dishes, carefully prepared ingredients and a dining experience full of character.",
  },
  {
    top: "Beautiful",
    bottom: "Moments Together",
    description:
      "More than a meal. A place to share, enjoy and create memories around the table.",
  },
];

/* =========================================================
   MAGNETIC BUTTON
========================================================= */

function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  const buttonRef =
    useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const button = buttonRef.current;

    if (!button) return;

    const rect =
      button.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    button.style.setProperty(
      "--mouse-x",
      `${event.clientX - rect.left}px`
    );

    button.style.setProperty(
      "--mouse-y",
      `${event.clientY - rect.top}px`
    );

    button.style.transform =
      `translate(${x * 0.11}px, ${y * 0.18}px)`;
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;

    if (!button) return;

    button.style.transform =
      "translate(0px, 0px)";
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      className={`hero-button hero-button--${variant}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className="hero-button__background" />

      <span className="hero-button__content">
        <span className="hero-button__label">
          {children}
        </span>

        <span className="hero-button__arrow">
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              d="M5 15L15 5M8 5H15V12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </a>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
  const [heroIndex, setHeroIndex] =
    useState(0);

  const [heroPhase, setHeroPhase] =
    useState<"enter" | "leave">(
      "enter"
    );

  useEffect(() => {
    let timeout: number | undefined;

    const interval =
      window.setInterval(() => {
        setHeroPhase("leave");

        timeout =
          window.setTimeout(() => {
            setHeroIndex(
              (previous) =>
                (previous + 1) %
                heroSlides.length
            );

            setHeroPhase("enter");
          }, 700);
      }, 4500);

    return () => {
      window.clearInterval(interval);

      if (timeout !== undefined) {
        window.clearTimeout(timeout);
      }
    };
  }, []);

  const hero =
    heroSlides[heroIndex];

  return (
    <main
      className={`
        ${cormorant.variable}
        ${manrope.variable}
        hero-page
      `}
    >
      <section className="hero">

        {/* =================================================
            HOME VIDEO
        ================================================= */}

        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source
            src="/hero-video.mp4"
            type="video/mp4"
          />
        </video>

        {/* =================================================
            OVERLAYS
        ================================================= */}

        <div className="hero__overlay" />
        <div className="hero__vignette" />
        <div className="hero__bottom-shade" />

        {/* =================================================
            LOGO
        ================================================= */}

        <div className="hero__brand">
          <div className="hero__logo">
            <Image
              src="/table-chef-logo-new.png"
              alt="Table Chef"
              fill
              priority
              sizes="260px"
              className="object-contain"
            />
          </div>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="hero__content">

          <div className="hero__text-area">

            <h1 className="hero__title">

              <span className="hero__mask hero__mask--top">

                <span
                  key={`top-${heroIndex}`}
                  className={`hero__title-top ${
                    heroPhase === "enter"
                      ? "is-entering"
                      : "is-leaving"
                  }`}
                >
                  {hero.top}
                </span>

              </span>

              <span className="hero__mask hero__mask--bottom">

                <span
                  key={`bottom-${heroIndex}`}
                  className={`hero__title-bottom ${
                    heroPhase === "enter"
                      ? "is-entering"
                      : "is-leaving"
                  }`}
                >
                  {hero.bottom}
                </span>

              </span>

            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div className="hero__description-mask">

              <p
                key={`description-${heroIndex}`}
                className={`hero__description ${
                  heroPhase === "enter"
                    ? "is-entering"
                    : "is-leaving"
                }`}
              >
                {hero.description}
              </p>

            </div>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="hero__actions">

              <MagneticButton
                href="/menu"
                variant="primary"
              >
                OUR MENUS
              </MagneticButton>

              <MagneticButton
                href="#booking"
                variant="outline"
              >
                BOOK YOUR TABLE
              </MagneticButton>

            </div>

          </div>

        </div>

      </section>
    </main>
  );
}