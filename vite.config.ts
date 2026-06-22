import { defineConfig, loadEnv } from 'vite';
import process from 'node:process';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => {
  // Use process.cwd() from node:process to resolve type error 'Property cwd does not exist on type Process' on line 5
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: './',
    plugins: [viteSingleFile()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY),
    },
    server: {
      open: true
    }
  };
});
