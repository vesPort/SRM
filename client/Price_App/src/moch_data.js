const data = [
  {
    position: "Tomatoes - Heirloom",
    agro: "$123.71",
    agroZ: 0,
    agroD: 0,
    kur: "$65.25",
  },
  {
    position: "Longos - Grilled Veg Sandwiches",
    agro: "$369.04",
    kur: "$264.60",
  },
  {
    position: "Anchovy In Oil",
    agro: "$111.91",
    kur: "$78.68",
  },
  {
    position: "Arrowroot",
    agro: "$395.80",
    kur: "$1.02",
  },
  {
    position: "Savory",
    agro: "$14.81",
    kur: "$390.17",
  },
  {
    position: "Puree - Raspberry",
    agro: "$142.28",
    kur: "$346.37",
  },
  {
    position: "Fork - Plastic",
    agro: "$389.81",
    kur: "$121.42",
  },
  {
    position: "Dill Weed - Dry",
    agro: "$325.72",
    kur: "$424.13",
  },
  {
    position: "Rice Pilaf, Dry,package",
    agro: "$327.80",
    kur: "$24.63",
  },
  {
    position: "Lemon Balm - Fresh",
    agro: "$458.15",
    kur: "$78.35",
  },
  {
    position: "Longos - Grilled Chicken With",
    agro: "$470.68",
    kur: "$395.44",
  },
  {
    position: "Ham - Smoked, Bone - In",
    agro: "$466.31",
    kur: "$283.63",
  },
  {
    position: "Soup - Campbells, Classic Chix",
    agro: "$461.61",
    kur: "$241.53",
  },
  {
    position: "Cheese - Brie Roitelet",
    agro: "$53.99",
    kur: "$331.55",
  },
  {
    position: "Tart Shells - Savory, 4",
    agro: "$297.84",
    kur: "$238.36",
  },
  {
    position: "Tabasco Sauce, 2 Oz",
    agro: "$454.24",
    kur: "$83.00",
  },
  {
    position: "Bar Mix - Lemon",
    agro: "$410.56",
    kur: "$336.67",
  },
  {
    position: "Cup - Translucent 7 Oz Clear",
    agro: "$468.22",
    kur: "$42.98",
  },
  {
    position: "Pie Filling - Cherry",
    agro: "$213.33",
    kur: "$449.39",
  },
  {
    position: "Wine - Marlbourough Sauv Blanc",
    agro: "$337.71",
    kur: "$178.97",
  },
  {
    position: "Container - Hngd Cll Blk 7x7x3",
    agro: "$419.00",
    kur: "$273.66",
  },
  {
    position: "Maple Syrup",
    agro: "$403.55",
    kur: "$329.05",
  },
  {
    position: "Bag - Regular Kraft 20 Lb",
    agro: "$210.18",
    kur: "$488.70",
  },
  {
    position: "Goldschalger",
    agro: "$9.77",
    kur: "$472.13",
  },
  {
    position: "Rice - Brown",
    agro: "$319.89",
    kur: "$400.68",
  },
  {
    position: "Vinegar - Balsamic",
    agro: "$174.12",
    kur: "$446.13",
  },
  {
    position: "Tuna - Bluefin",
    agro: "$188.05",
    kur: "$390.10",
  },
  {
    position: "Salt - Sea",
    agro: "$496.30",
    kur: "$280.85",
  },
  {
    position: "Soup - Campbells - Tomato",
    agro: "$460.63",
    kur: "$358.14",
  },
  {
    position: "Beef - Chuck, Boneless",
    agro: "$261.69",
    kur: "$261.15",
  },
  {
    position: "Table Cloth 53x69 White",
    agro: "$381.19",
    kur: "$299.57",
  },
  {
    position: "Wine - Vineland Estate Semi - Dry",
    agro: "$215.06",
    kur: "$366.03",
  },
  {
    position: "Grapes - Red",
    agro: "$30.53",
    kur: "$136.03",
  },
  {
    position: "Sauce - Fish 25 Ozf Bottle",
    agro: "$335.81",
    kur: "$383.43",
  },
  {
    position: "Coffee - Colombian, Portioned",
    agro: "$254.51",
    kur: "$165.26",
  },
  {
    position: "Kellogs Special K Cereal",
    agro: "$126.97",
    kur: "$411.81",
  },
  {
    position: "Truffle Cups - White Paper",
    agro: "$17.66",
    kur: "$88.40",
  },
  {
    position: "Carbonated Water - Strawberry",
    agro: "$30.16",
    kur: "$455.85",
  },
  {
    position: "Turkey - Breast, Bone - In",
    agro: "$281.12",
    kur: "$222.60",
  },
  {
    position: "Pastry - Trippleberry Muffin - Mini",
    agro: "$150.85",
    kur: "$172.72",
  },
  {
    position: "Blueberries - Frozen",
    agro: "$147.48",
    kur: "$43.25",
  },
  {
    position: "Crab - Dungeness, Whole, live",
    agro: "$494.90",
    kur: "$433.04",
  },
  {
    position: "Wine - Magnotta - Bel Paese White",
    agro: "$383.07",
    kur: "$105.00",
  },
  {
    position: "Pasta - Rotini, Dry",
    agro: "$267.75",
    kur: "$73.88",
  },
  {
    position: "Cornish Hen",
    agro: "$81.28",
    kur: "$432.10",
  },
  {
    position: "Shrimp - Tiger 21/25",
    agro: "$67.55",
    kur: "$1.88",
  },
  {
    position: "Coffee Decaf Colombian",
    agro: "$426.71",
    kur: "$417.28",
  },
  {
    position: "Banana",
    agro: "$336.25",
    kur: "$410.88",
  },
  {
    position: "Veal - Provimi Inside",
    agro: "$160.10",
    kur: "$224.20",
  },
  {
    position: "Mace",
    agro: "$309.64",
    kur: "$100.03",
  },
  {
    position: "Syrup - Pancake",
    agro: "$95.51",
    kur: "$238.20",
  },
  {
    position: "Milk - 2%",
    agro: "$141.63",
    kur: "$416.59",
  },
  {
    position: "Chip - Potato Dill Pickle",
    agro: "$417.58",
    kur: "$257.95",
  },
  {
    position: "Veal - Insides Provini",
    agro: "$231.80",
    kur: "$173.14",
  },
  {
    position: "Appetizer - Escargot Puff",
    agro: "$9.98",
    kur: "$143.78",
  },
  {
    position: "Scampi Tail",
    agro: "$152.33",
    kur: "$79.74",
  },
  {
    position: "Roe - Lump Fish, Black",
    agro: "$255.23",
    kur: "$300.38",
  },
  {
    position: "Sansho Powder",
    agro: "$308.85",
    kur: "$203.75",
  },
  {
    position: "Butter - Salted, Micro",
    agro: "$381.95",
    kur: "$262.14",
  },
  {
    position: "Napkin - Beverage 1 Ply",
    agro: "$381.20",
    kur: "$51.07",
  },
  {
    position: "Juice - Orange, Concentrate",
    agro: "$34.98",
    kur: "$294.61",
  },
  {
    position: "Wine - Maipo Valle Cabernet",
    agro: "$173.95",
    kur: "$378.01",
  },
  {
    position: "Flour - Rye",
    agro: "$167.08",
    kur: "$191.44",
  },
  {
    position: "Jam - Raspberry",
    agro: "$410.90",
    kur: "$11.41",
  },
  {
    position: "Nut - Macadamia",
    agro: "$411.25",
    kur: "$431.93",
  },
  {
    position: "Ice Cream Bar - Oreo Cone",
    agro: "$338.47",
    kur: "$371.99",
  },
  {
    position: "Sole - Fillet",
    agro: "$191.93",
    kur: "$222.19",
  },
  {
    position: "Compound - Pear",
    agro: "$195.35",
    kur: "$380.65",
  },
  {
    position: "Bread Base - Italian",
    agro: "$50.46",
    kur: "$148.83",
  },
  {
    position: "Water - Spring 1.5lit",
    agro: "$229.80",
    kur: "$283.56",
  },
  {
    position: "Liners - Banana, Paper",
    agro: "$291.24",
    kur: "$64.46",
  },
  {
    position: "Bread Base - Italian",
    agro: "$428.00",
    kur: "$212.40",
  },
  {
    position: "Muffin - Blueberry Individual",
    agro: "$202.14",
    kur: "$84.36",
  },
  {
    position: "V8 - Tropical Blend",
    agro: "$61.27",
    kur: "$79.85",
  },
  {
    position: "Cookies Oatmeal Raisin",
    agro: "$299.88",
    kur: "$88.63",
  },
  {
    position: "Milk - 1%",
    agro: "$402.57",
    kur: "$433.60",
  },
  {
    position: "Dried Peach",
    agro: "$353.01",
    kur: "$262.30",
  },
  {
    position: "Wine - Maipo Valle Cabernet",
    agro: "$430.68",
    kur: "$349.41",
  },
  {
    position: "Pork - Backfat",
    agro: "$77.48",
    kur: "$69.88",
  },
  {
    position: "Shrimp - Prawn",
    agro: "$470.74",
    kur: "$396.19",
  },
  {
    position: "Cheese - Swiss",
    agro: "$296.37",
    kur: "$486.58",
  },
  {
    position: "Pears - Bartlett",
    agro: "$322.81",
    kur: "$310.38",
  },
  {
    position: "Cod - Fillets",
    agro: "$379.68",
    kur: "$275.65",
  },
  {
    position: "Clams - Bay",
    agro: "$13.48",
    kur: "$132.60",
  },
  {
    position: "Alize Sunset",
    agro: "$105.46",
    kur: "$196.89",
  },
  {
    position: "Peas - Frozen",
    agro: "$57.44",
    kur: "$196.31",
  },
  {
    position: "Milk - 2% 250 Ml",
    agro: "$366.81",
    kur: "$146.64",
  },
  {
    position: "Apples - Sliced / Wedge",
    agro: "$264.63",
    kur: "$355.89",
  },
  {
    position: "Halibut - Whole, Fresh",
    agro: "$394.43",
    kur: "$113.56",
  },
  {
    position: "Wine - Cotes Du Rhone Parallele",
    agro: "$433.86",
    kur: "$472.33",
  },
  {
    position: "Sugar - Splenda Sweetener",
    agro: "$273.70",
    kur: "$100.70",
  },
  {
    position: "Beef - Flank Steak",
    agro: "$192.54",
    kur: "$167.56",
  },
  {
    position: "Beer - Pilsner Urquell",
    agro: "$172.34",
    kur: "$390.55",
  },
  {
    position: "Pastry - Banana Tea Loaf",
    agro: "$69.20",
    kur: "$231.40",
  },
  {
    position: "Waffle Stix",
    agro: "$125.34",
    kur: "$200.15",
  },
  {
    position: "Numi - Assorted Teas",
    agro: "$47.68",
    kur: "$384.88",
  },
  {
    position: "Chicken - Livers",
    agro: "$76.77",
    kur: "$3.19",
  },
  {
    position: "Mortadella",
    agro: "$219.97",
    kur: "$100.51",
  },
  {
    position: "Cabbage Roll",
    agro: "$301.22",
    kur: "$157.97",
  },
  {
    position: "Table Cloth 81x81 Colour",
    agro: "$116.84",
    kur: "$292.90",
  },
];

export default data;
