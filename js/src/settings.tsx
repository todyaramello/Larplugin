import { ReactNative as RN } from '@vendetta/metro/common'
import { useProxy } from '@vendetta/storage'
import { vstorage } from './index'
import { BADGES } from './badges'

const { Text, TextInput, Switch, View, TouchableOpacity, ScrollView } = RN

const styles = RN.StyleSheet.create({
    container: { flex: 1, padding: 16 },
    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#333' },
    label: { color: '#fff', fontSize: 15 },
    input: { backgroundColor: '#2a2a2a', borderRadius: 8, padding: 10, color: '#fff', fontSize: 15, marginTop: 4 },
    badgeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#333' },
})

export default () => {
    useProxy(vstorage)

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <Text style={styles.label}>Fake Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter fake username"
                    placeholderTextColor="#666"
                    value={vstorage.username}
                    onChangeText={(v: string) => (vstorage.username = v)}
                />
                <Text style={[styles.label, { marginTop: 12 }]}>Fake Display Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter fake display name"
                    placeholderTextColor="#666"
                    value={vstorage.displayName}
                    onChangeText={(v: string) => (vstorage.displayName = v)}
                />
                <Text style={[styles.label, { marginTop: 12 }]}>Fake Bio</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter fake bio"
                    placeholderTextColor="#666"
                    value={vstorage.bio}
                    onChangeText={(v: string) => (vstorage.bio = v)}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact</Text>
                <Text style={styles.label}>Fake Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter fake email"
                    placeholderTextColor="#666"
                    value={vstorage.email}
                    onChangeText={(v: string) => (vstorage.email = v)}
                />
                <Text style={[styles.label, { marginTop: 12 }]}>Fake Phone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter fake phone number"
                    placeholderTextColor="#666"
                    value={vstorage.phone}
                    onChangeText={(v: string) => (vstorage.phone = v)}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Media</Text>
                <Text style={styles.label}>Fake Avatar URL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="https://example.com/avatar.png"
                    placeholderTextColor="#666"
                    value={vstorage.avatar}
                    onChangeText={(v: string) => (vstorage.avatar = v)}
                />
                <Text style={[styles.label, { marginTop: 12 }]}>Fake Banner URL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="https://example.com/banner.png"
                    placeholderTextColor="#666"
                    value={vstorage.banner}
                    onChangeText={(v: string) => (vstorage.banner = v)}
                />
                <Text style={[styles.label, { marginTop: 12 }]}>Fake Avatar Decoration URL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="https://example.com/decoration.png"
                    placeholderTextColor="#666"
                    value={vstorage.avatarDecoration}
                    onChangeText={(v: string) => (vstorage.avatarDecoration = v)}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Badges</Text>
                {BADGES.map(badge => (
                    <View key={badge.type} style={styles.badgeRow}>
                        <Text style={styles.label}>{badge.label}</Text>
                        <Switch
                            value={vstorage.badges[badge.type] ?? false}
                            onValueChange={() => {
                                vstorage.badges[badge.type] = !vstorage.badges[badge.type]
                            }}
                        />
                    </View>
                ))}
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    )
}
