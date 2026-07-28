import { ReactNative } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";

const { ScrollView } = ReactNative;
const { FormInput, FormSwitchRow, FormSection } = Forms;

const typedStorage = storage as typeof storage & {
  enabled: boolean;
  username: string;
  displayName: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  banner: string;
  avatarDecoration: string;
  premiumType: string | null;
  badges: Record<string, boolean>;
};

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
];

export default function Settings() {
  useProxy(typedStorage);

  return (
    <ScrollView style={{ paddingBottom: 24 }}>
      <FormSection title="Toggle">
        <FormSwitchRow
          label="Enable LarpPlugin"
          value={typedStorage.enabled}
          onValueChange={(v: boolean) => (typedStorage.enabled = v)}
        />
      </FormSection>

      <FormSection title="Profile">
        <FormInput
          title="Fake Username"
          placeholder="Enter fake username"
          value={typedStorage.username}
          onChange={(v: string) => (typedStorage.username = v)}
        />
        <FormInput
          title="Fake Display Name"
          placeholder="Enter fake display name"
          value={typedStorage.displayName}
          onChange={(v: string) => (typedStorage.displayName = v)}
        />
        <FormInput
          title="Fake Bio"
          placeholder="Enter fake bio"
          value={typedStorage.bio}
          onChange={(v: string) => (typedStorage.bio = v)}
        />
      </FormSection>

      <FormSection title="Contact">
        <FormInput
          title="Fake Email"
          placeholder="Enter fake email"
          value={typedStorage.email}
          onChange={(v: string) => (typedStorage.email = v)}
        />
        <FormInput
          title="Fake Phone"
          placeholder="Enter fake phone number"
          value={typedStorage.phone}
          onChange={(v: string) => (typedStorage.phone = v)}
        />
      </FormSection>

      <FormSection title="Media">
        <FormInput
          title="Fake Avatar URL"
          placeholder="https://example.com/avatar.png"
          value={typedStorage.avatar}
          onChange={(v: string) => (typedStorage.avatar = v)}
        />
        <FormInput
          title="Fake Banner URL"
          placeholder="https://example.com/banner.png"
          value={typedStorage.banner}
          onChange={(v: string) => (typedStorage.banner = v)}
        />
        <FormInput
          title="Fake Avatar Decoration URL"
          placeholder="https://example.com/decoration.png"
          value={typedStorage.avatarDecoration}
          onChange={(v: string) => (typedStorage.avatarDecoration = v)}
        />
      </FormSection>

      <FormSection title="Badges">
        {BADGE_LIST.map((badge) => (
          <FormSwitchRow
            key={badge.key}
            label={badge.label}
            value={typedStorage.badges?.[badge.key] ?? false}
            onValueChange={(v: boolean) => {
              if (!typedStorage.badges) typedStorage.badges = {};
              typedStorage.badges[badge.key] = v;
            }}
          />
        ))}
      </FormSection>
    </ScrollView>
  );
}
