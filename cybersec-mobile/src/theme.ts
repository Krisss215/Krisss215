export const C = {
  bg:      '#030712',
  surface: '#0f172a',
  card:    '#111827',
  border:  '#1f2937',
  border2: '#374151',
  text:    '#f9fafb',
  textSub: '#9ca3af',
  textMut: '#4b5563',
  indigo:  '#6366f1',
  purple:  '#a855f7',
  cyan:    '#06b6d4',
  green:   '#22c55e',
  red:     '#ef4444',
  orange:  '#f97316',
  yellow:  '#eab308',
  blue:    '#3b82f6',
} as const;

export const S = {
  card: {
    backgroundColor: '#111827',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
};
