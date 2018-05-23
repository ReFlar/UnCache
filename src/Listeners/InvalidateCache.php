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

use Flarum\Event\ExtensionWasEnabled;
use Illuminate\Contracts\Events\Dispatcher;
use Reflar\UnCache\Jobs\ClearCache;

class InvalidateCache
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ExtensionWasEnabled::class, [$this, 'invalidateCache']);
    }

    /**
     * @param ExtensionWasEnabled $event
     */
    public function invalidateCache(ExtensionWasEnabled $event)
    {
        app()->make(ClearCache::class)->clear();
    }
}
