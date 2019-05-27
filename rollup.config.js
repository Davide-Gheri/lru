import typescript from 'rollup-plugin-typescript';
import { uglify } from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy'

export default {
    input: './src/index.ts',
    output: [
        {
            file: './dist/index.js',
            format: 'umd',
            name: 'lru'
        }
    ],
    plugins: [
        typescript(),
        uglify(),
        copy({
            targets: {
                './src/typings.d.ts': './dist/index.d.ts',
            }
        }),
    ],
}
