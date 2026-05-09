// src/components/UI.js — reusable primitives
import React from 'react';
import { Pressable, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPE, SHADOWS } from '../theme';

const LOGO_SIZES = {
  sm: { box: 22, icon: 12, text: 14, gap: 7,  radius: 6 },
  md: { box: 28, icon: 14, text: 17, gap: 7,  radius: 7 },
  lg: { box: 44, icon: 22, text: 26, gap: 10, radius: 11 },
};

export function Logo({ size = 'md' }) {
  const dim = LOGO_SIZES[size] || LOGO_SIZES.md;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{
        width: dim.box, height: dim.box, borderRadius: dim.radius,
        backgroundColor: COLORS.primary, marginRight: dim.gap,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <Ionicons name="restaurant" size={dim.icon} color="#fff" />
      </View>
      <Text style={{ fontWeight: '700', letterSpacing: -0.3, fontSize: dim.text }}>
        <Text style={{ color: COLORS.ink }}>Campus</Text>
        <Text style={{ color: COLORS.primary }}>Bite</Text>
      </Text>
    </View>
  );
}

export function PrimaryButton({ title, onPress, disabled, loading, style }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.btn,
        disabled && { opacity: 0.4 },
        pressed && { transform: [{ scale: 0.97 }], opacity: 0.92 },
        style,
      ]}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>{title}</Text>}
    </Pressable>
  );
}

export function SecondaryButton({ title, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.secBtn,
        pressed && { transform: [{ scale: 0.97 }], opacity: 0.85 },
        style,
      ]}
    >
      <Text style={styles.secBtnText}>{title}</Text>
    </Pressable>
  );
}

export function Chip({ label, active, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        active && styles.chipActive,
        pressed && { transform: [{ scale: 0.94 }] },
        style,
      ]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

export function Card({ children, style, onPress }) {
  const Inner = onPress ? Pressable : View;
  return (
    <Inner
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && onPress && { transform: [{ scale: 0.985 }] }, style]}
    >
      {children}
    </Inner>
  );
}

export function Section({ title, action, onAction, children, style }) {
  return (
    <View style={[{ marginBottom: SPACING.lg }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACING.md }}>
        <Text style={[TYPE.title, { color: COLORS.ink }]}>{title}</Text>
        {action ? (
          <Pressable onPress={onAction}>
            <Text style={{ color: COLORS.primary, fontWeight: '600', fontSize: 14 }}>{action}</Text>
          </Pressable>
        ) : null}
      </View>
      {children}
    </View>
  );
}

export function Divider() { return <View style={{ height: 1, backgroundColor: COLORS.divider, marginVertical: SPACING.md }} />; }

export function Tag({ label, tone = 'primary' }) {
  const palette = {
    primary: { bg: COLORS.primarySoft, fg: COLORS.primary },
    success: { bg: 'rgba(63, 140, 92, 0.12)', fg: COLORS.success },
    warn:    { bg: 'rgba(232, 165, 64, 0.16)', fg: COLORS.warn },
    ink:     { bg: COLORS.bgAlt, fg: COLORS.ink },
  }[tone];
  return (
    <View style={{ backgroundColor: palette.bg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start' }}>
      <Text style={{ color: palette.fg, fontSize: 11, fontWeight: '600', letterSpacing: 0.3 }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  secBtn: {
    borderRadius: RADIUS.pill,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  secBtnText: { color: COLORS.ink, fontSize: 16, fontWeight: '600' },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: { backgroundColor: COLORS.ink, borderColor: COLORS.ink },
  chipText: { color: COLORS.ink, fontSize: 13, fontWeight: '500' },
  chipTextActive: { color: '#fff' },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.card,
  },
});
