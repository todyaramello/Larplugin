(()=>{
const s=vendetta.plugin.storage
const{FluxDispatcher}=vendetta.metro.common
const{Forms}=vendetta.ui.components
const RN=vendetta.metro.common.ReactNative
const h=vendetta.metro.common.React.createElement
const{FormInput,FormSwitchRow,FormSection}=Forms
const{findByProps}=vendetta.metro
const findByStoreName=vendetta.metro.findByStoreName.bind(vendetta.metro)
const BADGE_MAP={staff:["staff","Discord Staff","5e74e9b61934fc1f67c65515d1f7e60d",1],partner:["partner","Partnered Server Owner","3f9748e53446a137a052f3454e2de41e",2],hypesquad_events:["hypesquad_events","HypeSquad Events","bf01d1073931f921909045f3a39fd264",4],bughunter_1:["bughunter_1","Bug Hunter Level 1","2717692c7dca7289b35297368a940dd0",8],bughunter_2:["bughunter_2","Bug Hunter Level 2","848f79194d4be5ff5f81505cbd0ce1e6",16384],hypesquad_bravery:["hypesquad_bravery","HypeSquad Bravery","8a88d63823d8a71cd5e390baa45efa02",64],hypesquad_brilliance:["hypesquad_brilliance","HypeSquad Brilliance","011940fd013da3f7fb926e4a1cd2e618",128],hypesquad_balance:["hypesquad_balance","HypeSquad Balance","3aa41de486fa12454c3761e8e223442e",256],early_supporter:["early_supporter","Early Supporter","7060786766c9c840eb3019e725d2b358",512],verified_developer:["verified_developer","Early Verified Bot Developer","6df5892e0f35b051f8b61eace34f4967",131072],certified_moderator:["certified_moderator","Moderator Programs Alumni","fee1624003e2fee35cb398e125dc479b",262144],active_developer:["active_developer","Active Developer","6bdc42827a38498929a4920da12695d9",4194304],nitro:["premium","Nitro","2ba85e8026a8614b640c2837bcdfe21b",0],nitro_1y:["premium_tenure_12_month","Nitro 1 Year","3393b2ca6e25e40d4bb3bd23d60d0cdd",0],booster:["guild_booster_lvl1","Server Booster","51040c70d4f20a921ad6674ff86fc95c",0]}
function calculateFlags(){let flags=0;for(const[k,[id,desc,icon,f]]of Object.entries(BADGE_MAP)){if(s.badges?.[k]&&f>0)flags|=f}return flags}
function getFakeBadges(){const r=[];for(const[k,[id,desc,icon]]of Object.entries(BADGE_MAP)){if(s.badges?.[k])r.push({id,description:desc,icon})}return r}
function applyFakes(user){if(!user||!s.enabled)return user;if(s.username)user.username=s.username;if(s.displayName)user.globalName=s.displayName;if(s.email)user.email=s.email;if(s.phone)user.phone=s.phone;if(s.bio)user.bio=s.bio;if(s.avatar)user.avatar=s.avatar;if(s.banner)user.banner=s.banner;if(s.avatarDecoration)user.avatarDecoration=s.avatarDecoration;if(s.joinYear){const d=new Date(parseInt(s.joinYear),Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).getTime();user.createdAt=d;user.timestamp=d};if(s.accent){const n=parseInt(s.accent.replace("#",""),16);if(!isNaN(n))user.accentColor=n};const flags=calculateFlags();if(flags>0){user.flags=flags;user.publicFlags=flags};return user}
function refreshUser(){
const UserStore=findByStoreName("UserStore")
const raw=UserStore?.getCurrentUser?.()
if(!raw)return
const clone={...raw}
applyFakes(clone)
FluxDispatcher.dispatch({type:"CURRENT_USER_UPDATE",user:clone})
}
function refreshProfile(){
const selfId=findByStoreName("UserStore")?.getCurrentUser()?.id
if(!selfId)return
const UPS=findByProps("getUserProfile","getGuildMemberProfile")
if(!UPS||typeof UPS.getUserProfile!=="function")return
const raw=UPS.getUserProfile(selfId)
if(!raw)return
const clone={...raw}
clone.badges=getFakeBadges()
if(s.joinYear){const d=new Date(parseInt(s.joinYear),Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).getTime();clone.joinedAt=d;clone.createdAt=d};if(s.accent){const n=parseInt(s.accent.replace("#",""),16);if(!isNaN(n)){clone.accentColor=n;clone.themeColors=[n,n]}}FluxDispatcher.dispatch({type:"USER_PROFILE_UPDATE",userProfile:clone})
}
let patches=[]
const BADGE_LIST=[{key:"staff",label:"Discord Staff"},{key:"partner",label:"Partnered Server Owner"},{key:"hypesquad_events",label:"HypeSquad Events"},{key:"bughunter_1",label:"Bug Hunter Level 1"},{key:"bughunter_2",label:"Bug Hunter Level 2"},{key:"hypesquad_bravery",label:"HypeSquad Bravery"},{key:"hypesquad_brilliance",label:"HypeSquad Brilliance"},{key:"hypesquad_balance",label:"HypeSquad Balance"},{key:"early_supporter",label:"Early Supporter"},{key:"verified_developer",label:"Early Verified Bot Developer"},{key:"certified_moderator",label:"Discord Certified Moderator"},{key:"active_developer",label:"Active Developer"},{key:"nitro",label:"Nitro"},{key:"nitro_1y",label:"Nitro 1 Year"},{key:"booster",label:"Server Booster"}]
function Settings(){
const[useState]=vendetta.metro.common.React&&vendetta.metro.common.React.useState?[vendetta.metro.common.React.useState]:[]
const[useEffect]=vendetta.metro.common.React&&vendetta.metro.common.React.useEffect?[vendetta.metro.common.React.useEffect]:[]
if(!useState)return h(RN.View,null,h(RN.Text,null,"React hooks unavailable"))
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
const[bd,setBd]=useState(s.badges||{})
return h(RN.ScrollView,{style:{paddingBottom:24}},
h(FormSection,{title:"Toggle"},h(FormSwitchRow,{label:"Enable LarpPlugin",value:e,onValueChange:function(v){setE(v);s.enabled=v;refreshUser();setTimeout(refreshProfile,100)}})),
h(FormSection,{title:"Profile"},
h(FormInput,{title:"Fake Username",placeholder:"Enter fake username",value:un,onChange:function(v){setUn(v);s.username=v;refreshUser()}}),
h(FormInput,{title:"Fake Display Name",placeholder:"Enter fake display name",value:dn,onChange:function(v){setDn(v);s.displayName=v;refreshUser()}}),
h(FormInput,{title:"Fake Bio",placeholder:"Enter fake bio",value:bi,onChange:function(v){setBi(v);s.bio=v;refreshUser()}}),
h(FormInput,{title:"Fake Join Year",placeholder:"e.g. 2020 (random day/month)",value:jy,onChange:function(v){setJy(v);s.joinYear=v;refreshUser();setTimeout(refreshProfile,100)}}),
h(FormInput,{title:"Profile Accent Color",placeholder:"e.g. #FF0000",value:ac,onChange:function(v){setAc(v);s.accent=v;refreshUser();setTimeout(refreshProfile,100)}})),
h(FormSection,{title:"Media"},h(RN.TouchableOpacity,{style:{backgroundColor:"#5865F2",padding:12,borderRadius:8,marginBottom:8,alignItems:"center"},onPress:function(){let I;try{I=vendetta.metro.findByProps("launchImageLibrary")}catch(e){}if(I&&I.launchImageLibrary){I.launchImageLibrary({mediaType:"photo",quality:1},function(r){if(r.assets&&r.assets[0]?.uri){setAv(r.assets[0].uri);s.avatar=r.assets[0].uri;refreshUser()}})}else{console.warn("[LarpPlugin] No image picker")}}},h(RN.Text,{style:{color:"#fff",fontWeight:"600"}},"Pick Avatar")),av?h(RN.Image,{source:{uri:av},style:{width:64,height:64,borderRadius:32,marginBottom:8}}):null,h(FormInput,{title:"Avatar URL",placeholder:"Or paste URL",value:av,onChange:function(v){setAv(v);s.avatar=v;refreshUser()}}),h(RN.TouchableOpacity,{style:{backgroundColor:"#5865F2",padding:12,borderRadius:8,marginBottom:8,alignItems:"center"},onPress:function(){let I;try{I=vendetta.metro.findByProps("launchImageLibrary")}catch(e){}if(I&&I.launchImageLibrary){I.launchImageLibrary({mediaType:"photo",quality:1},function(r){if(r.assets&&r.assets[0]?.uri){setBa(r.assets[0].uri);s.banner=r.assets[0].uri;refreshUser()}})}else{console.warn("[LarpPlugin] No image picker")}}},h(RN.Text,{style:{color:"#fff",fontWeight:"600"}},"Pick Banner")),ba?h(RN.Image,{source:{uri:ba},style:{width:"100%",height:96,borderRadius:8,marginBottom:8}}):null,h(FormInput,{title:"Banner URL",placeholder:"Or paste URL",value:ba,onChange:function(v){setBa(v);s.banner=v;refreshUser()}}),h(RN.TouchableOpacity,{style:{backgroundColor:"#5865F2",padding:12,borderRadius:8,marginBottom:8,alignItems:"center"},onPress:function(){let I;try{I=vendetta.metro.findByProps("launchImageLibrary")}catch(e){}if(I&&I.launchImageLibrary){I.launchImageLibrary({mediaType:"photo",quality:1},function(r){if(r.assets&&r.assets[0]?.uri){setAd(r.assets[0].uri);s.avatarDecoration=r.assets[0].uri;refreshUser()}})}else{console.warn("[LarpPlugin] No image picker")}}},h(RN.Text,{style:{color:"#fff",fontWeight:"600"}},"Pick Decoration")),ad?h(RN.Image,{source:{uri:ad},style:{width:64,height:64,borderRadius:32,marginBottom:8}}):null,h(FormInput,{title:"Decoration URL",placeholder:"Or paste URL",value:ad,onChange:function(v){setAd(v);s.avatarDecoration=v;refreshUser()}})),
h(FormSection,{title:"Badges"},BADGE_LIST.map(function(b){
const checked=bd[b.key]||false
return h(FormSwitchRow,{key:b.key,label:b.label,value:checked,onValueChange:function(v){const n={...bd};n[b.key]=v;setBd(n);s.badges=n;setTimeout(function(){refreshUser();refreshProfile()},0)}})
})))
}
return{
onLoad:function(){
s.enabled=s.enabled===undefined?true:s.enabled
try{
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
let IU;try{IU=vendetta.metro.findByProps("getUserAvatarURL","getUserBannerURL")}catch(e){}
if(IU){
const origAvatar=IU.getUserAvatarURL
if(origAvatar){
IU.getUserAvatarURL=function(){
const a=arguments,f=a[0],id=f&&typeof f==="object"?f.id:f
if(s.enabled&&s.avatar&&id===UserStore.getCurrentUser()?.id)return s.avatar
return origAvatar.apply(this,arguments)
}
patches.push(function(){IU.getUserAvatarURL=origAvatar})
}
const origBanner=IU.getUserBannerURL
if(origBanner){
IU.getUserBannerURL=function(){
const a=arguments,f=a[0],id=f&&typeof f==="object"?f.id:f
if(s.enabled&&s.banner&&id===UserStore.getCurrentUser()?.id)return s.banner
return origBanner.apply(this,arguments)
}
patches.push(function(){IU.getUserBannerURL=origBanner})
}
}
const UPS=findByProps("getUserProfile","getGuildMemberProfile")
if(UPS&&typeof UPS.getUserProfile==="function"){
const op=UPS.getUserProfile
const selfId=findByStoreName("UserStore")?.getCurrentUser()?.id
UPS.getUserProfile=function(id){
const p=op.apply(this,arguments)
if(p&&s.enabled&&selfId&&id===selfId){
const c={...p}
c.badges=getFakeBadges()
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
console.log("[LarpPlugin] Loaded")
}catch(e){console.error("[LarpPlugin] Load error:",e)}
},
onUnload:function(){
for(const p of patches)p()
patches=[]
console.log("[LarpPlugin] Unloaded")
},
settings:Settings}
})()