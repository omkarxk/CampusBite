// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, SHADOWS } from '../theme';
import { Logo } from '../components/UI';
import { useApp } from '../state/AppState';

const LEADERBOARD = [
  { rank: 1, name: 'Sam K.',     initials: 'S', color: '#4CAF50', streak: 21, points: 3120, isMe: false },
  { rank: 2, name: 'Maya P.',    initials: 'M', color: '#FF9800', streak: 14, points: 2480, isMe: false },
  { rank: 3, name: 'You (Alex)', initials: 'A', color: COLORS.primary, streak: 12, points: 2450, isMe: true },
  { rank: 4, name: 'Jay R.',     initials: 'J', color: '#2196F3', streak: 9,  points: 1860, isMe: false },
  { rank: 5, name: 'Lex W.',     initials: 'L', color: '#9C27B0', streak: 5,  points: 980,  isMe: false },
];

const CAMPUS_ROWS = [
  { id: 'schedule', icon: 'tablet-portrait-outline', label: 'Class schedule',          sub: '5 classes · auto-order before 9am' },
  { id: 'saved',    icon: 'heart-outline',            label: 'Saved cafes & favorites', sub: '8 places · 12 items' },
  { id: 'roommate', icon: 'people-outline',           label: 'Roommate group',          sub: 'Maya, Jay, Sam' },
  { id: 'meal',     icon: 'card-outline',             label: 'Meal plan',               sub: '$284.50 · 14 swipes left' },
];

export default function ProfileScreen() {
  const { user } = useApp();
  const initials = user.name.split(' ').map((n) => n[0]).join('');

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll}>

        {/* ── Top bar ── */}
        <View style={s.topBar}>
          <Logo />
          <Pressable style={s.iconBtn}>
            <Ionicons name="settings-outline" size={20} color={COLORS.ink} />
          </Pressable>
        </View>

        {/* ── Page title ── */}
        <Text style={s.pageTitle}>Profile</Text>

        {/* ══ USER CARD ══ */}
        <View style={s.card}>
          {/* Avatar + info row */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Avatar */}
            <View>
              <View style={s.avatar}>
                <Text style={s.avatarText}>{initials}</Text>
              </View>
              <View style={s.verifiedDot}>
                <Ionicons name="checkmark" size={10} color="#fff" />
              </View>
            </View>

            {/* Name / email / streak */}
            <View style={{ marginLeft: 14, flex: 1 }}>
              <Text style={s.userName}>{user.name}</Text>
              <Text style={s.userSub}>alex@university.edu · Class of 2027</Text>
              <View style={s.streakPill}>
                <Text style={{ fontSize: 13 }}>🔥</Text>
                <Text style={s.streakText}> {user.streak}-day streak · Gold tier</Text>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={s.hr} />

          {/* Stats */}
          <View style={{ flexDirection: 'row' }}>
            {[
              { label: 'Points', value: '2,450' },
              { label: 'Orders', value: '38' },
              { label: 'Saved',  value: '$420' },
            ].map((stat, i, arr) => (
              <View
                key={stat.label}
                style={[
                  s.statCell,
                  i < arr.length - 1 && s.statCellBorder,
                ]}
              >
                <Text style={s.statValue}>{stat.value}</Text>
                <Text style={s.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ══ LEADERBOARD ══ */}
        {/* Section header — outside the card */}
        <View style={s.sectionHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={{ fontSize: 18 }}>🏆</Text>
            <Text style={s.sectionTitle}>Leaderboard</Text>
          </View>
          <Text style={s.sectionMeta}>This week</Text>
        </View>

        {/* Leaderboard card */}
        <View style={s.card}>
          {LEADERBOARD.map((entry, i) => (
            <View key={entry.rank}>
              {i > 0 && <View style={s.rowDivider} />}
              <View style={[s.leaderRow, entry.isMe && s.leaderRowMe]}>
                <Text style={[s.rankNum, entry.rank === 1 && { color: COLORS.primary }]}>
                  {entry.rank}
                </Text>
                <View style={[s.leaderAvatar, { backgroundColor: entry.color }]}>
                  <Text style={s.leaderInitial}>{entry.initials}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={s.leaderName}>{entry.name}</Text>
                  <Text style={s.leaderStreak}>🔥 {entry.streak}-day streak</Text>
                </View>
                <Text style={[s.leaderPoints, entry.rank === 1 && { color: COLORS.primary }]}>
                  {entry.points.toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* ══ CAMPUS ══ */}
        <Text style={s.campusLabel}>CAMPUS</Text>

        {/* Campus card */}
        <View style={[s.card, { padding: 0, overflow: 'hidden' }]}>
          {CAMPUS_ROWS.map((row, i) => (
            <Pressable
              key={row.id}
              style={({ pressed }) => [
                s.campusRow,
                i < CAMPUS_ROWS.length - 1 && s.campusRowBorder,
                pressed && { backgroundColor: COLORS.bgAlt },
              ]}
            >
              <View style={s.campusIcon}>
                <Ionicons name={row.icon} size={18} color={COLORS.inkSoft} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={s.campusRowLabel}>{row.label}</Text>
                <Text style={s.campusRowSub}>{row.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.inkFaint} />
            </Pressable>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.xl, paddingBottom: 48 },

  /* Top bar */
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg },
  iconBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: COLORS.card,
    alignItems: 'center', justifyContent: 'center',
    ...SHADOWS.card,
  },

  /* Page title */
  pageTitle: { fontSize: 34, fontWeight: '800', color: COLORS.ink, letterSpacing: -0.5, marginBottom: 20 },

  /* Shared card shell */
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: 20,
    ...SHADOWS.card,
  },

  /* Avatar */
  avatar: {
    width: 68, height: 68, borderRadius: 34,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 26 },
  verifiedDot: {
    position: 'absolute', bottom: 0, right: 0,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#3F8C5C',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2.5, borderColor: COLORS.card,
  },

  /* User info */
  userName: { color: COLORS.ink, fontWeight: '800', fontSize: 18 },
  userSub:  { color: COLORS.inkSoft, fontSize: 13, marginTop: 2 },
  streakPill: {
    flexDirection: 'row', alignItems: 'center', marginTop: 8,
    backgroundColor: '#FFE8E4', borderRadius: RADIUS.pill,
    paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start',
  },
  streakText: { color: COLORS.primary, fontWeight: '700', fontSize: 12 },

  /* Horizontal rule */
  hr: { height: 1, backgroundColor: COLORS.divider, marginVertical: 16 },

  /* Stats */
  statCell: { flex: 1, alignItems: 'center', paddingVertical: 4 },
  statCellBorder: { borderRightWidth: 1, borderRightColor: COLORS.divider },
  statValue: { color: COLORS.ink, fontWeight: '800', fontSize: 24 },
  statLabel: { color: COLORS.inkSoft, fontSize: 12, marginTop: 2 },

  /* Leaderboard section header */
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
  },
  sectionTitle: { color: COLORS.ink, fontWeight: '700', fontSize: 17 },
  sectionMeta:  { color: COLORS.inkSoft, fontSize: 13 },

  /* Leaderboard rows */
  rowDivider: { height: 1, backgroundColor: COLORS.divider },
  leaderRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, paddingHorizontal: 4,
  },
  leaderRowMe: {
    backgroundColor: '#FFF0EE',
    marginHorizontal: -SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  rankNum: { width: 22, color: COLORS.inkFaint, fontWeight: '700', fontSize: 15 },
  leaderAvatar: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  leaderInitial: { color: '#fff', fontWeight: '700', fontSize: 15 },
  leaderName:    { color: COLORS.ink, fontWeight: '600', fontSize: 14 },
  leaderStreak:  { color: COLORS.inkSoft, fontSize: 12, marginTop: 1 },
  leaderPoints:  { color: COLORS.ink, fontWeight: '800', fontSize: 16 },

  /* Campus */
  campusLabel: {
    color: COLORS.inkFaint, fontSize: 11, fontWeight: '700',
    letterSpacing: 1.2, marginBottom: 10,
  },
  campusRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: SPACING.lg, paddingVertical: 14,
  },
  campusRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.divider },
  campusIcon: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: COLORS.bgAlt,
    alignItems: 'center', justifyContent: 'center',
  },
  campusRowLabel: { color: COLORS.ink, fontWeight: '600', fontSize: 15 },
  campusRowSub:   { color: COLORS.inkSoft, fontSize: 12, marginTop: 2 },

});

