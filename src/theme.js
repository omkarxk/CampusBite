// src/theme.js — color palette, spacing, type
export const COLORS = {
  primary: '#FF5436',
  primarySoft: '#FFE6DF',
  ink: '#1A1614',
  inkSoft: '#5A524C',
  inkFaint: '#9A928A',
  bg: '#FBF7F0',
  bgAlt: '#F4EEE3',
  card: '#FFFFFF',
  border: 'rgba(26, 22, 20, 0.08)',
  divider: 'rgba(26, 22, 20, 0.06)',
  success: '#3F8C5C',
  warn: '#E8A540',
};

export const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

export const RADIUS = { sm: 8, md: 14, lg: 20, xl: 28, pill: 999 };

export const TYPE = {
  display: { fontSize: 32, fontWeight: '700', letterSpacing: -0.5 },
  title: { fontSize: 22, fontWeight: '700', letterSpacing: -0.3 },
  heading: { fontSize: 17, fontWeight: '600' },
  body: { fontSize: 15, fontWeight: '400' },
  label: { fontSize: 13, fontWeight: '500' },
  caption: { fontSize: 11, fontWeight: '500', letterSpacing: 0.4 },
};

export const SHADOWS = {
  card: {
    shadowColor: '#1A1614',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  fab: {
    shadowColor: '#1A1614',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },
};
