/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
    // 'no-unused-vars': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'prettier/prettier': 0,
    quotes: [2, 'single'],
    'vue/multi-word-component-names': ['error', {
      'ignores': []
    }],
    'indent': ['error', 2],
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true,
    }],
    'vue/attributes-order': ['error', {
      'order': [
        'LIST_RENDERING', // v-for
        'UNIQUE', // ref, key
        'CONDITIONALS', // v-if v-else v-show...
        'TWO_WAY_BINDING', // v-model
        'DEFINITION', // v-is, is
        'OTHER_DIRECTIVES', // v-custom-directives
        'OTHER_ATTR', // :prop=foo, v-bind:prop=foo
        'SLOT', // v-slot, slot
        'RENDER_MODIFIERS', // v-once, v-pre
        'GLOBAL', // id, class...
        'CONTENT', // v-text, v-html
        'EVENTS', // @click, v-on
      ],
      'alphabetical': false
    }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/mustache-interpolation-spacing': ['error', 'always'],
  },
}
