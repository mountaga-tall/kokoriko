const MENU_ITEMS = [
  {
    "category": "Snacks",
    "name": "Wrap Viande",
    "price": 3500,
    "desc": "Wrap généreux à la viande"
  },
  {
    "category": "Snacks",
    "name": "Wrap Poulet",
    "price": 3500,
    "desc": "Wrap généreux au poulet"
  },
  {
    "category": "Snacks",
    "name": "Tacos Viande",
    "price": 2500,
    "desc": "Tacos garni à la viande"
  },
  {
    "category": "Snacks",
    "name": "Tacos Poulet",
    "price": 2500,
    "desc": "Tacos garni au poulet"
  },
  {
    "category": "Snacks",
    "name": "Panini Viande",
    "price": 3500,
    "desc": "Panini croustillant à la viande"
  },
  {
    "category": "Snacks",
    "name": "Panini Poulet",
    "price": 3500,
    "desc": "Panini croustillant au poulet"
  },
  {
    "category": "Snacks",
    "name": "Hot Dog",
    "price": 3000,
    "desc": "Hot-dog gourmand, simple et efficace"
  },
  {
    "category": "Poulet",
    "name": "Cuisse de poulet (2 pcs)",
    "price": 4000,
    "desc": "Poulet grillé à la perfection"
  },
  {
    "category": "Poulet",
    "name": "Cuisse de poulet (4 pcs)",
    "price": 7000,
    "desc": "Format familial et généreux"
  },
  {
    "category": "Poulet",
    "name": "Pilon (2 pcs)",
    "price": 2500,
    "desc": "Pilons croustillants et savoureux"
  },
  {
    "category": "Poulet",
    "name": "Pilon (4 pcs)",
    "price": 4000,
    "desc": "Pilons croustillants à partager"
  },
  {
    "category": "Poulet",
    "name": "Pilon (6 pcs)",
    "price": 7000,
    "desc": "Grande portion pour les grosses faims"
  },
  {
    "category": "Poulet",
    "name": "Poulet Rôti",
    "price": 6000,
    "desc": "Poulet entier, rôti et savoureux"
  },
  {
    "category": "Poulet",
    "name": "Demi Poulet",
    "price": 3500,
    "desc": "Une demi-portion généreuse"
  },
  {
    "category": "Fritures",
    "name": "Wings (6 pcs)",
    "price": 3500,
    "desc": "Ailes de poulet frites bien croustillantes"
  },
  {
    "category": "Fritures",
    "name": "Wings (9 pcs)",
    "price": 5500,
    "desc": "Ailes de poulet frites à partager"
  },
  {
    "category": "Fritures",
    "name": "Wings Barbecue (6 pcs)",
    "price": 4000,
    "desc": "Wings nappées de sauce BBQ"
  },
  {
    "category": "Fritures",
    "name": "Wings Barbecue (9 pcs)",
    "price": 6000,
    "desc": "Grande portion de wings BBQ"
  },
  {
    "category": "Fritures",
    "name": "Poulet Tenders (5 pcs)",
    "price": 4000,
    "desc": "Filets de poulet croustillants"
  },
  {
    "category": "Fritures",
    "name": "Nuggets (3 pcs)",
    "price": 2500,
    "desc": "Petite portion croustillante"
  },
  {
    "category": "Fritures",
    "name": "Nuggets (6 pcs)",
    "price": 3500,
    "desc": "Portion généreuse de nuggets"
  },
  {
    "category": "Fritures",
    "name": "Nuggets (9 pcs)",
    "price": 5500,
    "desc": "Grande portion à partager"
  },
  {
    "category": "Burgers",
    "name": "Giant",
    "price": 3500,
    "desc": "Le géant pour les vraies grosses faims"
  },
  {
    "category": "Burgers",
    "name": "Big Mac",
    "price": 3500,
    "desc": "Le classique incontournable"
  },
  {
    "category": "Burgers",
    "name": "Double Cheese Burger",
    "price": 3500,
    "desc": "Double steak, double fromage"
  },
  {
    "category": "Burgers",
    "name": "Triple Cheese Burger",
    "price": 5500,
    "desc": "Triple steak, triple fromage"
  },
  {
    "category": "Burgers",
    "name": "Chicken Burger",
    "price": 3500,
    "desc": "Poulet croustillant et sauce maison"
  },
  {
    "category": "Burgers",
    "name": "Chicken Thunder",
    "price": 4000,
    "desc": "Épicé, intense et irrésistible"
  },
  {
    "category": "Burgers",
    "name": "Burger Steack",
    "price": 2500,
    "desc": "Le classique généreux"
  },
  {
    "category": "Burgers",
    "name": "Menu Enfant",
    "price": 3500,
    "desc": "Cheese ou nuggets + boisson + surprise"
  },
  {
    "category": "Extras",
    "name": "Frites",
    "price": 1500,
    "desc": "Portion classique bien croustillante"
  },
  {
    "category": "Extras",
    "name": "Alloco",
    "price": 3000,
    "desc": "Bananes plantains frites"
  },
  {
    "category": "Extras",
    "name": "Frites Cheddar",
    "price": 2500,
    "desc": "Frites nappées de cheddar fondu"
  },
  {
    "category": "Extras",
    "name": "Frites Cheddar Bacon",
    "price": 3500,
    "desc": "Cheddar fondu et éclats de bacon"
  },
  {
    "category": "Extras",
    "name": "Frites de patate douce",
    "price": 2500,
    "desc": "Douces, croustillantes et gourmandes"
  },
  {
    "category": "Desserts",
    "name": "Milkshake Vanille",
    "price": 2500,
    "desc": "Frais, onctueux et vanillé"
  },
  {
    "category": "Desserts",
    "name": "Milkshake Fraise",
    "price": 2500,
    "desc": "Frais et généreusement fruité"
  },
  {
    "category": "Desserts",
    "name": "Milkshake Ananas-Mangue-Coco",
    "price": 2500,
    "desc": "Une pause tropicale et crémeuse"
  },
  {
    "category": "Desserts",
    "name": "Milkshake Oreo",
    "price": 3000,
    "desc": "La gourmandise ultime"
  }
];
