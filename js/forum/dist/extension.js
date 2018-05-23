'use strict';

System.register('zreflar/uncache/main', ['flarum/app', 'flarum/Model', 'flarum/models/User'], function (_export, _context) {
    "use strict";

    var app, Model, User;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumModelsUser) {
            User = _flarumModelsUser.default;
        }],
        execute: function () {

            app.initializers.add('zreflar-uncache', function () {
                User.prototype.cacheValid = Model.attribute('cache_valid');

                if (app.session.user) {
                    if (!app.session.user.cacheValid()) {
                        app.request({
                            method: 'POST',
                            url: app.forum.attribute('apiUrl') + '/uncache/validate'
                        }).then(function () {
                            window.location.reload(true);
                        });
                    }
                }
            }, -1000000);
        }
    };
});