// src/data.js — menu, cafes, orders mock data
export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'meals', label: 'Meals' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'late-night', label: 'Late-night' },
  { id: 'drinks', label: 'Drinks' },
];

export const MENU = [
  { id: 'frappe',     name: 'Frappuccino',      cat: 'coffee', price: 4.50, kcal: 220, time: '4 min',  desc: 'Iced espresso blended with milk, ice, and a hint of vanilla.', tag: 'Daily Special' },
  { id: 'latte',      name: 'Iced Latte',       cat: 'coffee', price: 3.75, kcal: 150, time: '3 min',  desc: 'Double-shot espresso poured over cold milk and ice.' },
  { id: 'cold-brew',  name: 'Cold Brew',        cat: 'coffee', price: 3.50, kcal: 5,   time: '2 min',  desc: 'Slow-steeped 16 hours. Smooth, low-acid, full-bodied.' },
  { id: 'americano',  name: 'Iced Americano',   cat: 'coffee', price: 3.25, kcal: 10,  time: '3 min',  desc: 'Espresso shots topped with cold water and ice.' },
  { id: 'flat-white', name: 'Flat White',       cat: 'coffee', price: 3.95, kcal: 130, time: '3 min',  desc: 'Velvety microfoam with a strong ristretto base.' },
  { id: 'matcha',     name: 'Matcha Latte',     cat: 'drinks', price: 4.25, kcal: 180, time: '3 min',  desc: 'Ceremonial-grade matcha whisked with steamed milk.' },
  { id: 'burger',     name: 'Campus Burger',    cat: 'meals',  price: 8.50, kcal: 720, time: '12 min', desc: 'Quarter-pound smash patty, aged cheddar, house sauce.', tag: 'Popular' },
  { id: 'bowl',       name: 'Grain Bowl',       cat: 'meals',  price: 9.25, kcal: 540, time: '8 min',  desc: 'Quinoa, roasted veg, tahini, herbs, lemon.' },
  { id: 'pizza',      name: 'Margherita Slice', cat: 'meals',  price: 4.75, kcal: 380, time: '6 min',  desc: 'Wood-fired with San Marzano and fior di latte.' },
  { id: 'salad',      name: 'Caesar Salad',     cat: 'meals',  price: 7.50, kcal: 320, time: '5 min',  desc: 'Romaine, shaved parm, garlic croutons, Caesar dressing.' },
  { id: 'cookie',     name: 'Choc-chip Cookie', cat: 'snacks', price: 2.50, kcal: 280, time: '1 min',  desc: 'Brown butter, sea salt, dark chocolate chunks.' },
  { id: 'muffin',     name: 'Blueberry Muffin', cat: 'snacks', price: 2.75, kcal: 320, time: '1 min',  desc: 'Wild blueberries, lemon zest, sugar crunch top.' },
  { id: 'wrap',       name: 'Chicken Wrap',     cat: 'meals',  price: 7.95, kcal: 480, time: '5 min',  desc: 'Grilled chicken, romaine, tomato, ranch.' },
  { id: 'ramen',      name: 'Tonkotsu Ramen',   cat: 'late-night', price: 11.50, kcal: 680, time: '14 min', desc: 'Pork-bone broth, chashu, scallion, soft egg.', tag: 'Late-night' },
  { id: 'nachos',     name: 'Loaded Nachos',    cat: 'late-night', price: 8.95, kcal: 820, time: '10 min', desc: 'Queso, jalapeños, pico, sour cream, beef.', tag: 'Late-night' },
  { id: 'wings',      name: 'Buffalo Wings',    cat: 'late-night', price: 9.50, kcal: 640, time: '12 min', desc: 'Six wings, blue-cheese ranch, celery sticks.' },
];

export const CAFES = [
  { id: 'mocha',     name: 'Mocha Lane',     addr: '123 Mocha Ln, Brewville',  hours: '08:00 – 22:00', dist: '0.2 mi' },
  { id: 'artisan',   name: 'Artisan Avenue', addr: '88 Artisan Ave, Espresso City', hours: '07:00 – 23:00', dist: '0.5 mi' },
  { id: 'palette',   name: 'Palette Park',   addr: '45 Latte Ln, Palette Park', hours: '08:00 – 22:00', dist: '0.7 mi' },
  { id: 'union',     name: 'Student Union',  addr: 'Bldg 4, Main Quad',         hours: '07:00 – 02:00', dist: '0.1 mi' },
];

export const SAMPLE_ORDERS = [
  { id: 'CB-83',  date: 'Today',     status: 'Preparing', total: 12.75, items: ['Frappuccino', 'Choc-chip Cookie'] },
  { id: 'CB-79',  date: 'Yesterday', status: 'Picked up', total: 18.50, items: ['Campus Burger', 'Cold Brew'] },
  { id: 'CB-71',  date: 'Mon, May 5', status: 'Picked up', total: 9.25,  items: ['Grain Bowl'] },
  { id: 'CB-64',  date: 'Sat, May 3', status: 'Picked up', total: 14.20, items: ['Tonkotsu Ramen', 'Iced Latte'] },
];

export const SIZES = [
  { id: 'S', label: 'Small',  add: 0 },
  { id: 'M', label: 'Medium', add: 0.50 },
  { id: 'L', label: 'Large',  add: 1.00 },
];

export const MILKS = [
  { id: 'whole',   label: 'Whole'   },
  { id: 'oat',     label: 'Oat'     },
  { id: 'almond',  label: 'Almond'  },
  { id: 'skim',    label: 'Skim'    },
  { id: 'soy',     label: 'Soy'     },
  { id: 'coconut', label: 'Coconut' },
];

export const SYRUPS = [
  { id: 'none',     label: 'None'     },
  { id: 'vanilla',  label: 'Vanilla'  },
  { id: 'caramel',  label: 'Caramel'  },
  { id: 'chocolate',label: 'Chocolate'},
  { id: 'hazelnut', label: 'Hazelnut' },
];
