/** @type {import('tailwindcss').Config} */
import tailwindPlugin from 'tailwindcss/plugin';

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F8F2E8', /* Your original warm beige, slightly brightened */
        'foreground': '#2C2622', /* Rich dark brown that's softer than black */
        'warm-beige': '#f5f0e8', /* Original warm beige as reference */
        'dark-text': '#2C2622',  /* Rich brown for text */
        'accent-primary': '#E9D5C3', /* Warm peach-cream - analogous to background */
        'accent-secondary': '#D6B795', /* Warm caramel - perfect midtone */
        'accent-tertiary': '#B08968', /* Rich caramel - warm accent for emphasis */
      },
      fontFamily: {
        sans: ['var(--font-text)', '-apple-system', 'BlinkMacSystemFont', 'system-ui'],
        display: ['var(--font-display)', '-apple-system', 'BlinkMacSystemFont', 'system-ui'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      transitionDuration: {
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      lineHeight: {
        body: 'var(--line-height-body)',
        headings: 'var(--line-height-headings)',
      },
      borderRadius: {
        'custom': 'var(--border-radius)',
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      zIndex: {
        '55': '55',
        '60': '60',
        '70': '70',
      },
    },
  },
  plugins: [
    tailwindPlugin(({ addUtilities }) => {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
      });
    }),
  ],
  darkMode: 'media',
  future: {
    hoverOnlyWhenSupported: true,
  },
};
