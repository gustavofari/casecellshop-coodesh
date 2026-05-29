import type { ProductEntity } from '../entities/product.entity';

const IMG_GALAXY =
  'https://images.unsplash.com/photo-1690788056245-025bd89708a1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const IMG_APPLE =
  'https://images.unsplash.com/photo-1620786963525-4a74f1697a46?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const IMG_XIAOMI =
  'https://images.unsplash.com/photo-1774070150532-50f95de9d619?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const IMG_MOTOROLA =
  'https://images.unsplash.com/photo-1779006396299-89ea468824b5?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const productsMock: ProductEntity[] = [
  // Apple
  {
    id: 'ip13-silicone-black',
    name: 'Capinha iPhone 13 - Silicone Preto',
    price: 79.9,
    stock: 15,
    imageUrl: IMG_APPLE,
  },
  {
    id: 'ip13-clear',
    name: 'Capinha iPhone 13 - Transparente',
    price: 49.9,
    stock: 0,
    imageUrl: IMG_APPLE,
  },
  {
    id: 'ip14-leather-brown',
    name: 'Capinha iPhone 14 - Couro Marrom',
    price: 129.9,
    stock: 8,
    imageUrl: IMG_APPLE,
  },
  {
    id: 'ip14-silicone-blue',
    name: 'Capinha iPhone 14 - Silicone Azul',
    price: 79.9,
    stock: 22,
    imageUrl: IMG_APPLE,
  },
  {
    id: 'ip14-magsafe-clear',
    name: 'Capinha iPhone 14 Pro - MagSafe Clear',
    price: 149.9,
    stock: 5,
    imageUrl: IMG_APPLE,
  },
  {
    id: 'ip15-silicone-pink',
    name: 'Capinha iPhone 15 - Silicone Rosa',
    price: 89.9,
    stock: 12,
    imageUrl: IMG_APPLE,
  },
  {
    id: 'ip15-carbon',
    name: 'Capinha iPhone 15 Pro - Fibra de Carbono',
    price: 199.9,
    stock: 3,
    imageUrl: IMG_APPLE,
  },
  {
    id: 'ip15-wallet',
    name: 'Capinha iPhone 15 Pro Max - Carteira',
    price: 159.9,
    stock: 7,
    imageUrl: IMG_APPLE,
  },
  {
    id: 'ip12-clear',
    name: 'Capinha iPhone 12 - Transparente Anti-Amarelo',
    price: 59.9,
    stock: 18,
    imageUrl: IMG_APPLE,
  },
  {
    id: 'ip11-silicone-red',
    name: 'Capinha iPhone 11 - Silicone Vermelho',
    price: 39.9,
    stock: 30,
    imageUrl: IMG_APPLE,
  },

  // Samsung
  {
    id: 's24-ultra-armor',
    name: 'Capinha Galaxy S24 Ultra - Armor Black',
    price: 119.9,
    stock: 10,
    imageUrl: IMG_GALAXY,
  },
  {
    id: 's24-clear',
    name: 'Capinha Galaxy S24 - Transparente',
    price: 59.9,
    stock: 25,
    imageUrl: IMG_GALAXY,
  },
  {
    id: 's23-silicone-green',
    name: 'Capinha Galaxy S23 - Silicone Verde',
    price: 69.9,
    stock: 0,
    imageUrl: IMG_GALAXY,
  },
  {
    id: 's23-leather-black',
    name: 'Capinha Galaxy S23+ - Couro Preto',
    price: 109.9,
    stock: 4,
    imageUrl: IMG_GALAXY,
  },
  {
    id: 's22-ultra-clear',
    name: 'Capinha Galaxy S22 Ultra - Clear Standing',
    price: 89.9,
    stock: 14,
    imageUrl: IMG_GALAXY,
  },
  {
    id: 's21-fe-silicone',
    name: 'Capinha Galaxy S21 FE - Silicone Azul',
    price: 49.9,
    stock: 40,
    imageUrl: IMG_GALAXY,
  },
  {
    id: 'a54-clear',
    name: 'Capinha Galaxy A54 - Transparente Reforçada',
    price: 39.9,
    stock: 50,
    imageUrl: IMG_GALAXY,
  },
  {
    id: 'a34-wallet',
    name: 'Capinha Galaxy A34 - Tipo Carteira',
    price: 45.9,
    stock: 12,
    imageUrl: IMG_GALAXY,
  },
  {
    id: 'zflip5-ring',
    name: 'Capinha Galaxy Z Flip 5 - Com Anel',
    price: 139.9,
    stock: 6,
    imageUrl: IMG_GALAXY,
  },
  {
    id: 'zfold5-pen',
    name: 'Capinha Galaxy Z Fold 5 - Slot S Pen',
    price: 299.9,
    stock: 2,
    imageUrl: IMG_GALAXY,
  },

  // Xiaomi & Poco
  {
    id: 'rn12-clear',
    name: 'Capinha Redmi Note 12 - Transparente',
    price: 29.9,
    stock: 60,
    imageUrl: IMG_XIAOMI,
  },
  {
    id: 'rn12-pro-armor',
    name: 'Capinha Redmi Note 12 Pro - Anti-Impacto',
    price: 49.9,
    stock: 20,
    imageUrl: IMG_XIAOMI,
  },
  {
    id: 'rn13-silicone',
    name: 'Capinha Redmi Note 13 - Silicone Preto',
    price: 35.9,
    stock: 35,
    imageUrl: IMG_XIAOMI,
  },
  {
    id: 'poco-x5-armor',
    name: 'Capinha Poco X5 - Militar Camuflada',
    price: 55.9,
    stock: 0,
    imageUrl: IMG_XIAOMI,
  },
  {
    id: 'poco-f5-clear',
    name: 'Capinha Poco F5 - Borda Colorida',
    price: 45.9,
    stock: 15,
    imageUrl: IMG_XIAOMI,
  },

  // Motorola
  {
    id: 'edge40-leather',
    name: 'Capinha Motorola Edge 40 - Vegan Leather',
    price: 89.9,
    stock: 8,
    imageUrl: IMG_MOTOROLA,
  },
  {
    id: 'edge30-clear',
    name: 'Capinha Motorola Edge 30 - Transparente',
    price: 39.9,
    stock: 22,
    imageUrl: IMG_MOTOROLA,
  },
  {
    id: 'g54-silicone',
    name: 'Capinha Moto G54 - Silicone Rosa',
    price: 34.9,
    stock: 18,
    imageUrl: IMG_MOTOROLA,
  },
  {
    id: 'g84-armor',
    name: 'Capinha Moto G84 - Anti-Queda',
    price: 44.9,
    stock: 25,
    imageUrl: IMG_MOTOROLA,
  },
  {
    id: 'g53-wallet',
    name: 'Capinha Moto G53 - Carteira Couro Sintético',
    price: 49.9,
    stock: 11,
    imageUrl: IMG_MOTOROLA,
  },
];
