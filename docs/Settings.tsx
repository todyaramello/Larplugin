import { React, ReactNative } from "@vendetta/metro/common"
import { storage } from "@vendetta/plugin"
import { Forms } from "@vendetta/ui/components"

const { ScrollView } = ReactNative
const { FormInput, FormSection, FormSwitchRow } = Forms

const BADGE_LIST = [
    { key: "staff", label: "Discord Staff" },
    { key: "partner", label: "Partnered Server Owner" },
    { key: "hypesquad_events", label: "HypeSquad Events" },
    { key: "bughunter_1", label: "Bug Hunter Level 1" },
    { key: "bughunter_2", label: "Bug Hunter Level 2" },
    { key: "hypesquad_bravery", label: "HypeSquad Bravery" },
    { key: "hypesquad_brilliance", label: "HypeSquad Brilliance" },
    { key: "hypesquad_balance", label: "HypeSquad Balance" },
    { key: "early_supporter", label: "Early Supporter" },
    { key: "verified_developer", label: "Early Verified Bot Developer" },
    { key: "certified_moderator", label: "Discord Certified Moderator" },
    { key: "active_developer", label: "Active Developer" },
    { key: "http_interactions", label: "HTTP Interactions" },
    { key: "nitro", label: "Nitro" },
    { key: "nitro_boost", label: "Server Boosting" },
    { key: "nitro_basic", label: "Nitro Basic" },
]

export default function Settings() {
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

    return (
        <ScrollView style={{ paddingBottom: 24 }}>
            <FormSection title="Toggle">
                <FormSwitchRow
                    label="Enable LarpPlugin"
                    value={storage.enabled}
                    onValueChange={(v: boolean) => (storage.enabled = v)}
                />
            </FormSection>

            <FormSection title="Profile">
                <FormInput
                    title="Fake Username"
                    placeholder="Enter fake username"
                    value={storage.username}
                    onChange={(v: string) => (storage.username = v)}
                />
                <FormInput
                    title="Fake Display Name"
                    placeholder="Enter fake display name"
                    value={storage.displayName}
                    onChange={(v: string) => (storage.displayName = v)}
                />
                <FormInput
                    title="Fake Bio"
                    placeholder="Enter fake bio"
                    value={storage.bio}
                    onChange={(v: string) => (storage.bio = v)}
                />
            </FormSection>

            <FormSection title="Contact">
                <FormInput
                    title="Fake Email"
                    placeholder="Enter fake email"
                    value={storage.email}
                    onChange={(v: string) => (storage.email = v)}
                />
                <FormInput
                    title="Fake Phone"
                    placeholder="Enter fake phone number"
                    value={storage.phone}
                    onChange={(v: string) => (storage.phone = v)}
                />
            </FormSection>

            <FormSection title="Media">
                <FormInput
                    title="Fake Avatar URL"
                    placeholder="https://example.com/avatar.png"
                    value={storage.avatar}
                    onChange={(v: string) => (storage.avatar = v)}
                />
                <FormInput
                    title="Fake Banner URL"
                    placeholder="https://example.com/banner.png"
                    value={storage.banner}
                    onChange={(v: string) => (storage.banner = v)}
                />
                <FormInput
                    title="Fake Avatar Decoration URL"
                    placeholder="https://example.com/decoration.png"
                    value={storage.avatarDecoration}
                    onChange={(v: string) => (storage.avatarDecoration = v)}
                />
            </FormSection>

            <FormSection title="Badges">
                {BADGE_LIST.map((badge) => (
                    <FormSwitchRow
                        key={badge.key}
                        label={badge.label}
                        value={storage.badges?.[badge.key] ?? false}
                        onValueChange={(v: boolean) => {
                            if (!storage.badges) storage.badges = {}
                            storage.badges[badge.key] = v
                        }}
                    />
                ))}
            </FormSection>
        </ScrollView>
    )
}
