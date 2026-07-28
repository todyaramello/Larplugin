(()=>{
const s=vendetta.plugin.storage
const{FluxDispatcher}=vendetta.metro.common
const{Forms}=vendetta.ui.components
const{React}=vendetta.metro.common
const{useState}=React
const{ScrollView}=vendetta.metro.common.ReactNative
const{FormInput,FormSwitchRow,FormSection}=Forms
const h=React.createElement
const findByStoreName=vendetta.metro.findByStoreName.bind(vendetta.metro)
const{findByProps}=vendetta.metro
const BADGE_MAP={staff:["staff","Discord Staff","5e4e1f11c6cba8b1480b41d1217f0e5f",1],partner:["partner","Partnered Server Owner","b3e38948063a8d5c20af237494528ef9",2],hypesquad_events:["hypesquad_events","HypeSquad Events","25c4f8ab18d1321e26e973beab095c7b",4],bughunter_1:["bughunter_1","Bug Hunter Level 1","072e623499a38c0b95cc9a29e3ed8e67",8],bughunter_2:["bughunter_2","Bug Hunter Level 2","74cf4dbdfb085f2a2b3c622c4554c196",16384],hypesquad_bravery:["hypesquad_bravery","HypeSquad Bravery","3968c3e7c33389fb40b0f9501cd51077",64],hypesquad_brilliance:["hypesquad_brilliance","HypeSquad Brilliance","d977210c1be5f6a54b5bdc4fc58eaec1",128],hypesquad_balance:["hypesquad_balance","HypeSquad Balance","4eeff5b791e81040e5346c770549f1ce",256],early_supporter:["early_supporter","Early Supporter","95e26575f22df266cdd0cfc7c5b4a24e",512],verified_developer:["verified_developer","Early Verified Bot Developer","83afc7ffc863ec583c23adfce0f33ca3",131072],certified_moderator:["certified_moderator","Discord Certified Moderator","d06e1a7a67c4ef767f1ea15e3ed0a3b0",262144],active_developer:["active_developer","Active Developer","9b5aacc1c658a3a3c7fe3f7fefd455db",4194304],http_interactions:["http_interactions","HTTP Interactions","4eb674de176bac9f9f5b6a9f067989d6",524288]}
function calculateFlags(){let flags=0;for(const[k,[id,desc,icon,f]]of Object.entries(BADGE_MAP)){if(s.badges?.[k])flags|=f}return flags}
function applyFakes(user){if(!user||!s.enabled)return user;if(s.username)user.username=s.username;if(s.displayName)user.globalName=s.displayName;if(s.email)user.email=s.email;if(s.phone)user.phone=s.phone;if(s.bio)user.bio=s.bio;if(s.avatar)user.avatar=s.avatar;if(s.banner)user.banner=s.banner;if(s.avatarDecoration)user.avatarDecoration=s.avatarDecoration;const flags=calculateFlags();if(flags>0){user.flags=flags;user.publicFlags=flags};return user}
function getFakeBadges(){const r=[];for(const[k,[id,desc,icon]]of Object.entries(BADGE_MAP)){if(s.badges?.[k])r.push({id,description:desc,icon})}return r}
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
const UPS=findByStoreName("UserProfileStore")||findByProps("getUserProfile","getGuildMemberProfile")
if(!UPS||typeof UPS.getUserProfile!=="function"){vendetta.logger.log("[LarpPlugin] No UserProfileStore");return}
const raw=UPS.getUserProfile(selfId)
if(!raw){vendetta.logger.log("[LarpPlugin] No profile for",selfId);return}
const clone={...raw}
clone.badges=getFakeBadges()
FluxDispatcher.dispatch({type:"USER_PROFILE_UPDATE",userProfile:clone})
FluxDispatcher.dispatch({type:"USER_PROFILE_FETCH_SUCCESS",userId:selfId,user:clone})
}
let patches=[]
const BADGE_LIST=[{key:"staff",label:"Discord Staff"},{key:"partner",label:"Partnered Server Owner"},{key:"hypesquad_events",label:"HypeSquad Events"},{key:"bughunter_1",label:"Bug Hunter Level 1"},{key:"bughunter_2",label:"Bug Hunter Level 2"},{key:"hypesquad_bravery",label:"HypeSquad Bravery"},{key:"hypesquad_brilliance",label:"HypeSquad Brilliance"},{key:"hypesquad_balance",label:"HypeSquad Balance"},{key:"early_supporter",label:"Early Supporter"},{key:"verified_developer",label:"Early Verified Bot Developer"},{key:"certified_moderator",label:"Discord Certified Moderator"},{key:"active_developer",label:"Active Developer"},{key:"http_interactions",label:"HTTP Interactions"}]
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
const[bd,setBd]=useState(s.badges||{})
return h(ScrollView,{style:{paddingBottom:24}},
h(FormSection,{title:"Toggle"},h(FormSwitchRow,{label:"Enable LarpPlugin",value:e,onValueChange:function(v){setE(v);s.enabled=v;refreshUser();setTimeout(refreshProfile,100)}})),
h(FormSection,{title:"Profile"},
h(FormInput,{title:"Fake Username",placeholder:"Enter fake username",value:un,onChange:function(v){setUn(v);s.username=v;refreshUser()}}),
h(FormInput,{title:"Fake Display Name",placeholder:"Enter fake display name",value:dn,onChange:function(v){setDn(v);s.displayName=v;refreshUser()}}),
h(FormInput,{title:"Fake Bio",placeholder:"Enter fake bio",value:bi,onChange:function(v){setBi(v);s.bio=v;refreshUser()}})),
h(FormSection,{title:"Contact"},
h(FormInput,{title:"Fake Email",placeholder:"Enter fake email",value:em,onChange:function(v){setEm(v);s.email=v;refreshUser()}}),
h(FormInput,{title:"Fake Phone",placeholder:"Enter fake phone number",value:ph,onChange:function(v){setPh(v);s.phone=v;refreshUser()}})),
h(FormSection,{title:"Media"},
h(FormInput,{title:"Fake Avatar URL",placeholder:"https://example.com/avatar.png",value:av,onChange:function(v){setAv(v);s.avatar=v;refreshUser()}}),
h(FormInput,{title:"Fake Banner URL",placeholder:"https://example.com/banner.png",value:ba,onChange:function(v){setBa(v);s.banner=v;refreshUser()}}),
h(FormInput,{title:"Fake Avatar Decoration URL",placeholder:"https://example.com/decoration.png",value:ad,onChange:function(v){setAd(v);s.avatarDecoration=v;refreshUser()}})),
h(FormSection,{title:"Badges"},BADGE_LIST.map(function(b){
const checked=bd[b.key]||false
return h(FormSwitchRow,{key:b.key,label:b.label,value:checked,onValueChange:function(v){const n={...bd};n[b.key]=v;setBd(n);s.badges=n;setTimeout(function(){refreshUser();refreshProfile()},0)}})
})))
}
return{
onLoad:function(){
s.enabled=s.enabled===undefined?true:s.enabled
const UserStore=findByStoreName("UserStore")
const orig=UserStore.getCurrentUser
UserStore.getCurrentUser=function(){const u=orig.apply(this,arguments);return u&&s.enabled?applyFakes(u):u}
patches.push(function(){UserStore.getCurrentUser=orig})
const origById=UserStore.getUser
if(origById){UserStore.getUser=function(id){const u=origById.apply(this,arguments);return u&&s.enabled?applyFakes(u):u}
patches.push(function(){UserStore.getUser=origById})}
const UPS=findByStoreName("UserProfileStore")||findByProps("getUserProfile","getGuildMemberProfile")
vendetta.logger.log("[LarpPlugin] UserProfileStore:",!!UPS,"getUserProfile:",typeof UPS?.getUserProfile)
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
refreshUser()
setTimeout(refreshProfile,500)
vendetta.logger.log("[LarpPlugin] Loaded")
},
onUnload:function(){
for(const p of patches)p()
patches=[]
vendetta.logger.log("[LarpPlugin] Unloaded")
},
settings:Settings}
})()