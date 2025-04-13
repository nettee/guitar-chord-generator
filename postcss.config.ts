import type { Config } from 'postcss-load-config';

const config: Config = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;