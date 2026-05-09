// src/screens/ConfirmationScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPE } from '../theme';
import { PrimaryButton, Card } from '../components/UI';
import { useApp } from '../state/AppState';

const STAGES = ['Order placed', 'Preparing', 'Order is ready'];

export default function ConfirmationScreen({ route, navigation }) {
  const { orderId } = route.params || {};
  const { cafe, orders } = useApp();
  const order = orders.find((o) => o.id === orderId) || orders[0];
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1500);
    const t2 = setTimeout(() => setStage(2), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: SPACING.xl, paddingBottom: 140 }}>
        <View style={{ alignItems: 'center', paddingVertical: SPACING.xl }}>
          <View style={styles.successOrb}>
            <Ionicons name="checkmark" size={42} color="#fff" />
          </View>
          <Text style={[TYPE.title, { color: COLORS.ink, marginTop: SPACING.lg, textAlign: 'center' }]}>Thank you for your order!</Text>
          <Text style={{ color: COLORS.inkSoft, fontSize: 14, marginTop: 6, textAlign: 'center' }}>Your order is on the way.</Text>
        </View>

        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: COLORS.inkSoft, fontSize: 12 }}>Order number</Text>
            <Text style={{ color: COLORS.ink, fontWeight: '700', fontSize: 18 }}>{order?.id || 'CB-83'}</Text>
          </View>
          <View style={{ height: 1, backgroundColor: COLORS.divider, marginVertical: 14 }} />
          <Row label="Pick-up time" value="9:00 AM" />
          <Row label="Pick-up location" value={cafe.name} multiline />
        </Card>

        <Text style={[TYPE.heading, { color: COLORS.ink, marginTop: SPACING.lg, marginBottom: 10 }]}>Order tracking</Text>
        <Card>
          {STAGES.map((label, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 8 }}>
              <View style={[styles.dot, { backgroundColor: i <= stage ? COLORS.primary : COLORS.bgAlt, borderColor: i <= stage ? COLORS.primary : COLORS.border }]}>
                {i <= stage ? <Ionicons name="checkmark" size={12} color="#fff" /> : null}
              </View>
              {i < STAGES.length - 1 ? <View style={[styles.line, { backgroundColor: i < stage ? COLORS.primary : COLORS.border }]} /> : null}
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ color: i <= stage ? COLORS.ink : COLORS.inkFaint, fontWeight: i === stage ? '700' : '500', fontSize: 14 }}>{label}</Text>
                {i === stage ? <Text style={{ color: COLORS.inkSoft, fontSize: 12, marginTop: 2 }}>In progress…</Text> : null}
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
      <View style={styles.bottomBar}>
        <PrimaryButton title="Back to home" onPress={() => navigation.popToTop()} />
      </View>
    </SafeAreaView>
  );
}

function Row({ label, value, multiline }) {
  return (
    <View style={{ flexDirection: multiline ? 'column' : 'row', justifyContent: 'space-between', marginVertical: 5 }}>
      <Text style={{ color: COLORS.inkSoft, fontSize: 13 }}>{label}</Text>
      <Text style={{ color: COLORS.ink, fontWeight: '600', fontSize: 13, textAlign: multiline ? 'left' : 'right', marginTop: multiline ? 4 : 0 }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  successOrb: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.success, alignItems: 'center', justifyContent: 'center' },
  dot: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  line: { position: 'absolute', left: 10, top: 22, width: 2, height: 30 },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, paddingBottom: SPACING.xl, backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border },
});
