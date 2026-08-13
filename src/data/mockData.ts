export interface KitchenOrder {
  id: string; // The MongoDB ObjectId
  parentName: string; // Fetched from parentId ref
  babyName?: string; // Fetched from babyId ref
  items: { name: string; quantity: number }[]; // Simplified from items array for UI
  status: 'pending' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  deliveryAddress: { street: string; city: string; zipCode: string; phone: string };
  specialInstructions?: string;
  totalAmount: number;
  cancellationReason?: string;
  createdAt: string;
}

export interface CookingBatch {
  id: string;
  batchNumber: string;
  recipeName: string;
  quantity: number;
  cookedBy: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  unit: 'kg' | 'L' | 'units';
  minThreshold: number;
  expiryDate: string;
  status: 'LOW STOCK' | 'STABLE' | 'EXPIRING';
  category: 'Produce' | 'Grains & Pulses' | 'Dairy & Eggs' | 'Oils & Condiments';
}

export interface StockMovement {
  id: string;
  timestamp: string;
  ingredientName: string;
  action: 'Deduction' | 'Restock' | 'Usage' | 'Wastage';
  quantity: string;
  performedBy: string;
}

export interface KitchenFloorLog {
  id: string;
  timestamp: string;
  batchId: string;
  action: string;
  status: 'NORMAL' | 'VERIFIED' | 'LOGGED' | 'ALERT';
}

export interface Recipe {
  id: string;
  name: string;
  stage: 'Stage 1 (4-6m)' | 'Stage 2 (6-8m)' | 'Stage 3 (8-12m)';
  category: 'Purée' | 'Textured Solids' | 'Soups' | 'Porridge';
  cookingTimeMinutes: number;
  servingSizeGrams: number;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  ironMg: number;
  ingredients: { name: string; amount: string }[];
  steps: string[];
}

export const INITIAL_KITCHEN_ORDERS: KitchenOrder[] = [
  {
    id: 'ord-1',
    parentName: 'Sarah Jenkins',
    babyName: 'Leo',
    items: [{ name: 'Mashed Carrots & Peas (Stage 1)', quantity: 2 }],
    status: 'pending',
    deliveryAddress: { street: '42 Park Avenue', city: 'Mumbai', zipCode: '400050', phone: '+91 9876543210' },
    specialInstructions: 'No salt, please.',
    totalAmount: 250,
    createdAt: '10:15 AM'
  },
  {
    id: 'ord-2',
    parentName: 'Michael Chang',
    babyName: 'Emma',
    items: [{ name: 'Quinoa & Apple Porridge (Stage 2)', quantity: 1 }],
    status: 'preparing',
    deliveryAddress: { street: 'Block B, Green Valley', city: 'Mumbai', zipCode: '400051', phone: '+91 9876543211' },
    specialInstructions: '',
    totalAmount: 180,
    createdAt: '09:30 AM'
  },
  {
    id: 'ord-3',
    parentName: 'Priya Sharma',
    babyName: 'Aarav',
    items: [{ name: 'Sweet Potato Mash', quantity: 3 }],
    status: 'ready',
    deliveryAddress: { street: '12 Linking Road', city: 'Mumbai', zipCode: '400052', phone: '+91 9876543212' },
    specialInstructions: 'Extra smooth texture.',
    totalAmount: 420,
    createdAt: '08:45 AM'
  },
  {
    id: 'ord-4',
    parentName: 'Tom Hanks',
    babyName: 'Mia',
    items: [{ name: 'Organic Purée (Stage 2)', quantity: 2 }],
    status: 'cancelled',
    deliveryAddress: { street: 'Hill Road, Bandra', city: 'Mumbai', zipCode: '400050', phone: '+91 9876543213' },
    specialInstructions: 'Deliver before 12 PM if possible.',
    totalAmount: 300,
    cancellationReason: 'Baby is sleeping, cannot accept delivery right now.',
    createdAt: '11:00 AM'
  }
];

export const INITIAL_COOKING_BATCHES: CookingBatch[] = [
  {
    id: 'batch-1',
    batchNumber: '#3902',
    recipeName: 'Organic Pumpkin Puree',
    quantity: 50,
    cookedBy: 'Chef Marcus V.',
    status: 'preparing'
  },
  {
    id: 'batch-2',
    batchNumber: '#3903',
    recipeName: 'Quinoa Power Bowl',
    quantity: 35,
    cookedBy: 'Chef Elena S.',
    status: 'pending'
  },
  {
    id: 'batch-3',
    batchNumber: '#3904',
    recipeName: 'Spinach Detox Soup',
    quantity: 60,
    cookedBy: 'Chef David K.',
    status: 'pending'
  },
  {
    id: 'batch-4',
    batchNumber: '#3999',
    recipeName: 'Sweet Potato Mash',
    quantity: 120,
    cookedBy: 'Chef Sarah L.',
    status: 'completed'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Organic Carrots',
    sku: 'CRT-ORG-002',
    currentStock: 4.2,
    unit: 'kg',
    minThreshold: 15.0,
    expiryDate: 'Oct 24, 2026',
    status: 'LOW STOCK',
    category: 'Produce'
  },
  {
    id: 'inv-2',
    name: 'Fortified Iron Rice',
    sku: 'RIC-FE-551',
    currentStock: 142.0,
    unit: 'kg',
    minThreshold: 50.0,
    expiryDate: 'Dec 15, 2026',
    status: 'STABLE',
    category: 'Grains & Pulses'
  },
  {
    id: 'inv-3',
    name: 'Cold-Pressed Olive Oil',
    sku: 'OIL-OLV-912',
    currentStock: 24.5,
    unit: 'L',
    minThreshold: 10.0,
    expiryDate: 'Aug 10, 2026',
    status: 'EXPIRING',
    category: 'Oils & Condiments'
  },
  {
    id: 'inv-4',
    name: 'Organic Baby Spinach',
    sku: 'SPN-ORG-104',
    currentStock: 2.8,
    unit: 'kg',
    minThreshold: 5.0,
    expiryDate: 'Aug 02, 2026',
    status: 'LOW STOCK',
    category: 'Produce'
  },
  {
    id: 'inv-5',
    name: 'Pasture Raised Eggs',
    sku: 'EGG-PAS-220',
    currentStock: 120,
    unit: 'units',
    minThreshold: 200,
    expiryDate: 'Aug 08, 2026',
    status: 'LOW STOCK',
    category: 'Dairy & Eggs'
  }
];

export const INITIAL_STOCK_MOVEMENTS: StockMovement[] = [
  {
    id: 'mov-1',
    timestamp: 'Oct 24, 09:12 AM',
    ingredientName: 'Organic Carrots',
    action: 'Deduction',
    quantity: '- 3.5 kg',
    performedBy: 'Chef Marcus'
  },
  {
    id: 'mov-2',
    timestamp: 'Oct 24, 08:45 AM',
    ingredientName: 'Fortified Iron Rice',
    action: 'Restock',
    quantity: '+ 50.0 kg',
    performedBy: 'Supplier Intake'
  },
  {
    id: 'mov-3',
    timestamp: 'Oct 23, 04:30 PM',
    ingredientName: 'Cold-Pressed Olive Oil',
    action: 'Usage',
    quantity: '- 1.5 L',
    performedBy: 'Chef Elena'
  }
];

export const INITIAL_FLOOR_LOGS: KitchenFloorLog[] = [
  {
    id: 'log-1',
    timestamp: '13:58:32',
    batchId: '#3902',
    action: 'Steam pressure stabilized at 1.2 bar',
    status: 'NORMAL'
  },
  {
    id: 'log-2',
    timestamp: '13:45:00',
    batchId: '#3999',
    action: 'Quality check: Texture approval',
    status: 'VERIFIED'
  },
  {
    id: 'log-3',
    timestamp: '13:12:15',
    batchId: '#3904',
    action: 'Ingredient substitution (Organic Kale)',
    status: 'LOGGED'
  }
];

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    name: 'Organic Pumpkin & Carrot Purée',
    stage: 'Stage 1 (4-6m)',
    category: 'Purée',
    cookingTimeMinutes: 25,
    servingSizeGrams: 150,
    calories: 85,
    proteinGrams: 2.1,
    carbsGrams: 18.4,
    ironMg: 1.8,
    ingredients: [
      { name: 'Organic Pumpkin', amount: '100g' },
      { name: 'Organic Carrot', amount: '50g' },
      { name: 'Filtered Water / Breastmilk', amount: '30ml' }
    ],
    steps: [
      'Steam diced pumpkin and carrots for 18 minutes until tender.',
      'Blend in high-speed commercial blender until silky smooth.',
      'Perform temperature check (maintain <38°C before packaging).'
    ]
  },
  {
    id: 'rec-2',
    name: 'Quinoa & Sweet Potato Power Bowl',
    stage: 'Stage 2 (6-8m)',
    category: 'Textured Solids',
    cookingTimeMinutes: 35,
    servingSizeGrams: 200,
    calories: 145,
    proteinGrams: 5.2,
    carbsGrams: 26.0,
    ironMg: 3.4,
    ingredients: [
      { name: 'Organic Quinoa', amount: '40g' },
      { name: 'Roasted Sweet Potato', amount: '120g' },
      { name: 'Cold-Pressed Olive Oil', amount: '5ml' }
    ],
    steps: [
      'Rinse and simmer quinoa in fortified broth for 20 minutes.',
      'Mash roasted sweet potato to soft chunk texture.',
      'Fold in olive oil and portion into 200ml sustainable containers.'
    ]
  }
];
