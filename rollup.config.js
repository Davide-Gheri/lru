import typescript from '@rollup/plugin-typescript';
import { uglify } from 'rollup-plugin-uglify';

export default {
    input: './src/index.ts',
    output: [
        {
            dir: './dist',
            format: 'iife',
            name: 'lru'
        }
    ],
    plugins: [
        typescript({
            tsconfig: './tsconfig.cjs.json'
        }),
        uglify(),
    ],
}
