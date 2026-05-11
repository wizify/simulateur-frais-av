/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        of: {
          blue: '#3340FA',
          'blue-hover': '#4450FA',
          'blue-pressed': '#2A36E0',
          'blue-50': '#F0F4FF',
          'blue-100': '#E8E9FF',
          'blue-200': '#D6D9FE',
          ink: '#1A1A1A',
          'ink-2': '#555555',
          'ink-3': '#666666',
          mute: '#999999',
          'mute-2': '#CCCCCC',
          line: '#D1D5DB',
          'line-2': '#E5E7EB',
          'line-3': '#E2E8F0',
          'bg-soft': '#F8F9FA',
          'bg-soft-2': '#FAFBFC',
          mint: '#26DEB5',
          coral: '#FF6B5C',
          amber: '#FFBE5C',
          violet: '#C938FF',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        display: ['42px', { lineHeight: '1.05', letterSpacing: '-1.5px', fontWeight: '700' }],
        h1: ['38px', { lineHeight: '1.15', letterSpacing: '-2px', fontWeight: '700' }],
        h2: ['32px', { lineHeight: '1.2', letterSpacing: '-1px', fontWeight: '700' }],
        h3: ['28px', { lineHeight: '1.2', fontWeight: '700' }],
        h4: ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        h5: ['20px', { lineHeight: '1.25', fontWeight: '700' }],
        h6: ['18px', { lineHeight: '1.3', fontWeight: '700' }],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        icon: '16px',
        pill: '28px',
      },
      boxShadow: {
        nav: '0 1px 17px rgba(0, 0, 0, 0.08)',
        card: '0 8px 24px rgba(0, 0, 0, 0.06)',
        hover: '0 12px 40px rgba(0, 0, 0, 0.10)',
        section: '0 4px 70px rgba(0, 0, 0, 0.25)',
      },
      transitionTimingFunction: {
        of: 'cubic-bezier(.4, 0, .2, 1)',
      },
    },
  },
  plugins: [],
}
