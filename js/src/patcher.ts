import { findByProps } from '@vendetta/metro'
import { vstorage } from './index'
import { calculateFlags } from './badges'

let interceptor: (() => void) | null = null

function applyFakes(user: any): void {
    if (!user) return

    if (vstorage.enabled) {
        if (vstorage.username) user.username = vstorage.username
        if (vstorage.displayName) user.globalName = vstorage.displayName
        if (vstorage.email) user.email = vstorage.email
        if (vstorage.phone) user.phone = vstorage.phone
        if (vstorage.bio) user.bio = vstorage.bio
        if (vstorage.avatar) user.avatar = vstorage.avatar
        if (vstorage.banner) user.banner = vstorage.banner
        if (vstorage.avatarDecoration) user.avatarDecoration = vstorage.avatarDecoration

        const badgeFlags = calculateFlags(vstorage.badges)
        if (badgeFlags > 0 || vstorage.badges.nitro || vstorage.badges.nitro_boost || vstorage.badges.nitro_basic) {
            user.flags = badgeFlags
            user.publicFlags = badgeFlags
        }

        if (vstorage.premiumType) user.premiumType = vstorage.premiumType
    }
}

export function startPatching(): void {
    const Dispatcher = findByProps('_dispatch', 'dispatch')
    if (!Dispatcher) return

    const originalDispatch = Dispatcher.dispatch.bind(Dispatcher)

    Dispatcher.dispatch = function patchedDispatch(e: any) {
        if (e && (e.type === 'CURRENT_USER_UPDATE' || e.type === 'CONNECTION_OPEN')) {
            if (e.user) applyFakes(e.user)
        }
        return originalDispatch(e)
    }

    interceptor = () => {
        Dispatcher.dispatch = originalDispatch
    }

    Dispatcher.dispatch({ type: 'CURRENT_USER_UPDATE' })
}

export function stopPatching(): void {
    if (interceptor) {
        interceptor()
        interceptor = null
    }
}
