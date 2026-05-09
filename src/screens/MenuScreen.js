// src/screens/MenuScreen.js
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPE } from '../theme';
import { Card, Chip } from '../components/UI';
import { ItemImage } from '../components/ItemImage';
import { CATEGORIES, MENU } from '../data';
import { useApp } from '../state/AppState';

export default function MenuScreen({ navigation }) {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const { addToCart } = useApp();

  const items = useMemo(() => {
    return MENU.filter((m) => (cat === 'all' || m.cat === cat) && (q === '' || m.name.toLowerCase().includes(q.toLowerCase())));
  }, [cat, q]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={{ paddingHorizontal: SPACING.xl, paddingTop: SPACING.md }}>
        <Text style={[TYPE.title, { color: COLORS.ink }]}>Menu</Text>
        <View style={styles.search}>
          <Ionicons name="search" size={18} color={COLORS.inkFaint} />
          <TextInput value={q} onChangeText={setQ} placeholder="Search the menu" placeholderTextColor={COLORS.inkFaint} style={{ flex: 1, marginLeft: 10, color: COLORS.ink, fontSize: 14 }} />
        </View>
        <Text style={[TYPE.caption, { color: COLORS.inkFaint, marginTop: SPACING.lg, marginBottom: 8 }]}>CATEGORIES</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((c) => (
            <Chip key={c.id} label={c.label} active={cat === c.id} onPress={() => setCat(c.id)} style={{ marginRight: 8 }} />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        numColumns={2}
        columnWrapperStyle={{ paddingHorizontal: SPACING.xl, gap: 12 }}
        contentContainerStyle={{ paddingTop: SPACING.lg, paddingBottom: SPACING.xxl, gap: 12 }}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('ItemDetail', { itemId: item.id })} style={{ flex: 1, padding: 12 }}>
            <ItemImage cat={item.cat} size={140} label={item.name} />
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: COLORS.ink, fontWeight: '700', fontSize: 14 }} numberOfLines={1}>{item.name}</Text>
                <Text style={{ color: COLORS.inkFaint, fontSize: 11, marginTop: 2 }}>${item.price.toFixed(2)}</Text>
              </View>
              <Pressable onPress={() => addToCart(item, 1)} style={styles.addBtn}>
                <Ionicons name="add" size={18} color="#fff" />
              </Pressable>
            </View>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  search: {
    flexDirection: 'row', alignItems: 'center', marginTop: SPACING.md, height: 44,
    paddingHorizontal: 14, borderRadius: RADIUS.pill, backgroundColor: COLORS.card,
    borderWidth: 1, borderColor: COLORS.border,
  },
  addBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: COLORS.ink, alignItems: 'center', justifyContent: 'center' },
});
