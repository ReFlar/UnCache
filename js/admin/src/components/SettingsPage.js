import Alert from 'flarum/components/Alert';
import Button from "flarum/components/Button";
import Page from 'flarum/components/Page';
import saveSettings from "flarum/utils/saveSettings";
import Switch from "flarum/components/Switch";

export default class SettingsPage extends Page {

    init() {

        this.fields = [
            'cloudflare_email',
            'cloudflare_apikey',
            'cloudflare_zoneid'
        ];

        this.switches = [
            'cloudflare_enabled'
        ];

        this.values = {};

        this.settingsPrefix = 'reflar.uncache';

        const settings = app.data.settings;

        this.fields.forEach(key =>
            this.values[key] = m.prop(settings[this.addPrefix(key)])
        );

        this.switches.forEach(key =>
            this.values[key] = m.prop(settings[this.addPrefix(key)] === '1')
        );
    }

    /**
     * @returns {*}
     */
    view() {
        return (
            <div className="SettingsPage--uncache">
                <div className="container">
                    <legend>{app.translator.trans('reflar-uncache.admin.page.title')}</legend>
                    <div className="helpText">{app.translator.trans('reflar-uncache.admin.page.helptext')}</div>
                    {Button.component({
                        type: 'button',
                        className: 'Button Button-primary uncache-button',
                        children: app.translator.trans('reflar-uncache.admin.page.button'),
                        onclick: () => {
                            app.alerts.dismiss(this.successAlert);
                            app.request({
                                url: app.forum.attribute('apiUrl') + '/uncache/invalidate',
                                errorHandler: this.onerror.bind(this),
                                method: 'POST'
                            }).then(() => {
                                app.alerts.show(this.successAlert = new Alert({
                                    type: 'success',
                                    children: app.translator.trans('reflar-uncache.admin.page.success')
                                }));
                            });
                        }
                    })}
                    <form onsubmit={this.onsubmit.bind(this)}>
                        <fieldset>
                            <div className="uncache-settings">
                                <div>
                                    <legend className="uncache-legend">{app.translator.trans('reflar-uncache.admin.page.cloudflare.title')}</legend>
                                    {Switch.component({
                                        state: this.values.cloudflare_enabled() || false,
                                        children: app.translator.trans('reflar-uncache.admin.page.cloudflare.enable'),
                                        onchange: this.values.cloudflare_enabled,
                                        className: 'uncache-switch'
                                    })}
                                    <label>{app.translator.trans('reflar-uncache.admin.page.cloudflare.zoneid')}</label>
                                    <div className="helpText">{app.translator.trans('reflar-uncache.admin.page.cloudflare.zoneid_help')}</div>
                                    <input
                                        className="FormControl uncache-settings-input"
                                        value={this.values.cloudflare_zoneid() || ''}
                                        placeholder="1234567890abcdefghij1234567890ab"
                                        oninput={m.withAttr('value', this.values.cloudflare_zoneid)}
                                    />
                                    <label>{app.translator.trans('reflar-uncache.admin.page.cloudflare.apikey')}</label>
                                    <div className="helpText">{app.translator.trans('reflar-uncache.admin.page.cloudflare.apikeyhelp')}</div>
                                    <input
                                        className="FormControl uncache-settings-input"
                                        value={this.values.cloudflare_apikey() || ''}
                                        placeholder="1234567890abcdefghij1234567890abcdefg"
                                        oninput={m.withAttr('value', this.values.cloudflare_apikey)}
                                    />
                                    <label>{app.translator.trans('reflar-uncache.admin.page.cloudflare.email')}</label>
                                    <div className="helpText">{app.translator.trans('reflar-uncache.admin.page.cloudflare.emailhelp')}</div>
                                    <input
                                        className="FormControl uncache-settings-input"
                                        value={this.values.cloudflare_email() || ''}
                                        placeholder="example@gmail.com"
                                        type='email'
                                        oninput={m.withAttr('value', this.values.cloudflare_email)}
                                    />
                                </div>
                                {Button.component({
                                    type: 'submit',
                                    className: 'Button Button--primary',
                                    children: app.translator.trans('core.admin.settings.submit_button'),
                                    loading: this.loading,
                                    disabled: !this.changed()
                                })}
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }

    onerror(e) {
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

    /**
     * @returns boolean
     */
    changed() {
        var switchesCheck = this.switches.some(key => this.values[key]() !== (app.data.settings[this.addPrefix(key)] == '1'));
        var fieldsCheck = this.fields.some(key => this.values[key]() !== app.data.settings[this.addPrefix(key)]);
        return fieldsCheck || switchesCheck;
    }

    onsubmit(e) {
        // prevent the usual form submit behaviour
        e.preventDefault();

        // if the page is already saving, do nothing
        if (this.loading) return;

        // prevents multiple savings
        this.loading = true;

        // remove previous success popup
        app.alerts.dismiss(this.successAlert);

        const settings = {};

        // gets all the values from the form
        this.fields.forEach(key => settings[this.addPrefix(key)] = this.values[key]());
        this.switches.forEach(key => settings[this.addPrefix(key)] = this.values[key]());

        // actually saves everything in the database
        saveSettings(settings)
            .then(() => {
                // on success, show popup
                app.alerts.show(this.successAlert = new Alert({
                    type: 'success',
                    children: app.translator.trans('core.admin.basics.saved_message')
                }));
            })
            .then(() => {
                // return to the initial state and redraw the page
                this.loading = false;
                m.redraw();
            });
    }

    /**
     * @returns string
     */
    addPrefix(key) {
        return this.settingsPrefix + '.' + key;
    }
}