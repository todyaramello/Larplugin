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
const BADGES={staff:1,partner:2,hypesquad_events:4,bughunter_1:8,bughunter_2:16384,hypesquad_bravery:64,hypesquad_brilliance:128,hypesquad_balance:256,early_supporter:512,verified_developer:131072,certified_moderator:262144,active_developer:4194304,http_interactions:524288}
function calculateFlags(badges){let flags=0;for(const[key,flag]of Object.entries(BADGES)){if(badges[key]&&flag>0)flags|=flag}return flags}
function applyFakes(user){if(!user||!s.enabled)return user;if(Object.isFrozen(user)||Object.isSealed(user))user=Object.assign({},user);if(s.username)user.username=s.username;if(s.displayName)user.globalName=s.displayName;if(s.email)user.email=s.email;if(s.phone)user.phone=s.phone;if(s.bio)user.bio=s.bio;if(s.avatar)user.avatar=s.avatar;if(s.banner)user.banner=s.banner;if(s.avatarDecoration)user.avatarDecoration=s.avatarDecoration;const flags=calculateFlags(s.badges||{});if(flags>0||s.badges&&s.badges.nitro||s.badges&&s.badges.nitro_boost||s.badges&&s.badges.nitro_basic){user.flags=flags;user.publicFlags=flags}if(s.premiumType)user.premiumType=s.premiumType;return user}
let patches=[]
const BADGE_LIST=[{key:"staff",label:"Discord Staff"},{key:"partner",label:"Partnered Server Owner"},{key:"hypesquad_events",label:"HypeSquad Events"},{key:"bughunter_1",label:"Bug Hunter Level 1"},{key:"bughunter_2",label:"Bug Hunter Level 2"},{key:"hypesquad_bravery",label:"HypeSquad Bravery"},{key:"hypesquad_brilliance",label:"HypeSquad Brilliance"},{key:"hypesquad_balance",label:"HypeSquad Balance"},{key:"early_supporter",label:"Early Supporter"},{key:"verified_developer",label:"Early Verified Bot Developer"},{key:"certified_moderator",label:"Discord Certified Moderator"},{key:"active_developer",label:"Active Developer"},{key:"http_interactions",label:"HTTP Interactions"},{key:"nitro",label:"Nitro"},{key:"nitro_boost",label:"Server Boosting"},{key:"nitro_basic",label:"Nitro Basic"}]
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
h(FormSection,{title:"Toggle"},h(FormSwitchRow,{label:"Enable LarpPlugin",value:e,onValueChange:function(v){setE(v);s.enabled=v}})),
h(FormSection,{title:"Profile"},
h(FormInput,{title:"Fake Username",placeholder:"Enter fake username",value:un,onChange:function(v){setUn(v);s.username=v}}),
h(FormInput,{title:"Fake Display Name",placeholder:"Enter fake display name",value:dn,onChange:function(v){setDn(v);s.displayName=v}}),
h(FormInput,{title:"Fake Bio",placeholder:"Enter fake bio",value:bi,onChange:function(v){setBi(v);s.bio=v}})),
h(FormSection,{title:"Contact"},
h(FormInput,{title:"Fake Email",placeholder:"Enter fake email",value:em,onChange:function(v){setEm(v);s.email=v}}),
h(FormInput,{title:"Fake Phone",placeholder:"Enter fake phone number",value:ph,onChange:function(v){setPh(v);s.phone=v}})),
h(FormSection,{title:"Media"},
h(FormInput,{title:"Fake Avatar URL",placeholder:"https://example.com/avatar.png",value:av,onChange:function(v){setAv(v);s.avatar=v}}),
h(FormInput,{title:"Fake Banner URL",placeholder:"https://example.com/banner.png",value:ba,onChange:function(v){setBa(v);s.banner=v}}),
h(FormInput,{title:"Fake Avatar Decoration URL",placeholder:"https://example.com/decoration.png",value:ad,onChange:function(v){setAd(v);s.avatarDecoration=v}})),
h(FormSection,{title:"Badges"},BADGE_LIST.map(function(b){
const checked=bd[b.key]||false
return h(FormSwitchRow,{key:b.key,label:b.label,value:checked,onValueChange:function(v){const n={...bd};n[b.key]=v;setBd(n);s.badges=n}})
})))
}
return{
onLoad:function(){
s.enabled=s.enabled===undefined?true:s.enabled
const UserStore=findByStoreName("UserStore")
const fakeUser=UserStore?.getCurrentUser?.()
if(fakeUser){const mod=applyFakes(fakeUser);if(mod!==fakeUser)FluxDispatcher.dispatch({type:"CURRENT_USER_UPDATE",user:mod})}
const origGetUser=UserStore.getCurrentUser
UserStore.getCurrentUser=function(){
const u=origGetUser.apply(this,arguments)
return u&&s.enabled?applyFakes(u):u
}
patches.push(function(){UserStore.getCurrentUser=origGetUser})
const origGetUserById=UserStore.getUser
if(origGetUserById){
UserStore.getUser=function(id){
const u=origGetUserById.apply(this,arguments)
return u&&s.enabled?applyFakes(u):u
}
patches.push(function(){UserStore.getUser=origGetUserById})
}
vendetta.logger.log("[LarpPlugin] Loaded")
},
onUnload:function(){
for(const p of patches)p()
patches=[]
vendetta.logger.log("[LarpPlugin] Unloaded")
},
settings:Settings}
})()