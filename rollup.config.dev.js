import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'example/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
     postcss({
      extensions: ['.less'],
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    serve({
      open: true,
      verbose: true,
      contentBase: '',
      historyApiFallback: false,
      host: 'localhost',
      port: 3002
    }),
    livereload('dist')
  ],
  output: {
    file: 'dist/build.js',
    format: 'iife',
    sourcemap: true
  },
}

