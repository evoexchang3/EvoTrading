// Known Issue: PostCSS warning "did not pass the `from` option" is a cosmetic limitation
// of the @tailwindcss/vite plugin that cannot be fixed without upgrading to Tailwind v4.
// This warning does not affect build output or functionality. See:
// https://github.com/tailwindlabs/tailwindcss/issues/11630
export default {
  plugins: {
    tailwindcss: {
      config: './tailwind.config.ts',
    },
    autoprefixer: {},
  },
}
