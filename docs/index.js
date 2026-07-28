(()=>{
const s=vendetta.plugin.storage
const{FluxDispatcher}=vendetta.metro.common
const{Forms}=vendetta.ui.components
const{React}=vendetta.metro.common
const{useState}=React
const RN=vendetta.metro.common.ReactNative
const ScrollView=RN.ScrollView
const View=RN.View||null
const Text=RN.Text||null
const{FormInput,FormSwitchRow,FormSection}=Forms
const h=React.createElement
const findByStoreName=vendetta.metro.findByStoreName.bind(vendetta.metro)
const{findByProps}=vendetta.metro
const BADGE_MAP={staff:["staff","Discord Staff","5e74e9b61934fc1f67c65515d1f7e60d",1],partner:["partner","Partnered Server Owner","3f9748e53446a137a052f3454e2de41e",2],hypesquad_events:["hypesquad_events","HypeSquad Events","bf01d1073931f921909045f3a39fd264",4],bughunter_1:["bughunter_1","Bug Hunter Level 1","2717692c7dca7289b35297368a940dd0",8],bughunter_2:["bughunter_2","Bug Hunter Level 2","848f79194d4be5ff5f81505cbd0ce1e6",16384],hypesquad_bravery:["hypesquad_bravery","HypeSquad Bravery","8a88d63823d8a71cd5e390baa45efa02",64],hypesquad_brilliance:["hypesquad_brilliance","HypeSquad Brilliance","011940fd013da3f7fb926e4a1cd2e618",128],hypesquad_balance:["hypesquad_balance","HypeSquad Balance","3aa41de486fa12454c3761e8e223442e",256],early_supporter:["early_supporter","Early Supporter","7060786766c9c840eb3019e725d2b358",512],verified_developer:["verified_developer","Early Verified Bot Developer","6df5892e0f35b051f8b61eace34f4967",131072],certified_moderator:["certified_moderator","Moderator Programs Alumni","fee1624003e2fee35cb398e125dc479b",262144],active_developer:["active_developer","Active Developer","6bdc42827a38498929a4920da12695d9",4194304],nitro:["premium","Nitro","2ba85e8026a8614b640c2837bcdfe21b",0],bronze:["premium_tenure_1_month_v2","Nitro Bronze (1mo)","4f33c4a9c64ce221936bd256c356f91f",0],silver:["premium_tenure_3_month_v2","Nitro Silver (3mo)","4514fab914bdbfb4ad2fa23df76121a6",0],gold:["premium_tenure_6_month_v2","Nitro Gold (6mo)","2895086c18d5531d499862e41d1155a6",0],platinum:["premium_tenure_12_month_v2","Nitro Platinum (1yr)","0334688279c8359120922938dcb1d6f8",0],diamond:["premium_tenure_24_month_v2","Nitro Diamond (2yr)","0d61871f72bb9a33a7ae568c1fb4f20a",0],emerald:["premium_tenure_36_month_v2","Nitro Emerald (3yr)","11e2d339068b55d3a506cff34d3780f3",0],ruby:["premium_tenure_60_month_v2","Nitro Ruby (5yr)","cd5e2cfd9d7f27a8cdcd3e8a8d5dc9f4",0],opal:["premium_tenure_72_month_v2","Nitro Opal (6yr+)","5b154df19c53dce2af92c9b61e6be5e2",0],orb:["orb_profile_badge","Collected the Orb Profile Badge","83d8a1eb09a8d64e59233eec5d4d5c2d",0],booster:["guild_booster_lvl1","Server Booster","51040c70d4f20a921ad6674ff86fc95c",0]}
function calculateFlags(){let flags=0;for(const[k,[id,desc,icon,f]]of Object.entries(BADGE_MAP)){if(s.badges?.[k]&&f>0)flags|=f}return flags}
function getFakeBadges(){const r=[];for(const[k,[id,desc,icon]]of Object.entries(BADGE_MAP)){if(s.badges?.[k])r.push({id,description:desc,icon})}return r}
function applyFakes(user){if(!user||!s.enabled)return user;user.premiumType=2;user.premiumFlags=7;if(s.orbBalance){const n=parseInt(s.orbBalance);if(!isNaN(n))user.orbBalance=n};if(s.username)user.username=s.username;if(s.displayName)user.globalName=s.displayName;if(s.email)user.email=s.email;if(s.phone)user.phone=s.phone;if(s.bio)user.bio=s.bio;if(s.avatar)user.avatar=s.avatar;if(s.banner)user.banner=s.banner;if(s.avatarDecoration)user.avatarDecoration=s.avatarDecoration;if(s.joinYear){const d=new Date(parseInt(s.joinYear),Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).getTime();user.createdAt=d;user.timestamp=d};if(s.accent||s.accent2){const n1=s.accent?parseInt(s.accent.replace("#",""),16):0;const n2=s.accent2?parseInt(s.accent2.replace("#",""),16):0;const ok1=!isNaN(n1)&&s.accent;const ok2=!isNaN(n2)&&s.accent2;if(ok1)user.accentColor=n1;if(ok1||ok2)user.themeColors=[ok1?n1:n2,ok2?n2:n1]};const flags=calculateFlags();if(flags>0){user.flags=flags;user.publicFlags=flags};return user}
function refreshUser(){
const UserStore=findByStoreName("UserStore")
const raw=UserStore?.getCurrentUser?.()
if(!raw)return
const clone={...raw}
applyFakes(clone)
FluxDispatcher.dispatch({type:"CURRENT_USER_UPDATE",user:clone})
}
function refreshProfile(){
try{
const id=findByStoreName("UserStore")?.getCurrentUser()?.id
if(!id)return
const UPS=findByProps("getUserProfile","getGuildMemberProfile")
if(!UPS)return
const p=UPS.getUserProfile(id)
if(p)FluxDispatcher.dispatch({type:"USER_PROFILE_UPDATE",userProfile:{...p}})
}catch(e){}
}
let patches=[]
const COLORS=["#FF0000","#FF6600","#FFAA00","#FFFF00","#88FF00","#00FF44","#00FFAA","#00FFFF","#0088FF","#0044FF","#0000FF","#6600FF","#AA00FF","#FF00FF","#FF0088","#FF5555","#55FF55","#5555FF","#FFFFFF","#AAAAAA","#555555","#000000"]
function ColorRow({val,set,storeKey}){
const kids=[]
COLORS.forEach(function(c){
kids.push(h(View,{key:c,style:{width:36,height:36,margin:4,borderRadius:18,backgroundColor:c,borderWidth:2,borderColor:val===c?"#fff":"rgba(255,255,255,0.15)"},onTouchEnd:function(){set(c);s[storeKey]=c;refreshUser();setTimeout(refreshProfile,100)},onResponderGrant:function(){set(c);s[storeKey]=c;refreshUser();setTimeout(refreshProfile,100)},onStartShouldSetResponder:function(){return true}}))
})
return h(View,{style:{flexDirection:"row",flexWrap:"wrap",paddingHorizontal:12,paddingBottom:8}},...kids)
}
const BADGE_LIST=[{key:"staff",label:"Discord Staff"},{key:"partner",label:"Partnered Server Owner"},{key:"hypesquad_events",label:"HypeSquad Events"},{key:"bughunter_1",label:"Bug Hunter Level 1"},{key:"bughunter_2",label:"Bug Hunter Level 2"},{key:"hypesquad_bravery",label:"HypeSquad Bravery"},{key:"hypesquad_brilliance",label:"HypeSquad Brilliance"},{key:"hypesquad_balance",label:"HypeSquad Balance"},{key:"early_supporter",label:"Early Supporter"},{key:"verified_developer",label:"Early Verified Bot Developer"},{key:"certified_moderator",label:"Discord Certified Moderator"},{key:"active_developer",label:"Active Developer"},{key:"nitro",label:"Nitro"},{key:"bronze",label:"Nitro Bronze (1mo)"},{key:"silver",label:"Nitro Silver (3mo)"},{key:"gold",label:"Nitro Gold (6mo)"},{key:"platinum",label:"Nitro Platinum (1yr)"},{key:"diamond",label:"Nitro Diamond (2yr)"},{key:"emerald",label:"Nitro Emerald (3yr)"},{key:"ruby",label:"Nitro Ruby (5yr)"},{key:"opal",label:"Nitro Opal (6yr+)"},{key:"orb",label:"Orb Profile Badge"},{key:"booster",label:"Server Booster"}]
function Settings(){
const[e,setE]=useState(s.enabled)
const[un,setUn]=useState(s.username||"")
const[dn,setDn]=useState(s.displayName||"")
const[em,setEm]=useState(s.email||"")
const[ph,setPh]=useState(s.phone||"")
const[bi,setBi]=useState(s.bio||"")
const[av,setAv]=useState(s.avatar||"")
const[ba,setBa]=useState(s.banner||"")
const[ad,setAd]=useState(s.avatarDecoration||"")
const[jy,setJy]=useState(s.joinYear||"")
const[ac,setAc]=useState(s.accent||"")
const[ac2,setAc2]=useState(s.accent2||"")
const[ob,setOb]=useState(s.orbBalance||"")
const[pn,setPn]=useState("")
const[ps,setPs]=useState(getPresetNames())
const[bd,setBd]=useState(s.badges||{})
const[du,setDu]=useState(s.decosUnlocked||false)
return h(ScrollView,{style:{paddingBottom:24}},
h(FormSection,{title:"Toggle"},h(FormSwitchRow,{label:"Enable LarpPlugin",value:e,onValueChange:function(v){setE(v);s.enabled=v;refreshUser();setTimeout(refreshProfile,100)}})),
h(FormSection,{title:"Profile"},
h(FormInput,{title:"Fake Username",placeholder:"Enter fake username",value:un,onChange:function(v){setUn(v);s.username=v;refreshUser()}}),
h(FormInput,{title:"Fake Display Name",placeholder:"Enter fake display name",value:dn,onChange:function(v){setDn(v);s.displayName=v;refreshUser()}}),
h(FormInput,{title:"Fake Bio",placeholder:"Enter fake bio",value:bi,onChange:function(v){setBi(v);s.bio=v;refreshUser()}}),
h(FormInput,{title:"Fake Join Year",placeholder:"e.g. 2020 (random day/month)",value:jy,onChange:function(v){setJy(v);s.joinYear=v;refreshUser();setTimeout(refreshProfile,100)}}),
h(FormInput,{title:"Profile Accent Color",placeholder:"e.g. #FF0000",value:ac,onChange:function(v){setAc(v);s.accent=v;refreshUser();setTimeout(refreshProfile,100)}}),
View?h(ColorRow,{val:ac,set:setAc,storeKey:"accent"}):null,
h(FormInput,{title:"Profile Accent Color 2 (gradient)",placeholder:"e.g. #00FF00",value:ac2,onChange:function(v){setAc2(v);s.accent2=v;refreshUser();setTimeout(refreshProfile,100)}}),
View?h(ColorRow,{val:ac2,set:setAc2,storeKey:"accent2"}):null),
h(FormSection,{title:"Contact"},
h(FormInput,{title:"Fake Email",placeholder:"Enter fake email",value:em,onChange:function(v){setEm(v);s.email=v;refreshUser()}}),
h(FormInput,{title:"Fake Phone",placeholder:"Enter fake phone number",value:ph,onChange:function(v){setPh(v);s.phone=v;refreshUser()}})),
h(FormSection,{title:"Media (URLs - upload to a CDN first)"},
h(FormInput,{title:"Fake Avatar URL",placeholder:"https://i.imgur.com/...png",value:av,onChange:function(v){setAv(v);s.avatar=v;refreshUser()}}),
h(FormInput,{title:"Fake Banner URL",placeholder:"https://i.imgur.com/...png",value:ba,onChange:function(v){setBa(v);s.banner=v;refreshUser()}}),
h(FormInput,{title:"Fake Avatar Decoration URL",placeholder:"https://cdn.discord...",value:ad,onChange:function(v){setAd(v);s.avatarDecoration=v;refreshUser()}})),
h(FormSection,{title:"Badges"},BADGE_LIST.map(function(b){
const checked=bd[b.key]||false
return h(FormSwitchRow,{key:b.key,label:b.label,value:checked,onValueChange:function(v){const n={...bd};n[b.key]=v;setBd(n);s.badges=n;setTimeout(function(){refreshUser();refreshProfile()},0)}})
})),
h(FormSection,{title:"Profile Switcher (Save / Load)"},
h(FormInput,{title:"Preset Name",placeholder:"e.g. Admin, VIP, Mod",value:pn,onChange:function(v){setPn(v)}}),
View&&Text?h(View,{style:{flexDirection:"row",paddingHorizontal:12,paddingBottom:8}},
h(View,{style:{flex:1,height:44,paddingHorizontal:12,backgroundColor:"#5865F2",borderRadius:8,marginRight:4,alignItems:"center",justifyContent:"center"},onTouchEnd:function(){savePreset(pn);setPn("");setPs(getPresetNames())}},h(Text,{style:{color:"#fff",fontSize:14,fontWeight:"700"}},"Save")),
h(View,{style:{flex:1,height:44,paddingHorizontal:12,backgroundColor:"#4f545c",borderRadius:8,marginLeft:4,alignItems:"center",justifyContent:"center"},onTouchEnd:function(){setPn("");setPs(getPresetNames())}},h(Text,{style:{color:"#fff",fontSize:14,fontWeight:"700"}},"Refresh"))
):null,
ps.length&&Text?h(View,{style:{paddingHorizontal:12}},ps.map(function(n){
return h(View,{key:n,style:{flexDirection:"row",marginBottom:6,alignItems:"center"}},
h(View,{style:{flex:1,height:44,paddingHorizontal:12,backgroundColor:"#2f3136",borderRadius:8,marginRight:4,justifyContent:"center"},onStartShouldSetResponder:function(){return true},onTouchEnd:function(){loadPreset(n);refreshUser();setTimeout(refreshProfile,100);setPs(getPresetNames())}},h(Text,{style:{color:"#b9bbbe",fontSize:14}},"\u25B6 "+n)),
h(View,{style:{width:44,height:44,backgroundColor:"#ed4245",borderRadius:8,alignItems:"center",justifyContent:"center"},onTouchEnd:function(){deletePreset(n);setPs(getPresetNames())}},h(Text,{style:{color:"#fff",fontSize:16,fontWeight:"700"}},"X"))
)
})):null),
h(FormSection,{title:"Unlock"},
h(FormSwitchRow,{label:"Unlock All Decorations",value:du,onValueChange:function(v){setDu(v);s.decosUnlocked=v;if(v)setTimeout(patchDecorations,200)}})),
h(FormSection,{title:"Orbs"},
h(FormInput,{title:"Fake Orb Balance",placeholder:"e.g. 1000",value:ob,onChange:function(v){setOb(v);s.orbBalance=v;refreshUser();setTimeout(refreshProfile,100);setTimeout(patchOrbStore,200)}})))
}
let orbPatches=[]
function patchOrbStore(){
if(!s.enabled||!s.orbBalance)return
const bal=parseInt(s.orbBalance)
if(isNaN(bal))return
for(const p of orbPatches)try{p()}catch(e){}
orbPatches=[]
function makePatcher(store,k,orig){
store[k]=function(){
const r=orig.apply(this,arguments)
if(typeof r=="number")return bal
if(r&&typeof r=="object"){
if(typeof r.balance=="number"){r.balance=bal;r.balanceTotal=bal}
if(typeof r.amount=="number")r.amount=bal
if(typeof r.orbs=="number")r.orbs=bal
if(Array.isArray(r))for(const item of r){
if(item&&typeof item=="object"&&typeof item.amount=="number")item.amount=bal
}
return r
}
return r
}
}
function tryPatch(store){
if(!store)return
for(const k of Object.keys(store)){
if(typeof store[k]!="function")continue
const lbl=k.toLowerCase()
if(!lbl.includes("orb")&&!lbl.includes("balance")&&!lbl.includes("quest"))continue
const orig=store[k];makePatcher(store,k,orig)
orbPatches.push(function(){store[k]=orig})
}
}
for(const n of["QuestStore","OrbStore","OrbsStore"])tryPatch(findByStoreName(n))
tryPatch(findByProps("getOrbBalance","getOrbs","getOrbCount","getQuests"))
}
function loadSettings(obj){
if(!obj)return
for(const k of Object.keys(obj)){
if(k=="badges"||k=="presets")continue
if(typeof obj[k]=="string"||typeof obj[k]=="number"||typeof obj[k]=="boolean"){s[k]=obj[k]}
}
if(obj.badges){const b={};for(const kb of Object.keys(obj.badges))b[kb]=true;s.badges=b}
}
function savePreset(name){
if(!name||!name.trim())return
const preset={}
const keys=["username","displayName","email","phone","bio","avatar","banner","avatarDecoration","joinYear","accent","accent2","orbBalance"]
for(const k of keys)preset[k]=s[k]
preset.badges={};for(const k of Object.keys(s.badges||{}))if(s.badges[k])preset.badges[k]=true
const presets=s.presets||{}
presets[name.trim()]=preset
s.presets=presets
}
function loadPreset(name){
const presets=s.presets||{}
const p=presets[name]
if(!p)return
loadSettings(p)
}
function deletePreset(name){
const presets=s.presets||{}
delete presets[name];s.presets=presets
}
function getPresetNames(){return Object.keys(s.presets||{})}
let decoPatches=[]
function patchDecorations(){
if(!s.enabled)return
for(const p of decoPatches)try{p()}catch(e){}
decoPatches=[]
function tryPatchFn(props,key,fn){
try{
const m=findByProps(...props)
if(m&&typeof m[key]=="function"){const o=m[key];m[key]=fn;decoPatches.push(function(){m[key]=o})}
}catch(e){}
}
tryPatchFn(["isAvatarDecorationExpired","parseAvatarDecorationData"],"isAvatarDecorationExpired",function(){return false})

// parseAvatarDecorationData: wrap to add owned=true
try{
const m=findByProps("parseAvatarDecorationData","isAvatarDecorationExpired")
if(m&&typeof m.parseAvatarDecorationData=="function"){
const orig=m.parseAvatarDecorationData
m.parseAvatarDecorationData=function(){try{const r=orig.apply(this,arguments);if(Array.isArray(r))for(const d of r)if(d&&typeof d=="object"){d.owned=true;d.unlocked=true;d.canUse=true;d.locked=false;d.available=true};return r}catch(e){try{return orig.apply(this,arguments)}catch(e2){return arguments[0]||[]}}}
decoPatches.push(function(){m.parseAvatarDecorationData=orig})
}
}catch(e){}
// getPurchaseDisplayInfo: wrap to add isPurchased=true
try{
const m=findByProps("getPurchaseDisplayInfo","getAvatarDecorationPreviewUrl")
if(m&&typeof m.getPurchaseDisplayInfo=="function"){
const orig=m.getPurchaseDisplayInfo
m.getPurchaseDisplayInfo=function(){try{const r=orig.apply(this,arguments);if(r&&typeof r=="object"){r.isPurchased=true;r.owned=true;r.isSubscription=false};return r}catch(e){try{return orig.apply(this,arguments)}catch(e2){return arguments[0]||{isPurchased:true}}}}
decoPatches.push(function(){m.getPurchaseDisplayInfo=orig})
}
}catch(e){}
// EntitlementStore: isEntitledToSku always true
try{
const s=findByStoreName("EntitlementStore")
if(s&&typeof s.isEntitledToSku=="function"){
const orig=s.isEntitledToSku
s.isEntitledToSku=function(){return true}
decoPatches.push(function(){s.isEntitledToSku=orig})
}
}catch(e){}
}
return{
onLoad:function(){
s.enabled=s.enabled===undefined?true:s.enabled
const UserStore=findByStoreName("UserStore")
const orig=UserStore.getCurrentUser
UserStore.getCurrentUser=function(){const u=orig.apply(this,arguments);return u&&s.enabled?applyFakes(u):u}
patches.push(function(){UserStore.getCurrentUser=orig})
const origById=UserStore.getUser
if(origById){
UserStore.getUser=function(id){
const u=origById.apply(this,arguments)
if(!u||!s.enabled)return u
const cu=UserStore.getCurrentUser()
return cu&&id===cu.id?applyFakes(u):u
}
patches.push(function(){UserStore.getUser=origById})}
const UPS=findByProps("getUserProfile","getGuildMemberProfile")
if(UPS&&typeof UPS.getUserProfile==="function"){
const op=UPS.getUserProfile
const selfId=findByStoreName("UserStore")?.getCurrentUser()?.id
    UPS.getUserProfile=function(id){
      const p=op.apply(this,arguments)
      if(p&&s.enabled&&selfId&&id===selfId){
        const c={...p}
        c.badges=getFakeBadges()
        c.premiumType=2;c.premiumFlags=7
        if(s.orbBalance){const n=parseInt(s.orbBalance);if(!isNaN(n))c.orbBalance=n}
        if(s.accent||s.accent2){
          const n1=s.accent?parseInt(s.accent.replace("#",""),16):0
          const n2=s.accent2?parseInt(s.accent2.replace("#",""),16):0
          const ok1=!isNaN(n1)&&s.accent
          const ok2=!isNaN(n2)&&s.accent2
          if(ok1)c.accentColor=n1
          if(ok1||ok2)c.themeColors=[ok1?n1:n2,ok2?n2:n1]
        }
        return c
      }
      return p
    }
patches.push(function(){UPS.getUserProfile=op})
}
const SnowflakeUtils=findByProps("extractTimestamp","fromTimestamp")
if(SnowflakeUtils){
const origExt=SnowflakeUtils.extractTimestamp
const selfId=findByStoreName("UserStore")?.getCurrentUser()?.id
SnowflakeUtils.extractTimestamp=function(sn){
if(s.enabled&&s.joinYear&&selfId&&sn===selfId)return new Date(parseInt(s.joinYear),Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).getTime()
return origExt.apply(this,arguments)
}
patches.push(function(){SnowflakeUtils.extractTimestamp=origExt})
}
refreshUser()
setTimeout(refreshProfile,500)
setTimeout(patchOrbStore,1000)
if(s.decosUnlocked)setTimeout(patchDecorations,1500)
vendetta.logger.log("[LarpPlugin] Loaded")
},
onUnload:function(){
for(const p of patches)p()
patches=[]
vendetta.logger.log("[LarpPlugin] Unloaded")
},
settings:Settings}
})()