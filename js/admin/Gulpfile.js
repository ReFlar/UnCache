var gulp = require('flarum-gulp');

gulp({
  modules: {
    'reflar/uncache': [
      'src/**/*.js',
    ]
  }
});
