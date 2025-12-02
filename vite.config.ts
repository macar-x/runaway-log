import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  const host = env.VITE_HOST || '0.0.0.0'
  const port = parseInt(env.VITE_PORT || '5173')
  const hmrHost = env.VITE_HMR_HOST
  const hmrPort = parseInt(env.VITE_HMR_PORT || '443')
  const hmrProtocol = env.VITE_HMR_PROTOCOL || 'wss'

  return {
    plugins: [react()],
    server: {
      host,
      port,
      allowedHosts: [
        hmrHost,
        '.gitpod.dev',
        '.github.dev',
        'localhost',
      ].filter(Boolean),
      hmr: hmrHost ? {
        protocol: hmrProtocol,
        host: hmrHost,
        clientPort: hmrPort,
      } : true,
    },
  }
})
