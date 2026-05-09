// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPE, SHADOWS } from '../theme';
import { Card, Section, Tag } from '../components/UI';
import { ItemImage } from '../components/ItemImage';
import { MENU } from '../data';
import { useApp } from '../state/AppState';

export default function HomeScreen({ navigation }) {
  const { cafe, user } = useApp();
  const specials = MENU.filter((m) => ['frappe', 'latte', 'cold-brew'].includes(m.id));
  const popular = MENU.filter((m) => ['burger', 'bowl', 'pizza', 'matcha'].includes(m.id));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: SPACING.xl, paddingBottom: SPACING.xxl }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={{ color: COLORS.inkSoft, fontSize: 13 }}>Good morning,</Text>
            <Text style={[TYPE.title, { color: COLORS.ink, marginTop: 2 }]}>{user.name.split(' ')[0]} 👋</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('CafePicker')} style={styles.cafePill}>
            <Ionicons name="location" size={14} color={COLORS.primary} />
            <Text style={{ marginLeft: 6, color: COLORS.ink, fontSize: 12, fontWeight: '600' }}>{cafe.name}</Text>
            <Ionicons name="chevron-down" size={14} color={COLORS.inkSoft} style={{ marginLeft: 4 }} />
          </Pressable>
        </View>

        <View style={styles.search}>
          <Ionicons name="search" size={18} color={COLORS.inkFaint} />
          <TextInput placeholder="Search for food, coffee, snacks…" placeholderTextColor={COLORS.inkFaint} style={{ flex: 1, marginLeft: 10, color: COLORS.ink, fontSize: 14 }} />
        </View>

        <Pressable onPress={() => navigation.navigate('Menu')} style={styles.banner}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700', letterSpacing: -0.3 }}>Buy one, get one free!</Text>
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 4 }}>Daily special on iced drinks · Today only</Text>
          </View>
          <View style={styles.bannerOrb}>
            <Ionicons name="cafe" size={36} color="#fff" />
          </View>
        </Pressable>

        <Section title="Daily specials" action="See all" onAction={() => navigation.navigate('Menu')}>
          <FlatList
            data={specials}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(it) => it.id}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            renderItem={({ item }) => (
              <Card onPress={() => navigation.navigate('ItemDetail', { itemId: item.id })} style={{ width: 160, padding: 12 }}>
                <ItemImage cat={item.cat} size={136} label={item.name} />
                <Text style={{ marginTop: 10, color: COLORS.ink, fontWeight: '700', fontSize: 14 }} numberOfLines={1}>{item.name}</Text>
                <Text style={{ color: COLORS.inkSoft, fontSize: 11, marginTop: 2 }}>{item.time} · {item.kcal} kcal</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <Text style={{ color: COLORS.ink, fontWeight: '700' }}>${item.price.toFixed(2)}</Text>
                  <View style={styles.addBtn}><Ionicons name="add" size={16} color="#fff" /></View>
                </View>
              </Card>
            )}
          />
        </Section>

        <Section title="Popular at your campus">
          <View style={{ gap: 10 }}>
            {popular.map((item) => (
              <Card key={item.id} onPress={() => navigation.navigate('ItemDetail', { itemId: item.id })} style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
                <ItemImage cat={item.cat} size={56} label={item.name} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ color: COLORS.ink, fontWeight: '700', fontSize: 14 }}>{item.name}</Text>
                  <Text style={{ color: COLORS.inkSoft, fontSize: 12, marginTop: 2 }} numberOfLines={1}>{item.desc}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 8 }}>
                    <Text style={{ color: COLORS.ink, fontWeight: '700', fontSize: 13 }}>${item.price.toFixed(2)}</Text>
                    <Text style={{ color: COLORS.inkFaint, fontSize: 11 }}>· {item.time}</Text>
                  </View>
                </View>
                <View style={styles.addBtn}><Ionicons name="add" size={16} color="#fff" /></View>
              </Card>
            ))}
          </View>
        </Section>

        <Section title="Late-night menu">
          <Card style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1614' }}>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="moon" size={22} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Open till 2 AM</Text>
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 2 }}>Ramen, wings, nachos and more</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('Menu')}>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </Pressable>
          </Card>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  cafePill: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8,
    backgroundColor: COLORS.card, borderRadius: RADIUS.pill, ...SHADOWS.card,
  },
  search: {
    flexDirection: 'row', alignItems: 'center', marginTop: SPACING.lg, height: 48,
    paddingHorizontal: 16, borderRadius: RADIUS.pill, backgroundColor: COLORS.card,
    borderWidth: 1, borderColor: COLORS.border,
  },
  banner: {
    marginTop: SPACING.lg, marginBottom: SPACING.lg, height: 110, borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primary, padding: 16, flexDirection: 'row', alignItems: 'center',
  },
  bannerOrb: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center', justifyContent: 'center',
  },
  addBtn: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.ink,
    alignItems: 'center', justifyContent: 'center',
  },
});
