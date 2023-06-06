import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          mui: [
            '@emotion/react',
            '@emotion/styled',
            '@mui/joy',
          ],
          twilio: ['twilio-video'],
        },
      },
    },
  },
})
