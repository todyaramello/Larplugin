// /eval - find modules with owned/unlocked/purchased function names near decoration/avatar
let out = "";

// Find ALL modules that have BOTH deco/avatar functions AND owned/purchased functions
try {
  const all = vendetta.metro.findAll(function(m) {
    if (!m || typeof m !== "object") return false;
    let hasDeco = false, hasOwned = false;
    try {
      for (const k of Object.keys(m)) {
        if (typeof m[k] !== "function") continue;
        const l = k.toLowerCase();
        if (l.includes("deco") || l.includes("avatar")) hasDeco = true;
        if (l.includes("owned") || l.includes("purchased") || l.includes("unlocked") || l === "canuse" || l.includes("entitle")) hasOwned = true;
        if (hasDeco && hasOwned) return true;
      }
    } catch(e) {}
    return false;
  });
  out += "=== Modules with deco+owned: " + (all ? all.length : 0) + " ===\n";
  if (all && all.length) {
    for (let i = 0; i < Math.min(all.length, 15); i++) {
      const m = all[i];
      const keys = Object.keys(m).filter(k => typeof m[k] === "function");
      out += "\nModule " + i + " (" + keys.length + " fns):\n";
      for (const k of keys) {
        const l = k.toLowerCase();
        if (l.includes("deco") || l.includes("avatar") || l.includes("owned") || l.includes("purchased") || l.includes("unlocked") || l === "canuse" || l.includes("entitle")) {
          out += "  " + k + "()\n";
        }
      }
      if (m.getName) try { out += "  getName: " + m.getName() + "\n"; } catch(e) {}
      if (m.displayName) out += "  displayName: " + m.displayName + "\n";
    }
  }
} catch(e) { out += "ERROR: " + e + "\n"; }

// Also find ALL modules with any owned/purchased function names
try {
  const ownedMods = vendetta.metro.findAll(function(m) {
    if (!m || typeof m !== "object") return false;
    try {
      for (const k of Object.keys(m)) {
        if (typeof m[k] !== "function") continue;
        const l = k.toLowerCase();
        if (l.includes("owned") || l.includes("purchased") || l.includes("unlocked")) return true;
      }
    } catch(e) {}
    return false;
  });
  out += "\n=== Modules with owned/purchased/unlocked: " + (ownedMods ? ownedMods.length : 0) + " ===\n";
  if (ownedMods && ownedMods.length) {
    for (let i = 0; i < Math.min(ownedMods.length, 10); i++) {
      const m = ownedMods[i];
      const keys = Object.keys(m).filter(k => typeof m[k] === "function");
      const relevant = keys.filter(k => { const l = k.toLowerCase(); return l.includes("owned") || l.includes("purchased") || l.includes("unlocked") || l.includes("deco") || l.includes("avatar"); });
      out += "\nMod " + i + ": " + relevant.join(", ") + "\n";
      if (m.getName) try { out += "  getName: " + m.getName() + "\n"; } catch(e) {}
    }
  }
} catch(e) { out += "ERROR2: " + e + "\n"; }

try { navigator.clipboard.writeText(out); out += "\n\n(COPIED)"; } catch(e) { out += "\n\n(CLIP FAILED)"; }
out
