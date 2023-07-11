import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { name as packageName } from './package.json';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const isDevelopment = mode === 'development';

  return defineConfig({
    build: {
      outDir: 'dist',
      sourcemap: isDevelopment ? 'inline' : false,
      lib: {
        formats: ['es'],
        entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        name: packageName,
        fileName: 'index',
      },
      rollupOptions: {
        external: [
          'vue',
          'zod',
          'vue-router',
        ],
      },
      commonjsOptions: {
        esmExternals: true,
      },
      // Prevent DTS error on cleaning files while running a new generation
      emptyOutDir: false,
    },
    publicDir: false,
    plugins: [
      vue(),
      dts({
        staticImport: true,
        // insertTypesEntry: true,
        outDir: fileURLToPath(new URL('./dist/@types', import.meta.url)),
        include: [fileURLToPath(new URL('./src', import.meta.url))],
        tsconfigPath: fileURLToPath(new URL('./tsconfig.app.json', import.meta.url)),
        beforeWriteFile: (filePath: string, content: string) => {
          const transformedFilePath = filePath.replace(`${path.sep}src${path.sep}`, path.sep);
          return {
            filePath: transformedFilePath,
            content,
          };
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: /@src/,
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
  });
};
