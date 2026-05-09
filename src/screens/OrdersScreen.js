// src/screens/OrdersScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPE } from '../theme';
import { Card, Tag } from '../components/UI';
import { useApp } from '../state/AppState';
import { SAMPLE_ORDERS } from '../data';

export default function OrdersScreen() {
  const { orders } = useApp();
  const all = [...orders, ...SAMPLE_ORDERS];
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: SPACING.xl, paddingBottom: SPACING.xxl }}>
        <Text style={[TYPE.title, { color: COLORS.ink }]}>Order history</Text>
        <View style={{ gap: 10, marginTop: SPACING.lg }}>
          {all.map((o, i) => (
            <Card key={o.id + i}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: COLORS.ink, fontWeight: '700', fontSize: 15 }}>{o.id}</Text>
                <Tag label={o.status} tone={o.status.includes('Picked') ? 'success' : (o.status.includes('Prep') ? 'warn' : 'primary')} />
              </View>
              <Text style={{ color: COLORS.inkSoft, fontSize: 12, marginTop: 4 }}>{o.date} · {o.items.join(', ')}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                <Text style={{ color: COLORS.inkFaint, fontSize: 12 }}>{o.items.length} items</Text>
                <Text style={{ color: COLORS.ink, fontWeight: '700' }}>${o.total.toFixed(2)}</Text>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: COLORS.bg } });
