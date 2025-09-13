// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import type { Store, Action } from 'redux';

import type { GlobalState } from '@mattermost/types/store';

import manifest from '@/manifest';
import type { PluginRegistry } from '@/types/mattermost-webapp';

import MyApp from './app';
import React from 'react';

// Simple Icon component as a placeholder
const Icon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8" fill="#888" />
    </svg>
);

export default class Plugin {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    public async initialize(registry: PluginRegistry, store: Store<GlobalState, Action<Record<string, unknown>>>) {

        const { toggleRHSPlugin } = registry.registerRightHandSidebarComponent(MyApp, 'BreadBot');
        const boundToggleRHSAction = () => store.dispatch(toggleRHSPlugin);
        const iconURL = () => <Icon />;
        registry.registerChannelHeaderButtonAction(iconURL, boundToggleRHSAction, 'Gitlab', 'GitLab');
    }
}

declare global {
    interface Window {
        registerPlugin(pluginId: string, plugin: Plugin): void;
    }
}

window.registerPlugin(manifest.id, new Plugin());
