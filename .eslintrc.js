module.exports = {
  "extends": "standard",

  "env": {
    "browser": true,
    "node": true,
    // "mocha": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "impliedStrict": true,
    "ecmaFeatures": {
      "arrowFunctions": true,
      "blockBindings": true,
      "classes": true,
      "defaultParams": true,
      "destructuring": true,
      "forOf": true,
      "generators": false,
      "modules": true,
      "objectLiteralComputedProperties": true,
      "objectLiteralDuplicateProperties": false,
      "objectLiteralShorthandMethods": true,
      "objectLiteralShorthandProperties": true,
      "spread": true,
      "superInFunctions": true,
      "templateStrings": true,
      // "jsx": true
    }
  },
  "parser": "babel-eslint",

  "globals": {
    "$": true
  },
  "plugins": [
    'html'
  ],
  "rules": {
    // Possible Errors
    "comma-dangle": [2, "always-multiline"],

    // Stylistic Issues
    "indent": [2, 2, {
      "SwitchCase": 1
    }],
    "brace-style": 2,
    "camelcase": 0,
    "comma-spacing": 2,
    "comma-style": 2,
    "consistent-this": 0,
    "eol-last": 2,
    "func-names": 0,
    "func-style": 0,
    "key-spacing": [2, {
      "beforeColon": false,
      "afterColon": true
    }],
    "quotes": [2, "single"],
    "semi": [2, "never"],
    'space-before-function-paren': [2, { named: 'never'}]
  }

}

