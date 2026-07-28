var storage, useProxy, findByProps, React, ReactNative
var ScrollView, View, Text, TextInput, Switch, StyleSheet

function initModules(v) {
    storage = v.plugin.storage
    useProxy = v.storage.useProxy
    findByProps = v.metro.findByProps
    React = v.metro.common.React
    ReactNative = v.metro.common.ReactNative
    ScrollView = ReactNative.ScrollView
    View = ReactNative.View
    Text = ReactNative.Text
    TextInput = ReactNative.TextInput
    Switch = ReactNative.Switch
    StyleSheet = ReactNative.StyleSheet
}

var BADGES = [
    { type: "staff", label: "Discord Staff", flag: 1 },
    { type: "partner", label: "Partnered Server Owner", flag: 2 },
    { type: "hypesquad_events", label: "HypeSquad Events", flag: 4 },
    { type: "bughunter_1", label: "Bug Hunter Level 1", flag: 8 },
    { type: "bughunter_2", label: "Bug Hunter Level 2", flag: 16 },
    { type: "hypesquad_bravery", label: "HypeSquad Bravery", flag: 32 },
    { type: "hypesquad_brilliance", label: "HypeSquad Brilliance", flag: 64 },
    { type: "hypesquad_balance", label: "HypeSquad Balance", flag: 128 },
    { type: "early_supporter", label: "Early Supporter", flag: 256 },
    { type: "verified_developer", label: "Early Verified Bot Developer", flag: 512 },
    { type: "certified_moderator", label: "Discord Certified Moderator", flag: 262144 },
    { type: "active_developer", label: "Active Developer", flag: 4194304 },
    { type: "http_interactions", label: "HTTP Interactions", flag: 8388608 },
    { type: "nitro", label: "Nitro", flag: 0 },
    { type: "nitro_boost", label: "Server Boosting", flag: 0 },
    { type: "nitro_basic", label: "Nitro Basic", flag: 0 },
]

function calculateFlags(badges) {
    var flags = 0
    for (var i = 0; i < BADGES.length; i++) {
        if (badges[BADGES[i].type] && BADGES[i].flag > 0) {
            flags |= BADGES[i].flag
        }
    }
    return flags
}

var styles = null

function ensureStyles() {
    if (styles) return
    styles = StyleSheet.create({
        container: { flex: 1, padding: 16 },
        section: { marginBottom: 20 },
        sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 8 },
        label: { color: "#fff", fontSize: 15 },
        input: { backgroundColor: "#2a2a2a", borderRadius: 8, padding: 10, color: "#fff", fontSize: 15, marginTop: 4 },
        badgeRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#333" },
    })
}

function Settings() {
    useProxy(storage)
    ensureStyles()
    return React.createElement(ScrollView, { style: styles.container },
        React.createElement(View, { style: styles.section },
            React.createElement(Text, { style: styles.sectionTitle }, "Profile"),
            React.createElement(Text, { style: styles.label }, "Fake Username"),
            React.createElement(TextInput, { style: styles.input, placeholder: "Enter fake username", placeholderTextColor: "#666", value: storage.username, onChangeText: function(v) { storage.username = v } }),
            React.createElement(Text, { style: [styles.label, { marginTop: 12 }] }, "Fake Display Name"),
            React.createElement(TextInput, { style: styles.input, placeholder: "Enter fake display name", placeholderTextColor: "#666", value: storage.displayName, onChangeText: function(v) { storage.displayName = v } }),
            React.createElement(Text, { style: [styles.label, { marginTop: 12 }] }, "Fake Bio"),
            React.createElement(TextInput, { style: styles.input, placeholder: "Enter fake bio", placeholderTextColor: "#666", value: storage.bio, onChangeText: function(v) { storage.bio = v } })
        ),
        React.createElement(View, { style: styles.section },
            React.createElement(Text, { style: styles.sectionTitle }, "Contact"),
            React.createElement(Text, { style: styles.label }, "Fake Email"),
            React.createElement(TextInput, { style: styles.input, placeholder: "Enter fake email", placeholderTextColor: "#666", value: storage.email, onChangeText: function(v) { storage.email = v } }),
            React.createElement(Text, { style: [styles.label, { marginTop: 12 }] }, "Fake Phone"),
            React.createElement(TextInput, { style: styles.input, placeholder: "Enter fake phone number", placeholderTextColor: "#666", value: storage.phone, onChangeText: function(v) { storage.phone = v } })
        ),
        React.createElement(View, { style: styles.section },
            React.createElement(Text, { style: styles.sectionTitle }, "Media"),
            React.createElement(Text, { style: styles.label }, "Fake Avatar URL"),
            React.createElement(TextInput, { style: styles.input, placeholder: "https://example.com/avatar.png", placeholderTextColor: "#666", value: storage.avatar, onChangeText: function(v) { storage.avatar = v } }),
            React.createElement(Text, { style: [styles.label, { marginTop: 12 }] }, "Fake Banner URL"),
            React.createElement(TextInput, { style: styles.input, placeholder: "https://example.com/banner.png", placeholderTextColor: "#666", value: storage.banner, onChangeText: function(v) { storage.banner = v } }),
            React.createElement(Text, { style: [styles.label, { marginTop: 12 }] }, "Fake Avatar Decoration URL"),
            React.createElement(TextInput, { style: styles.input, placeholder: "https://example.com/decoration.png", placeholderTextColor: "#666", value: storage.avatarDecoration, onChangeText: function(v) { storage.avatarDecoration = v } })
        ),
        React.createElement(View, { style: styles.section },
            React.createElement(Text, { style: styles.sectionTitle }, "Badges"),
            BADGES.map(function(badge) {
                return React.createElement(View, { key: badge.type, style: styles.badgeRow },
                    React.createElement(Text, { style: styles.label }, badge.label),
                    React.createElement(Switch, { value: !!storage.badges[badge.type], onValueChange: function() { storage.badges[badge.type] = !storage.badges[badge.type] } })
                )
            })
        ),
        React.createElement(View, { style: { height: 40 } })
    )
}

function applyFakes(user) {
    if (!user || !storage.enabled) return
    if (storage.username) user.username = storage.username
    if (storage.displayName) user.globalName = storage.displayName
    if (storage.email) user.email = storage.email
    if (storage.phone) user.phone = storage.phone
    if (storage.bio) user.bio = storage.bio
    if (storage.avatar) user.avatar = storage.avatar
    if (storage.banner) user.banner = storage.banner
    if (storage.avatarDecoration) user.avatarDecoration = storage.avatarDecoration
    var badgeFlags = calculateFlags(storage.badges)
    if (badgeFlags > 0 || storage.badges.nitro || storage.badges.nitro_boost || storage.badges.nitro_basic) {
        user.flags = badgeFlags
        user.publicFlags = badgeFlags
    }
    if (storage.premiumType) user.premiumType = storage.premiumType
}

var unpatch = null

function onLoad() {
    storage.enabled = storage.enabled !== undefined ? storage.enabled : true
    storage.username = storage.username || ""
    storage.displayName = storage.displayName || ""
    storage.email = storage.email || ""
    storage.phone = storage.phone || ""
    storage.bio = storage.bio || ""
    storage.avatar = storage.avatar || ""
    storage.banner = storage.banner || ""
    storage.avatarDecoration = storage.avatarDecoration || ""
    storage.premiumType = storage.premiumType || null
    storage.badges = storage.badges || {}

    var Dispatcher = findByProps("_dispatch", "dispatch")
    if (!Dispatcher) return
    var orig = Dispatcher.dispatch.bind(Dispatcher)
    Dispatcher.dispatch = function(e) {
        if (e && (e.type === "CURRENT_USER_UPDATE" || e.type === "CONNECTION_OPEN")) {
            if (e.user) applyFakes(e.user)
        }
        return orig(e)
    }
    unpatch = function() { Dispatcher.dispatch = orig }
}

function onUnload() {
    if (unpatch) { unpatch(); unpatch = null }
}
