import { storage } from '@vendetta/plugin'
import Settings from './settings'
import { startPatching, stopPatching } from './patcher'

export const vstorage = storage as {
    enabled: boolean
    username: string
    displayName: string
    email: string
    phone: string
    bio: string
    avatar: string
    banner: string
    avatarDecoration: string
    premiumType: number | null
    badges: Record<string, boolean>
}

export function onLoad() {
    vstorage.enabled ??= true
    vstorage.username ??= ''
    vstorage.displayName ??= ''
    vstorage.email ??= ''
    vstorage.phone ??= ''
    vstorage.bio ??= ''
    vstorage.avatar ??= ''
    vstorage.banner ??= ''
    vstorage.avatarDecoration ??= ''
    vstorage.premiumType ??= null
    vstorage.badges ??= {}

    startPatching()
}

export function onUnload() {
    stopPatching()
}

export const settings = Settings
