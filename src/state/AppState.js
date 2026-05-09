// src/state/AppState.js — global cart + cafe state
import React, { createContext, useContext, useState } from 'react';
import { CAFES } from '../data';

const AppCtx = createContext(null);

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cafe, setCafe] = useState(CAFES[0]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({
    name: 'Alex Morgan',
    email: 'alex@university.edu',
    school: 'State University',
    plan: { dollars: 142.50, swipes: 7 },
    streak: 12,
  });

  function addToCart(item, qty = 1, opts = {}) {
    setCart((c) => {
      const ix = c.findIndex((x) => x.id === item.id && JSON.stringify(x.opts) === JSON.stringify(opts));
      if (ix >= 0) {
        const next = c.slice();
        next[ix] = { ...next[ix], qty: next[ix].qty + qty };
        return next;
      }
      return c.concat([{ ...item, qty, opts }]);
    });
  }
  function updateQty(id, qty) {
    setCart((c) => c.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x)));
  }
  function removeItem(id) { setCart((c) => c.filter((x) => x.id !== id)); }
  function clearCart() { setCart([]); }
  function placeOrder(extras) {
    const id = 'CB-' + Math.floor(Math.random() * 900 + 100);
    const order = {
      id,
      date: 'Today',
      status: 'Order placed',
      total: cartTotal(),
      items: cart.map((x) => x.name),
      ...extras,
    };
    setOrders((o) => [order, ...o]);
    clearCart();
    return order;
  }
  function cartSubtotal() { return cart.reduce((s, x) => s + x.price * x.qty, 0); }
  function cartTotal() {
    const sub = cartSubtotal();
    return sub > 0 ? +(sub + 0.99 + sub * 0.0825).toFixed(2) : 0;
  }
  function cartCount() { return cart.reduce((s, x) => s + x.qty, 0); }

  const value = {
    cart, addToCart, updateQty, removeItem, clearCart,
    cafe, setCafe,
    orders, placeOrder,
    user, setUser,
    cartSubtotal, cartTotal, cartCount,
  };
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export const useApp = () => useContext(AppCtx);
