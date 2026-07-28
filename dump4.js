// /eval with decoration picker OPEN - uses vendetta.metro.findAll (which exists)
let out = "";

// 1. Find ALL modules with decoration-related method names
try {
  const mods = vendetta.metro.findAll(function(m) {
    if (!m || typeof m !== "object") return false;
    try {
      for (const k of Object.keys(m)) {
        if (typeof m[k] !== "function") continue;
        const l = k.toLowerCase();
        if (l.includes("deco") || l.includes("inventory") || (l.includes("avatar") && l.includes("deco"))) return true;
      }
    } catch(e) {}
    return false;
  });
  out += "=== Decoration modules found: " + (mods ? mods.length : 0) + " ===\n";
  if (mods && mods.length) {
    for (let i = 0; i < Math.min(mods.length, 10); i++) {
      const m = mods[i];
      const keys = Object.keys(m).filter(k => typeof m[k] === "function");
      out += "\nModule " + i + ":\n";
      for (const k of keys) {
        const l = k.toLowerCase();
        if (l.includes("deco") || l.includes("invent") || l.includes("collect")) {
          out += "  " + k + "()\n";
        }
      }
      // Try getName
      if (m.getName) try { out += "  getName: " + m.getName() + "\n"; } catch(e) {}
      if (m.displayName) out += "  displayName: " + m.displayName + "\n";
    }
    if (mods.length > 10) out += "... and " + (mods.length - 10) + " more\n";
  }
} catch(e) { out += "findAll error: " + e + "\n"; }

// 2. Find any module with "avatarDecoration" or "canUseAvatar" in any method's source code
try {
  const mods2 = vendetta.metro.findAll(function(m) {
    if (!m || typeof m !== "object") return false;
    try {
      for (const k of Object.keys(m)) {
        if (typeof m[k] !== "function") continue;
        const src = m[k].toString().toLowerCase();
        if (src.includes("avatardecoration") || src.includes("canuseavatar") || src.includes("isavatar") || src.includes("decorationunlocked") || src.includes("ownedavatar")) return true;
      }
    } catch(e) {}
    return false;
  });
  out += "\n=== Modules with deco function BODIES found: " + (mods2 ? mods2.length : 0) + " ===\n";
  if (mods2 && mods2.length) {
    for (let i = 0; i < Math.min(mods2.length, 5); i++) {
      const m = mods2[i];
      const keys = Object.keys(m).filter(k => typeof m[k] === "function");
      out += "\nModule " + i + " (" + keys.length + " fns):\n";
      if (m.getName) try { out += "  getName: " + m.getName() + "\n"; } catch(e) {}
      if (m.displayName) out += "  displayName: " + m.displayName + "\n";
      for (const k of keys) {
        try {
          const src = m[k].toString().toLowerCase();
          if (src.includes("avatar") || src.includes("deco") || src.includes("owned")) {
            out += "  " + k + "() [MATCH]\n";
          }
        } catch(e) {}
      }
    }
  }
} catch(e) { out += "findAll2 error: " + e + "\n"; }

// 3. Check modules registry directly
try {
  if (vendetta.metro.modules) {
    out += "\n=== modules registry: " + vendetta.metro.modules.length + " total ===\n";
  }
} catch(e) {}

try { navigator.clipboard.writeText(out); out += "\n\n(COPIED)"; } catch(e) { out += "\n\n(CLIP FAILED)"; }
out
