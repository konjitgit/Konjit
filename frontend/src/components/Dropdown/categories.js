import HairProducts from "../../assets/images/HairProducts.jpg";
import HairProducts2 from "../../assets/images/HairProducts2.jpg";
import FragranceProducts from "../../assets/images/FragranceProducts.jpg";
import FragranceProducts2 from "../../assets/images/FragranceProducts2.jpg";
import MakeupProducts from "../../assets/images/MakeupProducts.jpg";
import MakeupProducts2 from "../../assets/images/MakeupProducts2.jpg";
import NailProducts from "../../assets/images/MakeupProducts.jpg";
import NailProducts2 from "../../assets/images/MakeupProducts2.jpg";
import ToolsProducts from "../../assets/images/HairProducts.jpg";
import ToolsProducts2 from "../../assets/images/HairProducts2.jpg";
import GiftProducts from "../../assets/images/MakeupProducts.jpg";
import GiftProducts2 from "../../assets/images/MakeupProducts2.jpg";
import BathAndBodyProducts from "../../assets/images/FragranceProducts.jpg";
import BathAndBodyProducts2 from "../../assets/images/FragranceProducts2.jpg";
import slugify from "slugify";
export const categories = [
  {
    name: "Hair",
    slug: slugify("Hair"),
    items: [
      {
        title: "Hair Products",
        subItems: [
          "Shampoo",
          "Conditioner",
          "Hair Oil",
          "Treatments",
          "Serums",
          "Hair Dye",
          "Sun Protection",
          "Hair Mist",
        ],
      },
      {
        title: "Hair Treatments",
        subItems: [
          "Hair Masks",
          "Curl Creams",
          "Leave ins",
          "Supplements",
          "Treatments",
        ],
      },
      {
        title: "Hair Styling",
        subItems: [
          "Hair Protection",
          "Hair Spray",
          "Hair Volumizing",
          "Heatless curlers",
          "Hair Mousee",
        ],
      },
      {
        title: "Hair Tools",
        subItems: [
          "Hair Straighteners",
          "Blow Dryer",
          "Hair Clips",
          "Hair Curlers",
          "Hair Accessories",
          "Air Stylers",
        ],
      },
    ],
    images: [
      { src: HairProducts, alt: "hair products" },
      { src: HairProducts2, alt: "hair products2" },
    ],
  },
  {
    name: "Skin Care",
    slug: slugify("Skin Care"),
    items: [
      {
        title: "Cleanser",
        subItems: [
          "Foaming Cleansers",
          "Cream Cleansers",
          "Cleansing Balm",
          "Make Up Removers",
          "Face Mists",
        ],
      },

      {
        title: "Moisturizers",
        subItems: [
          "SPF",
          "Day Cream",
          "Night Cream",
          "Face Balm",
          "Neck Care",
          "Gel Moisturizer",
        ],
      },
      {
        title: "Eye and Lips",
        subItems: [
          "Eye Creams",
          "Eye Masks",
          "Eye Treatments",
          "Lip Balm",
          "Lip SPF",
          "Lip Treatment",
          "Lip Mask",
        ],
      },
      {
        title: "Masks ",
        subItems: [
          "Clay Masks",
          "Sheet Masks",
          "Overnight Masks",
          "Hydrating Face Mask",
          "Scrubs",
          "Peels",
        ],
      },
    ],
    images: [
      { src: HairProducts, alt: "hair products" },
      { src: HairProducts2, alt: "hair products2" },
    ],
  },
  {
    name: "Makeup",
    slug: slugify("Makeup"),
    items: [
      {
        title: "Face",
        subItems: [
          "Foundation",
          "Concealer",
          "Powder",
          "Blush",
          "Bronzer",
          "Highlighter",
          "Primer",
          "Setting Spray",
        ],
      },
      {
        title: "Eyes",
        subItems: [
          "Eyeshadow",
          "Eyeliner",
          "Mascara",
          "Eyebrow",
          "Eyelash",
          "Eye Primer",
        ],
      },
      {
        title: "Lips",
        subItems: [
          "Lipstick",
          "Lip Gloss",
          "Lip Liner",
          "Lip Balm",
          "Lip Tint",
        ],
      },
      {
        title: "Brushes and Tools",
        subItems: [
          "Makeup Brushes",
          "Makeup Sponges",
          "Makeup Bags",
          "Makeup Mirrors",
          "Makeup Removers",
        ],
      },
    ],
    images: [
      { src: MakeupProducts, alt: "makeup products" },
      { src: MakeupProducts2, alt: "makeup products2" },
    ],
  },
  {
    name: "Bath and Body",
    slug: slugify("Bath and Body"),
    items: [
      {
        title: "Body Care",
        subItems: [
          "Body Lotion",
          "Body Cream",
          "Body Oil",
          "Body Scrub",
          "Body Butter",
          "Hand Cream",
        ],
      },
      {
        title: "Bath and Shower",
        subItems: [
          "Shower Gel",
          "Bubble Bath",
          "Bath Bomb",
          "Bath Salt",
          "Soap",
          "Shower Oil",
        ],
      },
      {
        title: "Hair Care",
        subItems: [
          "Shampoo",
          "Conditioner",
          "Hair Mask",
          "Hair Oil",
          "Hair Spray",
          "Dry Shampoo",
        ],
      },
      {
        title: "Accessories",
        subItems: [
          "Loofah",
          "Bath Sponge",
          "Bath Pillow",
          "Towel",
          "Robe",
          "Slippers",
        ],
      },
    ],
    images: [
      { src: BathAndBodyProducts, alt: "bath and body products" },
      { src: BathAndBodyProducts2, alt: "bath and body products2" },
    ],
  },
  {
    name: "Fragrance",
    slug: slugify("Fragrance"),
    items: [
      {
        title: "Women",
        subItems: [
          "Perfume",
          "Eau de Toilette",
          "Eau de Parfum",
          "Body Spray",
          "Rollerball and Travel Size",
        ],
      },
      {
        title: "Men",
        subItems: [
          "Cologne",
          "Eau de Toilette",
          "Eau de Parfum",
          "Body Spray",
          "Rollerball and Travel Size",
        ],
      },
      {
        title: "Unisex",
        subItems: ["Perfume", "Eau de Toilette", "Eau de Parfum", "Body Spray"],
      },
      {
        title: "Gift Sets",
        subItems: ["Women’s Gift Sets", "Men’s Gift Sets", "Unisex Gift Sets"],
      },
    ],
    images: [
      { src: FragranceProducts, alt: "fragrance products" },
      { src: FragranceProducts2, alt: "fragrance products2" },
    ],
  },
  {
    name: "Nails",
    slug: slugify("Nails"),
    items: [
      {
        title: "Nail Polish",
        subItems: [
          "Gel Polish",
          "Matte Polish",
          "Glitter Polish",
          "Metallic Polish",
          "Top Coat",
          "Base Coat",
        ],
      },
      {
        title: "Nail Care",
        subItems: [
          "Nail Files",
          "Nail Clippers",
          "Cuticle Care",
          "Nail Treatments",
          "Nail Removers",
        ],
      },
      {
        title: "Nail Art",
        subItems: ["Stickers", "Decals", "Stencils", "Rhinestones", "Glue"],
      },
      {
        title: "Manicure and Pedicure",
        subItems: [
          "Nail Dryers",
          "Nail Lamps",
          "Nail Drills",
          "Nail Brushes",
          "Nail Scissors",
        ],
      },
    ],
    images: [
      { src: NailProducts, alt: "nail products" },
      { src: NailProducts2, alt: "nail products2" },
    ],
  },
  {
    name: "Tools and Brushes",
    slug: slugify("Tools and Brushes"),
    items: [
      {
        title: "Makeup Brushes",
        subItems: [
          "Face Brushes",
          "Eye Brushes",
          "Lip Brushes",
          "Brush Sets",
          "Brush Cleaners",
        ],
      },
      {
        title: "Makeup Tools",
        subItems: [
          "Makeup Sponges",
          "Eyelash Curlers",
          "Tweezers",
          "Sharpeners",
          "Mirrors",
        ],
      },
      {
        title: "Hair Tools",
        subItems: [
          "Hair Dryers",
          "Hair Straighteners",
          "Hair Curlers",
          "Hair Brushes",
          "Hair Clips",
        ],
      },
      {
        title: "Skincare Tools",
        subItems: [
          "Face Rollers",
          "Gua Sha",
          "Facial Cleansing Devices",
          "Blackhead Removers",
          "Microdermabrasion Devices",
        ],
      },
    ],
    images: [
      { src: ToolsProducts, alt: "tools products" },
      { src: ToolsProducts2, alt: "tools products2" },
    ],
  },
  {
    name: "Gift Packages",
    slug: slugify("Gift Packages"),
    items: [
      {
        title: "For Her",
        subItems: [
          "Makeup Sets",
          "Skincare Sets",
          "Fragrance Sets",
          "Nail Sets",
          "Hair Sets",
        ],
      },
      {
        title: "For Him",
        subItems: [
          "Shaving Sets",
          "Skincare Sets",
          "Fragrance Sets",
          "Hair Sets",
        ],
      },
      {
        title: "For Kids",
        subItems: [
          "Bath and Body Sets",
          "Makeup Sets",
          "Nail Sets",
          "Hair Sets",
        ],
      },
      {
        title: "For Everyone",
        subItems: ["Candles", "Diffusers", "Soaps", "Bath Bombs", "Lotions"],
      },
    ],
    images: [
      { src: GiftProducts, alt: "gift products" },
      { src: GiftProducts2, alt: "gift products2" },
    ],
  },
];
