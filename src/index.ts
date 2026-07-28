import { storage } from "@vendetta/plugin"
import { findByProps } from "@vendetta/metro"
import { FluxDispatcher } from "@vendetta/metro/common"
import Settings from "./Settings"

const FluxDispatcher_ = FluxDispatcher as any

const BADGES: Record<string, { label: string; flag: number }> = {
    staff: { label: "Discord Staff", flag: 1 },
    partner: { label: "Partnered Server Owner", flag: 2 },
    hypesquad_events: { label: "HypeSquad Events", flag: 4 },
    bughunter_1: { label: "Bug Hunter Level 1", flag: 8 },
    bughunter_2: { label: "Bug Hunter Level 2", flag: 16 },
    hypesquad_bravery: { label: "HypeSquad Bravery", flag: 32 },
    hypesquad_brilliance: { label: "HypeSquad Brilliance", flag: 64 },
    hypesquad_balance: { label: "HypeSquad Balance", flag: 128 },
    early_supporter: { label: "Early Supporter", flag: 256 },
    verified_developer: { label: "Early Verified Bot Developer", flag: 512 },
    certified_moderator: { label: "Discord Certified Moderator", flag: 262144 },
    active_developer: { label: "Active Developer", flag: 4194304 },
    http_interactions: { label: "HTTP Interactions", flag: 8388608 },
}

function calculateFlags(badges: Record<string, boolean>): number {
    let flags = 0
    for (const [key, badge] of Object.entries(BADGES)) {
        if (badges[key] && badge.flag > 0) {
            flags |= badge.flag
        }
    }
    return flags
}

function applyFakes(user: any) {
    if (!user || !storage.enabled) return

    if (storage.username) user.username = storage.username
    if (storage.displayName) user.globalName = storage.displayName
    if (storage.email) user.email = storage.email
    if (storage.phone) user.phone = storage.phone
    if (storage.bio) user.bio = storage.bio
    if (storage.avatar) user.avatar = storage.avatar
    if (storage.banner) user.banner = storage.banner
    if (storage.avatarDecoration) user.avatarDecoration = storage.avatarDecoration

    const badgeFlags = calculateFlags(storage.badges ?? {})
    if (badgeFlags > 0 || storage.badges?.nitro || storage.badges?.nitro_boost || storage.badges?.nitro_basic) {
        user.flags = badgeFlags
        user.publicFlags = badgeFlags
    }
    if (storage.premiumType) user.premiumType = storage.premiumType
}

let origDispatch: any = null

export default {
    onLoad() {
        storage.enabled ??= true
        storage.username ??= ""
        storage.displayName ??= ""
        storage.email ??= ""
        storage.phone ??= ""
        storage.bio ??= ""
        storage.avatar ??= ""
        storage.banner ??= ""
        storage.avatarDecoration ??= ""
        storage.premiumType ??= null
        storage.badges ??= {}

        origDispatch = FluxDispatcher_.dispatch.bind(FluxDispatcher_)
        FluxDispatcher_.dispatch = (e: any) => {
            if (e && (e.type === "CURRENT_USER_UPDATE" || e.type === "CONNECTION_OPEN")) {
                if (e.user) applyFakes(e.user)
            }
            return origDispatch(e)
        }
    },

    onUnload() {
        if (origDispatch) {
            FluxDispatcher_.dispatch = origDispatch
            origDispatch = null
        }
    },

    settings: Settings,
}
