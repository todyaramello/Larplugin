import { ReactNative as RN } from '@vendetta/metro/common'
import { useProxy } from '@vendetta/storage'
import { getAssetIDByName } from '@vendetta/ui/assets'
import { Forms } from '@vendetta/ui/components'
import { vstorage } from './index'
import { BADGES } from './badges'

const { FormSwitchRow, FormInput, FormRow } = Forms

export default () => {
    useProxy(vstorage)

    return (
        <RN.ScrollView style={{ flex: 1 }}>
            <FormRow
                label="Enable Larping"
                subLabel="Toggle all fake profile data on or off"
                leading={<FormRow.Icon source={getAssetIDByName('ic_pencil')} />}
                trailing={
                    <FormSwitchRow
                        value={vstorage.enabled}
                        onValueChange={() => (vstorage.enabled = !vstorage.enabled)}
                    />
                }
            />
            <RN.View style={{ height: 12 }} />
            <FormRow
                label="Fake Username"
                subLabel="Your fake username shown everywhere"
                leading={<FormRow.Icon source={getAssetIDByName('ic_pencil')} />}
            />
            <FormInput
                title=""
                placeholder="Enter fake username"
                value={vstorage.username}
                onChange={(v: string) => (vstorage.username = v)}
                style={{ marginTop: -25, marginHorizontal: 12 }}
            />
            <FormRow
                label="Fake Display Name"
                subLabel="Your fake display name"
                leading={<FormRow.Icon source={getAssetIDByName('ic_pencil')} />}
            />
            <FormInput
                title=""
                placeholder="Enter fake display name"
                value={vstorage.displayName}
                onChange={(v: string) => (vstorage.displayName = v)}
                style={{ marginTop: -25, marginHorizontal: 12 }}
            />
            <FormRow
                label="Fake Email"
                subLabel="Your fake email shown in settings"
                leading={<FormRow.Icon source={getAssetIDByName('ic_pencil')} />}
            />
            <FormInput
                title=""
                placeholder="Enter fake email"
                value={vstorage.email}
                onChange={(v: string) => (vstorage.email = v)}
                style={{ marginTop: -25, marginHorizontal: 12 }}
            />
            <FormRow
                label="Fake Phone"
                subLabel="Your fake phone number"
                leading={<FormRow.Icon source={getAssetIDByName('ic_pencil')} />}
            />
            <FormInput
                title=""
                placeholder="Enter fake phone number"
                value={vstorage.phone}
                onChange={(v: string) => (vstorage.phone = v)}
                style={{ marginTop: -25, marginHorizontal: 12 }}
            />
            <FormRow
                label="Fake Bio"
                subLabel="Your fake about me"
                leading={<FormRow.Icon source={getAssetIDByName('ic_pencil')} />}
            />
            <FormInput
                title=""
                placeholder="Enter fake bio"
                value={vstorage.bio}
                onChange={(v: string) => (vstorage.bio = v)}
                style={{ marginTop: -25, marginHorizontal: 12 }}
            />
            <FormRow
                label="Fake Avatar URL"
                subLabel="URL to your fake avatar image"
                leading={<FormRow.Icon source={getAssetIDByName('ic_pencil')} />}
            />
            <FormInput
                title=""
                placeholder="https://example.com/avatar.png"
                value={vstorage.avatar}
                onChange={(v: string) => (vstorage.avatar = v)}
                style={{ marginTop: -25, marginHorizontal: 12 }}
            />
            <FormRow
                label="Fake Banner URL"
                subLabel="URL to your fake banner image"
                leading={<FormRow.Icon source={getAssetIDByName('ic_pencil')} />}
            />
            <FormInput
                title=""
                placeholder="https://example.com/banner.png"
                value={vstorage.banner}
                onChange={(v: string) => (vstorage.banner = v)}
                style={{ marginTop: -25, marginHorizontal: 12 }}
            />
            <FormRow
                label="Fake Avatar Decoration URL"
                subLabel="URL to your fake avatar decoration"
                leading={<FormRow.Icon source={getAssetIDByName('ic_pencil')} />}
            />
            <FormInput
                title=""
                placeholder="https://example.com/decoration.png"
                value={vstorage.avatarDecoration}
                onChange={(v: string) => (vstorage.avatarDecoration = v)}
                style={{ marginTop: -25, marginHorizontal: 12 }}
            />
            <RN.View style={{ height: 20 }} />
            <FormRow
                label="Fake Badges"
                subLabel="Select which fake badges to display"
                leading={<FormRow.Icon source={getAssetIDByName('StaffBadgeIcon')} />}
            />
            {BADGES.map(badge => (
                <FormSwitchRow
                    key={badge.type}
                    label={badge.label}
                    value={vstorage.badges[badge.type] ?? false}
                    onValueChange={() => {
                        vstorage.badges[badge.type] = !vstorage.badges[badge.type]
                    }}
                    leading={<FormRow.Icon source={getAssetIDByName(badge.icon)} />}
                />
            ))}
            <RN.View style={{ height: 30 }} />
        </RN.ScrollView>
    )
}
