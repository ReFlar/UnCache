<?php
/**
 *  This file is part of reflar/uncache.
 *
 *  Copyright (c) ReFlar.
 *
 *  http://reflar.io
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 */

namespace Reflar\UnCache\Jobs;

use Flarum\Admin\WebApp as Admin;
use Flarum\Core\User;
use Flarum\Forum\WebApp as Forum;
use Flarum\Settings\SettingsRepositoryInterface;
use GuzzleHttp\Client;
use Illuminate\Contracts\Cache\Store;

class ClearCache
{
    /**
     * @var Store
     */
    public $cache;

    /**
     * @var Forum
     */
    public $forum;

    /**
     * @var Admin
     */
    public $admin;

    /**
     * @var SettingsRepositoryInterface
     */
    public $settings;

    public function __construct(Store $cache, Forum $forum, Admin $admin, SettingsRepositoryInterface $settings)
    {
        $this->cache = $cache;
        $this->forum = $forum;
        $this->admin = $admin;
        $this->settings = $settings;
    }

    public function clear()
    {
        $files = $this->getAssetUrls();

        @unlink(base_path($this->getAssetDirForPlatform().'rev-manifest.json'));

        $this->forum->getAssets()->flush();
        $this->admin->getAssets()->flush();

        $this->cache->flush();

        User::where('cache_valid', 1)->update(['cache_valid' => 0]);

        if ($this->settings->get('reflar.uncache.cloudflare_enabled')) {
            $client = new Client([
                'headers' => [
                    'X-Auth-Email' => $this->settings->get('reflar.uncache.cloudflare_email'),
                    'X-Auth-Key'   => $this->settings->get('reflar.uncache.cloudflare_apikey'),
                    'Content-Type' => 'application/json',
                ],
                'Accept' => 'application/json',
            ]);

            $response = $client->request('DELETE', 'https://api.cloudflare.com/client/v4/zones/'.$this->settings->get('reflar.uncache.cloudflare_zoneid').'/purge_cache', [
                'json' => [
                    'files' => $files,
                ],
            ]);

            return json_decode($response->getBody());
        }
    }

    public function getAssetUrls()
    {
        $files = json_decode(file_get_contents(base_path($this->getAssetDirForPlatform().'rev-manifest.json')), true);

        foreach ($files as $key => $file) {
            $place = strstr($key, '.', true);
            $type = strstr($key, '.');
            $file = $place.'-'.$file.$type;
            @unlink(base_path($this->getAssetDirForPlatform().$file));
            $files[$key] = app('flarum.config')['url'].'/assets/'.$file;
        }

        return array_values($files);
    }

    public function getAssetDirForPlatform() {
        if (strtoupper(substr(PHP_OS, 0, 3)) == 'WIN') {
            return 'assets\\';
        } else {
            return 'assets/';
        }
    }
}
