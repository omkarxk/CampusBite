// src/screens/PaymentScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPE } from '../theme';
import { PrimaryButton, Card } from '../components/UI';
import { useApp } from '../state/AppState';

const METHODS = [
  { id: 'card',  label: 'Card',  icon: 'card-outline' },
  { id: 'apple', label: 'Apple Pay', icon: 'logo-apple' },
  { id: 'gpay',  label: 'Google Pay', icon: 'logo-google' },
  { id: 'cash',  label: 'Cash on pickup', icon: 'cash-outline' },
];

export default function PaymentScreen({ navigation }) {
  const [method, setMethod] = useState('card');
  const { placeOrder, cartTotal } = useApp();

  function place() {
    const order = placeOrder({});
    navigation.replace('Confirmation', { orderId: order.id });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}><Ionicons name="chevron-back" size={22} color={COLORS.ink} /></Pressable>
        <Text style={[TYPE.heading, { color: COLORS.ink }]}>Payment</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: SPACING.xl, paddingBottom: 140 }}>
        <Text style={[TYPE.caption, { color: COLORS.inkFaint, marginBottom: 8 }]}>METHOD</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {METHODS.map((m) => (
            <Pressable key={m.id} onPress={() => setMethod(m.id)} style={[styles.methodCard, method === m.id && styles.methodActive]}>
              <Ionicons name={m.icon} size={22} color={method === m.id ? '#fff' : COLORS.ink} />
              <Text style={{ color: method === m.id ? '#fff' : COLORS.ink, fontWeight: '700', marginTop: 6 }}>{m.label}</Text>
            </Pressable>
          ))}
        </View>

        {method === 'card' ? (
          <Card style={{ marginTop: SPACING.lg, gap: 10 }}>
            <Text style={[TYPE.caption, { color: COLORS.inkFaint }]}>CARD NUMBER</Text>
            <TextInput placeholder="1234 5678 9012 3456" placeholderTextColor={COLORS.inkFaint} style={styles.input} />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={[TYPE.caption, { color: COLORS.inkFaint }]}>EXPIRY</Text>
                <TextInput placeholder="MM/YY" placeholderTextColor={COLORS.inkFaint} style={styles.input} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[TYPE.caption, { color: COLORS.inkFaint }]}>CVC</Text>
                <TextInput placeholder="•••" placeholderTextColor={COLORS.inkFaint} style={styles.input} />
              </View>
            </View>
          </Card>
        ) : null}

        <Card style={{ marginTop: SPACING.lg }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: COLORS.inkSoft, fontSize: 13 }}>Total</Text>
            <Text style={{ color: COLORS.ink, fontSize: 22, fontWeight: '700' }}>${cartTotal().toFixed(2)}</Text>
          </View>
        </Card>
      </ScrollView>
      <View style={styles.bottomBar}>
        <PrimaryButton title="Place order" onPress={place} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border },
  methodCard: { width: '48%', padding: 16, borderRadius: RADIUS.lg, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, alignItems: 'flex-start' },
  methodActive: { backgroundColor: COLORS.ink, borderColor: COLORS.ink },
  input: { backgroundColor: COLORS.bgAlt, borderRadius: RADIUS.md, paddingHorizontal: 14, height: 44, color: COLORS.ink, fontSize: 14, marginTop: 4 },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, paddingBottom: SPACING.xl, backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border },
});
