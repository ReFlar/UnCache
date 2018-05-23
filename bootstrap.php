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

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddUnCacheApi::class);
    $events->subscribe(Listeners\AddUserRelationships::class);
    $events->subscribe(Listeners\InvalidateCache::class);
};
