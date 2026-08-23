"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Cormorant_Garamond,
  Manrope,
  Michroma,
} from "next/font/google";

import {
  AnimatePresence,
  motion,
} from "motion/react";

/* =========================================================
   FONTS
========================================================= */

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
});

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
});

/* =========================================================
   TYPES
========================================================= */

type Dish = {
  category: string;
  french: string;
  english: string;
  price: string;
  note?: string;
  image: string;
};

function splitEditorialTitle(text: string) {
  const commaIndex = text.indexOf(",");

  if (commaIndex > 0) {
    return {
      roman: text.slice(0, commaIndex).trim(),
      italic: text.slice(commaIndex + 1).trim(),
    };
  }

  const words = text.trim().split(/\s+/);

  if (words.length <= 2) {
    return {
      roman: words[0] ?? text,
      italic: words.slice(1).join(" "),
    };
  }

  const italicCount = words.length >= 5 ? 2 : 1;

  return {
    roman: words.slice(0, -italicCount).join(" "),
    italic: words.slice(-italicCount).join(" "),
  };
}


/* =========================================================
   STARTERS
========================================================= */

const starters: Dish[] = [
  {
    category: "Entrée / Starter",
    french:
      "Carpaccio d’ourite, vinaigrette d’agrumes, chutney d’aubergine et tomate grillée au feu de bois",
    english:
      "Octopus Carpaccio with citrus dressing, eggplant chutney and grilled tomato",
    price: "Rs 550",
    image: "/menu/octopus-carpaccio.png",
  },

  {
    category: "Entrée / Starter",
    french:
      "Burrata Mozzarella à la sauce pesto",
    english:
      "Mozzarella Burrata with pesto sauce",
    price: "Rs 525",
    image: "/menu/octopus-carpaccio.png",
  },

  {
    category: "Entrée / Starter",
    french:
      "Salade César Classique",
    english:
      "Classic Caesar Salad",
    price: "Rs 650",
    image: "/menu/starter-3.jpg",
  },

  {
    category: "Entrée / Starter",
    french:
      "Tartare de thon au gingembre confit et sauce soja",
    english:
      "Tuna Tartare with pickled ginger and soya sauce",
    price: "Rs 650",
    image: "/menu/starter-4.jpg",
  },

  {
    category: "Entrée / Starter",
    french:
      "Poke Bowl du Chef",
    english:
      "Chef Poke Bowl",
    price: "Rs 700",
    image: "/menu/starter-5.jpg",
  },
];

/* =========================================================
   SOUPS
========================================================= */

const soups: Dish[] = [
  {
    category: "Soupe / Soup",
    french:
      "Soupe Tom Yam",
    english:
      "Tom Yam Soup",
    price: "Rs 500",
    image: "/menu/starter-1.jpg",
  },

  {
    category: "Soupe / Soup",
    french:
      "Crème de légumes à l’huile d’olive noire",
    english:
      "Creamy Vegetable Soup with black olive oil",
    price: "Rs 450",
    image: "/menu/starter-2.jpg",
  },
];

/* =========================================================
   PASTA
========================================================= */

const pasta: Dish[] = [
  {
    category: "Pâtes / Pasta",
    french:
      "Pâtes à la sauce bolognaise et parmesan",
    english:
      "Bolognese Pasta with Parmesan cheese",
    price: "Rs 600",
    note:
      "Choice of Spaghetti or Tagliatelle",
    image: "/menu/main-1.jpg",
  },

  {
    category: "Pâtes / Pasta",
    french:
      "Pâtes crémeuses aux fruits de mer",
    english:
      "Seafood Pasta in creamy sauce",
    price: "Rs 850",
    note:
      "Choice of Spaghetti or Tagliatelle",
    image: "/menu/main-2.jpg",
  },
];

/* =========================================================
   MAURITIAN CORNER
========================================================= */

const mauritian: Dish[] = [
  {
    category:
      "Coin Mauricien / Mauritian Corner",
    french:
      "Curry de poulet et crevettes façon grand-mère",
    english:
      "Chicken and Prawns Curry, grandma style",
    price: "Rs 680",
    note:
      "Served with rice and grains of the day",
    image: "/menu/main-3.jpg",
  },

  {
    category:
      "Coin Mauricien / Mauritian Corner",
    french:
      "Salmi d’agneau et salade",
    english:
      "Lamb Salmi with salad",
    price: "Rs 700",
    note:
      "Served with rice and grains of the day",
    image: "/menu/main-4.jpg",
  },

  {
    category:
      "Coin Mauricien / Mauritian Corner",
    french:
      "Korma de crevettes aux noix de cajou",
    english:
      "Prawns Korma with cashew nuts",
    price: "Rs 850",
    note:
      "Served with rice and grains of the day",
    image: "/menu/main-5.jpg",
  },
];

/* =========================================================
   GRILL CORNER
========================================================= */

const grill: Dish[] = [
  {
    category:
      "Coin Grillé / Grill Corner",
    french:
      "Assiette Combo pour 2 personnes",
    english:
      "Combo Plate for 2 Persons",
    price: "Rs 1,500",
    note:
      "Chicken, lamb shoulder, prawns skewer, saffron rice and salad",
    image: "/menu/main-1.jpg",
  },

  {
    category:
      "Coin Grillé / Grill Corner",
    french:
      "Poisson du jour, légumes, purée et sauce créole",
    english:
      "Catch of the Day with vegetables, mashed potato and Creole sauce",
    price: "Rs 750",
    image: "/menu/main-2.jpg",
  },

  {
    category:
      "Coin Grillé / Grill Corner",
    french:
      "Camaron grillé, légumes, riz et sauce à l’ail",
    english:
      "Grilled Rosenbergii with vegetables, rice and garlic sauce",
    price: "Rs 1,100",
    image: "/menu/main-3.jpg",
  },

  {
    category:
      "Coin Grillé / Grill Corner",
    french:
      "Cuisse de poulet rôtie au miel, pomme au four et sauce au poivre",
    english:
      "Honey Roasted Chicken Leg with jacket potato and pepper sauce",
    price: "Rs 680",
    image: "/menu/main-4.jpg",
  },
];

/* =========================================================
   DESSERTS
========================================================= */

const desserts: Dish[] = [
  {
    category: "Dessert",
    french:
      "Cheesecake aux fruits rouges",
    english:
      "Red Berries Cheesecake",
    price: "Rs 480",
    image: "/menu/dessert-1.jpg",
  },

  {
    category: "Dessert",
    french:
      "Ananas rôti et sorbet coco",
    english:
      "Roasted Pineapple with Coconut Sorbet",
    price: "Rs 450",
    image: "/menu/dessert-2.jpg",
  },

  {
    category: "Dessert",
    french:
      "Opéra",
    english:
      "Opera",
    price: "Rs 550",
    image: "/menu/dessert-3.jpg",
  },

  {
    category: "Dessert",
    french:
      "Moelleux au chocolat et glace vanille",
    english:
      "Chocolate Moelleux with Vanilla Ice Cream",
    price: "Rs 580",
    image: "/menu/dessert-4.jpg",
  },

  {
    category: "Dessert",
    french:
      "Crème brûlée et compote d’agrumes",
    english:
      "Crème Brûlée with Citrus Compote",
    price: "Rs 450",
    image: "/menu/dessert-1.jpg",
  },

  {
    category: "Dessert",
    french:
      "Panna cotta au coulis de passion",
    english:
      "Panna Cotta with Passion Fruit Coulis",
    price: "Rs 480",
    image: "/menu/dessert-2.jpg",
  },
];

/* =========================================================
   MENU SLIDER
========================================================= */

function MenuSlider({
  id,
  number,
  eyebrow,
  title,
  description,
  dishes,
}: {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  dishes: Dish[];
}) {
  const [current, setCurrent] =
    useState(0);

  const [direction, setDirection] =
    useState(1);

  const dish =
    dishes[current];

  const dishTitle =
    splitEditorialTitle(dish.english);

  const sectionTitle =
    splitEditorialTitle(title);

  /* =========================================================
     NEXT
  ========================================================= */

  const next = () => {
    setDirection(1);

    setCurrent(
      (previous) =>
        (previous + 1) %
        dishes.length
    );
  };

  /* =========================================================
     PREVIOUS
  ========================================================= */

  const previous = () => {
    setDirection(-1);

    setCurrent(
      (previous) =>
        (
          previous -
          1 +
          dishes.length
        ) %
        dishes.length
    );
  };

  /* =========================================================
     IMAGE ANIMATION
  ========================================================= */

  const imageVariants = {
    enter: (
      direction: number
    ) => ({
      x:
        direction > 0
          ? 90
          : -90,

      opacity: 0,

      scale: 0.9,

      rotate:
        direction > 0
          ? 3
          : -3,

      filter:
        "blur(12px)",
    }),

    center: {
      x: 0,

      opacity: 1,

      scale: 1,

      rotate: 0,

      filter:
        "blur(0px)",
    },

    exit: (
      direction: number
    ) => ({
      x:
        direction > 0
          ? -90
          : 90,

      opacity: 0,

      scale: 0.92,

      rotate:
        direction > 0
          ? -3
          : 3,

      filter:
        "blur(12px)",
    }),
  };

  return (
    <section
      className="tc-dimension"
      id={id}
    >

      {/* =================================================
          ANIMATED BACKGROUND
      ================================================= */}

      <div className="tc-fx">

        {/* GLOW ONE */}

        <motion.div
          className="
            tc-fx__orb
            tc-fx__orb--one
          "
          animate={{
            x: [
              0,
              80,
              20,
              -35,
              0,
            ],

            y: [
              0,
              -55,
              30,
              15,
              0,
            ],

            scale: [
              1,
              1.15,
              0.96,
              1.08,
              1,
            ],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* GLOW TWO */}

        <motion.div
          className="
            tc-fx__orb
            tc-fx__orb--two
          "
          animate={{
            x: [
              0,
              -80,
              -25,
              45,
              0,
            ],

            y: [
              0,
              30,
              -40,
              15,
              0,
            ],

            scale: [
              1,
              0.9,
              1.18,
              1,
            ],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* LARGE MOVING RING */}

        <motion.div
          className="
            tc-fx__ring
            tc-fx__ring--one
          "
          animate={{
            rotate: [
              0,
              360,
            ],
          }}
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span />
        </motion.div>

        {/* SECOND RING */}

        <motion.div
          className="
            tc-fx__ring
            tc-fx__ring--two
          "
          animate={{
            rotate: [
              360,
              0,
            ],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span />
        </motion.div>

        {/* PARTICLE 1 */}

        <motion.span
          className="
            tc-fx__particle
            tc-fx__particle--1
          "
          animate={{
            y: [
              0,
              -35,
              0,
            ],

            opacity: [
              0.25,
              1,
              0.25,
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* PARTICLE 2 */}

        <motion.span
          className="
            tc-fx__particle
            tc-fx__particle--2
          "
          animate={{
            x: [
              0,
              20,
              0,
            ],

            y: [
              0,
              35,
              0,
            ],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

      </div>

      {/* =================================================
          SECTION TITLE
      ================================================= */}

      <motion.div
        className="
          tc-dimension__heading
        "
        initial={{
          opacity: 0,
          y: 65,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.9,

          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
      >

        <div
          className="
            tc-category-heading
          "
        >

          <span
            className="
              tc-category-heading__number
            "
          >
            {number}
          </span>

          <div>

            <p
              className="
                tc-category-heading__eyebrow
              "
            >
              {eyebrow}
            </p>

            <h2 className="tc-category-heading__title">
              <span className="tc-category-heading__roman">
                {sectionTitle.roman}
              </span>{" "}
              {sectionTitle.italic && (
                <span className="tc-category-heading__italic">
                  {sectionTitle.italic}
                </span>
              )}
            </h2>

          </div>

        </div>

        <div
          className="
            tc-dimension__heading-copy
          "
        >

          <p>
            {description}
          </p>

        </div>

      </motion.div>

      {/* =================================================
          SLIDER
      ================================================= */}

      <div className="tc-slider">

        {/* =================================================
            IMAGE
        ================================================= */}

        <div
          className="
            tc-slider__visual
          "
        >

          <motion.div
            className="
              tc-slider__circle
            "
            whileHover={{
              scale: 1.025,
            }}
            transition={{
              duration: 0.5,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >

            <div
              className="
                tc-slider__circle-ring
              "
            />

            <AnimatePresence
              custom={
                direction
              }
              mode="wait"
            >

              <motion.div
                key={
                  dish.english
                }
                className="
                  tc-slider__image-wrap
                "
                custom={
                  direction
                }
                variants={
                  imageVariants
                }
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.75,

                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
              >

                <Image
                  src={
                    dish.image
                  }
                  alt={
                    dish.english
                  }
                  fill
                  sizes="
                    (max-width: 800px)
                    85vw,
                    440px
                  "
                  className="
                    tc-slider__image
                  "
                />

                <div
                  className="
                    tc-slider__image-overlay
                  "
                />

              </motion.div>

            </AnimatePresence>

          </motion.div>

        </div>

        {/* =================================================
            TEXT CONTENT
        ================================================= */}

        <div
          className="
            tc-slider__content
          "
        >

          <AnimatePresence
            mode="wait"
            custom={
              direction
            }
          >

            <motion.div
              key={
                dish.english
              }
              custom={
                direction
              }
              className="
                tc-slider__text-block
              "
              initial={{
                opacity: 0,

                x:
                  direction > 0
                    ? 55
                    : -55,

                y: 15,

                filter:
                  "blur(9px)",
              }}
              animate={{
                opacity: 1,

                x: 0,

                y: 0,

                filter:
                  "blur(0px)",
              }}
              exit={{
                opacity: 0,

                x:
                  direction > 0
                    ? -55
                    : 55,

                y: -12,

                filter:
                  "blur(9px)",
              }}
              transition={{
                duration: 0.68,

                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
            >

              {/* CATEGORY */}

              <p
                className="
                  tc-slider__category
                "
              >
                {dish.category}
              </p>

              {/* =================================================
                  ENGLISH = MAIN TITLE
              ================================================= */}

              <div className="tc-slider__editorial-heading">
                <h3 className="tc-slider__english-title">
                  <span className="tc-slider__english-roman">
                    {dishTitle.roman}
                  </span>{" "}
                  {dishTitle.italic && (
                    <span className="tc-slider__english-italic">
                      {dishTitle.italic}
                    </span>
                  )}
                </h3>

                <div className="tc-slider__translation-row">
                  <span
                    className="tc-slider__translation-line"
                    aria-hidden="true"
                  />

                  <p className="tc-slider__french-translation">
                    {dish.french}
                  </p>
                </div>
              </div>

              {/* =================================================
                  PRICE
              ================================================= */}

              <div
                className="
                  tc-slider__price-row
                "
              >

                <span
                  className="
                    tc-slider__price-line
                  "
                />

                <span
                  className="
                    tc-slider__price
                  "
                >
                  {dish.price}
                </span>

              </div>

              {/* NOTE */}

              {dish.note && (

                <p
                  className="
                    tc-slider__note-clean
                  "
                >
                  {dish.note}
                </p>

              )}

            </motion.div>

          </AnimatePresence>

          {/* =================================================
              MODERN ARROWS
          ================================================= */}

          <div
            className="
              tc-slider__navigation
            "
          >

            {/* LEFT ARROW */}

            <button
              type="button"
              onClick={
                previous
              }
              className="
                tc-slider__arrow
                tc-slider__arrow--prev
              "
              aria-label="
                Previous dish
              "
            >

              <svg
                viewBox="
                  0 0 58 24
                "
                aria-hidden="true"
              >

                <path
                  d="
                    M56 12H5
                    M13 4L5 12L13 20
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

              </svg>

            </button>

            {/* PROGRESS */}

            <div
              className="
                tc-slider__progress
              "
            >

              {dishes.map(
                (
                  _,
                  index
                ) => (

                  <span
                    key={
                      index
                    }
                    className={
                      index ===
                      current
                        ? "active"
                        : ""
                    }
                  />

                )
              )}

            </div>

            {/* RIGHT ARROW */}

            <button
              type="button"
              onClick={next}
              className="
                tc-slider__arrow
                tc-slider__arrow--next
              "
              aria-label="
                Next dish
              "
            >

              <svg
                viewBox="
                  0 0 58 24
                "
                aria-hidden="true"
              >

                <path
                  d="
                    M2 12H53
                    M45 4L53 12L45 20
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

              </svg>

            </button>

          </div>

          {/* =================================================
              COUNTER
          ================================================= */}

          <div
            className="
              tc-slider__counter
            "
          >

            {String(
              current + 1
            ).padStart(
              2,
              "0"
            )}

            <span>
              /
            </span>

            {String(
              dishes.length
            ).padStart(
              2,
              "0"
            )}

          </div>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   3D MENU BACKGROUND
========================================================= */

function MenuBackground3D() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;

    if (!image) return;

    let animationFrame = 0;

    let currentX = 0;
    let currentY = 0;

    let targetX = 0;
    let targetY = 0;

    const animate = () => {
      currentX +=
        (targetX - currentX) *
        0.055;

      currentY +=
        (targetY - currentY) *
        0.055;

      image.style.transform = `
        translate3d(
          ${currentX * -18}px,
          ${currentY * -14}px,
          0
        )
        rotateX(${currentY * 1.8}deg)
        rotateY(${currentX * -1.8}deg)
        scale(1.10)
      `;

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      targetX =
        event.clientX /
          window.innerWidth -
        0.5;

      targetY =
        event.clientY /
          window.innerHeight -
        0.5;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    animate();

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      cancelAnimationFrame(
        animationFrame
      );
    };
  }, []);

  return (
    <div
      className="tc-bg3d"
      aria-hidden="true"
    >
      <div
        ref={imageRef}
        className="tc-bg3d__image"
      />

      <div className="tc-bg3d__overlay" />
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function MenuPage() {
  return (
    <main
      className={`
        ${cormorant.variable}
        ${manrope.variable}
        ${michroma.variable}
        tc-menu-page
      `}
    >

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav
        className="
          tc-menu-nav
        "
      >

        <Link
          href="/"
          className="
            tc-menu-nav__back
          "
        >
          <span>
            ←
          </span>

          BACK
        </Link>

        {/* LOGO */}

        <Link
          href="/"
          className="
            tc-menu-nav__logo
          "
          aria-label="
            Table Chef home
          "
        >

          <Image
            src="/table-chef-logo.png"
            alt="Table Chef"
            fill
            priority
            sizes="260px"
            className="
              object-contain
            "
          />

        </Link>

        <a
          href="#starters"
          className="
            tc-menu-nav__menu
          "
        >
          MENU
        </a>

      </nav>

      {/* =================================================
          HERO VIDEO
      ================================================= */}

      <section
        className="
          tc-menu-hero
        "
      >

        <video
          className="
            tc-menu-hero__video
          "
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >

          <source
            src="/menu-video.mp4"
            type="video/mp4"
          />

        </video>

        <div
          className="
            tc-menu-hero__overlay
          "
        />

        <div
          className="
            tc-menu-hero__content
          "
        >

          <motion.p
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
          >
            EXPERIENCE
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 45,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.1,
              delay: 0.15,
            }}
          >
            <span className="tc-editorial-title__roman">
              Taste
            </span>
            <br />
            <span className="tc-editorial-title__italic">
              Table Chef
            </span>
          </motion.h1>

        </div>

      </section>

      {/* =================================================
          INTRO
      ================================================= */}

      <section
        className="
          tc-menu-intro
        "
      >

        <motion.h2
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
          }}
        >
          <span className="tc-editorial-title__roman">
            A culinary journey
          </span>
          <br />
          <span className="tc-editorial-title__italic">
            made to be remembered
          </span>
        </motion.h2>

        <p
          className="
            tc-menu-intro__lead
          "
        >
          Discover a menu combining
          international inspiration,
          Mauritian flavours and carefully
          selected ingredients.
        </p>

        <p>
          From fresh starters and comforting
          soups to our Mauritian specialties,
          grilled favourites and elegant
          desserts, every dish is prepared
          to create a memorable dining
          experience.
        </p>

      </section>

      {/* =================================================
          DIVIDER
      ================================================= */}

      <div
        className="
          tc-menu-divider
        "
      >

        <span />

        <div
          className="
            tc-menu-divider__icon
          "
        >
          <i />
          <b />
          <i />
        </div>

        <span />

      </div>

      {/* =================================================
          MENU TITLE
      ================================================= */}

      <section
        className="
          tc-menu-title
        "
      >

        <p>
          Explore our culinary selection
        </p>

        <h2>
          <span className="tc-editorial-title__roman">
            The Table Chef
          </span>{" "}
          <span className="tc-editorial-title__italic">
            Menu
          </span>
        </h2>

        <p>
          Discover starters, soups, pasta,
          Mauritian favourites, grilled
          specialties and desserts.
        </p>

      </section>

      {/* =================================================
          01 STARTERS
      ================================================= */}

      <MenuSlider
        id="starters"
        number="01"
        eyebrow="
          Entrée / Starter
        "
        title="
          Starters
        "
        description="
          Fresh and expressive beginnings
          designed to awaken your palate.
        "
        dishes={
          starters
        }
      />

      {/* =================================================
          02 SOUP
      ================================================= */}

      <MenuSlider
        id="soups"
        number="02"
        eyebrow="
          Soupe / Soup
        "
        title="
          Soups
        "
        description="
          Warm aromatic creations
          prepared with rich and
          comforting flavours.
        "
        dishes={
          soups
        }
      />

      {/* =================================================
          03 PASTA
      ================================================= */}

      <MenuSlider
        id="pasta"
        number="03"
        eyebrow="
          Pâtes / Pasta
        "
        title="
          Pasta
        "
        description="
          Generous pasta dishes combining
          classic recipes with carefully
          selected ingredients.
        "
        dishes={
          pasta
        }
      />

      {/* =================================================
          04 MAURITIAN
      ================================================= */}

      <MenuSlider
        id="mauritian"
        number="04"
        eyebrow="
          Coin Mauricien
        "
        title="
          Mauritian Corner
        "
        description="
          Traditional island flavours
          inspired by authentic
          Mauritian cuisine.
        "
        dishes={
          mauritian
        }
      />

      {/* =================================================
          05 GRILL
      ================================================= */}

      <MenuSlider
        id="grill"
        number="05"
        eyebrow="
          Coin Grillé
        "
        title="
          Grill Corner
        "
        description="
          Generous grilled dishes
          prepared for bold flavours
          and memorable moments.
        "
        dishes={
          grill
        }
      />

      {/* =================================================
          06 DESSERTS
      ================================================= */}

      <MenuSlider
        id="desserts"
        number="06"
        eyebrow="
          Dessert
        "
        title="
          Desserts
        "
        description="
          Elegant sweet creations
          designed to complete your
          Table Chef experience.
        "
        dishes={
          desserts
        }
      />

    </main>
  );
}