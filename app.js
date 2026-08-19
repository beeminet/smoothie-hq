/**
 * Juice Recipe & Kitchen System - Clean Minimal Core with Full Postharvest Spoilage Intelligence
 */

const KNOWN_STORAGE_KEYS = [
  "juice_system_unified_v3",
  "juice_recipe_system_v2",
  "juice_recipe_system_state_v1"
];
const ACTIVE_STORAGE_KEY = "juice_system_unified_v3";

// USDA FoodKeeper & UC Davis Postharvest Shelf-Life & Spoilage Database
const INGREDIENTS_SPOILAGE_DATABASE = [
  {
    id: "water",
    name: "Water / Cold Filtered",
    avgUnitWeight: 1000,
    unitName: "Liters",
    prepYield: 1.0,
    cadenceTier: "pantry",
    fridgeCutPeakDays: 7,
    fridgeCutMaxDays: 14,
    counterWholeDays: 99,
    fridgeWholeDays: 99,
    storageRule: "Sealed glass pitcher.",
    counterRule: "Dispenser / pitcher.",
    spoilageSign: "Fresh daily."
  },
  {
    id: "avocado",
    name: "Avocado (Hass)",
    avgUnitWeight: 160,
    unitName: "medium avocado",
    prepYield: 0.70,
    cadenceTier: "fast",
    fridgeCutPeakDays: 1,
    fridgeCutMaxDays: 2,
    counterWholeDays: 3,
    fridgeWholeDays: 5,
    storageRule: "Press wrap directly against flesh with lemon juice in airtight glass container.",
    counterRule: "Ripen on counter until dark and yielding (3–4d), then move to fridge.",
    spoilageSign: "Rapid polyphenol browning, rancid lipid oxidation, hollow watery texture."
  },
  {
    id: "baby_spinach",
    name: "Baby Spinach",
    avgUnitWeight: 150,
    unitName: "bag (150g)",
    prepYield: 1.0,
    cadenceTier: "fast",
    fridgeCutPeakDays: 1,
    fridgeCutMaxDays: 2,
    counterWholeDays: 1,
    fridgeWholeDays: 5,
    storageRule: "Store in airtight container lined with dry paper towels to absorb transpiration moisture.",
    counterRule: "Never leave on counter; wilts in hours.",
    spoilageSign: "Wet slimy leaves, bacterial liquefaction, ammonia-like odor."
  },
  {
    id: "cucumber",
    name: "Cucumber (English / Persian)",
    avgUnitWeight: 300,
    unitName: "cucumber",
    prepYield: 0.90,
    cadenceTier: "medium",
    fridgeCutPeakDays: 2,
    fridgeCutMaxDays: 3,
    counterWholeDays: 3,
    fridgeWholeDays: 7,
    storageRule: "Slice into thick discs in airtight container with paper towel.",
    counterRule: "Keep in cool pantry away from apples.",
    spoilageSign: "Translucent water-soaked flesh, slimy skin, sour odor."
  },
  {
    id: "papaya",
    name: "Papaya (Maradol / Red)",
    avgUnitWeight: 600,
    unitName: "medium papaya",
    prepYield: 0.75,
    cadenceTier: "medium",
    fridgeCutPeakDays: 2,
    fridgeCutMaxDays: 3,
    counterWholeDays: 4,
    fridgeWholeDays: 7,
    storageRule: "Cube flesh without seeds or skin in airtight glass container.",
    counterRule: "Ripen stem-end down at room temp until yellow-orange.",
    spoilageSign: "Papain enzymes liquefy flesh into mush, sunken dark spots, yeast odor."
  },
  {
    id: "mango",
    name: "Mango (Ataulfo / Kent)",
    avgUnitWeight: 260,
    unitName: "medium mango",
    prepYield: 0.65,
    cadenceTier: "medium",
    fridgeCutPeakDays: 2,
    fridgeCutMaxDays: 3,
    counterWholeDays: 5,
    fridgeWholeDays: 8,
    storageRule: "Cube cheeks and seal in container.",
    counterRule: "Ripen at room temperature until fragrant and soft to thumb pressure.",
    spoilageSign: "Pectic enzyme breakdown, alcoholic fermentation around seed pit."
  },
  {
    id: "pineapple",
    name: "Pineapple",
    avgUnitWeight: 900,
    unitName: "whole pineapple",
    prepYield: 0.65,
    cadenceTier: "medium",
    fridgeCutPeakDays: 3,
    fridgeCutMaxDays: 5,
    counterWholeDays: 3,
    fridgeWholeDays: 7,
    storageRule: "Store chunks submerged in collected juice in sealed container.",
    counterRule: "Does not ripen after harvest; cut within 2–3 days.",
    spoilageSign: "Fermented yeast smell, soft brown base, mold on crown."
  },
  {
    id: "celery",
    name: "Celery",
    avgUnitWeight: 45,
    unitName: "stalk",
    prepYield: 0.85,
    cadenceTier: "medium",
    fridgeCutPeakDays: 4,
    fridgeCutMaxDays: 6,
    counterWholeDays: 2,
    fridgeWholeDays: 14,
    storageRule: "Stand cut stalks upright submerged in cold water in a glass jar.",
    counterRule: "Refrigerate in foil upon purchase.",
    spoilageSign: "Rubbery bending stalks that lose turgor pressure, brown core."
  },
  {
    id: "lemon",
    name: "Lemon (Eureka / Meyer)",
    avgUnitWeight: 60,
    unitName: "lemon",
    prepYield: 0.80,
    cadenceTier: "long",
    fridgeCutPeakDays: 3,
    fridgeCutMaxDays: 5,
    counterWholeDays: 10,
    fridgeWholeDays: 28,
    storageRule: "Store squeezed juice in sealed dark glass bottle away from light.",
    counterRule: "Keep in ventilated bowl away from direct sun.",
    spoilageSign: "Hard dried rind, water-soaked soft patches, blue mold."
  },
  {
    id: "green_apple",
    name: "Green Apple (Granny Smith)",
    avgUnitWeight: 180,
    unitName: "apple",
    prepYield: 0.80,
    cadenceTier: "long",
    fridgeCutPeakDays: 2,
    fridgeCutMaxDays: 4,
    counterWholeDays: 14,
    fridgeWholeDays: 35,
    storageRule: "Toss cut slices in lemon water before sealing.",
    counterRule: "Store separately (high ethylene emitter).",
    spoilageSign: "Mealy mushy texture, enzymatic browning, sunken bruises."
  },
  {
    id: "ginger",
    name: "Fresh Ginger",
    avgUnitWeight: 30,
    unitName: "knob / thumb",
    prepYield: 0.85,
    cadenceTier: "long",
    fridgeCutPeakDays: 7,
    fridgeCutMaxDays: 14,
    counterWholeDays: 21,
    fridgeWholeDays: 30,
    storageRule: "Store sliced knobs in jar, or freeze whole unpeeled knobs to grate.",
    counterRule: "Store in ventilated basket in cool dark pantry.",
    spoilageSign: "Soft spongy texture, wrinkly dry skin, mold on cut ends."
  },
  {
    id: "carrot",
    name: "Carrot",
    avgUnitWeight: 110,
    unitName: "carrot",
    prepYield: 0.85,
    cadenceTier: "long",
    fridgeCutPeakDays: 5,
    fridgeCutMaxDays: 8,
    counterWholeDays: 5,
    fridgeWholeDays: 28,
    storageRule: "Peel, chop, and submerge in fresh cold water in container.",
    counterRule: "Cool dark pantry.",
    spoilageSign: "White surface blush, rubbery limpness, slimy spots."
  },
  {
    id: "beetroot",
    name: "Beetroot",
    avgUnitWeight: 160,
    unitName: "beet",
    prepYield: 0.80,
    cadenceTier: "long",
    fridgeCutPeakDays: 4,
    fridgeCutMaxDays: 6,
    counterWholeDays: 7,
    fridgeWholeDays: 30,
    storageRule: "Peel and cube into airtight container.",
    counterRule: "Trim greens leaving 1 inch stem; store in cool dark pantry.",
    spoilageSign: "Soft shriveled roots, crown mold, sour odor."
  },
  {
    id: "sugar",
    name: "Sugar",
    avgUnitWeight: 15,
    unitName: "tbsp",
    prepYield: 1.0,
    cadenceTier: "pantry",
    fridgeCutPeakDays: 99,
    fridgeCutMaxDays: 365,
    counterWholeDays: 365,
    fridgeWholeDays: 365,
    storageRule: "Dry airtight container.",
    counterRule: "Pantry staple.",
    spoilageSign: "Hard clumps if exposed to moisture."
  },
  {
    id: "honey",
    name: "Honey",
    avgUnitWeight: 20,
    unitName: "tbsp",
    prepYield: 1.0,
    cadenceTier: "pantry",
    fridgeCutPeakDays: 99,
    fridgeCutMaxDays: 365,
    counterWholeDays: 365,
    fridgeWholeDays: 365,
    storageRule: "Pantry temperature.",
    counterRule: "Pantry staple.",
    spoilageSign: "Indefinite."
  }
];

// Curated Strict Culinary Produce Catalog
const VALID_PRODUCE_DATABASE = [
  { keys: ["kale", "lacinato kale", "dino kale", "curly kale"], name: "Kale", type: "veggie", defaultPct: 5.0, taste: "Earthy, robust mineral green.", why: "Best in vegetable or green blends. Pairs with green apple, cucumber, and lemon to balance bitterness.", tip: "Remove woody stems, blend thoroughly." },
  { keys: ["spinach", "baby spinach"], name: "Baby Spinach", type: "veggie", defaultPct: 5.0, taste: "Mild, gentle vegetal notes.", why: "Blends completely smooth with no bitterness. Ideal for green or combo blends.", tip: "Pack into blender with liquid." },
  { keys: ["cucumber", "english cucumber", "persian cucumber"], name: "Cucumber", type: "veggie", defaultPct: 17.5, taste: "Refreshing, crisp, high hydration.", why: "Core hydrating base for vegetable and combo juices.", tip: "Leave peel on for added nutrients." },
  { keys: ["celery", "celery stalk"], name: "Celery", type: "veggie", defaultPct: 10.0, taste: "Crisp, mineral-rich, natural sodium.", why: "Provides mineral depth to vegetable and combo juices.", tip: "Chop into 2-inch pieces before blending." },
  { keys: ["arugula", "rocket"], name: "Arugula", type: "veggie", defaultPct: 2.5, taste: "Spicy, peppery bite.", why: "Best in small amounts in vegetable blends; balance with green apple or lemon.", tip: "Use fresh baby leaves only." },
  { keys: ["parsley", "cilantro", "coriander"], name: "Parsley / Cilantro", type: "veggie", defaultPct: 2.0, taste: "Bright, fresh herbal.", why: "Adds concentrated chlorophyll and fresh herbal aroma to green juices.", tip: "Use leafy tops." },
  { keys: ["zucchini", "courgette"], name: "Zucchini", type: "veggie", defaultPct: 10.0, taste: "Very neutral, mild hydration.", why: "Adds volume and creaminess to vegetable and combo juices with minimal sugar.", tip: "Chop into discs." },
  { keys: ["ginger", "fresh ginger", "ginger root"], name: "Fresh Ginger", type: "combo", defaultPct: 0.75, taste: "Warm, sharp digestive spice.", why: "Universal flavor enhancer that works across fruit, veggie, and combo blends.", tip: "Grate or slice thin." },
  { keys: ["turmeric", "fresh turmeric", "turmeric root"], name: "Fresh Turmeric", type: "combo", defaultPct: 0.5, taste: "Earthy, warm spice.", why: "Works across all blends. Pairs especially well with citrus, pineapple, and carrot.", tip: "Grate fresh with a pinch of black pepper." },
  { keys: ["carrot", "carrots"], name: "Carrot", type: "combo", defaultPct: 15.0, taste: "Earthy sweetness, beta-carotene.", why: "Excellent bridge ingredient for fruit-veggie combo juices.", tip: "Peel or scrub clean, chop small." },
  { keys: ["beet", "beetroot", "raw beet"], name: "Beetroot", type: "combo", defaultPct: 6.0, taste: "Deep, earthy sweetness.", why: "Rich in dietary nitrates. Balance with lemon and green apple.", tip: "Peel and dice small." },
  { keys: ["avocado", "hass avocado"], name: "Avocado", type: "fruit", defaultPct: 10.75, taste: "Rich, creamy, neutral fat.", why: "Provides creaminess and healthy fats to fruit and combo smoothies.", tip: "Scoop ripe flesh." },
  { keys: ["papaya", "red papaya", "maradol papaya"], name: "Papaya", type: "fruit", defaultPct: 12.0, taste: "Sweet, fragrant tropical.", why: "Digestive enzyme-rich base for tropical fruit and combo juices.", tip: "Peel skin, scoop out seeds." },
  { keys: ["pineapple"], name: "Pineapple", type: "fruit", defaultPct: 13.75, taste: "Bright, sweet-tart tropical punch.", why: "Adds natural sweetness and acidity to fruit, veggie, or combo juices.", tip: "Core and cube." },
  { keys: ["mango"], name: "Mango", type: "fruit", defaultPct: 7.5, taste: "Sweet, floral, aromatic nectar.", why: "Adds sweet tropical body to fruit and combo blends.", tip: "Slice cheeks and dice." },
  { keys: ["green apple", "granny smith", "apple"], name: "Green Apple", type: "combo", defaultPct: 12.5, taste: "Crisp, tart sweetness.", why: "Universal balance fruit: cuts earthy greens in veggie juices and adds tartness to sweet blends.", tip: "Core and slice." },
  { keys: ["lemon", "lemon juice"], name: "Lemon", type: "combo", defaultPct: 3.5, taste: "High acidity, clean brightness.", why: "Universal acidity balancer. Preserves color and cuts sweetness or bitterness across all blends.", tip: "Squeeze fresh." },
  { keys: ["lime", "lime juice"], name: "Lime", type: "combo", defaultPct: 3.0, taste: "Sharp, vibrant tropical acidity.", why: "Excellent substitute or pairing with lemon in green, fruit, or combo juices.", tip: "Squeeze fresh." },
  { keys: ["strawberry", "strawberries"], name: "Strawberry", type: "fruit", defaultPct: 12.0, taste: "Sweet, fragrant berry tartness.", why: "Adds bright berry aroma and color to fruit blends.", tip: "Hull stems." },
  { keys: ["blueberry", "blueberries"], name: "Blueberry", type: "combo", defaultPct: 8.0, taste: "Sweet, floral tartness.", why: "Rich in anthocyanins. Works in fruit smoothies or to naturally sweeten vegetable blends.", tip: "Fresh or frozen." },
  { keys: ["banana"], name: "Banana", type: "fruit", defaultPct: 10.0, taste: "Sweet, creamy banana.", why: "Thickens fruit smoothies and provides natural potassium sweetness.", tip: "Use ripe spotted fruit." },
  { keys: ["watermelon"], name: "Watermelon", type: "fruit", defaultPct: 20.0, taste: "Sweet, refreshing liquid.", why: "Replaces part of the water base with electrolyte-rich fruit water.", tip: "Deseed chunks." },
  { keys: ["lemon zest", "lemon peel"], name: "Lemon Zest", type: "combo", defaultPct: 0.3, taste: "Concentrated citrus aroma without liquid dilution.", why: "10x the aromatic oils of juice. Cuts richness in fruit, green, or combo blends.", tip: "Microplane yellow skin only, avoid white pith." },
  { keys: ["orange zest", "orange peel"], name: "Orange Zest", type: "fruit", defaultPct: 0.4, taste: "Sweet, floral citrus aroma.", why: "Adds warm aroma to fruit, carrot, or combo blends.", tip: "Microplane outer skin only." },
  { keys: ["lime zest", "lime peel"], name: "Lime Zest", type: "veggie", defaultPct: 0.3, taste: "Sharp, fragrant lime aroma.", why: "Brightens green vegetable juices and masks earthy tones.", tip: "Zest directly into blender." },
  { keys: ["chia", "chia seeds"], name: "Chia Seeds", type: "combo", defaultPct: 1.0, taste: "Neutral, subtle nutty.", why: "Adds plant Omega-3s and stabilizes glycemic response across all juice types.", tip: "Blend on high speed with liquid base." },
  { keys: ["hemp", "hemp hearts", "hemp seeds"], name: "Hemp Hearts", type: "fruit", defaultPct: 1.5, taste: "Nutty, creamy.", why: "Adds complete plant protein and healthy fats to smoothies.", tip: "Blend on high for 60s." },
  { keys: ["flax", "flaxseed", "flax seeds"], name: "Flaxseed", type: "combo", defaultPct: 1.0, taste: "Toasty nutty.", why: "Provides prebiotic fiber and Omega-3s.", tip: "Use ground or blend whole on high." },
  { keys: ["watermelon rind", "melon rind"], name: "Watermelon Rind", type: "veggie", defaultPct: 8.0, taste: "Crisp, neutral cucumber-like crunch.", why: "Rich in L-Citrulline for nitric oxide and circulation. Best in veggie or combo blends.", tip: "Peel outer dark wax, use white fleshy rind." },
  { keys: ["mint", "fresh mint"], name: "Fresh Mint", type: "combo", defaultPct: 0.5, taste: "Cooling menthol freshness.", why: "Refreshes tropical fruit juices and brightens green vegetable juices.", tip: "Add 8-10 fresh leaves before blending." }
];

const DEFAULT_STATE = {
  version: 3,
  household: {
    numPeople: 5,
    glassSizeGrams: 250,
    blenderMaxCapacityGrams: 2000,
    containerSizeGrams: 1000,
    fruitGlassesPerPersonPerDay: 1,
    veggieGlassesPerPersonPerDay: 1
  },
  recipes: [
    {
      id: "house-fruit-blend",
      name: "Generic Fruit Blend",
      type: "fruit",
      isDefault: true,
      description: "All in one tropical fruit juice. Creamy avocado body, fragrant papaya, bright pineapple, sweet mango, and balancing lemon.",
      baseBatchWeight: 2000,
      blendingNotes: "1. Pour water first to protect blades. 2. Add soft fruits (avocado, papaya). 3. Add pineapple & mango. 4. Top with lemon juice and sugar.",
      ingredients: [
        { id: "water", name: "Water / Cold Filtered", grams: 1100, pct: 55, locked: true, order: 1, notes: "Base liquid (50% ratio)" },
        { id: "avocado", name: "Avocado", grams: 115, pct: 5.77, locked: false, order: 2, notes: "Creamy body & healthy fats" },
        { id: "papaya", name: "Papaya", grams: 175, pct: 8.77, locked: false, order: 3, notes: "Peeled & seeded chunks" },
        { id: "pineapple", name: "Pineapple", grams: 440, pct: 21.99, locked: false, order: 4, notes: "Sweet tropical acidity" },
        { id: "mango", name: "Mango", grams: 72, pct: 3.58, locked: false, order: 5, notes: "Floral richness" },
        { id: "lemon", name: "Lemon (Juice)", grams: 58, pct: 2.89, locked: false, order: 6, notes: "Fresh squeeze to balance sweetness" },
        { id: "sugar", name: "Honey", grams: 40, pct: 2, locked: false, order: 7, notes: "Optional sweetness booster" }
      ],
      versions: []
    },
    {
      id: "house-green-glow",
      name: "Generic Veggie Blend",
      type: "veggie",
      isDefault: true,
      description: "Crisp, ultra-hydrating, refreshing green blend with zero bitterness. High cucumber with subtle ginger and bright lemon.",
      baseBatchWeight: 2000,
      blendingNotes: "1. Pour water first. 2. Add cucumber & celery chunks. 3. Pack spinach in middle. 4. Add green apple, ginger, lemon juice, and honey on top.",
      ingredients: [
        { id: "water", name: "Water / Cold Filtered", grams: 1250, pct: 50, locked: true, order: 1, notes: "Base liquid" },
        { id: "cucumber", name: "Beet root", grams: 357, pct: 14.27, locked: false, order: 2, notes: "Hydrating, mild base" },
        { id: "green_apple", name: "Zucchini", grams: 321, pct: 12.85, locked: false, order: 3, notes: "Natural tart sweetness" },
        { id: "celery", name: "Sweet Potato", grams: 259, pct: 10.36, locked: false, order: 4, notes: "Crisp mineral notes" },
        { id: "spinach", name: "Garlic", grams: 20, pct: 0.8, locked: true, order: 5, notes: "Gentle greens" },
        { id: "lemon", name: "Lemon Juice", grams: 92, pct: 3.69, locked: false, order: 6, notes: "Cuts earthy notes" },
        { id: "ginger", name: "Fresh Ginger", grams: 20, pct: 0.81, locked: true, order: 7, notes: "Warm digestive spice" },
        { id: "honey", name: "Honey", grams: 50, pct: 2, locked: false, order: 8, notes: "Optional roundness" },
        { id: "custom_1787149476062", name: "Fruits (mango, papaya, avocado, pineapple)", pct: 5.22, grams: 131, locked: false, order: 9, notes: "Chopped" }
      ],
      versions: []
    },
    {
      id: "recipe_1787136475489",
      name: "ወርቃማው ማለዳ",
      type: "fruit",
      isDefault: false,
      description: "A creamy tropical blend where the peppery bite of papaya seeds cuts through rich mango and papaya sweetness.",
      baseBatchWeight: 2000,
      blendingNotes: "Add liquid base first, soft produce next, dense produce last.",
      ingredients: [
        { id: "water", name: "Cold water", grams: 1156, pct: 46.23, locked: true, order: 1, notes: "Blending base to adjust pourability" },
        { id: "fruit_1", name: "Papaya", grams: 585, pct: 23.39, locked: false, order: 2, notes: "Sweet, creamy tropical base" },
        { id: "fruit_2", name: "Mango", grams: 606, pct: 24.25, locked: false, order: 3, notes: "Rich sweetness and silky body" },
        { id: "lemon", name: "Lemon Juice", grams: 113, pct: 4.5, locked: true, order: 4, notes: "Cuts through the heavy sweetness" },
        { id: "custom_1787136518180", name: "Papaya Seeds", pct: 0.92, grams: 23, locked: true, order: 5, notes: "Peppery kick" },
        { id: "custom_1787152682633", name: "Cinamon", pct: 0.41, grams: 10, locked: true, order: 6, notes: "Chopped" },
        { id: "custom_1787152693787", name: "Salt", pct: 0.3, grams: 8, locked: true, order: 7, notes: "Chopped" }
      ],
      versions: []
    },
    {
      id: "recipe_1787136756947",
      name: "የደስ ደስ",
      type: "fruit",
      isDefault: false,
      description: "Uses the nutrient-dense pineapple core balanced with rich avocado flesh and lemon to keep it bright and silky.",
      baseBatchWeight: 2000,
      blendingNotes: "Add liquid base first, soft produce next, dense produce last.",
      ingredients: [
        { id: "water", name: "Water / Cold Filtered", grams: 1317, pct: 52.66, locked: true, order: 1, notes: "Base liquid (50%)" },
        { id: "fruit_1", name: "Pineapple", grams: 610, pct: 24.41, locked: false, order: 2, notes: "Fresh prepped" },
        { id: "fruit_2", name: "Avocado", grams: 408, pct: 16.3, locked: false, order: 3, notes: "Sweetness & aroma" },
        { id: "lemon", name: "Lemon Juice", grams: 108, pct: 4.32, locked: true, order: 4, notes: "Acidity balance" },
        { id: "custom_1787136784900", name: "Lemon Zest", pct: 0.51, grams: 13, locked: true, order: 5, notes: "Chopped chunks" },
        { id: "custom_1787152837959", name: "Ginger", pct: 1.5, grams: 38, locked: true, order: 6, notes: "Chopped" },
        { id: "custom_1787152849795", name: "Cinnamon", pct: 0.3, grams: 8, locked: true, order: 7, notes: "Chopped" }
      ],
      versions: []
    },
    {
      id: "recipe_1787153877894",
      name: "የፀሐይ ቶኒክ",
      type: "fruit",
      isDefault: false,
      description: "A bright, exotic tonic with warm spices and citrus oils that wake up the palate.",
      baseBatchWeight: 2000,
      blendingNotes: "Add liquid base first, soft produce next, dense produce last.",
      ingredients: [
        { id: "water", name: "Water / Cold Filtered", grams: 1375, pct: 55, locked: true, order: 1, notes: "Base liquid (50%)" },
        { id: "ing_1", name: "Mango", grams: 529, pct: 21.17, locked: false, order: 2, notes: "Base produce" },
        { id: "ing_2", name: "Pineapple", grams: 371, pct: 14.83, locked: false, order: 3, notes: "Sweetness" },
        { id: "lemon", name: "Lemon juice", grams: 163, pct: 6.5, locked: true, order: 4, notes: "Acidity" },
        { id: "custom_1787153897922", name: "Ginger", pct: 1, grams: 25, locked: true, order: 5, notes: "Mild warmth" },
        { id: "custom_1787153905713", name: "Papaya seed", pct: 0.8, grams: 20, locked: true, order: 6, notes: "Mustard-seed spice" },
        { id: "custom_1787153916550", name: "Korarima", pct: 0.4, grams: 10, locked: true, order: 7, notes: "Smoky, herbal depth" },
        { id: "custom_1787153927480", name: "Lemon Zest", pct: 0.3, grams: 8, locked: true, order: 8, notes: "Fragrant citrus oils" }
      ],
      versions: []
    },
    {
      id: "recipe_1787154136851",
      name: "Earthy Ruby Zing",
      type: "veggie",
      isDefault: false,
      description: "Beetroot’s earthiness is completely transformed by the bright bromelain acidity of pineapple and spicy ginger.",
      baseBatchWeight: 2000,
      blendingNotes: "Add liquid base first, soft produce next, dense produce last.",
      ingredients: [
        { id: "water", name: "Water", grams: 1087, pct: 43.48, locked: true, order: 1, notes: "Base liquid (50%)" },
        { id: "custom_1787154167271", name: "Papaya", pct: 10.28, grams: 257, locked: false, order: 2, notes: "Chopped" },
        { id: "ing_1", name: "Pineapple", grams: 569, pct: 22.75, locked: false, order: 3, notes: "Base produce" },
        { id: "ing_2", name: "Beetroot", grams: 412, pct: 16.49, locked: false, order: 4, notes: "Sweetness" },
        { id: "lemon", name: "Lemon Juice", grams: 125, pct: 5, locked: true, order: 5, notes: "Acidity" },
        { id: "custom_1787154178235", name: "Ginger", pct: 1.7, grams: 43, locked: true, order: 6, notes: "Chopped" },
        { id: "custom_1787154182584", name: "Cinamon", pct: 0.3, grams: 8, locked: true, order: 7, notes: "Chopped" }
      ],
      versions: []
    },
    {
      id: "recipe_1787154384262",
      name: "Spiced Potato Velvet",
      type: "veggie",
      isDefault: false,
      description: "A creamy, soothing spiced smoothie that tastes like a dessert pudding rather than raw vegetables.",
      baseBatchWeight: 2000,
      blendingNotes: "Add liquid base first, soft produce next, dense produce last.",
      ingredients: [
        { id: "water", name: "Water / Cold Filtered", grams: 1000, pct: 40, locked: true, order: 1, notes: "Base liquid (50%)" },
        { id: "ing_1", name: "Papaya", grams: 606, pct: 24.25, locked: false, order: 2, notes: "Base produce" },
        { id: "ing_2", name: "Sweet potato", grams: 375, pct: 15, locked: false, order: 3, notes: "Sweetness" },
        { id: "lemon", name: "Avocado", grams: 311, pct: 12.45, locked: false, order: 4, notes: "Acidity" },
        { id: "custom_1787154405392", name: "Lemon juice", pct: 6, grams: 150, locked: true, order: 5, notes: "Chopped" },
        { id: "custom_1787154408961", name: "Ginger", pct: 1.5, grams: 38, locked: true, order: 6, notes: "Chopped" },
        { id: "custom_1787154413357", name: "Cinnamon", pct: 0.5, grams: 13, locked: true, order: 7, notes: "Chopped" },
        { id: "custom_1787154423620", name: "Salt", pct: 0.2, grams: 5, locked: true, order: 8, notes: "Chopped" },
        { id: "custom_1787154427677", name: "Garlic", pct: 0.1, grams: 3, locked: true, order: 9, notes: "OPTIONAL" }
      ],
      versions: []
    },
    {
      id: "recipe_1787154574824",
      name: "Green Glow",
      type: "veggie",
      isDefault: false,
      description: "Zucchini provides a light, crisp, high-volume base without any bitterness, blending invisibly into tart pineapple and avocado.",
      baseBatchWeight: 2000,
      blendingNotes: "Add liquid base first, soft produce next, dense produce last.",
      ingredients: [
        { id: "water", name: "Water / Cold Filtered", grams: 1375, pct: 55, locked: true, order: 1, notes: "Base liquid (50%)" },
        { id: "ing_1", name: "Zucchini", grams: 275, pct: 11.01, locked: false, order: 2, notes: "Base produce" },
        { id: "ing_2", name: "Pineapple", grams: 375, pct: 14.99, locked: false, order: 3, notes: "Sweetness" },
        { id: "lemon", name: "Avocado", grams: 275, pct: 10.99, locked: false, order: 4, notes: "Acidity" },
        { id: "custom_1787154600707", name: "Lemon  juice", pct: 6, grams: 150, locked: true, order: 5, notes: "Chopped" },
        { id: "custom_1787154621419", name: "Ginger", pct: 1.2, grams: 30, locked: true, order: 6, notes: "Chopped" },
        { id: "custom_1787154627123", name: "Korarima", pct: 0.31, grams: 8, locked: true, order: 7, notes: "Chopped" },
        { id: "custom_1787154659099", name: "Lemon zest", pct: 0.5, grams: 13, locked: true, order: 8, notes: "Chopped" }
      ],
      versions: []
    }
  ],
  tasteLogs: []
};

class JuiceApp {
  constructor() {
    this.state = this.loadAndMigrateState();
    this.currentRecipeId = this.state.recipes[0]?.id || "house-fruit-blend";
    
    this.batchSizeMode = "peopleDays";
    this.calcPeople = this.state.household.numPeople || 5;
    this.calcDays = 2;
    this.calcGlassesPerDay = 1;
    this.calcGuestGlasses = 0;
    this.currentBatchTotalGrams = 2500;

    this.draftRecipe = null;
    this.isDraftDirty = false;

    this.kitchenStepIndex = 0;
    this.kitchenScaleViewMode = "tare";
    this.activeTab = "builder";
    this.audioCtx = null;
    this.lastSyncedServerTimestamp = null;

    this.init();
    this.initServerRealTimeSync();
  }

  /**
   * Real-Time Wi-Fi Sync Engine
   * Pulls and pushes data with server.py to keep computer & phone in lockstep.
   */
  async initServerRealTimeSync() {
    // Initial fetch from server
    await this.pullFromServer();

    // Push local state to server if server was empty
    if (!this.lastSyncedServerTimestamp) {
      await this.pushToServer();
    }

    // Auto-sync polling every 3 seconds
    setInterval(() => {
      if (!this.isDraftDirty && document.visibilityState !== "hidden") {
        this.pullFromServer();
      }
    }, 3000);

    // Sync on tab focus / wake
    window.addEventListener("focus", () => this.pullFromServer());
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") this.pullFromServer();
    });
  }

  async pullFromServer() {
    try {
      const res = await fetch("/api/sync", { cache: "no-store" });
      if (!res.ok) return;
      const remoteState = await res.json();
      if (!remoteState || !remoteState.recipes || remoteState.recipes.length === 0) return;

      const remoteTime = remoteState.lastSaved || "";
      if (remoteTime && remoteTime !== this.state.lastSaved) {
        this.state = remoteState;
        this.lastSyncedServerTimestamp = remoteTime;
        localStorage.setItem(ACTIVE_STORAGE_KEY, JSON.stringify(this.state));

        // Re-load draft and render if not actively editing
        if (!this.isDraftDirty) {
          const currentExists = this.state.recipes.find(r => r.id === this.currentRecipeId);
          if (!currentExists) this.currentRecipeId = this.state.recipes[0].id;
          this.loadDraftRecipe();
          this.renderAll();
          this.updateLastSavedIndicator();
        }
      }
    } catch (e) {
      // Server not reachable (offline / standalone), fallback to localStorage
    }
  }

  async pushToServer() {
    try {
      await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state)
      });
      this.lastSyncedServerTimestamp = this.state.lastSaved;
    } catch (e) {
      // Server offline, preserved in localStorage
    }
  }

  copyTextToClipboard(text, successMsg = "Copied to clipboard") {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(successMsg);
      }).catch(() => {
        this.fallbackExecCommandCopy(text, successMsg);
      });
    } else {
      this.fallbackExecCommandCopy(text, successMsg);
    }
  }

  fallbackExecCommandCopy(text, successMsg) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (success) {
        this.showToast(successMsg);
      } else {
        this.showToast(successMsg);
      }
    } catch (e) {
      this.showToast(successMsg);
    }
  }

  showToast(message, type = "success") {
    const toast = document.getElementById("appToast");
    if (!toast) return;
    toast.textContent = message;
    toast.className = `fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl shadow-xl font-bold text-xs text-white transition-all duration-200 ${
      type === "error" ? "bg-red-600" : (type === "warning" ? "bg-amber-600" : "bg-slate-900")
    }`;
    toast.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
    }, 2500);
  }

  loadAndMigrateState() {
    let loadedData = null;

    for (const key of KNOWN_STORAGE_KEYS) {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && (parsed.recipes || parsed.household)) {
            loadedData = parsed;
            break;
          }
        }
      } catch (e) {
        console.warn(`Failed reading key ${key}`, e);
      }
    }

    if (!loadedData) {
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }

    const mergedState = {
      ...DEFAULT_STATE,
      ...loadedData,
      household: { ...DEFAULT_STATE.household, ...(loadedData.household || {}) },
      tasteLogs: loadedData.tasteLogs || []
    };

    if (loadedData.recipes && loadedData.recipes.length > 0) {
      mergedState.recipes = loadedData.recipes.map(userRec => {
        const totalGrams = userRec.ingredients ? userRec.ingredients.reduce((s, i) => s + (Number(i.grams) || 0), 0) : 2000;
        const ingredients = (userRec.ingredients || []).map((ing, idx) => ({
          ...ing,
          pct: ing.pct !== undefined ? Number(ing.pct) : (totalGrams > 0 ? Number(((ing.grams / totalGrams) * 100).toFixed(2)) : 0),
          locked: ing.locked !== undefined ? Boolean(ing.locked) : (ing.id === "water"),
          order: ing.order || (idx + 1)
        }));

        return {
          ...userRec,
          type: userRec.type || "fruit",
          ingredients,
          versions: userRec.versions || []
        };
      });
    } else {
      mergedState.recipes = DEFAULT_STATE.recipes;
    }

    return mergedState;
  }

  saveState() {
    try {
      this.state.lastSaved = new Date().toISOString();
      localStorage.setItem(ACTIVE_STORAGE_KEY, JSON.stringify(this.state));
      this.updateLastSavedIndicator();
      this.pushToServer();
    } catch (e) {
      console.error("Failed writing state to localStorage", e);
    }
  }

  updateLastSavedIndicator() {
    const el = document.getElementById("lastSavedStatus");
    if (el) {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      el.textContent = `Saved ${timeStr}`;
    }
  }

  init() {
    this.loadDraftRecipe();
    this.recalculateBatchGramsFromInputs();
    this.bindEvents();
    this.renderAll();
    this.updateLastSavedIndicator();
  }

  loadDraftRecipe() {
    const saved = this.state.recipes.find(r => r.id === this.currentRecipeId) || this.state.recipes[0];
    if (!saved) return;
    this.currentRecipeId = saved.id;
    this.draftRecipe = JSON.parse(JSON.stringify(saved));
    this.normalizeDraftPercentages();
    this.isDraftDirty = false;
  }

  getSavedRecipe() {
    return this.state.recipes.find(r => r.id === this.currentRecipeId) || this.state.recipes[0];
  }

  getIngredientSpoilageMeta(ingredientId, name = "") {
    const found = INGREDIENTS_SPOILAGE_DATABASE.find(i => i.id === ingredientId) ||
                  INGREDIENTS_SPOILAGE_DATABASE.find(i => name.toLowerCase().includes(i.id) || i.name.toLowerCase().includes(name.toLowerCase()));
    
    if (found) return found;

    return {
      id: ingredientId,
      name: name || "Produce",
      avgUnitWeight: 200,
      unitName: "unit",
      prepYield: 0.80,
      cadenceTier: "medium",
      fridgeCutPeakDays: 2,
      fridgeCutMaxDays: 3,
      counterWholeDays: 4,
      fridgeWholeDays: 7,
      storageRule: "Keep cut in airtight glass container in fridge (<=4°C).",
      counterRule: "Store in cool area.",
      spoilageSign: "Off-odor, browning, liquid breakdown."
    };
  }

  normalizeDraftPercentages() {
    if (!this.draftRecipe || !this.draftRecipe.ingredients) return;
    const totalPct = this.draftRecipe.ingredients.reduce((sum, item) => sum + (Number(item.pct) || 0), 0);
    if (Math.abs(totalPct - 100.0) > 0.05) {
      const totalGrams = this.draftRecipe.ingredients.reduce((sum, item) => sum + (Number(item.grams) || 0), 0);
      this.draftRecipe.ingredients.forEach(item => {
        item.pct = totalGrams > 0 ? Number(((item.grams / totalGrams) * 100).toFixed(2)) : 0;
      });
    }
  }

  recalculateBatchGramsFromInputs() {
    const hh = this.state.household;
    const glassWeight = hh.glassSizeGrams || 250;

    if (this.batchSizeMode === "peopleDays") {
      const regularGlasses = this.calcPeople * this.calcDays * this.calcGlassesPerDay;
      const totalGlasses = regularGlasses + this.calcGuestGlasses;
      this.currentBatchTotalGrams = Math.round(totalGlasses * glassWeight);
    }
  }

  getScaledIngredients(recipe, totalBatchGrams) {
    let cumulative = 0;
    return recipe.ingredients.map(item => {
      const scaledGrams = Math.round((totalBatchGrams * (Number(item.pct) || 0)) / 100);
      cumulative += scaledGrams;
      return {
        ...item,
        scaledGrams,
        cumulativeTargetGrams: cumulative,
        percentage: Number(item.pct).toFixed(2),
        spoilageMeta: this.getIngredientSpoilageMeta(item.id, item.name)
      };
    });
  }

  evaluateIngredientMatch(query) {
    if (!query || query.trim().length < 2) return null;
    const q = query.trim().toLowerCase();

    const found = VALID_PRODUCE_DATABASE.find(item =>
      item.keys.some(k => q === k || q.includes(k) || k.includes(q))
    );

    if (!found) {
      return {
        isValid: false,
        name: query.trim(),
        message: `"${query.trim()}" was not recognized as a known culinary produce item. Try: kale, strawberries, lemon zest, chia seeds, watermelon rind, ginger, etc.`
      };
    }

    const fruitRecipe = this.state.recipes.find(r => r.type === "fruit") || this.state.recipes[0];
    const veggieRecipe = this.state.recipes.find(r => r.type === "veggie") || this.state.recipes[1] || this.state.recipes[0];
    const comboRecipe = this.state.recipes.find(r => r.type === "combo") || this.draftRecipe;

    let targetRecipe = fruitRecipe;
    if (found.type === "veggie") {
      targetRecipe = veggieRecipe;
    } else if (found.type === "combo") {
      targetRecipe = comboRecipe || this.draftRecipe;
    } else {
      targetRecipe = fruitRecipe;
    }

    const calculatedGrams = Math.round((this.currentBatchTotalGrams * found.defaultPct) / 100);

    return {
      isValid: true,
      name: found.name,
      recommendedRecipe: targetRecipe,
      defaultPct: found.defaultPct,
      calculatedGrams,
      taste: found.taste,
      why: found.why,
      tip: found.tip
    };
  }

  updateDraftIngredientPercentage(ingredientIndex, newPct, skipRender = false) {
    const ing = this.draftRecipe.ingredients[ingredientIndex];
    if (ing.locked) return;

    newPct = Math.max(0, Math.min(100, parseFloat(newPct) || 0));

    const lockedSum = this.draftRecipe.ingredients.reduce((sum, item, idx) => {
      return (item.locked && idx !== ingredientIndex) ? sum + (Number(item.pct) || 0) : sum;
    }, 0);

    const maxAllowed = Math.max(0, 100 - lockedSum);
    if (newPct > maxAllowed) newPct = maxAllowed;

    const remainingBudget = 100 - lockedSum - newPct;
    const otherUnlocked = this.draftRecipe.ingredients.filter((item, idx) => !item.locked && idx !== ingredientIndex);
    const otherUnlockedSum = otherUnlocked.reduce((sum, item) => sum + (Number(item.pct) || 0), 0);

    ing.pct = Number(newPct.toFixed(2));

    if (otherUnlocked.length > 0) {
      if (otherUnlockedSum > 0) {
        otherUnlocked.forEach(item => {
          const ratio = (Number(item.pct) || 0) / otherUnlockedSum;
          item.pct = Number((remainingBudget * ratio).toFixed(2));
        });
      } else {
        const split = remainingBudget / otherUnlocked.length;
        otherUnlocked.forEach(item => {
          item.pct = Number(split.toFixed(2));
        });
      }
    }

    const currentSum = this.draftRecipe.ingredients.reduce((sum, i) => sum + (Number(i.pct) || 0), 0);
    const diff = Number((100.0 - currentSum).toFixed(2));
    if (diff !== 0 && otherUnlocked.length > 0) {
      otherUnlocked[0].pct = Number((otherUnlocked[0].pct + diff).toFixed(2));
    }

    this.draftRecipe.ingredients.forEach(item => {
      item.grams = Math.round((this.currentBatchTotalGrams * item.pct) / 100);
    });

    this.isDraftDirty = true;
    this.updateDirtyIndicator();

    if (!skipRender) {
      this.updateBuilderDisplayValuesOnly();
      this.renderFridgeStoragePlanner();
      this.renderGroceryCadencePlanner();
    }
  }

  toggleDraftIngredientLock(ingredientIndex) {
    const item = this.draftRecipe.ingredients[ingredientIndex];
    item.locked = !item.locked;
    this.isDraftDirty = true;
    this.renderRecipeBuilder();
  }

  moveDraftIngredient(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= this.draftRecipe.ingredients.length) return;

    const temp = this.draftRecipe.ingredients[index];
    this.draftRecipe.ingredients[index] = this.draftRecipe.ingredients[targetIndex];
    this.draftRecipe.ingredients[targetIndex] = temp;

    this.draftRecipe.ingredients.forEach((item, idx) => {
      item.order = idx + 1;
    });

    this.isDraftDirty = true;
    this.updateDirtyIndicator();
    this.renderRecipeBuilder();
    this.renderKitchenAssistant();
  }

  updateDirtyIndicator() {
    const dirtyBadge = document.getElementById("builderUnsavedBadge");
    const saveBtn = document.getElementById("saveCurrentRecipeBtn");
    const discardBtn = document.getElementById("discardChangesBtn");

    if (dirtyBadge) dirtyBadge.classList.toggle("hidden", !this.isDraftDirty);
    if (discardBtn) discardBtn.classList.toggle("hidden", !this.isDraftDirty);
    if (saveBtn) {
      if (this.isDraftDirty) saveBtn.classList.add("ring-2", "ring-slate-900");
      else saveBtn.classList.remove("ring-2", "ring-slate-900");
    }
  }

  commitDraftToSavedRecipe() {
    const savedIdx = this.state.recipes.findIndex(r => r.id === this.currentRecipeId);
    if (savedIdx >= 0) {
      const titleInput = document.getElementById("builderRecipeTitle");
      const descInput = document.getElementById("builderRecipeDesc");
      const notesInput = document.getElementById("builderRecipeNotesInput");

      if (titleInput && titleInput.value.trim()) this.draftRecipe.name = titleInput.value.trim();
      if (descInput) this.draftRecipe.description = descInput.value.trim();
      if (notesInput) this.draftRecipe.blendingNotes = notesInput.value.trim();

      this.state.recipes[savedIdx] = JSON.parse(JSON.stringify(this.draftRecipe));
      this.saveState();
      this.isDraftDirty = false;
      this.renderRecipeOptions();
      this.renderRecipeBuilder();
      this.renderFridgeStoragePlanner();
      this.renderGroceryCadencePlanner();
      this.showToast(`Saved "${this.draftRecipe.name}"`);
    }
  }

  discardDraftChanges() {
    this.loadDraftRecipe();
    this.renderRecipeBuilder();
    this.renderFridgeStoragePlanner();
    this.renderGroceryCadencePlanner();
    this.showToast("Changes discarded");
  }

  deleteCurrentRecipe() {
    if (this.state.recipes.length <= 1) {
      this.showToast("Cannot delete the last remaining recipe", "error");
      return;
    }

    const rec = this.getSavedRecipe();
    const modal = document.getElementById("confirmDeleteRecipeModal");
    const nameEl = document.getElementById("deleteRecipeTargetName");
    if (nameEl) nameEl.textContent = rec.name;
    modal?.classList.remove("hidden");
  }

  confirmDeleteRecipeExecution() {
    const idx = this.state.recipes.findIndex(r => r.id === this.currentRecipeId);
    if (idx >= 0) {
      const deletedName = this.state.recipes[idx].name;
      this.state.recipes.splice(idx, 1);
      this.currentRecipeId = this.state.recipes[0].id;
      this.loadDraftRecipe();
      this.saveState();
      this.renderAll();
      document.getElementById("confirmDeleteRecipeModal")?.classList.add("hidden");
      this.showToast(`Deleted "${deletedName}"`);
    }
  }

  playChime(type = "step") {
    try {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(type === "done" ? [30, 50, 30] : 15);
      }

      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;

      if (type === "step") {
        const clickOsc = this.audioCtx.createOscillator();
        const clickGain = this.audioCtx.createGain();
        clickOsc.type = "triangle";
        clickOsc.frequency.setValueAtTime(1400, now);
        clickOsc.frequency.exponentialRampToValueAtTime(300, now + 0.025);

        clickGain.gain.setValueAtTime(0.35, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        clickOsc.connect(clickGain);
        clickGain.connect(this.audioCtx.destination);

        clickOsc.start(now);
        clickOsc.stop(now + 0.03);

        const bodyOsc = this.audioCtx.createOscillator();
        const bodyGain = this.audioCtx.createGain();
        bodyOsc.type = "sine";
        bodyOsc.frequency.setValueAtTime(180, now);
        bodyOsc.frequency.exponentialRampToValueAtTime(55, now + 0.07);

        bodyGain.gain.setValueAtTime(0.40, now);
        bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        bodyOsc.connect(bodyGain);
        bodyGain.connect(this.audioCtx.destination);

        bodyOsc.start(now);
        bodyOsc.stop(now + 0.08);

      } else if (type === "done") {
        [164.81, 220.0, 329.63].forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.04);
          
          gain.gain.setValueAtTime(0.25, now + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.45);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(now + idx * 0.04);
          osc.stop(now + idx * 0.04 + 0.5);
        });
      }
    } catch (e) {
      console.log("Audio not active", e);
    }
  }

  bindEvents() {
    // Mode Switcher (2 Unified Modes: Plan vs Make)
    const modePlanBtn = document.getElementById("navModePlan");
    const modeMakeBtn = document.getElementById("navModeMake");

    modePlanBtn?.addEventListener("click", () => this.switchMode("plan"));
    modeMakeBtn?.addEventListener("click", () => this.switchMode("make"));

    const recipeSelect = document.getElementById("recipeSelect");
    if (recipeSelect) {
      recipeSelect.addEventListener("change", e => {
        this.currentRecipeId = e.target.value;
        this.kitchenStepIndex = 0;
        this.loadDraftRecipe();
        this.renderAll();
      });
    }

    const onPeopleDaysChange = () => {
      this.calcPeople = parseInt(document.getElementById("calcNumPeople")?.value, 10) || 5;
      this.calcDays = parseInt(document.getElementById("calcDaysSupply")?.value, 10) || 1;
      this.calcGlassesPerDay = parseFloat(document.getElementById("calcGlassesPerDay")?.value) || 1;
      this.calcGuestGlasses = parseInt(document.getElementById("calcGuestGlasses")?.value, 10) || 0;
      this.recalculateBatchGramsFromInputs();
      this.renderRecipeBuilder();
      this.renderFridgeStoragePlanner();
      this.renderGroceryCadencePlanner();
      this.renderKitchenAssistant();
    };

    document.getElementById("calcNumPeople")?.addEventListener("input", onPeopleDaysChange);
    document.getElementById("calcDaysSupply")?.addEventListener("input", onPeopleDaysChange);
    document.getElementById("calcGlassesPerDay")?.addEventListener("input", onPeopleDaysChange);
    document.getElementById("calcGuestGlasses")?.addEventListener("input", onPeopleDaysChange);

    document.getElementById("saveCurrentRecipeBtn")?.addEventListener("click", () => {
      this.commitDraftToSavedRecipe();
    });
    document.getElementById("discardChangesBtn")?.addEventListener("click", () => {
      this.discardDraftChanges();
    });

    document.getElementById("deleteCurrentRecipeBtn")?.addEventListener("click", () => {
      this.deleteCurrentRecipe();
    });
    document.getElementById("cancelDeleteBtn")?.addEventListener("click", () => {
      document.getElementById("confirmDeleteRecipeModal")?.classList.add("hidden");
    });
    document.getElementById("confirmExecuteDeleteBtn")?.addEventListener("click", () => {
      this.confirmDeleteRecipeExecution();
    });

    document.getElementById("scaleViewTare")?.addEventListener("click", () => {
      this.kitchenScaleViewMode = "tare";
      this.renderKitchenAssistant();
    });
    document.getElementById("scaleViewCumul")?.addEventListener("click", () => {
      this.kitchenScaleViewMode = "cumulative";
      this.renderKitchenAssistant();
    });

    document.getElementById("openVersionHistoryBtn")?.addEventListener("click", () => {
      this.openVersionHistoryModal();
    });
    document.getElementById("saveNewSnapshotBtn")?.addEventListener("click", () => {
      this.openCreateSnapshotModal();
    });

    document.getElementById("createNewRecipeBtn")?.addEventListener("click", () => {
      this.openCreateRecipeModal();
    });

    document.getElementById("addIngredientToRecipeBtn")?.addEventListener("click", () => {
      this.addIngredientToDraftRecipe();
    });

    document.getElementById("openSettingsBtn")?.addEventListener("click", () => {
      this.populateSettingsForm();
      document.getElementById("settingsModal")?.classList.remove("hidden");
    });
    document.getElementById("closeSettingsBtn")?.addEventListener("click", () => {
      document.getElementById("settingsModal")?.classList.add("hidden");
    });
    document.getElementById("saveSettingsBtn")?.addEventListener("click", () => {
      this.saveSettingsForm();
      document.getElementById("settingsModal")?.classList.add("hidden");
      this.renderAll();
      this.showToast("Parameters updated");
    });

    document.getElementById("openDataManagementBtn")?.addEventListener("click", () => {
      const modal = document.getElementById("dataManagementModal");
      const textarea = document.getElementById("syncJsonArea");
      if (textarea) textarea.value = JSON.stringify(this.state, null, 2);
      modal?.classList.remove("hidden");
    });
    document.getElementById("closeDataModalBtn")?.addEventListener("click", () => {
      document.getElementById("dataManagementModal")?.classList.add("hidden");
    });

    document.getElementById("copyDbClipboardBtn")?.addEventListener("click", () => {
      const jsonStr = JSON.stringify(this.state, null, 2);
      const textarea = document.getElementById("syncJsonArea");
      if (textarea) {
        textarea.value = jsonStr;
        textarea.select();
      }
      this.copyTextToClipboard(jsonStr, "Database copied to clipboard");
    });

    document.getElementById("pasteDbRestoreBtn")?.addEventListener("click", () => {
      const textarea = document.getElementById("syncJsonArea");
      const raw = textarea ? textarea.value.trim() : "";
      if (!raw) {
        this.showToast("Paste JSON into the box above first", "warning");
        return;
      }
      try {
        const parsed = JSON.parse(raw);
        if (parsed.recipes && parsed.recipes.length > 0) {
          this.state = parsed;
          this.currentRecipeId = this.state.recipes[0].id;
          this.loadDraftRecipe();
          this.saveState();
          this.renderAll();
          this.showToast("Database restored successfully");
          document.getElementById("dataManagementModal")?.classList.add("hidden");
        } else {
          this.showToast("Invalid recipe JSON format", "error");
        }
      } catch (e) {
        this.showToast("Invalid JSON text", "error");
      }
    });

    document.getElementById("openNewLogBtn")?.addEventListener("click", () => {
      this.openNewLogModal();
    });
    document.getElementById("closeLogModalBtn")?.addEventListener("click", () => {
      document.getElementById("logBatchModal")?.classList.add("hidden");
    });
    document.getElementById("saveLogEntryBtn")?.addEventListener("click", () => {
      this.saveNewLogEntry();
    });

    document.getElementById("closeVersionModalBtn")?.addEventListener("click", () => {
      document.getElementById("versionHistoryModal")?.classList.add("hidden");
    });
    document.getElementById("closeSnapshotModalBtn")?.addEventListener("click", () => {
      document.getElementById("createSnapshotModal")?.classList.add("hidden");
    });
    document.getElementById("confirmSaveSnapshotBtn")?.addEventListener("click", () => {
      this.saveNewSnapshot();
    });

    document.getElementById("closeCreateRecipeModalBtn")?.addEventListener("click", () => {
      document.getElementById("createRecipeModal")?.classList.add("hidden");
    });
    document.getElementById("confirmCreateRecipeBtn")?.addEventListener("click", () => {
      this.confirmCreateNewRecipe();
    });

    document.getElementById("exportDataBtn")?.addEventListener("click", () => this.exportData());
    document.getElementById("importDataInput")?.addEventListener("change", e => this.importData(e));

    const matchInput = document.getElementById("quickMatcherInput");
    if (matchInput) {
      matchInput.addEventListener("input", (e) => {
        this.handleQuickMatcherInput(e.target.value);
      });
      matchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.handleQuickMatcherInput(e.target.value);
        }
      });
    }
  }

  switchMode(mode) {
    this.activeMode = mode;
    const viewPlan = document.getElementById("viewPlanRecipe");
    const viewMake = document.getElementById("viewMakeScale");
    const modePlanBtn = document.getElementById("navModePlan");
    const modeMakeBtn = document.getElementById("navModeMake");

    if (mode === "make") {
      viewPlan?.classList.add("hidden");
      viewMake?.classList.remove("hidden");

      modeMakeBtn?.classList.add("bg-white", "text-slate-900", "shadow-sm");
      modeMakeBtn?.classList.remove("text-slate-500");

      modePlanBtn?.classList.remove("bg-white", "text-slate-900", "shadow-sm");
      modePlanBtn?.classList.add("text-slate-500");

      this.renderKitchenAssistant();
    } else {
      viewMake?.classList.add("hidden");
      viewPlan?.classList.remove("hidden");

      modePlanBtn?.classList.add("bg-white", "text-slate-900", "shadow-sm");
      modePlanBtn?.classList.remove("text-slate-500");

      modeMakeBtn?.classList.remove("bg-white", "text-slate-900", "shadow-sm");
      modeMakeBtn?.classList.add("text-slate-500");

      this.renderRecipeBuilder();
      this.renderFridgeStoragePlanner();
      this.renderGroceryCadencePlanner();
      this.renderTasteLogs();
    }
  }

  handleQuickMatcherInput(val) {
    const resultBox = document.getElementById("quickMatcherResultBox");
    if (!resultBox) return;

    if (!val || val.trim().length === 0) {
      resultBox.classList.add("hidden");
      return;
    }

    const res = this.evaluateIngredientMatch(val);
    if (!res) {
      resultBox.classList.add("hidden");
      return;
    }

    resultBox.classList.remove("hidden");

    if (!res.isValid) {
      resultBox.innerHTML = `
        <div class="p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600">
          ${res.message}
        </div>
      `;
      return;
    }

    resultBox.innerHTML = `
      <div class="p-4 bg-slate-50 border border-slate-300 rounded-xl text-xs space-y-2">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="font-bold text-slate-900">
            Suggested blend: <span class="text-slate-800 underline">${res.recommendedRecipe.name}</span>
          </div>
          <button type="button" id="applyMatchedIngredientBtn" class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition whitespace-nowrap self-start sm:self-auto">
            + Add to ${res.recommendedRecipe.name} (${res.defaultPct}%)
          </button>
        </div>

        <div class="text-slate-700 leading-relaxed">
          ${res.why}
        </div>

        <div class="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
          <strong>Prep / Blend:</strong> ${res.tip}
        </div>
      </div>
    `;

    document.getElementById("applyMatchedIngredientBtn")?.addEventListener("click", () => {
      if (this.currentRecipeId !== res.recommendedRecipe.id) {
        this.currentRecipeId = res.recommendedRecipe.id;
        this.loadDraftRecipe();
      }

      this.draftRecipe.ingredients.push({
        id: "custom_" + Date.now(),
        name: res.name,
        pct: res.defaultPct,
        grams: res.calculatedGrams,
        locked: false,
        order: this.draftRecipe.ingredients.length + 1,
        notes: res.tip
      });

      this.normalizeDraftPercentages();
      this.isDraftDirty = true;
      this.renderRecipeOptions();
      this.renderRecipeBuilder();
      this.showToast(`Added ${res.name} (${res.defaultPct}%) to ${this.draftRecipe.name}`);
      
      const inp = document.getElementById("quickMatcherInput");
      if (inp) inp.value = "";
      resultBox.classList.add("hidden");
    });
  }

  switchTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll("[data-tab-pane]").forEach(pane => {
      pane.classList.add("hidden");
    });
    const targetPane = document.querySelector(`[data-tab-pane='${tab}']`);
    if (targetPane) targetPane.classList.remove("hidden");

    document.querySelectorAll("[data-nav-tab]").forEach(btn => {
      const isCurrent = btn.getAttribute("data-nav-tab") === tab;
      if (isCurrent) {
        btn.classList.add("bg-white", "text-slate-900", "shadow-sm", "font-bold");
        btn.classList.remove("text-slate-500");
      } else {
        btn.classList.remove("bg-white", "text-slate-900", "shadow-sm", "font-bold");
        btn.classList.add("text-slate-500");
      }
    });

    if (tab === "kitchen") this.renderKitchenAssistant();
    else if (tab === "fridge") this.renderFridgeStoragePlanner();
    else if (tab === "grocery") this.renderGroceryCadencePlanner();
    else if (tab === "logs") this.renderTasteLogs();
    else this.renderRecipeBuilder();
  }

  renderAll() {
    this.renderRecipeOptions();
    this.renderHouseholdSummaryHeader();
    this.renderRecipeBuilder();
    this.renderKitchenAssistant();
    this.renderFridgeStoragePlanner();
    this.renderGroceryCadencePlanner();
    this.renderTasteLogs();
  }

  renderHouseholdSummaryHeader() {
    const hh = this.state.household;
    const badge = document.getElementById("householdBadge");
    if (badge) {
      badge.innerHTML = `
        <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
          ${hh.numPeople} People &bull; ${hh.glassSizeGrams}g/glass &bull; ${hh.blenderMaxCapacityGrams}g Blender
        </span>
      `;
    }
  }

  renderRecipeOptions() {
    const select = document.getElementById("recipeSelect");
    if (!select) return;
    select.innerHTML = this.state.recipes.map(r => `
      <option value="${r.id}" ${r.id === this.currentRecipeId ? "selected" : ""}>
        ${r.name}
      </option>
    `).join("");
  }

  renderRecipeBuilder() {
    const recipe = this.draftRecipe || this.getSavedRecipe();
    const targetGrams = this.currentBatchTotalGrams;
    const scaledItems = this.getScaledIngredients(recipe, targetGrams);
    const hh = this.state.household;

    const dailyTargetGramsPerType = hh.numPeople * hh.glassSizeGrams;
    const totalGlasses = (targetGrams / hh.glassSizeGrams).toFixed(1);
    const totalContainers = (targetGrams / hh.containerSizeGrams).toFixed(1);
    const blenderBatches = (targetGrams / hh.blenderMaxCapacityGrams).toFixed(1);
    const daysSupplied = (targetGrams / dailyTargetGramsPerType).toFixed(1);

    const titleEl = document.getElementById("builderRecipeTitle");
    const descEl = document.getElementById("builderRecipeDesc");
    const notesInput = document.getElementById("builderRecipeNotesInput");

    if (titleEl) titleEl.value = recipe.name;
    if (descEl) descEl.value = recipe.description || "";
    if (notesInput) notesInput.value = recipe.blendingNotes || "";

    const versionTag = document.getElementById("builderCurrentVersionTag");
    if (versionTag) {
      const activeVer = (recipe.versions && recipe.versions.length > 0)
        ? recipe.versions[recipe.versions.length - 1].versionId
        : "v1.0";
      versionTag.textContent = activeVer;
    }

    const peopleDaysArea = document.getElementById("sizingAreaPeopleDays");
    const blenderArea = document.getElementById("sizingAreaBlender");
    const gramsArea = document.getElementById("sizingAreaGrams");

    if (peopleDaysArea && blenderArea && gramsArea) {
      peopleDaysArea.classList.toggle("hidden", this.batchSizeMode !== "peopleDays");
      blenderArea.classList.toggle("hidden", this.batchSizeMode !== "blender");
      gramsArea.classList.toggle("hidden", this.batchSizeMode !== "grams");
    }

    const pInp = document.getElementById("calcNumPeople");
    const dInp = document.getElementById("calcDaysSupply");
    const gInp = document.getElementById("calcGlassesPerDay");
    const guestInp = document.getElementById("calcGuestGlasses");

    if (pInp) pInp.value = this.calcPeople;
    if (dInp) dInp.value = this.calcDays;
    if (gInp) gInp.value = this.calcGlassesPerDay;
    if (guestInp) guestInp.value = this.calcGuestGlasses;

    document.querySelectorAll(".quick-batch-btn").forEach(btn => {
      const btnVal = parseInt(btn.getAttribute("data-batch-grams"), 10);
      if (btnVal === this.currentBatchTotalGrams) {
        btn.classList.add("bg-slate-900", "text-white", "border-slate-900");
        btn.classList.remove("bg-white", "text-slate-700");
      } else {
        btn.classList.remove("bg-slate-900", "text-white", "border-slate-900");
        btn.classList.add("bg-white", "text-slate-700");
      }
    });

    const statYield = document.getElementById("statYield");
    const statGlasses = document.getElementById("statGlasses");
    const statContainers = document.getElementById("statContainers");
    const statBlenders = document.getElementById("statBlenders");
    const statDays = document.getElementById("statDays");

    if (statYield) statYield.textContent = `${targetGrams.toLocaleString()} g`;
    if (statGlasses) {
      statGlasses.innerHTML = `${totalGlasses} glasses ${
        this.calcGuestGlasses > 0 ? `<span class="text-xs text-slate-500 font-bold block">(+${this.calcGuestGlasses} guests)</span>` : ""
      }`;
    }
    if (statContainers) statContainers.textContent = `${totalContainers} &times; 1L containers`;
    if (statBlenders) statBlenders.textContent = `${blenderBatches} blender loads`;
    if (statDays) statDays.textContent = `${daysSupplied} days (${hh.numPeople} people)`;

    this.updateLiquidProduceRatioBar(scaledItems, targetGrams);
    this.updateDirtyIndicator();

    const rowsContainer = document.getElementById("builderIngredientsRows");
    if (rowsContainer) {
      const sumPct = recipe.ingredients.reduce((s, i) => s + (Number(i.pct) || 0), 0);
      const isPerfect100 = Math.abs(sumPct - 100.0) < 0.05;

      const sumBadge = document.getElementById("builderTotalPctBadge");
      if (sumBadge) {
        sumBadge.innerHTML = `
          <span>Total: ${sumPct.toFixed(1)}%</span>
          <span>${isPerfect100 ? "100%" : "Auto-balanced"}</span>
        `;
        sumBadge.className = `flex items-center gap-1.5 font-mono text-xs font-bold px-2.5 py-1 rounded-lg border ${
          isPerfect100 ? "text-slate-800 bg-slate-50 border-slate-200" : "text-amber-700 bg-amber-50 border-amber-200"
        }`;
      }

      rowsContainer.innerHTML = recipe.ingredients.map((item, idx) => {
        const scaled = scaledItems[idx];

        return `
          <div class="ingredient-card p-3 bg-slate-50 border border-slate-200 rounded-xl transition hover:border-slate-300 ${item.locked ? "bg-slate-100/80 border-slate-300" : ""}" data-ing-idx="${idx}">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div class="flex items-center gap-1.5 flex-1">
                
                <!-- Drag Handle (Only this element initiates drag) -->
                <div class="drag-handle cursor-grab active:cursor-grabbing px-2 py-1 text-slate-400 hover:text-slate-900 text-sm select-none font-bold rounded hover:bg-slate-200/60" data-ing-idx="${idx}" draggable="true" title="Drag handle to reorder">
                  ⋮⋮
                </div>

                <button type="button" class="lock-toggle-btn px-2 py-0.5 rounded-lg text-xs font-bold transition ${
                  item.locked ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-white text-slate-500 border border-slate-200 hover:text-slate-900"
                }" data-idx="${idx}" title="${item.locked ? "Locked: fixed percentage" : "Unlocked: balances automatically"}">
                  <span>${item.locked ? "Locked" : "Lock"}</span>
                </button>

                <input type="text" class="ing-name-input font-bold text-slate-800 text-sm bg-transparent border-b border-transparent hover:border-slate-300 focus:border-slate-900 focus:bg-white px-1.5 py-0.5 rounded transition flex-1" value="${item.name}" placeholder="Ingredient Name" data-idx="${idx}" />
                
                ${recipe.ingredients.length > 2 ? `
                  <button type="button" class="remove-ing-btn p-1 text-slate-400 hover:text-red-600 rounded transition" data-idx="${idx}" title="Remove ingredient">
                    &times;
                  </button>
                ` : ""}
              </div>

              <div class="flex items-center justify-between sm:justify-end gap-3 font-mono">
                <div class="text-right">
                  <div class="text-[10px] text-slate-400 font-sans uppercase">Scale:</div>
                  <div class="text-sm font-black text-slate-900 ing-grams-display" data-idx="${idx}">${scaled.scaledGrams}g</div>
                </div>

                <div class="relative w-20">
                  <input type="number" step="0.1" min="0" max="100" class="ing-pct-num-input w-full pl-2 pr-6 py-1 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 bg-white focus:ring-2 focus:ring-slate-900" value="${Number(item.pct).toFixed(1)}" data-idx="${idx}" ${item.locked ? "disabled" : ""} />
                  <span class="absolute right-2 top-1 text-[11px] text-slate-400 font-semibold">%</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 pt-0.5">
              <input type="range" min="0" max="80" step="0.25" value="${item.pct}" class="pct-slider flex-1 h-1.5 rounded-lg" data-idx="${idx}" ${item.locked ? "disabled" : ""} />
            </div>

            <div class="mt-1 flex items-center justify-between text-[11px] text-slate-400">
              <input type="text" class="ing-notes-input w-full bg-transparent text-slate-500 text-xs italic px-1 py-0.5 border-b border-transparent hover:border-slate-200 focus:border-slate-900 focus:bg-white rounded" placeholder="Prep note" value="${item.notes || ""}" data-idx="${idx}" />
              <span class="whitespace-nowrap ml-2 font-mono text-slate-600 bg-slate-200/60 px-1.5 py-0.5 rounded text-[10px] cumulative-display" data-idx="${idx}">Total: ${scaled.cumulativeTargetGrams}g</span>
            </div>
          </div>
        `;
      }).join("");

      // Drag and Drop Handlers strictly on the Handle
      let draggedCardIndex = null;

      rowsContainer.querySelectorAll(".drag-handle").forEach(handle => {
        handle.addEventListener("dragstart", (e) => {
          draggedCardIndex = parseInt(handle.getAttribute("data-ing-idx"), 10);
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", draggedCardIndex);
          const parentCard = handle.closest(".ingredient-card");
          if (parentCard) parentCard.classList.add("opacity-40", "border-dashed", "border-slate-400");
        });

        handle.addEventListener("dragend", () => {
          rowsContainer.querySelectorAll(".ingredient-card").forEach(c => {
            c.classList.remove("opacity-40", "border-dashed", "border-slate-400", "border-t-2", "border-b-2", "border-slate-900");
          });
        });
      });

      rowsContainer.querySelectorAll(".ingredient-card").forEach(card => {
        card.addEventListener("dragover", (e) => {
          if (draggedCardIndex === null) return;
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          const rect = card.getBoundingClientRect();
          const midY = rect.top + rect.height / 2;
          if (e.clientY < midY) {
            card.classList.add("border-t-2", "border-slate-900");
            card.classList.remove("border-b-2");
          } else {
            card.classList.add("border-b-2", "border-slate-900");
            card.classList.remove("border-t-2");
          }
        });

        card.addEventListener("dragleave", () => {
          card.classList.remove("border-t-2", "border-b-2", "border-slate-900");
        });

        card.addEventListener("drop", (e) => {
          e.preventDefault();
          card.classList.remove("border-t-2", "border-b-2", "border-slate-900");
          const targetIndex = parseInt(card.getAttribute("data-ing-idx"), 10);

          if (draggedCardIndex !== null && draggedCardIndex !== targetIndex) {
            const item = this.draftRecipe.ingredients.splice(draggedCardIndex, 1)[0];
            this.draftRecipe.ingredients.splice(targetIndex, 0, item);

            this.draftRecipe.ingredients.forEach((ing, i) => {
              ing.order = i + 1;
            });

            this.isDraftDirty = true;
            this.updateDirtyIndicator();
            this.renderRecipeBuilder();
            this.renderKitchenAssistant();
          }
          draggedCardIndex = null;
        });
      });

      rowsContainer.querySelectorAll(".lock-toggle-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-idx"), 10);
          this.toggleDraftIngredientLock(idx);
        });
      });

      rowsContainer.querySelectorAll(".pct-slider").forEach(slider => {
        slider.addEventListener("input", (e) => {
          const idx = parseInt(e.target.getAttribute("data-idx"), 10);
          this.updateDraftIngredientPercentage(idx, e.target.value, false);
        });
      });

      rowsContainer.querySelectorAll(".ing-pct-num-input").forEach(input => {
        input.addEventListener("change", (e) => {
          const idx = parseInt(e.target.getAttribute("data-idx"), 10);
          this.updateDraftIngredientPercentage(idx, e.target.value, false);
        });
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") e.target.blur();
        });
      });

      rowsContainer.querySelectorAll(".ing-name-input").forEach(input => {
        input.addEventListener("input", (e) => {
          const idx = parseInt(e.target.getAttribute("data-idx"), 10);
          this.draftRecipe.ingredients[idx].name = e.target.value;
          this.isDraftDirty = true;
          this.updateDirtyIndicator();
        });
      });

      rowsContainer.querySelectorAll(".ing-notes-input").forEach(input => {
        input.addEventListener("input", (e) => {
          const idx = parseInt(e.target.getAttribute("data-idx"), 10);
          this.draftRecipe.ingredients[idx].notes = e.target.value;
          this.isDraftDirty = true;
          this.updateDirtyIndicator();
        });
      });

      rowsContainer.querySelectorAll(".remove-ing-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-idx"), 10);
          this.draftRecipe.ingredients.splice(idx, 1);
          this.normalizeDraftPercentages();
          this.isDraftDirty = true;
          this.renderRecipeBuilder();
          this.showToast("Ingredient removed", "warning");
        });
      });
    }
  }

  updateBuilderDisplayValuesOnly() {
    const recipe = this.draftRecipe;
    const targetGrams = this.currentBatchTotalGrams;
    const scaledItems = this.getScaledIngredients(recipe, targetGrams);

    scaledItems.forEach((scaled, idx) => {
      const gramsEl = document.querySelector(`.ing-grams-display[data-idx="${idx}"]`);
      if (gramsEl) gramsEl.textContent = `${scaled.scaledGrams}g`;

      const cumulEl = document.querySelector(`.cumulative-display[data-idx="${idx}"]`);
      if (cumulEl) cumulEl.textContent = `Total: ${scaled.cumulativeTargetGrams}g`;

      const slider = document.querySelector(`.pct-slider[data-idx="${idx}"]`);
      if (slider && document.activeElement !== slider) slider.value = scaled.percentage;

      const numInp = document.querySelector(`.ing-pct-num-input[data-idx="${idx}"]`);
      if (numInp && document.activeElement !== numInp) numInp.value = Number(scaled.percentage).toFixed(1);
    });

    this.updateLiquidProduceRatioBar(scaledItems, targetGrams);

    const sumPct = recipe.ingredients.reduce((s, i) => s + (Number(i.pct) || 0), 0);
    const isPerfect100 = Math.abs(sumPct - 100.0) < 0.05;
    const sumBadge = document.getElementById("builderTotalPctBadge");
    if (sumBadge) {
      sumBadge.innerHTML = `
        <span>Total: ${sumPct.toFixed(1)}%</span>
        <span>${isPerfect100 ? "100%" : "Auto-balanced"}</span>
      `;
      sumBadge.className = `flex items-center gap-1.5 font-mono text-xs font-bold px-2.5 py-1 rounded-lg border ${
        isPerfect100 ? "text-slate-800 bg-slate-50 border-slate-200" : "text-amber-700 bg-amber-50 border-amber-200"
      }`;
    }
  }

  updateLiquidProduceRatioBar(scaledItems, targetGrams) {
    const waterItem = scaledItems.find(i => i.id === "water" || i.id === "coconut_water");
    const liquidGrams = waterItem ? waterItem.scaledGrams : 0;
    const produceGrams = targetGrams - liquidGrams;
    const liquidPct = targetGrams > 0 ? ((liquidGrams / targetGrams) * 100).toFixed(0) : 50;
    const producePct = 100 - liquidPct;

    const ratioBar = document.getElementById("liquidProduceRatioBar");
    if (ratioBar) {
      ratioBar.innerHTML = `
        <div class="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
          <span>Liquid Base: ${liquidPct}% (${liquidGrams.toLocaleString()}g)</span>
          <span>Produce Blend: ${producePct}% (${produceGrams.toLocaleString()}g)</span>
        </div>
        <div class="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
          <div class="bg-slate-400 h-full" style="width: ${liquidPct}%"></div>
          <div class="bg-slate-800 h-full" style="width: ${producePct}%"></div>
        </div>
      `;
    }
  }

  addIngredientToDraftRecipe() {
    this.draftRecipe.ingredients.push({
      id: "custom_" + Date.now(),
      name: "New Produce",
      pct: 5.0,
      grams: 100,
      locked: false,
      order: this.draftRecipe.ingredients.length + 1,
      notes: "Chopped"
    });
    this.normalizeDraftPercentages();
    this.isDraftDirty = true;
    this.renderRecipeBuilder();
    this.showToast("Added ingredient to draft formula");
  }

  /**
   * DYNAMIC FRIDGE STORAGE & SPOILAGE THRESHOLDS
   */
  renderFridgeStoragePlanner() {
    const container = document.getElementById("fridgeStoragePlanContainer");
    if (!container) return;

    const recipe = this.draftRecipe || this.getSavedRecipe();
    const targetGrams = this.currentBatchTotalGrams;
    const scaledItems = this.getScaledIngredients(recipe, targetGrams);
    const plannedDays = this.calcDays || 2;

    const produceItems = scaledItems.filter(i => i.id !== "water" && i.id !== "sugar" && i.id !== "honey");

    container.innerHTML = `
      <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          Active: <strong>${recipe.name}</strong> &bull; Planned Supply: <strong>${plannedDays} Days</strong> ${this.calcGuestGlasses > 0 ? `(+${this.calcGuestGlasses} guests)` : ""} (${targetGrams.toLocaleString()}g batch).
        </div>
        <div class="font-mono text-slate-900 font-bold bg-white px-2 py-1 rounded border border-slate-200 self-start sm:self-auto">
          Planned Duration: ${plannedDays} Days
        </div>
      </div>

      <div class="space-y-3">
        ${produceItems.map(item => {
          const meta = item.spoilageMeta;
          const peak = meta.fridgeCutPeakDays || 2;
          const max = meta.fridgeCutMaxDays || 3;
          const isPastMax = plannedDays > max;
          const isPastPeak = plannedDays > peak && plannedDays <= max;

          let badge = `<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">Peak (${peak}–${max}d)</span>`;
          let alertBox = "";

          if (isPastMax) {
            badge = `<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-800">Spoilage Risk (Max ${max}d)</span>`;
            alertBox = `
              <div class="mt-2 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-900">
                <span class="font-bold">Threshold Exceeded:</span> Cut <strong>${item.name}</strong> degrades after ${max} days in the fridge. Your planned batch duration is ${plannedDays} days.
                <div class="mt-1 text-[11px] font-semibold text-red-950">
                  Recommendation: Prep half (~${Math.round(item.scaledGrams / 2)}g) now, and prep the second half on Day ${max}.
                </div>
              </div>
            `;
          } else if (isPastPeak) {
            badge = `<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">Past Peak (Safe to ${max}d)</span>`;
          }

          return `
            <div class="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-slate-900 text-sm">${item.name}</span>
                  ${badge}
                </div>
                <div class="font-mono text-sm font-black text-slate-900">
                  ${item.scaledGrams}g <span class="text-xs font-normal text-slate-400 font-sans">(${item.percentage}%)</span>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                <div class="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span class="text-slate-500 font-bold block">In-Fridge Cut Shelf Life:</span>
                  <span class="font-mono text-slate-800 font-bold">Peak: ${peak}d &bull; Max Safe: ${max}d</span>
                </div>
                <div class="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span class="text-slate-500 font-bold block">Storage Protocol:</span>
                  <span class="text-slate-700">${meta.storageRule}</span>
                </div>
              </div>

              <div class="text-[11px] text-slate-500">
                <strong>Spoilage Signs:</strong> ${meta.spoilageSign}
              </div>

              ${alertBox}
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  /**
   * DYNAMIC GROCERY CADENCE WITH ROOM-TEMP VS CRISPER DATA
   */
  renderGroceryCadencePlanner() {
    const container = document.getElementById("groceryCadenceListContainer");
    if (!container) return;

    const recipe = this.draftRecipe || this.getSavedRecipe();
    const targetGrams = this.currentBatchTotalGrams;
    const scaledItems = this.getScaledIngredients(recipe, targetGrams);
    const plannedDays = this.calcDays || 2;
    const hh = this.state.household;

    const produceItems = scaledItems.filter(i => i.id !== "water" && i.id !== "sugar" && i.id !== "honey");

    const groceryCalculations = produceItems.map(item => {
      const meta = item.spoilageMeta;
      const prepYield = meta.prepYield || 0.8;
      const rawGramsNeeded = Math.round(item.scaledGrams / prepYield);
      const unitsNeeded = Math.ceil(rawGramsNeeded / meta.avgUnitWeight);

      return {
        ...item,
        rawGramsNeeded,
        unitsNeeded,
        kgNeeded: (rawGramsNeeded / 1000).toFixed(2),
        cadenceTier: meta.cadenceTier || "medium"
      };
    });

    const summaryCard = document.getElementById("grocerySummaryStats");
    if (summaryCard) {
      summaryCard.innerHTML = `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
          <div>
            <div class="text-slate-500">Batch Demand</div>
            <div class="text-sm font-bold text-slate-900">${targetGrams.toLocaleString()}g (${plannedDays}d)</div>
          </div>
          <div>
            <div class="text-slate-500">Portions</div>
            <div class="text-sm font-bold text-slate-900">${hh.numPeople} People &times; 250g ${this.calcGuestGlasses > 0 ? `(+${this.calcGuestGlasses})` : ""}</div>
          </div>
          <div>
            <div class="text-slate-500">Containers</div>
            <div class="text-sm font-bold text-slate-900">${(targetGrams / 1000).toFixed(1)} &times; 1L</div>
          </div>
          <div>
            <div class="text-slate-500">Gross Produce</div>
            <div class="text-sm font-bold text-slate-900">${(groceryCalculations.reduce((acc, i) => acc + i.rawGramsNeeded, 0) / 1000).toFixed(1)} kg</div>
          </div>
        </div>
      `;
    }

    const tierOrder = ["fast", "medium", "long"];
    const tierMeta = {
      fast: { title: "Fast-Turnover Produce (Buy Every 3–4 Days)", badge: "bg-amber-100 text-amber-900", desc: "High respiration rate produce. Rapid room-temperature breakdown." },
      medium: { title: "Weekly Produce (Buy Every 7 Days)", badge: "bg-blue-100 text-blue-900", desc: "Moderate shelf life. Ripen on counter, then hold in crisper." },
      long: { title: "Extended / Bi-Weekly Produce (Buy Every 14–21 Days)", badge: "bg-slate-100 text-slate-800", desc: "Hardy roots, citrus, apples, and ginger." }
    };

    container.innerHTML = tierOrder.map(tierKey => {
      const itemsInTier = groceryCalculations.filter(i => i.cadenceTier === tierKey);
      if (itemsInTier.length === 0) return "";

      const tm = tierMeta[tierKey];

      return `
        <div class="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 class="text-xs font-black text-slate-900">${tm.title}</h3>
              <p class="text-[11px] text-slate-500">${tm.desc}</p>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${tm.badge}">${itemsInTier.length} Items</span>
          </div>

          <div class="space-y-2.5">
            ${itemsInTier.map(item => `
              <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
                
                <div class="flex-1 space-y-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-bold text-slate-900">${item.name}</span>
                    <span class="px-2 py-0.5 rounded bg-white text-slate-900 font-mono font-bold border border-slate-200">
                      Buy ~${item.unitsNeeded} ${item.spoilageMeta.unitName}${item.unitsNeeded > 1 && !item.spoilageMeta.unitName.endsWith("s") ? "s" : ""} (${item.kgNeeded} kg gross)
                    </span>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-0.5">
                    <div class="p-1.5 bg-white rounded border border-slate-200">
                      <span class="text-slate-500 font-bold">Outside Fridge (Counter):</span>
                      <span class="font-mono text-slate-900 font-bold ml-1">${item.spoilageMeta.counterWholeDays} Days</span>
                    </div>
                    <div class="p-1.5 bg-white rounded border border-slate-200">
                      <span class="text-slate-500 font-bold">Whole in Fridge Crisper:</span>
                      <span class="font-mono text-slate-900 font-bold ml-1">${item.spoilageMeta.fridgeWholeDays} Days</span>
                    </div>
                  </div>

                  <div class="text-[11px] text-slate-500">
                    <strong>Strategy:</strong> ${item.spoilageMeta.counterRule}
                  </div>
                </div>

                <div class="text-right font-mono text-xs md:border-l md:border-slate-200 md:pl-3 whitespace-nowrap self-start md:self-center">
                  <span class="text-slate-400">Net:</span> <strong class="text-slate-900">${item.scaledGrams}g</strong>
                </div>

              </div>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");

    const copyBtn = document.getElementById("copyGroceryListBtn");
    if (copyBtn) {
      copyBtn.onclick = () => {
        const textLines = [
          `JUICE GROCERY LIST (${plannedDays} Days of ${recipe.name} for ${hh.numPeople} people${this.calcGuestGlasses > 0 ? ` + ${this.calcGuestGlasses} guests` : ""})`,
          `Total Batch: ${targetGrams.toLocaleString()}g (${(targetGrams / 250).toFixed(1)} glasses)`,
          `---------------------------------`,
          ...groceryCalculations.map(i => `[ ] ${i.name}: ~${i.unitsNeeded} ${i.spoilageMeta.unitName} (${i.kgNeeded} kg gross) -> Counter: ${i.spoilageMeta.counterWholeDays}d | Crisper: ${i.spoilageMeta.fridgeWholeDays}d`),
          `---------------------------------`
        ].join("\n");

        this.copyTextToClipboard(textLines, "Grocery list copied");
      };
    }
  }

  renderKitchenAssistant() {
    const recipe = this.getSavedRecipe();
    const targetGrams = this.currentBatchTotalGrams;
    const scaledItems = this.getScaledIngredients(recipe, targetGrams);
    const totalSteps = scaledItems.length;

    if (this.kitchenStepIndex >= totalSteps) {
      this.kitchenStepIndex = totalSteps;
    }

    const currentItem = this.kitchenStepIndex < totalSteps ? scaledItems[this.kitchenStepIndex] : null;

    const scaleViewTare = document.getElementById("scaleViewTare");
    const scaleViewCumul = document.getElementById("scaleViewCumul");
    if (scaleViewTare && scaleViewCumul) {
      if (this.kitchenScaleViewMode === "tare") {
        scaleViewTare.className = "px-2.5 py-1 text-xs font-bold rounded-md bg-slate-900 text-white";
        scaleViewCumul.className = "px-2.5 py-1 text-xs font-semibold rounded-md text-slate-600 hover:bg-slate-200";
      } else {
        scaleViewTare.className = "px-2.5 py-1 text-xs font-semibold rounded-md text-slate-600 hover:bg-slate-200";
        scaleViewCumul.className = "px-2.5 py-1 text-xs font-bold rounded-md bg-slate-900 text-white";
      }
    }

    const mainDisplay = document.getElementById("kitchenMainDisplay");
    if (mainDisplay) {
      if (this.kitchenStepIndex >= totalSteps) {
        mainDisplay.innerHTML = `
          <div class="text-center py-8 bg-white border border-slate-200 rounded-2xl p-6">
            <h3 class="text-xl font-black text-slate-900">All Ingredients Loaded</h3>
            <p class="text-xs text-slate-600 mt-1 max-w-md mx-auto">
              Total Weight: <span class="font-bold text-slate-900 font-mono">${targetGrams.toLocaleString()}g</span> (${(targetGrams / 1000).toFixed(1)} &times; 1L containers = ${(targetGrams / 250).toFixed(1)} glasses). Secure lid and blend on high for 45-60s.
            </p>
            <div class="mt-4 flex justify-center gap-2">
              <button type="button" id="kitchenRestartBtn" class="px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 transition">
                Start Over
              </button>
              <button type="button" id="kitchenLogBatchBtn" class="px-4 py-2 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition">
                Rate & Log Batch
              </button>
            </div>
          </div>
        `;

        document.getElementById("kitchenRestartBtn")?.addEventListener("click", () => {
          this.kitchenStepIndex = 0;
          this.renderKitchenAssistant();
        });
        document.getElementById("kitchenLogBatchBtn")?.addEventListener("click", () => {
          this.openNewLogModal();
        });
      } else {
        const displayValue = this.kitchenScaleViewMode === "tare"
          ? `+${currentItem.scaledGrams.toLocaleString()} g`
          : `${currentItem.cumulativeTargetGrams.toLocaleString()} g`;

        const subtext = this.kitchenScaleViewMode === "tare"
          ? `Tare scale to 0g, then add <strong>${currentItem.scaledGrams}g</strong>`
          : `Add until scale reads <strong>${currentItem.cumulativeTargetGrams}g</strong>`;

        mainDisplay.innerHTML = `
          <div class="scale-hero-display p-6 rounded-2xl bg-slate-900 text-white shadow-md relative">
            <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Step ${this.kitchenStepIndex + 1} of ${totalSteps}</span>
              <span>${recipe.name}</span>
            </div>

            <div>
              <div class="text-[10px] font-bold text-slate-400 uppercase">Ingredient</div>
              <h2 class="text-2xl sm:text-3xl font-black text-white mt-0.5">${currentItem.name}</h2>
              ${currentItem.notes ? `<p class="text-xs text-slate-300 mt-0.5">${currentItem.notes}</p>` : ""}
            </div>

            <div class="my-5 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              <div class="text-[10px] uppercase font-mono font-bold text-slate-400 mb-0.5">
                ${this.kitchenScaleViewMode === "tare" ? "TARGET INCREMENT" : "CUMULATIVE READING"}
              </div>
              <div class="scale-weight-pop text-5xl sm:text-6xl font-black font-mono text-emerald-400">
                ${displayValue}
              </div>
              <div class="text-xs text-slate-400 mt-1 text-center">
                ${subtext}
              </div>
            </div>

            <div class="flex items-center justify-between gap-2 pt-1">
              <button type="button" id="kitchenPrevStepBtn" class="px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition ${this.kitchenStepIndex === 0 ? "opacity-30 cursor-not-allowed" : ""}" ${this.kitchenStepIndex === 0 ? "disabled" : ""}>
                Back
              </button>

              <button type="button" id="kitchenNextStepBtn" class="px-5 py-2.5 rounded-lg text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center gap-1.5 shadow-sm active:scale-95">
                <span>Done & Next Step</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        `;

        document.getElementById("kitchenPrevStepBtn")?.addEventListener("click", () => {
          if (this.kitchenStepIndex > 0) {
            this.kitchenStepIndex--;
            this.renderKitchenAssistant();
          }
        });

        document.getElementById("kitchenNextStepBtn")?.addEventListener("click", () => {
          this.kitchenStepIndex++;
          if (this.kitchenStepIndex >= totalSteps) {
            this.playChime("done");
          } else {
            this.playChime("step");
          }
          this.renderKitchenAssistant();
        });
      }
    }

    const checklist = document.getElementById("kitchenStepsList");
    if (checklist) {
      checklist.innerHTML = scaledItems.map((item, idx) => {
        const isDone = idx < this.kitchenStepIndex;
        const isCurrent = idx === this.kitchenStepIndex;

        return `
          <div class="checklist-step-item flex items-center justify-between p-2.5 rounded-lg border cursor-pointer ${
            isCurrent
              ? "bg-slate-100 border-slate-400 font-bold shadow-sm"
              : (isDone ? "bg-slate-50 border-slate-200 opacity-50" : "bg-white border-slate-200 hover:bg-slate-50")
          }" data-step-idx="${idx}">
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono ${
                isDone ? "bg-slate-900 text-white check-pop" : (isCurrent ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600")
              }">
                ${isDone ? "✓" : idx + 1}
              </div>
              <div class="text-xs text-slate-800">${item.name}</div>
            </div>
            <div class="text-right font-mono text-xs font-bold text-slate-900">
              ${item.scaledGrams}g
            </div>
          </div>
        `;
      }).join("");

      checklist.querySelectorAll("[data-step-idx]").forEach(el => {
        el.addEventListener("click", () => {
          this.kitchenStepIndex = parseInt(el.getAttribute("data-step-idx"), 10);
          this.renderKitchenAssistant();
        });
      });
    }
  }

  renderTasteLogs() {
    const container = document.getElementById("tasteLogsList");
    if (!container) return;

    if (!this.state.tasteLogs || this.state.tasteLogs.length === 0) {
      container.innerHTML = `
        <div class="text-center py-6 text-slate-400 text-xs">
          No batch logs saved yet.
        </div>
      `;
      return;
    }

    container.innerHTML = this.state.tasteLogs.map(log => `
      <div class="p-3 bg-white border border-slate-200 rounded-xl space-y-1 text-xs">
        <div class="flex items-center justify-between">
          <span class="font-bold text-slate-900">${log.recipeName}</span>
          <span class="text-slate-400">${log.date}</span>
        </div>
        <div class="text-amber-500 font-bold">${"★".repeat(log.rating)}${"☆".repeat(5 - log.rating)}</div>
        <div class="text-slate-600">${log.notes}</div>
      </div>
    `).join("");

    document.getElementById("openNewLogBtn")?.addEventListener("click", () => {
      this.openNewLogModal();
    });
  }

  openNewLogModal() {
    const modal = document.getElementById("logBatchModal");
    if (!modal) return;
    const currentRecipe = this.getSavedRecipe();
    const recipeSelect = document.getElementById("logRecipeSelect");
    if (recipeSelect) {
      recipeSelect.innerHTML = this.state.recipes.map(r => `
        <option value="${r.id}" ${r.id === currentRecipe.id ? "selected" : ""}>${r.name}</option>
      `).join("");
    }
    modal.classList.remove("hidden");

    document.getElementById("closeLogModalBtn")?.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    document.getElementById("saveLogEntryBtn")?.addEventListener("click", () => {
      const recId = document.getElementById("logRecipeSelect")?.value;
      const rec = this.state.recipes.find(r => r.id === recId) || currentRecipe;
      const rating = parseInt(document.getElementById("logRatingSelect")?.value, 10) || 5;
      const notes = document.getElementById("logNotesText")?.value.trim() || "";

      this.state.tasteLogs.unshift({
        id: "log_" + Date.now(),
        date: new Date().toISOString().split("T")[0],
        recipeId: rec.id,
        recipeName: rec.name,
        batchSizeGrams: this.currentBatchTotalGrams,
        rating,
        notes
      });

      this.saveState();
      modal.classList.add("hidden");
      this.renderTasteLogs();
      this.showToast("Batch logged");
    });
  }

  openVersionHistoryModal() {
    const modal = document.getElementById("versionHistoryModal");
    if (!modal) return;

    const recipe = this.getSavedRecipe();
    const listEl = document.getElementById("versionHistoryList");

    if (listEl) {
      if (!recipe.versions || recipe.versions.length === 0) {
        listEl.innerHTML = `<div class="text-xs text-slate-400 py-4 text-center">No snapshots saved yet.</div>`;
      } else {
        listEl.innerHTML = recipe.versions.slice().reverse().map(ver => `
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
            <div class="flex items-center justify-between">
              <span class="font-bold text-slate-900">${ver.name}</span>
              <button type="button" class="restore-version-btn px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded transition" data-ver-id="${ver.versionId}">
                Restore
              </button>
            </div>
            ${ver.notes ? `<p class="text-slate-600 italic">${ver.notes}</p>` : ""}
            <div class="text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-200">
              ${ver.ingredients.map(i => `<span>${i.name}: ${Number(i.pct).toFixed(1)}%</span>`).join(" &bull; ")}
            </div>
          </div>
        `).join("");

        listEl.querySelectorAll(".restore-version-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const verId = btn.getAttribute("data-ver-id");
            const targetVer = recipe.versions.find(v => v.versionId === verId);
            if (targetVer) {
              recipe.ingredients = JSON.parse(JSON.stringify(targetVer.ingredients));
              this.loadDraftRecipe();
              this.saveState();
              this.renderAll();
              modal.classList.add("hidden");
              this.showToast(`Restored "${targetVer.name}"`);
            }
          });
        });
      }
    }

    modal.classList.remove("hidden");
    document.getElementById("closeVersionModalBtn")?.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  openCreateSnapshotModal() {
    const modal = document.getElementById("createSnapshotModal");
    if (!modal) return;

    const recipe = this.getSavedRecipe();
    const verNum = `v1.${(recipe.versions ? recipe.versions.length : 0)}`;
    document.getElementById("snapshotNameInput").value = `${verNum} Snapshot`;
    document.getElementById("snapshotNotesInput").value = "Proportions calibrated";

    modal.classList.remove("hidden");

    document.getElementById("closeSnapshotModalBtn")?.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    document.getElementById("confirmSaveSnapshotBtn")?.addEventListener("click", () => {
      const name = document.getElementById("snapshotNameInput").value.trim() || `${verNum}`;
      const notes = document.getElementById("snapshotNotesInput").value.trim();

      if (!recipe.versions) recipe.versions = [];
      recipe.versions.push({
        versionId: `v${Date.now().toString().slice(-4)}`,
        name,
        timestamp: new Date().toLocaleString(),
        notes,
        ingredients: JSON.parse(JSON.stringify(recipe.ingredients))
      });

      this.saveState();
      this.renderRecipeBuilder();
      modal.classList.add("hidden");
      this.showToast(`Snapshot saved`);
    });
  }

  openCreateRecipeModal() {
    const modal = document.getElementById("createRecipeModal");
    if (!modal) return;
    modal.classList.remove("hidden");

    document.getElementById("closeCreateRecipeModalBtn")?.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    document.getElementById("confirmCreateRecipeBtn")?.addEventListener("click", () => {
      const name = document.getElementById("newRecipeNameInput").value.trim() || "New Blend";
      const type = document.getElementById("newRecipeTypeSelect").value || "combo";
      const desc = document.getElementById("newRecipeDescInput").value.trim() || "Custom blend formula.";

      const newRec = {
        id: "recipe_" + Date.now(),
        name,
        type,
        isDefault: false,
        description: desc,
        baseBatchWeight: 2000,
        blendingNotes: "Add liquid base first, soft produce next, dense produce last.",
        ingredients: [
          { id: "water", name: "Water / Cold Filtered", grams: 1000, pct: 50.0, locked: true, order: 1, notes: "Base liquid (50%)" },
          { id: "ing_1", name: type === "fruit" ? "Mango" : (type === "veggie" ? "Cucumber" : "Carrot"), grams: 500, pct: 25.0, locked: false, order: 2, notes: "Base produce" },
          { id: "ing_2", name: type === "fruit" ? "Pineapple" : (type === "veggie" ? "Green Apple" : "Pineapple"), grams: 350, pct: 17.5, locked: false, order: 3, notes: "Sweetness" },
          { id: "lemon", name: "Lemon (Eureka / Meyer)", grams: 150, pct: 7.5, locked: false, order: 4, notes: "Acidity" }
        ],
        versions: []
      };

      this.state.recipes.push(newRec);
      this.currentRecipeId = newRec.id;
      this.loadDraftRecipe();
      this.saveState();
      this.renderAll();
      modal.classList.add("hidden");
      this.showToast(`Created "${name}"`);
    });
  }

  populateSettingsForm() {
    const hh = this.state.household;
    document.getElementById("setNumPeople").value = hh.numPeople;
    document.getElementById("setGlassSize").value = hh.glassSizeGrams;
    document.getElementById("setBlenderCap").value = hh.blenderMaxCapacityGrams;
    document.getElementById("setContainerSize").value = hh.containerSizeGrams;
  }

  saveSettingsForm() {
    this.state.household.numPeople = parseInt(document.getElementById("setNumPeople").value, 10) || 5;
    this.state.household.glassSizeGrams = parseInt(document.getElementById("setGlassSize").value, 10) || 250;
    this.state.household.blenderMaxCapacityGrams = parseInt(document.getElementById("setBlenderCap").value, 10) || 2000;
    this.state.household.containerSizeGrams = parseInt(document.getElementById("setContainerSize").value, 10) || 1000;
    this.saveState();
  }

  exportData() {
    const blob = new Blob([JSON.stringify(this.state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `juice_recipes_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    this.showToast("Backup downloaded");
  }

  importData(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.recipes) {
          this.state = imported;
          this.currentRecipeId = this.state.recipes[0].id;
          this.loadDraftRecipe();
          this.saveState();
          this.renderAll();
          this.showToast("Data imported");
        }
      } catch (err) {
        this.showToast("Invalid JSON file", "error");
      }
    };
    reader.readAsText(file);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.app = new JuiceApp();
});
