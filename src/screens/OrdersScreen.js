// src/screens/OrdersScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, SHADOWS } from '../theme';
import { Logo } from '../components/UI';
import { useApp } from '../state/AppState';

const RICH_ORDERS = [
  { id: '#0083', cafe: 'Main Quad Café',       date: 'Today, 9:15 AM',     items: ['Iced Vanilla Latte', 'Brown Butter Cookie'],      total: 12.45, status: 'in_progress' },
  { id: '#0079', cafe: 'Sterling Library Bar',  date: 'Yesterday, 7:28 PM', items: ['Buddha Power Bowl', 'Green Goddess Smoothie'],    total: 18.20, status: 'completed' },
  { id: '#0075', cafe: 'North Dorm Pantry',     date: 'Mon, 11:45 PM',      items: ['Pepperoni Slice', 'Garlic Parm Fries'],           total: 9.75,  status: 'completed' },
  { id: '#0072', cafe: 'STEM Hall Espresso',    date: 'Mon, 8:00 AM',       items: ['Mocha Frappé'],                                   total: 5.25,  status: 'completed' },
  { id: '#0068', cafe: 'Main Quad Café',        date: 'Sun, 1:14 PM',       items: ['Campus Smash Burger', 'Iced Americano'],          total: 14.50, status: 'completed' },
];

const TABS = ['All', 'Active', 'Favorites'];

function StatusBadge({ status }) {
  const active = status === 'in_progress';
  return (
    <View style={[s.badge, active ? s.badgeActive : s.badgeDone]}>
      <Text style={[s.badgeText, { color: active ? '#fff' : COLORS.inkSoft }]}>
        {active ? 'IN PROGRESS' : 'COMPLETED'}
      </Text>
    </View>
  );
}

function OrderCard({ order }) {
  const active = order.status === 'in_progress';
  return (
    <View style={s.card}>
      {/* Top row: badge + order id + price */}
      <View style={s.cardTop}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <StatusBadge status={order.status} />
          <Text style={s.orderId}>{order.id}</Text>
        </View>
        <Text style={s.price}>${order.total.toFixed(2)}</Text>
      </View>

      {/* Cafe name */}
      <Text style={s.cafeName}>{order.cafe}</Text>

      {/* Date */}
      <Text style={s.dateText}>{order.date}</Text>

      {/* Items */}
      <Text style={s.itemsText}>{order.items.join(' · ')}</Text>

      {/* Buttons */}
      <View style={s.btnRow}>
        <Pressable style={[s.reorderBtn, !active && { flex: 1 }]}>
          <Text style={s.reorderText}>Reorder</Text>
        </Pressable>
        {active && (
          <Pressable style={s.trackBtn}>
            <Text style={s.trackText}>Track →</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default function OrdersScreen() {
  const { orders } = useApp();
  const [activeTab, setActiveTab] = useState('All');

  const placedOrders = orders.map((o) => ({
    id: '#' + o.id.replace('CB-', '0'),
    cafe: 'Your Order',
    date: o.date,
    items: o.items,
    total: o.total,
    status: 'in_progress',
  }));

  const all = [...placedOrders, ...RICH_ORDERS];
  const filtered = activeTab === 'Active' ? all.filter((o) => o.status === 'in_progress') : all;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll}>

        {/* ── Top bar ── */}
        <View style={s.topBar}>
          <Logo />
          <Pressable style={s.iconBtn}>
            <Ionicons name="search" size={20} color={COLORS.ink} />
          </Pressable>
        </View>

        {/* ── Page title ── */}
        <Text style={s.pageTitle}>Orders</Text>

        {/* ── Tabs ── */}
        <View style={s.tabRow}>
          {TABS.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[s.tab, activeTab === tab && s.tabActive]}
            >
              <Text style={[s.tabText, activeTab === tab && s.tabTextActive]}>{tab}</Text>
            </Pressable>
          ))}
        </View>

        {/* ── Order cards ── */}
        {filtered.map((o, i) => <OrderCard key={o.id + i} order={o} />)}

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.xl, paddingBottom: 48 },

  /* Top bar */
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg },
  iconBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: COLORS.card,
    alignItems: 'center', justifyContent: 'center',
    ...SHADOWS.card,
  },

  /* Page title */
  pageTitle: { fontSize: 34, fontWeight: '800', color: COLORS.ink, letterSpacing: -0.5, marginBottom: 16 },

  /* Tabs */
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  tab: {
    paddingHorizontal: 22, paddingVertical: 10, borderRadius: RADIUS.pill,
    backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border,
  },
  tabActive:     { backgroundColor: COLORS.ink, borderColor: COLORS.ink },
  tabText:       { color: COLORS.inkSoft, fontWeight: '600', fontSize: 14 },
  tabTextActive: { color: '#fff' },

  /* Order card */
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: 14,
    ...SHADOWS.card,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  /* Badge */
  badge:       { paddingHorizontal: 10, paddingVertical: 5, borderRadius: RADIUS.pill },
  badgeActive: { backgroundColor: COLORS.primary },
  badgeDone:   { backgroundColor: COLORS.bgAlt },
  badgeText:   { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },

  /* Order info */
  orderId:   { color: COLORS.inkFaint, fontSize: 13 },
  price:     { color: COLORS.ink, fontWeight: '800', fontSize: 18 },
  cafeName:  { color: COLORS.ink, fontWeight: '700', fontSize: 17, marginTop: 10 },
  dateText:  { color: COLORS.inkSoft, fontSize: 13, marginTop: 3 },
  itemsText: { color: COLORS.inkSoft, fontSize: 13, marginTop: 8 },

  /* Buttons */
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  reorderBtn: {
    flex: 1, height: 46, borderRadius: RADIUS.pill,
    backgroundColor: COLORS.bgAlt,
    alignItems: 'center', justifyContent: 'center',
  },
  reorderText: { color: COLORS.ink, fontWeight: '600', fontSize: 14 },
  trackBtn: {
    flex: 1, height: 46, borderRadius: RADIUS.pill,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  trackText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
