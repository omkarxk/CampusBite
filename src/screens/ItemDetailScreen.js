// src/screens/ItemDetailScreen.js
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPE } from '../theme';
import { PrimaryButton, Chip } from '../components/UI';
import { ItemImage } from '../components/ItemImage';
import { MENU, SIZES, MILKS, SYRUPS } from '../data';
import { useApp } from '../state/AppState';

export default function ItemDetailScreen({ route, navigation }) {
  const { itemId } = route.params;
  const item = MENU.find((m) => m.id === itemId) || MENU[0];
  const isCoffee = item.cat === 'coffee' || item.cat === 'drinks';
  const [size, setSize] = useState('M');
  const [milk, setMilk] = useState('oat');
  const [syrup, setSyrup] = useState('none');
  const [qty, setQty] = useState(1);
  const { addToCart } = useApp();
  const total = useMemo(() => {
    const sz = SIZES.find((s) => s.id === size);
    return ((item.price + (sz?.add || 0)) * qty).toFixed(2);
  }, [size, qty, item]);

  function add() {
    addToCart(item, qty, { size, milk: isCoffee ? milk : undefined, syrup: isCoffee ? syrup : undefined });
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}><Ionicons name="chevron-back" size={22} color={COLORS.ink} /></Pressable>
        <Pressable style={styles.iconBtn}><Ionicons name="heart-outline" size={22} color={COLORS.ink} /></Pressable>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.heroWrap}>
          <ItemImage cat={item.cat} size={280} label={item.name} />
        </View>

        <View style={{ paddingHorizontal: SPACING.xl }}>
          <Text style={[TYPE.title, { color: COLORS.ink }]}>{item.name}</Text>
          <Text style={{ color: COLORS.inkSoft, fontSize: 14, lineHeight: 22, marginTop: 6 }}>{item.desc}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 12 }}>
            <Text style={{ color: COLORS.ink, fontSize: 12 }}>⏱ {item.time}</Text>
            <Text style={{ color: COLORS.ink, fontSize: 12 }}>🔥 {item.kcal} kcal</Text>
          </View>

          <Text style={[TYPE.heading, { color: COLORS.ink, marginTop: SPACING.xl, marginBottom: 8 }]}>Size</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {SIZES.map((s) => <Chip key={s.id} label={s.label} active={size === s.id} onPress={() => setSize(s.id)} />)}
          </View>

          {isCoffee ? (
            <>
              <Text style={[TYPE.heading, { color: COLORS.ink, marginTop: SPACING.xl, marginBottom: 8 }]}>Milk</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {MILKS.map((m) => <Chip key={m.id} label={m.label} active={milk === m.id} onPress={() => setMilk(m.id)} />)}
              </View>
              <Text style={[TYPE.heading, { color: COLORS.ink, marginTop: SPACING.xl, marginBottom: 8 }]}>Syrup</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {SYRUPS.map((s) => <Chip key={s.id} label={s.label} active={syrup === s.id} onPress={() => setSyrup(s.id)} />)}
              </View>
            </>
          ) : null}

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: SPACING.xl }}>
            <Text style={[TYPE.heading, { color: COLORS.ink }]}>Quantity</Text>
            <View style={styles.stepper}>
              <Pressable onPress={() => setQty(Math.max(1, qty - 1))} style={styles.stepBtn}><Ionicons name="remove" size={18} color={COLORS.ink} /></Pressable>
              <Text style={{ color: COLORS.ink, fontWeight: '700', fontSize: 16, minWidth: 24, textAlign: 'center' }}>{qty}</Text>
              <Pressable onPress={() => setQty(qty + 1)} style={styles.stepBtn}><Ionicons name="add" size={18} color={COLORS.ink} /></Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={{ color: COLORS.inkSoft, fontSize: 11 }}>Total</Text>
          <Text style={{ color: COLORS.ink, fontSize: 22, fontWeight: '700' }}>${total}</Text>
        </View>
        <PrimaryButton title="Add to cart" onPress={add} style={{ flex: 1, marginLeft: SPACING.md }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingTop: SPACING.md },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border },
  heroWrap: { alignItems: 'center', paddingVertical: SPACING.xl },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 4, backgroundColor: COLORS.card, borderRadius: RADIUS.pill, borderWidth: 1, borderColor: COLORS.border },
  stepBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.bgAlt, alignItems: 'center', justifyContent: 'center' },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, paddingBottom: SPACING.xl, backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border, flexDirection: 'row', alignItems: 'center' },
});
