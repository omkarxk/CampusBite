// src/screens/CartScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, SHADOWS } from '../theme';
import { PrimaryButton } from '../components/UI';
import { ItemImage } from '../components/ItemImage';
import { useApp } from '../state/AppState';

// ─── × qty [+] stepper on item rows ──────────────────────────────────────────
function ItemStepper({ qty, onDecrement, onIncrement }) {
  return (
    <View style={s.itemStepper}>
      <Pressable onPress={onDecrement} style={s.stepperX}>
        <Text style={s.stepperXText}>×</Text>
      </Pressable>
      <Text style={s.stepperQty}>{qty}</Text>
      <Pressable onPress={onIncrement} style={s.stepperPlus}>
        <Ionicons name="add" size={16} color="#fff" />
      </Pressable>
    </View>
  );
}

// ─── [−] qty [+] stepper for split ───────────────────────────────────────────
function SplitStepper({ value, onDecrement, onIncrement }) {
  return (
    <View style={s.splitStepper}>
      <Pressable onPress={onDecrement} style={s.splitMinus}>
        <Ionicons name="remove" size={16} color={COLORS.ink} />
      </Pressable>
      <Text style={s.splitQty}>{value}</Text>
      <Pressable onPress={onIncrement} style={s.stepperPlus}>
        <Ionicons name="add" size={16} color="#fff" />
      </Pressable>
    </View>
  );
}

// ─── Summary row ─────────────────────────────────────────────────────────────
function SummaryRow({ label, value, total }) {
  return (
    <View style={s.summaryRow}>
      <Text style={[s.summaryLabel, total && s.summaryLabelTotal]}>{label}</Text>
      <Text style={[s.summaryValue, total && s.summaryValueTotal]}>{value}</Text>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function CartScreen({ navigation }) {
  const { cart, updateQty, removeItem, cartSubtotal, cartTotal, cafe } = useApp();
  const [promo, setPromo]         = useState('');
  const [applied, setApplied]     = useState(false);
  const [splitWith, setSplitWith] = useState(1);

  const sub      = cartSubtotal();
  const fee      = 0.99;
  const tax      = sub * 0.0825;
  const discount = applied ? sub * 0.5 : 0;
  const total    = Math.max(0, sub + fee + tax - discount);
  const itemCount = cart.reduce((n, x) => n + x.qty, 0);

  if (cart.length === 0) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={{ padding: SPACING.xl }}>
          <Text style={s.pageTitle}>My cart</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xl }}>
          <View style={s.emptyOrb}>
            <Ionicons name="bag-outline" size={42} color={COLORS.inkFaint} />
          </View>
          <Text style={{ color: COLORS.ink, fontWeight: '700', fontSize: 18, marginTop: 16 }}>Your cart is empty</Text>
          <Text style={{ color: COLORS.inkSoft, marginTop: 6, textAlign: 'center' }}>
            Tap into the menu to add something tasty.
          </Text>
          <PrimaryButton title="Browse menu" onPress={() => navigation.navigate('Menu')} style={{ marginTop: SPACING.xl }} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll}>

        {/* ── Header ── */}
        <Text style={s.pageSubtitle}>{itemCount} item{itemCount !== 1 ? 's' : ''} · {cafe.name}</Text>
        <Text style={s.pageTitle}>My cart</Text>

        {/* ── Item cards ── */}
        <View style={{ gap: 12, marginTop: 20 }}>
          {cart.map((it, idx) => {
            const opts = [it.opts?.size, it.opts?.milk, it.opts?.syrup]
              .filter(Boolean).join(' · ') || 'Standard';
            return (
              <View key={it.id + idx} style={s.itemCard}>
                <ItemImage cat={it.cat} size={64} label={it.name} style={{ borderRadius: 14 }} />
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={s.itemName}>{it.name}</Text>
                  <Text style={s.itemOpts}>{opts}</Text>
                  <Text style={s.itemPrice}>${(it.price * it.qty).toFixed(2)}</Text>
                </View>
                <ItemStepper
                  qty={it.qty}
                  onDecrement={() => it.qty > 1 ? updateQty(it.id, it.qty - 1) : removeItem(it.id)}
                  onIncrement={() => updateQty(it.id, it.qty + 1)}
                />
              </View>
            );
          })}
        </View>

        {/* ── Promo code ── */}
        <View style={s.promoRow}>
          <View style={s.promoInput}>
            <Ionicons name="add" size={18} color={COLORS.primary} />
            <TextInput
              value={promo}
              onChangeText={setPromo}
              placeholder="Promo code (try BOGO50)"
              placeholderTextColor={COLORS.inkFaint}
              style={s.promoTextField}
              autoCapitalize="characters"
            />
          </View>
          <Pressable
            style={[s.applyBtn, applied && { backgroundColor: COLORS.inkSoft }]}
            onPress={() => { if (promo.trim()) setApplied(true); }}
          >
            <Text style={s.applyText}>{applied ? 'Applied ✓' : 'Apply'}</Text>
          </Pressable>
        </View>

        {/* ── Split with roommates ── */}
        <View style={s.splitCard}>
          <View style={s.splitIcon}>
            <Ionicons name="people" size={20} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={s.splitLabel}>Split with roommates</Text>
            <Text style={s.splitSub}>
              {splitWith === 1 ? 'Pay it all yourself' : `$${(total / splitWith).toFixed(2)} each`}
            </Text>
          </View>
          <SplitStepper
            value={splitWith}
            onDecrement={() => setSplitWith((v) => Math.max(1, v - 1))}
            onIncrement={() => setSplitWith((v) => Math.min(8, v + 1))}
          />
        </View>

        {/* ── Summary ── */}
        <View style={s.summaryCard}>
          <SummaryRow label="Subtotal"    value={`$${sub.toFixed(2)}`} />
          <SummaryRow label="Service fee" value={`$${fee.toFixed(2)}`} />
          <SummaryRow label="Tax"         value={`$${tax.toFixed(2)}`} />
          {applied && <SummaryRow label="Discount (BOGO50)" value={`-$${discount.toFixed(2)}`} />}
          <View style={s.summaryDivider} />
          <SummaryRow label="Total" value={`$${total.toFixed(2)}`} total />
        </View>

      </ScrollView>

      {/* ── Checkout bar ── */}
      <View style={s.bottomBar}>
        <PrimaryButton
          title={`Check out · $${total.toFixed(2)}`}
          onPress={() => navigation.navigate('Checkout')}
        />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.xl, paddingBottom: 120 },

  pageSubtitle: { color: COLORS.inkSoft, fontSize: 13, fontWeight: '500' },
  pageTitle:    { fontSize: 34, fontWeight: '800', color: COLORS.ink, letterSpacing: -0.5, marginTop: 4 },

  /* Item card */
  itemCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card, borderRadius: RADIUS.lg,
    padding: 14, ...SHADOWS.card,
  },
  itemName:  { color: COLORS.ink, fontWeight: '700', fontSize: 15 },
  itemOpts:  { color: COLORS.inkSoft, fontSize: 12, marginTop: 3 },
  itemPrice: { color: COLORS.primary, fontWeight: '700', fontSize: 14, marginTop: 5 },

  /* Item stepper */
  itemStepper:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stepperX:     { paddingHorizontal: 4 },
  stepperXText: { color: COLORS.inkSoft, fontSize: 20 },
  stepperQty:   { color: COLORS.ink, fontWeight: '700', fontSize: 15, minWidth: 14, textAlign: 'center' },
  stepperPlus:  {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: COLORS.ink,
    alignItems: 'center', justifyContent: 'center',
  },

  /* Promo */
  promoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20 },
  promoInput: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    height: 52, paddingHorizontal: 16, borderRadius: RADIUS.pill,
    backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  promoTextField: { flex: 1, marginLeft: 8, color: COLORS.ink, fontSize: 14 },
  applyBtn: {
    height: 52, paddingHorizontal: 22, borderRadius: RADIUS.pill,
    backgroundColor: COLORS.ink, alignItems: 'center', justifyContent: 'center',
  },
  applyText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  /* Split */
  splitCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card, borderRadius: RADIUS.lg,
    padding: 16, marginTop: 14, ...SHADOWS.card,
  },
  splitIcon: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center', justifyContent: 'center',
  },
  splitLabel:   { color: COLORS.ink, fontWeight: '700', fontSize: 15 },
  splitSub:     { color: COLORS.inkSoft, fontSize: 12, marginTop: 2 },
  splitStepper: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  splitMinus: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: COLORS.bgAlt,
    alignItems: 'center', justifyContent: 'center',
  },
  splitQty: { color: COLORS.ink, fontWeight: '700', fontSize: 15, minWidth: 14, textAlign: 'center' },

  /* Summary */
  summaryCard: {
    backgroundColor: COLORS.card, borderRadius: RADIUS.lg,
    padding: 18, marginTop: 14, ...SHADOWS.card,
  },
  summaryRow:        { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  summaryLabel:      { color: COLORS.inkSoft, fontSize: 14 },
  summaryValue:      { color: COLORS.inkSoft, fontSize: 14 },
  summaryLabelTotal: { color: COLORS.ink, fontWeight: '700', fontSize: 16 },
  summaryValueTotal: { color: COLORS.ink, fontWeight: '800', fontSize: 24 },
  summaryDivider:    { height: 1, backgroundColor: COLORS.divider, marginVertical: 12 },

  /* Bottom bar */
  bottomBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    paddingHorizontal: SPACING.xl, paddingTop: SPACING.md, paddingBottom: 36,
    backgroundColor: COLORS.card,
    borderTopWidth: 1, borderTopColor: COLORS.border,
    ...SHADOWS.card,
  },

  emptyOrb: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: COLORS.bgAlt,
    alignItems: 'center', justifyContent: 'center',
  },
});
