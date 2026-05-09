// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPE } from '../theme';
import { Card } from '../components/UI';
import { useApp } from '../state/AppState';

const ROWS = [
  { id: 'plan',     label: 'Meal plan & dining dollars', icon: 'card-outline' },
  { id: 'schedule', label: 'Class schedule integration', icon: 'calendar-outline' },
  { id: 'friends',  label: 'Friends & roommates',        icon: 'people-outline' },
  { id: 'streaks',  label: 'Streaks & leaderboards',     icon: 'flame-outline' },
  { id: 'study',    label: 'Study sessions',             icon: 'book-outline' },
  { id: 'addr',     label: 'Saved addresses',            icon: 'location-outline' },
  { id: 'notif',    label: 'Notifications',              icon: 'notifications-outline' },
  { id: 'help',     label: 'Help & support',             icon: 'help-circle-outline' },
];

export default function ProfileScreen() {
  const { user } = useApp();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: SPACING.xl, paddingBottom: SPACING.xxl }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.avatar}>
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 22 }}>{user.name.split(' ').map((n) => n[0]).join('')}</Text>
          </View>
          <View style={{ marginLeft: 14, flex: 1 }}>
            <Text style={[TYPE.heading, { color: COLORS.ink }]}>{user.name}</Text>
            <Text style={{ color: COLORS.inkSoft, fontSize: 13 }}>{user.school}</Text>
            <Text style={{ color: COLORS.inkFaint, fontSize: 12 }}>{user.email}</Text>
          </View>
          <Ionicons name="create-outline" size={20} color={COLORS.inkSoft} />
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: SPACING.lg }}>
          <Card style={{ flex: 1, padding: 14 }}>
            <Text style={{ color: COLORS.inkSoft, fontSize: 11 }}>Dining $</Text>
            <Text style={{ color: COLORS.ink, fontSize: 22, fontWeight: '700', marginTop: 4 }}>${user.plan.dollars.toFixed(2)}</Text>
          </Card>
          <Card style={{ flex: 1, padding: 14 }}>
            <Text style={{ color: COLORS.inkSoft, fontSize: 11 }}>Swipes</Text>
            <Text style={{ color: COLORS.ink, fontSize: 22, fontWeight: '700', marginTop: 4 }}>{user.plan.swipes}</Text>
          </Card>
          <Card style={{ flex: 1, padding: 14 }}>
            <Text style={{ color: COLORS.inkSoft, fontSize: 11 }}>Streak</Text>
            <Text style={{ color: COLORS.ink, fontSize: 22, fontWeight: '700', marginTop: 4 }}>{user.streak}🔥</Text>
          </Card>
        </View>

        <View style={{ marginTop: SPACING.lg, backgroundColor: COLORS.card, borderRadius: RADIUS.lg, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border }}>
          {ROWS.map((r, i) => (
            <Pressable key={r.id} style={({ pressed }) => [styles.row, i < ROWS.length - 1 && { borderBottomWidth: 1, borderBottomColor: COLORS.divider }, pressed && { backgroundColor: COLORS.bgAlt }]}>
              <Ionicons name={r.icon} size={20} color={COLORS.ink} />
              <Text style={{ color: COLORS.ink, fontSize: 14, fontWeight: '500', marginLeft: 14, flex: 1 }}>{r.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.inkFaint} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
});
