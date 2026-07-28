// /eval - dump the full deco+purchase module
let out = "";

try {
  const m = vendetta.metro.findByProps("getAvatarDecorationPreviewUrl", "getPurchaseDisplayInfo");
  if (m) {
    const keys = Object.keys(m).filter(k => typeof m[k] === "function");
    out += "=== Module (" + keys.length + " fns): " + keys.join(", ") + " ===\n";
    for (const k of keys) {
      // Try calling with no args to see return values
      try {
        const ret = m[k]();
        out += k + "() -> " + JSON.stringify(ret).substring(0, 200) + "\n";
      } catch(e) {
        out += k + "() -> ERROR: " + e.toString().substring(0, 80) + "\n";
      }
    }
    if (m.getName) try { out += "getName: " + m.getName() + "\n"; } catch(e) {}
    if (m.displayName) out += "displayName: " + m.displayName + "\n";
  } else {
    out += "Module NOT FOUND\n";
  }
} catch(e) { out += "ERROR: " + e + "\n"; }

try { navigator.clipboard.writeText(out); out += "\n\n(COPIED)"; } catch(e) { out += "\n\n(CLIP FAILED)"; }
out
