'use strict';

System.register('reflar/uncache/components/SettingsPage', ['flarum/components/Alert', 'flarum/components/Button', 'flarum/components/Page', 'flarum/utils/saveSettings', 'flarum/components/Switch'], function (_export, _context) {
    "use strict";

    var Alert, Button, Page, saveSettings, Switch, SettingsPage;
    return {
        setters: [function (_flarumComponentsAlert) {
            Alert = _flarumComponentsAlert.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumComponentsPage) {
            Page = _flarumComponentsPage.default;
        }, function (_flarumUtilsSaveSettings) {
            saveSettings = _flarumUtilsSaveSettings.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }],
        execute: function () {
            SettingsPage = function (_Page) {
                babelHelpers.inherits(SettingsPage, _Page);

                function SettingsPage() {
                    babelHelpers.classCallCheck(this, SettingsPage);
                    return babelHelpers.possibleConstructorReturn(this, (SettingsPage.__proto__ || Object.getPrototypeOf(SettingsPage)).apply(this, arguments));
                }

                babelHelpers.createClass(SettingsPage, [{
                    key: 'init',
                    value: function init() {
                        var _this2 = this;

                        this.fields = ['cloudflare_email', 'cloudflare_apikey', 'cloudflare_zoneid'];

                        this.switches = ['cloudflare_enabled'];

                        this.values = {};

                        this.settingsPrefix = 'reflar.uncache';

                        var settings = app.data.settings;

                        this.fields.forEach(function (key) {
                            return _this2.values[key] = m.prop(settings[_this2.addPrefix(key)]);
                        });

                        this.switches.forEach(function (key) {
                            return _this2.values[key] = m.prop(settings[_this2.addPrefix(key)] === '1');
                        });
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this3 = this;

                        return m(
                            'div',
                            { className: 'SettingsPage--uncache' },
                            m(
                                'div',
                                { className: 'container' },
                                m(
                                    'legend',
                                    null,
                                    app.translator.trans('reflar-uncache.admin.page.title')
                                ),
                                m(
                                    'div',
                                    { className: 'helpText' },
                                    app.translator.trans('reflar-uncache.admin.page.helptext')
                                ),
                                Button.component({
                                    type: 'button',
                                    className: 'Button Button-primary uncache-button',
                                    children: app.translator.trans('reflar-uncache.admin.page.button'),
                                    onclick: function onclick() {
                                        app.alerts.dismiss(_this3.successAlert);
                                        app.request({
                                            url: app.forum.attribute('apiUrl') + '/uncache/invalidate',
                                            errorHandler: _this3.onerror.bind(_this3),
                                            method: 'POST'
                                        }).then(function () {
                                            app.alerts.show(_this3.successAlert = new Alert({
                                                type: 'success',
                                                children: app.translator.trans('reflar-uncache.admin.page.success')
                                            }));
                                        });
                                    }
                                }),
                                m(
                                    'form',
                                    { onsubmit: this.onsubmit.bind(this) },
                                    m(
                                        'fieldset',
                                        null,
                                        m(
                                            'div',
                                            { className: 'uncache-settings' },
                                            m(
                                                'div',
                                                null,
                                                m(
                                                    'legend',
                                                    { className: 'uncache-legend' },
                                                    app.translator.trans('reflar-uncache.admin.page.cloudflare.title')
                                                ),
                                                Switch.component({
                                                    state: this.values.cloudflare_enabled() || false,
                                                    children: app.translator.trans('reflar-uncache.admin.page.cloudflare.enable'),
                                                    onchange: this.values.cloudflare_enabled,
                                                    className: 'uncache-switch'
                                                }),
                                                m(
                                                    'label',
                                                    null,
                                                    app.translator.trans('reflar-uncache.admin.page.cloudflare.zoneid')
                                                ),
                                                m(
                                                    'div',
                                                    { className: 'helpText' },
                                                    app.translator.trans('reflar-uncache.admin.page.cloudflare.zoneid_help')
                                                ),
                                                m('input', {
                                                    className: 'FormControl uncache-settings-input',
                                                    value: this.values.cloudflare_zoneid() || '',
                                                    placeholder: '1234567890abcdefghij1234567890ab',
                                                    oninput: m.withAttr('value', this.values.cloudflare_zoneid)
                                                }),
                                                m(
                                                    'label',
                                                    null,
                                                    app.translator.trans('reflar-uncache.admin.page.cloudflare.apikey')
                                                ),
                                                m(
                                                    'div',
                                                    { className: 'helpText' },
                                                    app.translator.trans('reflar-uncache.admin.page.cloudflare.apikeyhelp')
                                                ),
                                                m('input', {
                                                    className: 'FormControl uncache-settings-input',
                                                    value: this.values.cloudflare_apikey() || '',
                                                    placeholder: '1234567890abcdefghij1234567890abcdefg',
                                                    oninput: m.withAttr('value', this.values.cloudflare_apikey)
                                                }),
                                                m(
                                                    'label',
                                                    null,
                                                    app.translator.trans('reflar-uncache.admin.page.cloudflare.email')
                                                ),
                                                m(
                                                    'div',
                                                    { className: 'helpText' },
                                                    app.translator.trans('reflar-uncache.admin.page.cloudflare.emailhelp')
                                                ),
                                                m('input', {
                                                    className: 'FormControl uncache-settings-input',
                                                    value: this.values.cloudflare_email() || '',
                                                    placeholder: 'example@gmail.com',
                                                    type: 'email',
                                                    oninput: m.withAttr('value', this.values.cloudflare_email)
                                                })
                                            ),
                                            Button.component({
                                                type: 'submit',
                                                className: 'Button Button--primary',
                                                children: app.translator.trans('core.admin.settings.submit_button'),
                                                loading: this.loading,
                                                disabled: !this.changed()
                                            })
                                        )
                                    )
                                )
                            )
                        );
                    }
                }, {
                    key: 'onerror',
                    value: function onerror(e) {
                        if (e.responseText.includes('Unable to purge')) {
                            app.alerts.show(this.successAlert = new Alert({
                                type: 'warning',
                                children: app.translator.trans('reflar-uncache.admin.page.warning')
                            }));
                        } else if (e.responseText.includes('failed to open stream: No such file or directory')) {
                            app.alerts.show(this.successAlert = new Alert({
                                type: 'error',
                                children: app.translator.trans('reflar-uncache.admin.page.error')
                            }));
                        } else {
                            throw e;
                        }
                    }
                }, {
                    key: 'changed',
                    value: function changed() {
                        var _this4 = this;

                        var switchesCheck = this.switches.some(function (key) {
                            return _this4.values[key]() !== (app.data.settings[_this4.addPrefix(key)] == '1');
                        });
                        var fieldsCheck = this.fields.some(function (key) {
                            return _this4.values[key]() !== app.data.settings[_this4.addPrefix(key)];
                        });
                        return fieldsCheck || switchesCheck;
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        var _this5 = this;

                        // prevent the usual form submit behaviour
                        e.preventDefault();

                        // if the page is already saving, do nothing
                        if (this.loading) return;

                        // prevents multiple savings
                        this.loading = true;

                        // remove previous success popup
                        app.alerts.dismiss(this.successAlert);

                        var settings = {};

                        // gets all the values from the form
                        this.fields.forEach(function (key) {
                            return settings[_this5.addPrefix(key)] = _this5.values[key]();
                        });
                        this.switches.forEach(function (key) {
                            return settings[_this5.addPrefix(key)] = _this5.values[key]();
                        });

                        // actually saves everything in the database
                        saveSettings(settings).then(function () {
                            // on success, show popup
                            app.alerts.show(_this5.successAlert = new Alert({
                                type: 'success',
                                children: app.translator.trans('core.admin.basics.saved_message')
                            }));
                        }).then(function () {
                            // return to the initial state and redraw the page
                            _this5.loading = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'addPrefix',
                    value: function addPrefix(key) {
                        return this.settingsPrefix + '.' + key;
                    }
                }]);
                return SettingsPage;
            }(Page);

            _export('default', SettingsPage);
        }
    };
});;
'use strict';

System.register('reflar/uncache/main', ['flarum/app', 'flarum/extend', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', './components/SettingsPage'], function (_export, _context) {
    "use strict";

    var app, extend, AdminNav, AdminLinkButton, SettingsPage;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav.default;
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton.default;
        }, function (_componentsSettingsPage) {
            SettingsPage = _componentsSettingsPage.default;
        }],
        execute: function () {

            app.initializers.add('reflar/uncache', function () {
                app.routes['reflar-uncache'] = { path: '/reflar/uncache', component: SettingsPage.component() };

                app.extensionSettings['reflar-uncache'] = function () {
                    return m.route(app.route('reflar-uncache'));
                };

                extend(AdminNav.prototype, 'items', function (items) {
                    items.add('reflar-uncache', AdminLinkButton.component({
                        href: app.route('reflar-uncache'),
                        icon: 'archive',
                        children: 'UnCache',
                        description: app.translator.trans('reflar-uncache.admin.nav.desc')
                    }));
                });
            });
        }
    };
});