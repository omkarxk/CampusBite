// src/screens/CafePickerScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPE } from '../theme';
import { PrimaryButton, SecondaryButton, Card } from '../components/UI';
import { CAFES } from '../data';
import { useApp } from '../state/AppState';

export default function CafePickerScreen({ navigation }) {
  const { cafe, setCafe } = useApp();
  const [sel, setSel] = useState(cafe);
  const [tab, setTab] = useState('list');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Text style={[TYPE.heading, { color: COLORS.ink }]}>Choose your cafe</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}><Ionicons name="close" size={22} color={COLORS.ink} /></Pressable>
      </View>

      <View style={{ paddingHorizontal: SPACING.xl }}>
        <Text style={{ color: COLORS.inkSoft, fontSize: 13, marginTop: 4 }}>Search by city</Text>
        <View style={styles.search}>
          <Ionicons name="location-outline" size={18} color={COLORS.inkFaint} />
          <TextInput placeholder="City" placeholderTextColor={COLORS.inkFaint} style={{ flex: 1, marginLeft: 10, color: COLORS.ink, fontSize: 14 }} />
        </View>
        <Text style={{ color: COLORS.inkSoft, fontSize: 13, marginTop: SPACING.lg }}>Cafes near me</Text>
        <View style={{ flexDirection: 'row', marginTop: 8, backgroundColor: COLORS.bgAlt, borderRadius: RADIUS.pill, padding: 4 }}>
          {['map', 'list'].map((t) => (
            <Pressable key={t} onPress={() => setTab(t)} style={[styles.tab, tab === t && styles.tabActive]}>
              <Text style={{ color: tab === t ? COLORS.ink : COLORS.inkSoft, fontWeight: '600', fontSize: 13, textTransform: 'capitalize' }}>{t}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: SPACING.xl, paddingTop: SPACING.lg, paddingBottom: 140 }}>
        {tab === 'map' ? (
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map" size={48} color={COLORS.inkFaint} />
            <Text style={{ color: COLORS.inkSoft, fontSize: 13, marginTop: 8 }}>Map view (placeholder)</Text>
          </View>
        ) : (
          <View style={{ gap: 10 }}>
            {CAFES.map((c) => (
              <Card key={c.id} onPress={() => setSel(c)} style={{ flexDirection: 'row', alignItems: 'center', padding: 14 }}>
                <View style={styles.cafeIcon}><Ionicons name="cafe" size={20} color={COLORS.primary} /></View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ color: COLORS.ink, fontWeight: '700', fontSize: 14 }}>CampusBite · {c.name}</Text>
                  <Text style={{ color: COLORS.inkSoft, fontSize: 12, marginTop: 2 }}>{c.addr}</Text>
                  <Text style={{ color: COLORS.inkFaint, fontSize: 11, marginTop: 2 }}>Open · {c.hours} · {c.dist}</Text>
                </View>
                <View style={[styles.radio, sel.id === c.id && { borderColor: COLORS.primary }]}>
                  {sel.id === c.id ? <View style={styles.radioDot} /> : null}
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={{ color: COLORS.inkSoft, fontSize: 12, marginBottom: 8 }}>Chosen cafe · <Text style={{ color: COLORS.ink, fontWeight: '600' }}>{sel.name}</Text></Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <SecondaryButton title="Cancel" onPress={() => navigation.goBack()} style={{ flex: 1 }} />
          <PrimaryButton title="Save" onPress={() => { setCafe(sel); navigation.goBack(); }} style={{ flex: 1 }} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border },
  search: { flexDirection: 'row', alignItems: 'center', marginTop: 6, height: 48, paddingHorizontal: 14, borderRadius: RADIUS.pill, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border },
  tab: { flex: 1, paddingVertical: 8, borderRadius: RADIUS.pill, alignItems: 'center' },
  tabActive: { backgroundColor: COLORS.card },
  mapPlaceholder: { height: 280, borderRadius: RADIUS.lg, backgroundColor: COLORS.bgAlt, alignItems: 'center', justifyContent: 'center' },
  cafeIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primarySoft, alignItems: 'center', justifyContent: 'center' },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, paddingBottom: SPACING.xl, backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border },
});
