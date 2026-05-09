// src/screens/CheckoutScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPE } from '../theme';
import { PrimaryButton, Card, Chip } from '../components/UI';
import { useApp } from '../state/AppState';

export default function CheckoutScreen({ navigation }) {
  const { cafe, user } = useApp();
  const [method, setMethod] = useState('pickup');
  const [time, setTime] = useState('Now (10–12 min)');
  const [useMealPlan, setUseMealPlan] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}><Ionicons name="chevron-back" size={22} color={COLORS.ink} /></Pressable>
        <Text style={[TYPE.heading, { color: COLORS.ink }]}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: SPACING.xl, paddingBottom: 140 }}>
        <Text style={[TYPE.caption, { color: COLORS.inkFaint, marginBottom: 8 }]}>DELIVERY METHOD</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable onPress={() => setMethod('pickup')} style={[styles.methodCard, method === 'pickup' && styles.methodActive]}>
            <Ionicons name="walk" size={20} color={method === 'pickup' ? '#fff' : COLORS.ink} />
            <Text style={{ color: method === 'pickup' ? '#fff' : COLORS.ink, fontWeight: '700', marginTop: 6 }}>Pick up</Text>
            <Text style={{ color: method === 'pickup' ? 'rgba(255,255,255,0.7)' : COLORS.inkSoft, fontSize: 11, marginTop: 2 }}>Free</Text>
          </Pressable>
          <Pressable onPress={() => setMethod('delivery')} style={[styles.methodCard, method === 'delivery' && styles.methodActive]}>
            <Ionicons name="bicycle" size={20} color={method === 'delivery' ? '#fff' : COLORS.ink} />
            <Text style={{ color: method === 'delivery' ? '#fff' : COLORS.ink, fontWeight: '700', marginTop: 6 }}>Delivery</Text>
            <Text style={{ color: method === 'delivery' ? 'rgba(255,255,255,0.7)' : COLORS.inkSoft, fontSize: 11, marginTop: 2 }}>$1.99 · 18 min</Text>
          </Pressable>
        </View>

        <Card style={{ marginTop: SPACING.lg }}>
          <Text style={[TYPE.caption, { color: COLORS.inkFaint, marginBottom: 6 }]}>{method === 'pickup' ? 'PICKUP AT' : 'DELIVER FROM'}</Text>
          <Text style={{ color: COLORS.ink, fontWeight: '700' }}>{cafe.name}</Text>
          <Text style={{ color: COLORS.inkSoft, fontSize: 12, marginTop: 2 }}>{cafe.addr}</Text>
        </Card>

        <Text style={[TYPE.caption, { color: COLORS.inkFaint, marginTop: SPACING.lg, marginBottom: 8 }]}>SCHEDULED TIME</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {['Now (10–12 min)', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM'].map((t) => (
            <Chip key={t} label={t} active={time === t} onPress={() => setTime(t)} />
          ))}
        </View>

        <Text style={[TYPE.caption, { color: COLORS.inkFaint, marginTop: SPACING.lg, marginBottom: 8 }]}>PAY WITH</Text>
        <Pressable onPress={() => setUseMealPlan(!useMealPlan)} style={[styles.mealRow, useMealPlan && { borderColor: COLORS.primary, borderWidth: 2 }]}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="card" size={20} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={{ color: COLORS.ink, fontWeight: '700' }}>Meal plan · ${user.plan.dollars.toFixed(2)}</Text>
            <Text style={{ color: COLORS.inkSoft, fontSize: 12 }}>{user.plan.swipes} swipes left this week</Text>
          </View>
          <View style={[styles.toggle, useMealPlan && { backgroundColor: COLORS.primary }]}>
            <View style={[styles.toggleDot, useMealPlan && { transform: [{ translateX: 18 }] }]} />
          </View>
        </Pressable>

        <Pressable style={styles.splitBanner}>
          <Ionicons name="people" size={18} color={COLORS.ink} />
          <Text style={{ color: COLORS.ink, fontWeight: '600', fontSize: 13, marginLeft: 8, flex: 1 }}>Split with roommates · 4 selected</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.inkFaint} />
        </Pressable>
      </ScrollView>

      <View style={styles.bottomBar}>
        <PrimaryButton title="Continue to payment" onPress={() => navigation.navigate('Payment')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border },
  methodCard: { flex: 1, padding: 16, borderRadius: RADIUS.lg, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border },
  methodActive: { backgroundColor: COLORS.ink, borderColor: COLORS.ink },
  mealRow: { flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: COLORS.card, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.border },
  toggle: { width: 42, height: 24, borderRadius: 12, backgroundColor: COLORS.bgAlt, padding: 2, justifyContent: 'center' },
  toggleDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff' },
  splitBanner: { flexDirection: 'row', alignItems: 'center', marginTop: SPACING.md, padding: 14, borderRadius: RADIUS.lg, backgroundColor: COLORS.bgAlt },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, paddingBottom: SPACING.xl, backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border },
});
