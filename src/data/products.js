/* products.js */

export const products = [
  {
    id: "rolex-submariner",
    name: "Submariner Date",
    brand: "Rolex",
    category: "Sport",
    price: 10200,
    image: "/src/assets/watches/submariner.png",
    tag: "Legendary Diver",
    rating: 4.9,
    reviews: 142,
    description: "The Rolex Submariner Date in Oystersteel with a Cerachrom bezel insert in black ceramic and a black dial with large luminescent hour markers. It is the archetype of the divers' watch, embodying the historic link between Rolex and the underwater world.",
    specs: {
      case: "Oyster, 41 mm, Oystersteel",
      bezel: "Unidirectional rotatable 60-minute, ceramic insert",
      waterResistance: "300 metres / 1,000 feet",
      movement: "Perpetual, mechanical, self-winding (Calibre 3235)",
      powerReserve: "Approximately 70 hours",
      dial: "Black with highly legible Chromalight display",
      originalStrap: "Oystersteel bracelet"
    },
    straps: [
      { id: "steel", name: "Oystersteel Bracelet", color: "#b5b8bd", preview: "#9fa4ab" },
      { id: "gold", name: "Yellow Gold Link", color: "#d4af37", preview: "#d4af37" },
      { id: "rubber", name: "Oysterflex Black Rubber", color: "#1a1a1a", preview: "#222" }
    ]
  },
  {
    id: "omega-speedmaster",
    name: "Speedmaster Moonwatch Professional",
    brand: "Omega",
    category: "Complications",
    price: 7600,
    image: "/src/assets/watches/speedmaster.png",
    tag: "Space Icon",
    rating: 4.8,
    reviews: 98,
    description: "The Speedmaster Moonwatch is one of the world's most iconic timepieces. Having been a part of all six lunar missions, the legendary chronograph is an impressive representation of the brand’s adventurous pioneering spirit.",
    specs: {
      case: "Stainless steel, 42 mm",
      bezel: "Black anodized aluminum ring with tachymeter scale",
      waterResistance: "50 metres / 167 feet",
      movement: "Manual-winding chronograph, Co-Axial Master Chronometer (Calibre 3861)",
      powerReserve: "Approximately 50 hours",
      dial: "Matte black with white hands and markers",
      originalStrap: "Brushed stainless steel bracelet"
    },
    straps: [
      { id: "steel", name: "Stainless Steel Bracelet", color: "#b5b8bd", preview: "#9fa4ab" },
      { id: "leather", name: "Black Alligator Leather", color: "#2b2b2a", preview: "#1f1f1e" },
      { id: "nato", name: "Polyamide Striped NATO", color: "#4f4f4f", preview: "#5c5c5c" }
    ]
  },
  {
    id: "ap-royal-oak",
    name: "Royal Oak Selfwinding",
    brand: "Audemars Piguet",
    category: "Sport",
    price: 27800,
    image: "/src/assets/watches/royaloak.png",
    tag: "High Demand",
    rating: 4.9,
    reviews: 76,
    description: "The stainless steel Royal Oak Selfwinding is distinguished by its 'Grande Tapisserie' black dial and an integrated steel bracelet. Introduced in 1972, the Audemars Piguet Royal Oak rewrote the rules of luxury watchmaking.",
    specs: {
      case: "Stainless steel, 41 mm, glareproofed sapphire crystal",
      bezel: "Octagonal fixed bezel with 8 hexagonal white gold screws",
      waterResistance: "50 metres / 167 feet",
      movement: "Selfwinding (Calibre 4302)",
      powerReserve: "Approximately 70 hours",
      dial: "Black with 'Grande Tapisserie' pattern",
      originalStrap: "Integrated stainless steel bracelet"
    },
    straps: [
      { id: "steel", name: "Integrated Steel Bracelet", color: "#b5b8bd", preview: "#9fa4ab" },
      { id: "leather", name: "Cognac Calfskin Leather", color: "#8b5a2b", preview: "#8b5a2b" },
      { id: "rubber", name: "Textured Royal Oak Rubber", color: "#1a1c1e", preview: "#232527" }
    ]
  },
  {
    id: "cartier-tank",
    name: "Tank Louis Cartier",
    brand: "Cartier",
    category: "Dress",
    price: 12800,
    image: "/src/assets/watches/tank.png",
    tag: "Timeless Classic",
    rating: 4.7,
    reviews: 64,
    description: "Tank Louis Cartier watch, large model, Manufacture mechanical movement with manual winding. 18K yellow gold case, beaded crown set with a sapphire cabochon, silvered grained dial, blued-steel sword-shaped hands.",
    specs: {
      case: "18K Yellow Gold, 33.7 mm x 25.5 mm",
      bezel: "Polished yellow gold fixed",
      waterResistance: "30 metres / 100 feet",
      movement: "Manual-winding mechanical (Calibre 1917 MC)",
      powerReserve: "Approximately 38 hours",
      dial: "Silvered grained, Roman numerals, blued-steel hands",
      originalStrap: "Alligator leather strap"
    },
    straps: [
      { id: "leather", name: "Glossy Black Alligator", color: "#1a1a1a", preview: "#1f1f1e" },
      { id: "brown-leather", name: "Mahogany Brown Alligator", color: "#5c3317", preview: "#663300" },
      { id: "gold-mesh", name: "18K Gold Woven Mesh", color: "#e3b827", preview: "#e3b827" }
    ]
  },
  {
    id: "patek-calatrava",
    name: "Calatrava Clous de Paris",
    brand: "Patek Philippe",
    category: "Dress",
    price: 31400,
    image: "/src/assets/watches/calatrava.png",
    tag: "Elite Craftsmanship",
    rating: 5.0,
    reviews: 32,
    description: "With its pure lines, the Calatrava is recognized as the very essence of the round wristwatch. Supremely elegant, it charms each new generation of watch lovers by its timeless understated perfection.",
    specs: {
      case: "Rose gold, 39 mm, sapphire crystal caseback",
      bezel: "Hobnail patterned ('Clous de Paris') fixed bezel",
      waterResistance: "30 metres / 100 feet",
      movement: "Manually wound mechanical movement (Calibre 30-255 PS)",
      powerReserve: "Approximately 65 hours",
      dial: "Charcoal gray, vertical satin-finished",
      originalStrap: "Alligator leather strap"
    },
    straps: [
      { id: "leather", name: "Matte Black Alligator", color: "#1a1a1a", preview: "#222" },
      { id: "brown-leather", name: "Chestnut Brown Leather", color: "#704214", preview: "#7a4a1b" },
      { id: "gray-suede", name: "Charcoal Nubuck Suede", color: "#545a60", preview: "#5b6167" }
    ]
  },
  {
    id: "gs-snowflake",
    name: "Spring Drive 'Snowflake'",
    brand: "Grand Seiko",
    category: "Dress",
    price: 6200,
    image: "/src/assets/watches/snowflake.png",
    tag: "High Precision",
    rating: 4.8,
    reviews: 120,
    description: "The Grand Seiko SBGA211 is powered by Spring Drive, Grand Seiko's unique caliber, which combines the motive force of a mainspring with the high precision of a quartz watch. The dial texture is inspired by the wind-swept snow of Shinshu.",
    specs: {
      case: "High-intensity titanium, 41 mm",
      bezel: "Polished titanium fixed",
      waterResistance: "100 metres / 330 feet",
      movement: "Spring Drive automatic winding (Calibre 9R65)",
      powerReserve: "Approximately 72 hours",
      dial: "White 'Snowflake' texture with blue steel seconds hand",
      originalStrap: "High-intensity titanium bracelet"
    },
    straps: [
      { id: "titanium", name: "High-intensity Titanium", color: "#a5a9b0", preview: "#b5b9c0" },
      { id: "blue-leather", name: "Midnight Blue Crocodile", color: "#0f1c3f", preview: "#182a5c" },
      { id: "rubber", name: "Snow-white Curved Rubber", color: "#f8f9fa", preview: "#f0f2f5" }
    ]
  }
];

export const getProductById = (id) => {
  return products.find(p => p.id === id);
};
