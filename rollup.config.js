const {
  terser
} = require('rollup-plugin-terser')
const {
  nodeResolve
} = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { babel } = require('@rollup/plugin-babel')

export default [{
  input: 'src/index.jsx',
  output: [{
    file: 'dist/index.esm.js',
    format: 'esm',
    plugins: [
      terser({
        compress: {
          drop_console: true
        },
        output: {
          comments: false
        },
        ecma: 2019
      })
    ]
  },
  {
    file: 'dist/index.cjs.js',
    format: 'cjs',
    plugins: [
      terser({
        compress: {
          drop_console: true
        },
        output: {
          comments: false
        },
        ecma: 2019
      })
    ]
  },
  {
    file: 'test/index.esm.js',
    format: 'esm',
    plugins: []
  }],
  plugins: [
    babel({
      babelHelpers: 'runtime',
      skipPreflightCheck: true
    }),
    nodeResolve(),
    commonjs({
      include: ['./src/**', 'node_modules/**']
    })
  ],
  external: [/@babel\/runtime/]
}]
