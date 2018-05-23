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

namespace Reflar\UnCache\Listeners;

use Flarum\Event\ConfigureApiRoutes;
use Illuminate\Contracts\Events\Dispatcher;
use Reflar\UnCache\Api\Controllers;

class AddUnCacheApi
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'configureApiRoutes']);
    }

    public function configureApiRoutes(ConfigureApiRoutes $event)
    {
        $event->post('/uncache/validate', 'uncache.validate', Controllers\CacheValidController::class);

        $event->post('/uncache/invalidate', 'uncache.invalidate', Controllers\InvalidateCacheController::class);
    }
}
