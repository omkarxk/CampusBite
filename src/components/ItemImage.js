// src/components/ItemImage.js — placeholder visual for menu items (no real images shipped)
import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, RADIUS } from '../theme';

const TONES = {
  coffee: ['#C9A57B', '#7E5836'],
  drinks: ['#A6C9A7', '#3F8C5C'],
  meals:  ['#E8B07A', '#B26731'],
  snacks: ['#F0CB7A', '#C28A1F'],
  'late-night': ['#8C7AC9', '#3E2C7E'],
};

export function ItemImage({ cat = 'coffee', size = 72, label }) {
  const [a, b] = TONES[cat] || TONES.coffee;
  return (
    <View style={{
      width: size, height: size, borderRadius: RADIUS.md, overflow: 'hidden',
      backgroundColor: a, alignItems: 'center', justifyContent: 'center',
    }}>
      <View style={{
        position: 'absolute', inset: 0, top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: b, opacity: 0.25,
      }} />
      <Text style={{ color: '#fff', fontWeight: '700', fontSize: size * 0.36, letterSpacing: -0.5 }}>
        {(label || '').slice(0, 1).toUpperCase()}
      </Text>
    </View>
  );
}
