var gulp = require('flarum-gulp');

gulp({
  modules: {
    'zreflar/uncache': [
      'src/**/*.js',
    ]
  }
});
