// src/screens/CartScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPE } from '../theme';
import { PrimaryButton, Card, SecondaryButton } from '../components/UI';
import { ItemImage } from '../components/ItemImage';
import { useApp } from '../state/AppState';

export default function CartScreen({ navigation }) {
  const { cart, updateQty, removeItem, cartSubtotal, cartTotal } = useApp();
  const [promo, setPromo] = useState('');
  const [applied, setApplied] = useState(false);
  const sub = cartSubtotal();
  const discount = applied ? sub * 0.1 : 0;
  const total = Math.max(0, cartTotal() - discount);

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Text style={[TYPE.title, { color: COLORS.ink, padding: SPACING.xl }]}>My cart</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xl }}>
          <View style={styles.emptyOrb}><Ionicons name="bag-outline" size={42} color={COLORS.inkFaint} /></View>
          <Text style={[TYPE.heading, { color: COLORS.ink, marginTop: 16 }]}>Your cart is empty</Text>
          <Text style={{ color: COLORS.inkSoft, marginTop: 6, textAlign: 'center' }}>Tap into the menu to add something tasty.</Text>
          <PrimaryButton title="Browse menu" onPress={() => navigation.navigate('Menu')} style={{ marginTop: SPACING.xl, paddingHorizontal: 32 }} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: SPACING.xl, paddingBottom: 200 }}>
        <Text style={[TYPE.title, { color: COLORS.ink }]}>My cart</Text>
        <View style={{ gap: 10, marginTop: SPACING.lg }}>
          {cart.map((it, idx) => (
            <Card key={it.id + idx} style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
              <ItemImage cat={it.cat} size={56} label={it.name} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ color: COLORS.ink, fontWeight: '700', fontSize: 14 }}>{it.name}</Text>
                <Text style={{ color: COLORS.inkSoft, fontSize: 11, marginTop: 2 }}>
                  {[it.opts?.size, it.opts?.milk, it.opts?.syrup].filter(Boolean).join(' · ') || 'Standard'}
                </Text>
                <Text style={{ color: COLORS.ink, fontWeight: '700', fontSize: 13, marginTop: 4 }}>${(it.price * it.qty).toFixed(2)}</Text>
              </View>
              <View style={styles.stepper}>
                <Pressable onPress={() => (it.qty > 1 ? updateQty(it.id, it.qty - 1) : removeItem(it.id))}><Ionicons name={it.qty > 1 ? 'remove' : 'trash'} size={16} color={COLORS.ink} /></Pressable>
                <Text style={{ marginHorizontal: 10, fontWeight: '700' }}>{it.qty}</Text>
                <Pressable onPress={() => updateQty(it.id, it.qty + 1)}><Ionicons name="add" size={16} color={COLORS.ink} /></Pressable>
              </View>
            </Card>
          ))}
        </View>

        <View style={{ marginTop: SPACING.lg, flexDirection: 'row', gap: 8 }}>
          <View style={[styles.input, { flex: 1 }]}>
            <Ionicons name="pricetag-outline" size={16} color={COLORS.inkFaint} />
            <TextInput value={promo} onChangeText={setPromo} placeholder="Promo code" placeholderTextColor={COLORS.inkFaint} style={{ flex: 1, marginLeft: 8, color: COLORS.ink, fontSize: 13 }} />
          </View>
          <SecondaryButton title={applied ? 'Applied' : 'Apply'} onPress={() => promo && setApplied(true)} style={{ height: 44, paddingHorizontal: 18 }} />
        </View>

        <Card style={{ marginTop: SPACING.lg, padding: 16 }}>
          <Row label="Subtotal" value={`$${sub.toFixed(2)}`} />
          <Row label="Service fee" value="$0.99" />
          <Row label="Tax" value={`$${(sub * 0.0825).toFixed(2)}`} />
          {applied ? <Row label="Discount (10%)" value={`-$${discount.toFixed(2)}`} positive /> : null}
          <View style={{ height: 1, backgroundColor: COLORS.divider, marginVertical: 10 }} />
          <Row label="Total" value={`$${total.toFixed(2)}`} bold />
        </Card>

        <Pressable style={styles.splitBanner}>
          <Ionicons name="people" size={18} color={COLORS.primary} />
          <Text style={{ color: COLORS.ink, fontWeight: '600', fontSize: 13, marginLeft: 8, flex: 1 }}>Split this with friends or roommates</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.inkFaint} />
        </Pressable>
      </ScrollView>

      <View style={styles.bottomBar}>
        <PrimaryButton title={`Check out · $${total.toFixed(2)}`} onPress={() => navigation.navigate('Checkout')} />
      </View>
    </SafeAreaView>
  );
}

function Row({ label, value, bold, positive }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 }}>
      <Text style={{ color: bold ? COLORS.ink : COLORS.inkSoft, fontWeight: bold ? '700' : '500', fontSize: bold ? 15 : 13 }}>{label}</Text>
      <Text style={{ color: positive ? COLORS.success : (bold ? COLORS.ink : COLORS.inkSoft), fontWeight: bold ? '700' : '600', fontSize: bold ? 15 : 13 }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  emptyOrb: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.bgAlt, alignItems: 'center', justifyContent: 'center' },
  stepper: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bgAlt, paddingHorizontal: 10, paddingVertical: 6, borderRadius: RADIUS.pill },
  input: { flexDirection: 'row', alignItems: 'center', height: 44, paddingHorizontal: 14, borderRadius: RADIUS.pill, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border },
  splitBanner: { flexDirection: 'row', alignItems: 'center', marginTop: SPACING.md, padding: 14, borderRadius: RADIUS.lg, backgroundColor: COLORS.primarySoft },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, paddingBottom: SPACING.xl, backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border },
});
