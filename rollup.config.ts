// tslint:disable:import-name
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import camelCase from 'lodash/camelCase';

const pkg = require('./package.json');
const libraryName = camelCase(pkg.name);

export default {
  input: 'src/sdk/events.ts',
  output: [
    // { file: pkg.main, name: libraryName, format: 'umd', sourcemap: true },
    // { file: pkg.module, format: 'es', sourcemap: true },
    {
      file: 'sdk/events.js',
      name: libraryName,
      format: 'iife',
      sourcemap: false,
    },
  ],
  external: [],
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig.rollup.json',
    }),

    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      namedExports: {
        'node_modules/graphql/error/index.js': ['syntaxError'],
        'node_modules/graphql/type/index.js': [
          'GraphQLInt',
          'GraphQLSchema',
          'GraphQLScalarType',
          'GraphQLObjectType',
          'GraphQLInterfaceType',
          'GraphQLUnionType',
          'GraphQLEnumType',
          'GraphQLInputObjectType',
          'GraphQLList',
          'GraphQLNonNull',
          'GraphQLDirective',
          'TypeKind',
          'specifiedScalarTypes',
        ],
      },
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve({
      extensions: ['.mjs', '.js', '.json'],
    }),

    // Resolve source maps to the original source
    // sourceMaps(),

    uglify(),
  ],
};
