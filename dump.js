// Paste into /eval in Discord
let out = "";

// 1. Search stores by name
const storeNames = ["AvatarDecorationStore","DecorationStore","DecorationInventoryStore","AvatarDecorationInventoryStore","PremiumSubscriptionStore","CollectiblesStore","InventoryStore","ShopStore","EntitlementStore","GiftStore","PremiumStore","SubscriptionStore","UserStore"];
for (const n of storeNames) {
  try {
    const s = vendetta.metro.findByStoreName(n);
    if (s) {
      out += "\n=== STORE: " + n + " ===\n";
      const keys = Object.keys(s).filter(k => typeof s[k] === "function");
      out += "Methods: " + keys.join(", ") + "\n";
      // Try calling getState or similar
      if (typeof s.getState === "function") {
        try { const st = s.getState(); out += "State keys: " + Object.keys(st||{}).join(", ") + "\n"; } catch(e) {}
      }
    } else {
      out += "\n" + n + ": NOT FOUND\n";
    }
  } catch(e) { out += "\n" + n + ": ERROR " + e + "\n"; }
}

// 2. Find modules with specific prop combinations
const propGroups = [
  ["canUseAvatarDecoration","getAvatarDecorations"],
  ["canUseDecoration","isDecorationUnlocked"],
  ["isAvatarDecorationOwned","getOwnedAvatarDecorationIds"],
  ["isAvatarDecorationUnlocked","hasAvatarDecoration"],
  ["isDecorationUnlocked","getDecorationById"],
  ["getAvatarDecoration","getAvatarDecorations"]
];
out += "\n=== findByProps results ===\n";
for (const props of propGroups) {
  try {
    const m = vendetta.metro.findByProps(...props);
    if (m) {
      out += "\nProps " + props.join("/") + ": FOUND\n";
      const keys = Object.keys(m).filter(k => typeof m[k] === "function");
      out += "  Methods: " + keys.join(", ") + "\n";
      if (m.displayName) out += "  displayName: " + m.displayName + "\n";
      // Try getting module ID or name
      if (m.getName) try { out += "  getName: " + m.getName() + "\n"; } catch(e) {}
    } else {
      out += "\nProps " + props.join("/") + ": NOT FOUND\n";
    }
  } catch(e) { out += "\nProps " + props.join("/") + ": ERROR " + e + "\n"; }
}

// 3. Find ALL stores (Flux stores) and check for decoration-related methods
out += "\n=== ALL STORES with deco methods ===\n";
try {
  const allMods = vendetta.metro.findAllModules(m => m && typeof m === "object" && m.getName && typeof m.getName === "function");
  for (const mod of allMods) {
    try {
      const name = mod.getName();
      const keys = Object.keys(mod).filter(k => typeof mod[k] === "function");
      const decoKeys = keys.filter(k => {
        const l = k.toLowerCase();
        return l.includes("deco") || l.includes("avatar") || l.includes("premium") || l.includes("collect") || l.includes("inventory") || l.includes("owned");
      });
      if (decoKeys.length > 0) {
        out += "\n" + name + " (" + keys.length + " methods)\n";
        out += "  Relevant: " + decoKeys.join(", ") + "\n";
      }
    } catch(e) {}
  }
} catch(e) { out += "findAllModules error: " + e + "\n"; }

// 4. Check User.getCurrentUser() for premium/deco fields
try {
  const u = vendetta.metro.findByStoreName("UserStore").getCurrentUser();
  if (u) {
    out += "\n=== Current User fields ===\n";
    const relevant = ["premiumType","premiumFlags","flags","publicFlags","avatarDecoration","avatar","banner","accentColor","themeColors"];
    for (const k of relevant) {
      out += k + ": " + JSON.stringify(u[k]) + "\n";
    }
  }
} catch(e) {}

// 5. Check UserProfile for current user
try {
  const id = vendetta.metro.findByStoreName("UserStore").getCurrentUser().id;
  const ups = vendetta.metro.findByProps("getUserProfile","getGuildMemberProfile");
  if (ups) {
    const p = ups.getUserProfile(id);
    if (p) {
      out += "\n=== Self Profile fields ===\n";
      const relevant = ["premiumType","premiumFlags","badges","avatarDecoration","accentColor","themeColors","banner"];
      for (const k of relevant) {
        out += k + ": " + JSON.stringify(p[k]) + "\n";
      }
    }
  }
} catch(e) {}

// Copy to clipboard
try { navigator.clipboard.writeText(out); out += "\n\n(COPIED TO CLIPBOARD)"; } catch(e) { out += "\n\n(CLIPBOARD FAILED: " + e + ")"; }
out
