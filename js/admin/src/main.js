import app from 'flarum/app';
import {extend} from 'flarum/extend'
import AdminNav from "flarum/components/AdminNav";
import AdminLinkButton from "flarum/components/AdminLinkButton";
import SettingsPage from "./components/SettingsPage";

app.initializers.add('reflar/uncache', () => {
    app.routes['reflar-uncache'] = {path: '/reflar/uncache', component: SettingsPage.component()};

    app.extensionSettings['reflar-uncache'] = () => m.route(app.route('reflar-uncache'));

    extend(AdminNav.prototype, 'items', items => {
        items.add('reflar-uncache', AdminLinkButton.component({
            href: app.route('reflar-uncache'),
            icon: 'archive',
            children: 'UnCache',
            description: app.translator.trans('reflar-uncache.admin.nav.desc')
        }));
    });
});
