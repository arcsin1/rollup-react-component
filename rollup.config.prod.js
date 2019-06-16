import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'

// add postcss plugins
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano';
const pkg = require('./package.json')

var fistLetterUpper = function(str) {
  return str.charAt(0).toUpperCase()+str.slice(1);
}


export default {
  input: 'src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    postcss({
      extensions: ['.less'],
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false, }),
        cssnano()
      ]
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    uglify(),
    filesize(),
  ],
  output: {
    file: pkg.main,
    format: 'umd',
    name: fistLetterUpper(pkg.name),
    globals: {
      'prop-types': 'PropTypes',
    },
    sourcemap: true
  },
  external: ['react', 'react-dom'],


}

