declare const vendetta: any

const vstorage = (vendetta.plugin ?? vendetta).storage as Record<string, any>

const { findByProps } = vendetta.metro
const { React, ReactNative } = vendetta.metro.common
const useProxy = (vendetta.storage ?? vendetta).useProxy
const { ScrollView, View, Text, TextInput, Switch, StyleSheet } = ReactNative

const BADGES = [
    { type: 'staff', label: 'Discord Staff', flag: 1 },
    { type: 'partner', label: 'Partnered Server Owner', flag: 2 },
    { type: 'hypesquad_events', label: 'HypeSquad Events', flag: 4 },
    { type: 'bughunter_1', label: 'Bug Hunter Level 1', flag: 8 },
    { type: 'bughunter_2', label: 'Bug Hunter Level 2', flag: 16 },
    { type: 'hypesquad_bravery', label: 'HypeSquad Bravery', flag: 32 },
    { type: 'hypesquad_brilliance', label: 'HypeSquad Brilliance', flag: 64 },
    { type: 'hypesquad_balance', label: 'HypeSquad Balance', flag: 128 },
    { type: 'early_supporter', label: 'Early Supporter', flag: 256 },
    { type: 'verified_developer', label: 'Early Verified Bot Developer', flag: 512 },
    { type: 'certified_moderator', label: 'Discord Certified Moderator', flag: 262144 },
    { type: 'active_developer', label: 'Active Developer', flag: 4194304 },
    { type: 'http_interactions', label: 'HTTP Interactions', flag: 8388608 },
    { type: 'nitro', label: 'Nitro', flag: 0 },
    { type: 'nitro_boost', label: 'Server Boosting', flag: 0 },
    { type: 'nitro_basic', label: 'Nitro Basic', flag: 0 },
]

function calculateFlags(badges: Record<string, boolean>): number {
    let flags = 0
    for (const badge of BADGES) {
        if (badges[badge.type] && badge.flag > 0) {
            flags |= badge.flag
        }
    }
    return flags
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
    label: { color: '#fff', fontSize: 15 },
    input: { backgroundColor: '#2a2a2a', borderRadius: 8, padding: 10, color: '#fff', fontSize: 15, marginTop: 4 },
    badgeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#333' },
})

function settings() {
    useProxy(vstorage)

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <Text style={styles.label}>Fake Username</Text>
                <TextInput style={styles.input} placeholder="Enter fake username" placeholderTextColor="#666" value={vstorage.username} onChangeText={(v: string) => (vstorage.username = v)} />
                <Text style={[styles.label, { marginTop: 12 }]}>Fake Display Name</Text>
                <TextInput style={styles.input} placeholder="Enter fake display name" placeholderTextColor="#666" value={vstorage.displayName} onChangeText={(v: string) => (vstorage.displayName = v)} />
                <Text style={[styles.label, { marginTop: 12 }]}>Fake Bio</Text>
                <TextInput style={styles.input} placeholder="Enter fake bio" placeholderTextColor="#666" value={vstorage.bio} onChangeText={(v: string) => (vstorage.bio = v)} />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact</Text>
                <Text style={styles.label}>Fake Email</Text>
                <TextInput style={styles.input} placeholder="Enter fake email" placeholderTextColor="#666" value={vstorage.email} onChangeText={(v: string) => (vstorage.email = v)} />
                <Text style={[styles.label, { marginTop: 12 }]}>Fake Phone</Text>
                <TextInput style={styles.input} placeholder="Enter fake phone number" placeholderTextColor="#666" value={vstorage.phone} onChangeText={(v: string) => (vstorage.phone = v)} />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Media</Text>
                <Text style={styles.label}>Fake Avatar URL</Text>
                <TextInput style={styles.input} placeholder="https://example.com/avatar.png" placeholderTextColor="#666" value={vstorage.avatar} onChangeText={(v: string) => (vstorage.avatar = v)} />
                <Text style={[styles.label, { marginTop: 12 }]}>Fake Banner URL</Text>
                <TextInput style={styles.input} placeholder="https://example.com/banner.png" placeholderTextColor="#666" value={vstorage.banner} onChangeText={(v: string) => (vstorage.banner = v)} />
                <Text style={[styles.label, { marginTop: 12 }]}>Fake Avatar Decoration URL</Text>
                <TextInput style={styles.input} placeholder="https://example.com/decoration.png" placeholderTextColor="#666" value={vstorage.avatarDecoration} onChangeText={(v: string) => (vstorage.avatarDecoration = v)} />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Badges</Text>
                {BADGES.map((badge) => (
                    <View key={badge.type} style={styles.badgeRow}>
                        <Text style={styles.label}>{badge.label}</Text>
                        <Switch value={vstorage.badges[badge.type] ?? false} onValueChange={() => { vstorage.badges[badge.type] = !vstorage.badges[badge.type] }} />
                    </View>
                ))}
            </View>
            <View style={{ height: 40 }} />
        </ScrollView>
    )
}

function applyFakes(user: any) {
    if (!user || !vstorage.enabled) return
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

let unpatch: (() => void) | null = null

function startPatching() {
    const Dispatcher = findByProps('_dispatch', 'dispatch')
    if (!Dispatcher) return
    const orig = Dispatcher.dispatch.bind(Dispatcher)
    Dispatcher.dispatch = function (e: any) {
        if (e && (e.type === 'CURRENT_USER_UPDATE' || e.type === 'CONNECTION_OPEN')) {
            if (e.user) applyFakes(e.user)
        }
        return orig(e)
    }
    unpatch = () => { Dispatcher.dispatch = orig }
    Dispatcher.dispatch({ type: 'CURRENT_USER_UPDATE' })
}

function stopPatching() {
    if (unpatch) { unpatch(); unpatch = null }
}

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

function onLoad() {
    startPatching()
}

function onUnload() {
    stopPatching()
}
