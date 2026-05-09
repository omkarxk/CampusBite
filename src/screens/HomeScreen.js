// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPE, SHADOWS } from '../theme';
import { Card, Section, Tag, Logo } from '../components/UI';
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
        {/* CampusBite logo header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg }}>
          <Logo />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pressable style={styles.iconBtn}>
              <Ionicons name="search" size={20} color={COLORS.ink} />
            </Pressable>
            <Pressable style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={20} color={COLORS.ink} />
              <View style={styles.badge}><Text style={{ color: '#fff', fontSize: 9, fontWeight: '700' }}>2</Text></View>
            </Pressable>
          </View>
        </View>

        {/* Greeting */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={[TYPE.title, { color: COLORS.ink }]}>Good morning, <Text style={{ color: COLORS.primary }}>{user.name.split(' ')[0]}.</Text></Text>
            <Text style={{ color: COLORS.inkSoft, fontSize: 13, marginTop: 2 }}>Lecture starts in 47 min. The usual?</Text>
          </View>
        </View>

        {/* Location picker */}
        <Pressable onPress={() => navigation.navigate('CafePicker')} style={styles.locationRow}>
          <View style={styles.locationIcon}><Ionicons name="location" size={16} color={COLORS.primary} /></View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={{ color: COLORS.inkFaint, fontSize: 11, fontWeight: '600', letterSpacing: 0.5 }}>PICKING UP FROM</Text>
            <Text style={{ color: COLORS.ink, fontWeight: '700', fontSize: 14, marginTop: 1 }}>{cafe.name} · 0.1 mi</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.inkFaint} />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Menu')} style={styles.banner}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 6 }}>BUY ONE, GET ONE</Text>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800', letterSpacing: -0.5, lineHeight: 26 }}>Half off your{'\n'}second coffee.</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 }}>
              <View style={styles.codePill}><Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>Code · BOGO50</Text></View>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Ends Fri 11pm</Text>
            </View>
          </View>
          <View style={styles.bannerOrb}>
            <Ionicons name="cafe" size={36} color="#fff" />
          </View>
        </Pressable>

        {/* Quick action cards */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: SPACING.lg }}>
          <Card style={{ flex: 1, padding: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={[styles.actionIcon, { backgroundColor: '#FFE8E4' }]}><Ionicons name="people" size={18} color={COLORS.primary} /></View>
              <Ionicons name="chevron-forward" size={16} color={COLORS.inkFaint} />
            </View>
            <Text style={{ color: COLORS.ink, fontWeight: '700', fontSize: 14, marginTop: 10 }}>Roommate cart</Text>
            <Text style={{ color: COLORS.inkSoft, fontSize: 12, marginTop: 2 }}>3 friends online</Text>
          </Card>
          <Card style={{ flex: 1, padding: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={[styles.actionIcon, { backgroundColor: '#E4F4EE' }]}><Ionicons name="tablet-portrait-outline" size={18} color="#3F8C5C" /></View>
              <Ionicons name="chevron-forward" size={16} color={COLORS.inkFaint} />
            </View>
            <Text style={{ color: COLORS.ink, fontWeight: '700', fontSize: 14, marginTop: 10 }}>Study session</Text>
            <Text style={{ color: COLORS.inkSoft, fontSize: 12, marginTop: 2 }}>Schedule for 8pm</Text>
          </Card>
        </View>

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
  iconBtn: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.card,
    alignItems: 'center', justifyContent: 'center', ...SHADOWS.card,
  },
  badge: {
    position: 'absolute', top: 4, right: 4, width: 14, height: 14, borderRadius: 7,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center',
  },
  locationRow: {
    flexDirection: 'row', alignItems: 'center', marginTop: SPACING.md, marginBottom: SPACING.lg,
    backgroundColor: COLORS.card, borderRadius: RADIUS.lg, padding: 14,
    borderWidth: 1, borderColor: COLORS.border, ...SHADOWS.card,
  },
  locationIcon: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primarySoft,
    alignItems: 'center', justifyContent: 'center',
  },
  banner: {
    marginBottom: SPACING.lg, borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primary, padding: 20, flexDirection: 'row', alignItems: 'center',
  },
  codePill: {
    backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: RADIUS.pill,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  bannerOrb: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center', justifyContent: 'center',
  },
  actionIcon: {
    width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  addBtn: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.ink,
    alignItems: 'center', justifyContent: 'center',
  },
});
