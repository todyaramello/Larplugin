// /eval - find the function that controls decoration lock state
let out = "";

// Find module with AvatarDecorationsAbstractUI and dump its relevant function bodies
try {
  const mod = vendetta.metro.findByProps("AvatarDecorationsAbstractUI");
  if (mod) {
    const keys = Object.keys(mod).filter(k => typeof mod[k] === "function");
    out += "=== AvatarDecorationsAbstractUI module (" + keys.length + " fns) ===\n";
    // Look for functions containing "locked", "owned", "purchased", "canUse", "premium" in their body
    for (const k of keys) {
      try {
        const src = mod[k].toString().toLowerCase();
        if (src.includes("locked") || src.includes("owned") || src.includes("purchased") || src.includes("canuse") || src.includes("unlock") || src.includes("entitle") || src.includes("deco") && src.includes("premium")) {
          out += "\n" + k + "() mentions lock/owned/purchase:\n";
          // Show first 300 chars of the function body
          let s = mod[k].toString();
          if (s.length > 500) s = s.substring(0, 500) + "...";
          out += s + "\n";
        }
      } catch(e) {}
    }
  }
} catch(e) { out += "ERROR: " + e + "\n"; }

// Also find parseAvatarDecorationData and show its body
try {
  const m = vendetta.metro.findByProps("parseAvatarDecorationData", "isAvatarDecorationExpired");
  if (m && typeof m.parseAvatarDecorationData === "function") {
    let s = m.parseAvatarDecorationData.toString();
    if (s.length > 1000) s = s.substring(0, 1000) + "...";
    out += "\n=== parseAvatarDecorationData body ===\n" + s + "\n";
  }
} catch(e) {}

// Also dump the entire module that has parseAvatarDecorationData
try {
  const m = vendetta.metro.findByProps("parseAvatarDecorationData", "isAvatarDecorationExpired");
  if (m) {
    const keys = Object.keys(m).filter(k => typeof m[k] === "function");
    out += "\n=== parseAvatarDecorationData module (" + keys.length + " fns) ===\n";
    for (const k of keys) {
      try {
        const src = m[k].toString().toLowerCase();
        if (src.length > 50) src.substring(0, 100);
        out += k + "(): " + (src.length > 80 ? src.substring(0, 80) + "..." : src) + "\n";
      } catch(e) {}
    }
  }
} catch(e) {}

try { navigator.clipboard.writeText(out); out += "\n\n(COPIED)"; } catch(e) { out += "\n\n(CLIP FAILED)"; }
out
