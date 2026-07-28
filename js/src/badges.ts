export interface Badge {
    type: string
    label: string
    flag: number
    icon: string
}

export const BADGES: Badge[] = [
    { type: 'staff', label: 'Discord Staff', flag: 1, icon: 'StaffBadge' },
    { type: 'partner', label: 'Partnered Server Owner', flag: 2, icon: 'PartnerBadge' },
    { type: 'hypesquad_events', label: 'HypeSquad Events', flag: 4, icon: 'HypeSquadEventsBadge' },
    { type: 'bughunter_1', label: 'Bug Hunter Level 1', flag: 8, icon: 'BugHunter1Badge' },
    { type: 'bughunter_2', label: 'Bug Hunter Level 2', flag: 16, icon: 'BugHunter2Badge' },
    { type: 'hypesquad_bravery', label: 'HypeSquad Bravery', flag: 32, icon: 'HypeSquadBraveryBadge' },
    { type: 'hypesquad_brilliance', label: 'HypeSquad Brilliance', flag: 64, icon: 'HypeSquadBrillianceBadge' },
    { type: 'hypesquad_balance', label: 'HypeSquad Balance', flag: 128, icon: 'HypeSquadBalanceBadge' },
    { type: 'early_supporter', label: 'Early Supporter', flag: 256, icon: 'EarlySupporterBadge' },
    { type: 'verified_developer', label: 'Early Verified Bot Developer', flag: 512, icon: 'VerifiedDeveloperBadge' },
    { type: 'certified_moderator', label: 'Discord Certified Moderator', flag: 262144, icon: 'CertifiedModeratorBadge' },
    { type: 'active_developer', label: 'Active Developer', flag: 4194304, icon: 'ActiveDeveloperBadge' },
    { type: 'http_interactions', label: 'HTTP Interactions', flag: 8388608, icon: 'HTTPInteractionsBadge' },
    { type: 'nitro', label: 'Nitro', flag: 0, icon: 'NitroBadge' },
    { type: 'nitro_boost', label: 'Server Boosting', flag: 0, icon: 'BoostBadge' },
    { type: 'nitro_basic', label: 'Nitro Basic', flag: 0, icon: 'NitroBasicBadge' },
]

export function calculateFlags(badges: Record<string, boolean>): number {
    let flags = 0
    for (const badge of BADGES) {
        if (badges[badge.type] && badge.flag > 0) {
            flags |= badge.flag
        }
    }
    return flags
}

export function getEnabledBadges(badges: Record<string, boolean>): Badge[] {
    return BADGES.filter(b => badges[b.type])
}
