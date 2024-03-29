import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  if (mode === 'widget') {
    return {
      plugins: [react()],
      build: {
        outDir: 'dist/widget',
        lib: {
          entry: './src/widget.js',
          name: 'ReyllmChatWidget',
          formats: ['umd'],
          fileName: (format) => `reyllm-chat-widget.${format}.js`
        },
        rollupOptions: {
          // Ensure external dependencies are not bundled
          external: ['react', 'react-dom'],
          output: {
            // Global variables to use in the UMD build for externalized deps
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM'
            }
          }
        }
      },
    };
  }

  // Original configuration
  return {
    plugins: [react()],
  };
});