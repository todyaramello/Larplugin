// Paste into /eval AFTER opening the decoration picker (the screen with locked decorations)
let out = "";

// 1. Dump ALL store states to find decoration data
const allNames = ["UserStore","UserProfileStore","ProfileStore","EntitlementStore","SubscriptionStore","ApplicationStore","GuildStore","ChannelStore","MessageStore","PresenceStore","RelationshipStore","FriendStore","GuildMemberStore","GuildRoleStore","ThreadStore","ForumStore","MediaEngineStore","StoreListingStore","SKUStore","PaymentStore","BillingStore","GiftCodeStore","ThemeStore","WallpaperStore","ProfileEffectStore","SoundboardStore","StickerStore","StickerPackStore","CustomEmojiStore","VoiceStateStore","StreamStore","CallStore","ActivityStore","LURKER_STORE","GuildFolderStore","NotificationSettingsStore","GuildTemplateStore","GuildJoinRequestStore","GuildOnboardingStore","GuildHomeStore","GuildProductStore","GuildRoleSubscriptionStore","RTCConnectionStore","RTCVoiceStore","HelpStore"];
for (const n of allNames) {
  try {
    const s = vendetta.metro.findByStoreName(n);
    if (s && typeof s.getState === "function") {
      const state = s.getState();
      const stateStr = JSON.stringify(state).toLowerCase();
      if (stateStr.includes("deco") || stateStr.includes("avatar") || stateStr.includes("premium") || stateStr.includes("collectible")) {
        out += "\n=== " + n + " (getState) ===\n";
        const keys = Object.keys(state);
        const relKeys = keys.filter(k => k.toLowerCase().includes("deco") || k.toLowerCase().includes("avatar") || k.toLowerCase().includes("premium") || k.toLowerCase().includes("collectible"));
        out += "Relevant keys: " + relKeys.join(", ") + "\n";
        for (const k of relKeys) {
          out += k + " = " + JSON.stringify(state[k]).substring(0, 300) + "\n";
        }
      }
    } else if (s) {
      // No getState, try checking all props
      const keys = Object.getOwnPropertyNames(s);
      const relKeys = keys.filter(k => (k.toLowerCase().includes("deco") || k.toLowerCase().includes("avatar") || k.toLowerCase().includes("premium") || k.toLowerCase().includes("collectible")) && typeof s[k] !== "function");
      if (relKeys.length > 0) {
        out += "\n=== " + n + " (non-fn props) ===\n";
        for (const k of relKeys) {
          try { out += k + " = " + JSON.stringify(s[k]).substring(0, 200) + "\n"; } catch(e) {}
        }
      }
    }
  } catch(e) { }
}

// 2. Search ALL objects on window that have "decoration" in property names
out += "\n=== Window objects with decoration props ===\n";
try {
  for (const wkey of Object.keys(window)) {
    try {
      const wv = window[wkey];
      if (wv && typeof wv === "object" && !Array.isArray(wv) && wv.constructor === Object) {
        const keys = Object.keys(wv);
        const decoKeys = keys.filter(k => k.toLowerCase().includes("deco") || k.toLowerCase().includes("avatar"));
        if (decoKeys.length > 0) {
          out += "window." + wkey + " has: " + decoKeys.join(", ") + "\n";
        }
      }
    } catch(e) {}
  }
} catch(e) {}

// 3. Check what modules exist that have "avatar" or "decoration" in ANY property value
out += "\n=== Module search (non-function props with deco/avatar values) ===\n";
try {
  // Try vendetta.metro._req or similar
  if (vendetta.metro._req) {
    out += "_req exists\n";
  }
  // Check vendetta.metro for internal module registry
  const metroKeys = Object.keys(vendetta.metro);
  out += "vendetta.metro keys: " + metroKeys.join(", ") + "\n";
} catch(e) {}

try { navigator.clipboard.writeText(out); out += "\n\n(COPIED)"; } catch(e) { out += "\n\n(CLIP FAILED)"; }
out
