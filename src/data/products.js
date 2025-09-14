// Бардык товарлар массиви
const products = [
  // === Смесители ===
  {
    id: "1",
    name: "Смеситель DEMM Classic",
    price: "1500 руб.",
    category: "Смесители",
    brand: "DEMM",
    image: "https://picsum.photos/200?random=1",
    inStock: "В наличии",
    description: "Классический смеситель DEMM для кухни и ванной."
  },
  {
    id: "2",
    name: "Смеситель Grohe Modern",
    price: "2500 руб.",
    category: "Смесители",
    brand: "Grohe",
    image: "https://picsum.photos/200?random=2",
    inStock: "В наличии",
    description: "Современный смеситель Grohe с хромированным покрытием."
  },
  {
    id: "3",
    name: "Смеситель Hansgrohe Elegance",
    price: "2800 руб.",
    category: "Смесители",
    brand: "Hansgrohe",
    image: "https://picsum.photos/200?random=3",
    inStock: "В наличии",
    description: "Элегантный смеситель Hansgrohe для ванной комнаты."
  },
  {
    id: "4",
    name: "Смеситель Vidima Retro",
    price: "1300 руб.",
    category: "Смесители",
    brand: "Vidima",
    image: "https://picsum.photos/200?random=4",
    inStock: "Под заказ",
    description: "Ретро смеситель Vidima с классическим дизайном."
  },
  {
    id: "5",
    name: "Смеситель Roca Premium",
    price: "3200 руб.",
    category: "Смесители",
    brand: "Roca",
    image: "https://picsum.photos/200?random=5",
    inStock: "В наличии",
    description: "Премиальный смеситель Roca для кухни."
  },
  {
    id: "6",
    name: "Смеситель AM.PM Spirit",
    price: "2100 руб.",
    category: "Смесители",
    brand: "AM.PM",
    image: "https://picsum.photos/200?random=6",
    inStock: "В наличии",
    description: "Современный смеситель AM.PM Spirit для ванной."
  },

  // === Душевые системы ===
  {
    id: "7",
    name: "Душевая система Grohe Rain",
    price: "5400 руб.",
    category: "Душевые системы",
    brand: "Grohe",
    image: "https://picsum.photos/200?random=7",
    inStock: "В наличии",
    description: "Система Grohe с тропическим душем."
  },
  {
    id: "8",
    name: "Душевая система Hansgrohe ShowerSet",
    price: "6200 руб.",
    category: "Душевые системы",
    brand: "Hansgrohe",
    image: "https://picsum.photos/200?random=8",
    inStock: "В наличии",
    description: "Фирменная душевая система Hansgrohe."
  },
  {
    id: "9",
    name: "Душевая система Roca Hydro",
    price: "5000 руб.",
    category: "Душевые системы",
    brand: "Roca",
    image: "https://picsum.photos/200?random=9",
    inStock: "Под заказ",
    description: "Современная душевая система с режимами."
  },

  // === Изливы ===
  {
    id: "10",
    name: "Излив DEMM Short",
    price: "700 руб.",
    category: "Изливы",
    brand: "DEMM",
    image: "https://picsum.photos/200?random=10",
    inStock: "В наличии",
    description: "Короткий излив DEMM для ванной."
  },
  {
    id: "11",
    name: "Излив Grohe Long",
    price: "1100 руб.",
    category: "Изливы",
    brand: "Grohe",
    image: "https://picsum.photos/200?random=11",
    inStock: "В наличии",
    description: "Длинный излив Grohe с покрытием."
  },
  {
    id: "12",
    name: "Излив Hansgrohe Elegant",
    price: "900 руб.",
    category: "Изливы",
    brand: "Hansgrohe",
    image: "https://picsum.photos/200?random=12",
    inStock: "В наличии",
    description: "Элегантный излив Hansgrohe."
  },

  // === Полки ===
  {
    id: "13",
    name: "Полка для ванной стеклянная",
    price: "600 руб.",
    category: "Полки",
    brand: "Roca",
    image: "https://picsum.photos/200?random=13",
    inStock: "В наличии",
    description: "Удобная стеклянная полка для ванной комнаты."
  },
  {
    id: "14",
    name: "Полка угловая металлическая",
    price: "750 руб.",
    category: "Полки",
    brand: "Grohe",
    image: "https://picsum.photos/200?random=14",
    inStock: "В наличии",
    description: "Металлическая угловая полка для душевой."
  },

  // === Аксессуары ===
  {
    id: "15",
    name: "Держатель для полотенца Grohe",
    price: "400 руб.",
    category: "Аксессуары",
    brand: "Grohe",
    image: "https://picsum.photos/200?random=15",
    inStock: "В наличии",
    description: "Хромированный держатель для полотенца."
  },
  {
    id: "16",
    name: "Мыльница Hansgrohe",
    price: "350 руб.",
    category: "Аксессуары",
    brand: "Hansgrohe",
    image: "https://picsum.photos/200?random=16",
    inStock: "В наличии",
    description: "Стильная мыльница Hansgrohe."
  },
  {
    id: "17",
    name: "Крючок для ванной DEMM",
    price: "200 руб.",
    category: "Аксессуары",
    brand: "DEMM",
    image: "https://picsum.photos/200?random=17",
    inStock: "В наличии",
    description: "Надежный крючок для ванной комнаты."
  },
  {
    id: "18",
    name: "Дозатор для жидкого мыла Roca",
    price: "500 руб.",
    category: "Аксессуары",
    brand: "Roca",
    image: "https://picsum.photos/200?random=18",
    inStock: "В наличии",
    description: "Дозатор для жидкого мыла Roca."
  },
  {
    id: "19",
    name: "Зеркало настенное AM.PM",
    price: "1800 руб.",
    category: "Аксессуары",
    brand: "AM.PM",
    image: "https://picsum.photos/200?random=19",
    inStock: "Под заказ",
    description: "Круглое зеркало AM.PM с LED подсветкой."
  },
  {
    id: "20",
    name: "Стакан для зубных щеток Vidima",
    price: "300 руб.",
    category: "Аксессуары",
    brand: "Vidima",
    image: "https://picsum.photos/200?random=20",
    inStock: "В наличии",
    description: "Стеклянный стакан Vidima для зубных щеток."
  }
];

// ✅ Default экспорт
export default products;
