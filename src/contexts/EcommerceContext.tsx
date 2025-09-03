import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  type: string;
  priceRange: string;
  image: string;
  size?: string;
  quantity?: number;
}

interface CartItem extends Product {
  size: string;
  quantity: number;
}

interface Address {
  id: string;
  name: string;
  mobile: string;
  address: string;
  pincode: string;
  isDefault?: boolean;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Ordered' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  date: string;
  address: Address;
}

interface EcommerceState {
  cart: CartItem[];
  wishlist: Product[];
  addresses: Address[];
  orders: Order[];
  selectedAddress: Address | null;
}

type EcommerceAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'MOVE_TO_CART'; payload: { product: Product; size: string } }
  | { type: 'ADD_ADDRESS'; payload: Address }
  | { type: 'UPDATE_ADDRESS'; payload: Address }
  | { type: 'DELETE_ADDRESS'; payload: string }
  | { type: 'SELECT_ADDRESS'; payload: Address }
  | { type: 'PLACE_ORDER'; payload: Order }
  | { type: 'CLEAR_CART' };

const initialState: EcommerceState = {
  cart: [],
  wishlist: [],
  addresses: [
    {
      id: '1',
      name: 'John Doe',
      mobile: '+1234567890',
      address: '123 Main St, Apt 4B, New York, NY 10001',
      pincode: '10001',
      isDefault: true
    }
  ],
  orders: [],
  selectedAddress: null
};

const ecommerceReducer = (state: EcommerceState, action: EcommerceAction): EcommerceState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => 
        item.id === action.payload.id && item.size === action.payload.size
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'ADD_TO_WISHLIST':
      if (state.wishlist.find(item => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };

    case 'MOVE_TO_CART':
      const cartItem: CartItem = {
        ...action.payload.product,
        size: action.payload.size,
        quantity: 1
      };
      return {
        ...state,
        cart: [...state.cart, cartItem],
        wishlist: state.wishlist.filter(item => item.id !== action.payload.product.id)
      };

    case 'ADD_ADDRESS':
      return { ...state, addresses: [...state.addresses, action.payload] };

    case 'UPDATE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.map(addr =>
          addr.id === action.payload.id ? action.payload : addr
        )
      };

    case 'DELETE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.filter(addr => addr.id !== action.payload)
      };

    case 'SELECT_ADDRESS':
      return { ...state, selectedAddress: action.payload };

    case 'PLACE_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: [],
        selectedAddress: null
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    default:
      return state;
  }
};

const EcommerceContext = createContext<{
  state: EcommerceState;
  dispatch: React.Dispatch<EcommerceAction>;
} | null>(null);

export const EcommerceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(ecommerceReducer, initialState);

  return (
    <EcommerceContext.Provider value={{ state, dispatch }}>
      {children}
    </EcommerceContext.Provider>
  );
};

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
};

export type { Product, CartItem, Address, Order };