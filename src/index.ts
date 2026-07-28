import { FluxDispatcher } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { logger } from "@vendetta";
import Settings from "./Settings";

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

const BADGES: Record<string, number> = {
  staff: 1,
  partner: 2,
  hypesquad_events: 4,
  bughunter_1: 8,
  bughunter_2: 16,
  hypesquad_bravery: 32,
  hypesquad_brilliance: 64,
  hypesquad_balance: 128,
  early_supporter: 256,
  verified_developer: 512,
  certified_moderator: 262144,
  active_developer: 4194304,
  http_interactions: 8388608,
};

function calculateFlags(badges: Record<string, boolean>): number {
  let flags = 0;
  for (const [key, flag] of Object.entries(BADGES)) {
    if (badges[key] && flag > 0) flags |= flag;
  }
  return flags;
}

function applyFakes(user: any) {
  if (!user || !typedStorage.enabled) return;

  if (typedStorage.username) user.username = typedStorage.username;
  if (typedStorage.displayName) user.globalName = typedStorage.displayName;
  if (typedStorage.email) user.email = typedStorage.email;
  if (typedStorage.phone) user.phone = typedStorage.phone;
  if (typedStorage.bio) user.bio = typedStorage.bio;
  if (typedStorage.avatar) user.avatar = typedStorage.avatar;
  if (typedStorage.banner) user.banner = typedStorage.banner;
  if (typedStorage.avatarDecoration) user.avatarDecoration = typedStorage.avatarDecoration;

  const flags = calculateFlags(typedStorage.badges ?? {});
  if (flags > 0 || typedStorage.badges?.nitro || typedStorage.badges?.nitro_boost || typedStorage.badges?.nitro_basic) {
    user.flags = flags;
    user.publicFlags = flags;
  }
  if (typedStorage.premiumType) user.premiumType = typedStorage.premiumType;
}

let origDispatch: any = null;

function onDispatch(e: any) {
  if (e && (e.type === "CURRENT_USER_UPDATE" || e.type === "CONNECTION_OPEN")) {
    if (e.user) applyFakes(e.user);
  }
  return origDispatch(e);
}

export default {
  onLoad() {
    typedStorage.enabled ??= true;
    typedStorage.username ??= "";
    typedStorage.displayName ??= "";
    typedStorage.email ??= "";
    typedStorage.phone ??= "";
    typedStorage.bio ??= "";
    typedStorage.avatar ??= "";
    typedStorage.banner ??= "";
    typedStorage.avatarDecoration ??= "";
    typedStorage.premiumType ??= null;
    typedStorage.badges ??= {};

    origDispatch = FluxDispatcher.dispatch.bind(FluxDispatcher);
    FluxDispatcher.dispatch = onDispatch;
    logger.log("[LarpPlugin] Loaded and patching dispatch");
  },

  onUnload() {
    if (origDispatch) {
      FluxDispatcher.dispatch = origDispatch;
      origDispatch = null;
    }
    logger.log("[LarpPlugin] Unloaded");
  },

  settings: Settings,
};
