// src/screens/OnboardingScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPE } from '../theme';
import { PrimaryButton, SecondaryButton, Chip } from '../components/UI';

const SLIDES = [
  { title: 'All your campus food.', accent: 'One tap.', body: 'Coffee, meals, snacks, late-night — from every cafe on campus, delivered to wherever you study.', icon: 'cafe' },
  { title: 'Pay with your meal plan.', accent: 'Or split with friends.', body: 'Dining dollars, swipes, group carts, and bill splitting — built for how students actually eat.', icon: 'people' },
  { title: 'Built around your schedule.', accent: 'Order ahead.', body: 'We sync with your class calendar so your coffee is ready exactly when you need it.', icon: 'calendar' },
];

export default function OnboardingScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState('');

  if (signIn) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={{ padding: SPACING.xl, flexGrow: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xl }}>
            <Ionicons name="chevron-back" size={22} color={COLORS.ink} onPress={() => setSignIn(false)} />
            <Text style={{ marginLeft: 4, color: COLORS.ink, fontSize: 16, fontWeight: '500' }}>Back</Text>
          </View>
          <Text style={[TYPE.display, { color: COLORS.ink, marginBottom: SPACING.sm }]}>Sign in with your{'\n'}campus email.</Text>
          <Text style={{ color: COLORS.inkSoft, fontSize: 15, lineHeight: 22, marginBottom: SPACING.xl }}>
            We'll match you with your school's cafes and meal plan automatically.
          </Text>

          <Text style={[TYPE.caption, { color: COLORS.inkFaint, marginBottom: 8 }]}>CAMPUS EMAIL</Text>
          <View style={styles.input}>
            <Ionicons name="person-outline" size={18} color={COLORS.inkFaint} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@university.edu"
              placeholderTextColor={COLORS.inkFaint}
              style={{ flex: 1, marginLeft: 10, color: COLORS.ink, fontSize: 15 }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: SPACING.md, flexWrap: 'wrap' }}>
            {['@stanford.edu', '@nyu.edu', '@umich.edu'].map((d) => (
              <Chip key={d} label={d} onPress={() => setEmail((email.split('@')[0] || 'me') + d)} />
            ))}
          </View>
          <View style={{ flex: 1 }} />
          <PrimaryButton title="Send 4-digit code" onPress={() => navigation.replace('Main')} style={{ marginBottom: SPACING.md }} />
          <SecondaryButton title="Continue as guest" onPress={() => navigation.replace('Main')} />
          <Text style={{ color: COLORS.inkFaint, fontSize: 11, textAlign: 'center', marginTop: SPACING.md }}>
            By continuing you agree to our Terms and Privacy Policy.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const slide = SLIDES[step];
  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flex: 1, padding: SPACING.xl }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.logoMark}>
              <Ionicons name="restaurant" size={14} color="#fff" />
            </View>
            <Text style={{ marginLeft: 8, fontSize: 18, fontWeight: '700', color: COLORS.ink }}>
              Campus<Text style={{ color: COLORS.primary }}>Bite</Text>
            </Text>
          </View>
          <Text style={{ color: COLORS.inkSoft, fontSize: 15, fontWeight: '500' }} onPress={() => setSignIn(true)}>Skip</Text>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name={slide.icon} size={64} color="#fff" />
          </View>
          <View style={styles.stepBadge}>
            <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>0{step + 1} / 0{SLIDES.length}</Text>
          </View>
        </View>

        <Text style={[TYPE.display, { color: COLORS.ink, marginTop: SPACING.lg }]}>{slide.title}</Text>
        <Text style={[TYPE.display, { color: COLORS.primary, marginBottom: SPACING.md }]}>{slide.accent}</Text>
        <Text style={{ color: COLORS.inkSoft, fontSize: 15, lineHeight: 22 }}>{slide.body}</Text>

        <View style={{ flexDirection: 'row', gap: 6, marginTop: SPACING.xl }}>
          {SLIDES.map((_, i) => (
            <View key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              backgroundColor: i === step ? COLORS.primary : COLORS.border,
            }} />
          ))}
        </View>

        <View style={{ flex: 1 }} />
        <PrimaryButton
          title={step < SLIDES.length - 1 ? 'Continue' : 'Get started'}
          onPress={() => (step < SLIDES.length - 1 ? setStep(step + 1) : setSignIn(true))}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  logoMark: { width: 28, height: 28, borderRadius: 8, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  hero: {
    marginTop: SPACING.xl, height: 360, borderRadius: RADIUS.xl,
    backgroundColor: '#C9A57B', overflow: 'hidden', alignItems: 'center', justifyContent: 'center',
  },
  heroIcon: {
    width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  stepBadge: {
    position: 'absolute', top: 16, right: 16, paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.4)',
  },
  input: {
    flexDirection: 'row', alignItems: 'center', height: 52, borderRadius: RADIUS.pill,
    borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 16, backgroundColor: COLORS.card,
  },
});
