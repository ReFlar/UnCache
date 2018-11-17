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

namespace Reflar\UnCache;

use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;
use Reflar\UnCache\Api\Controllers;

return [
    (new Extend\Frontend('admin'))
        ->css(__DIR__.'/resources/less/admin.less')
        ->js(__DIR__.'/js/dist/admin.js'),
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),
	new Extend\Locales(__DIR__.'/resources/locale'),
	(new Extend\Routes('api'))
        ->post('/uncache/validate', 'uncache.validate', Controllers\CacheValidController::class)
        ->post('/uncache/invalidate', 'uncache.invalidate', Controllers\InvalidateCacheController::class),
	function (Dispatcher $events) {
		$events->subscribe(Listeners\AddUserRelationships::class);
		$events->subscribe(Listeners\InvalidateCache::class);
	},
];