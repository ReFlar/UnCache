import app from 'flarum/app';
import Model from 'flarum/Model';
import User from 'flarum/models/User';

app.initializers.add('zreflar-uncache', () => {
    User.prototype.cacheValid = Model.attribute('cache_valid');

    if (app.session.user) {
        if (!app.session.user.cacheValid()) {
            app.request({
                method: 'POST',
                url: app.forum.attribute('apiUrl') + '/uncache/validate'
            }).then(() => {
                window.location.reload(true)
            })

        }
    }
}, -1000000);
