(()=>{
const s=vendetta.plugin.storage
const{FluxDispatcher}=vendetta.metro.common
const{Forms}=vendetta.ui.components
const RN=vendetta.metro.common.ReactNative
const k=vendetta.metro.common.React.createElement
const{FormInput,FormSwitchRow,FormSection}=Forms
const{findByProps}=vendetta.metro
const findByStoreName=vendetta.metro.findByStoreName.bind(vendetta.metro)
let p;try{p=findByProps("after","before","instead")}catch(e){}
const after=p&&p.after?p.after:null
const COLORS=["#5865F2","#57F287","#FEE75C","#ED4245","#EB459E","#FF8C00","#9B59B6","#1ABC9C","#00AFFA","#FFFFFF","#95A5A6","#000000"]
const BADGE_MAP={staff:["staff","Discord Staff","5e74e9b61934fc1f67c65515d1f7e60d",1],partner:["partner","Partnered Server Owner","3f9748e53446a137a052f3454e2de41e",2],hypesquad_events:["hypesquad_events","HypeSquad Events","bf01d1073931f921909045f3a39fd264",4],bughunter_1:["bughunter_1","Bug Hunter Level 1","2717692c7dca7289b35297368a940dd0",8],bughunter_2:["bughunter_2","Bug Hunter Level 2","848f79194d4be5ff5f81505cbd0ce1e6",16384],hypesquad_bravery:["hypesquad_bravery","HypeSquad Bravery","8a88d63823d8a71cd5e390baa45efa02",64],hypesquad_brilliance:["hypesquad_brilliance","HypeSquad Brilliance","011940fd013da3f7fb926e4a1cd2e618",128],hypesquad_balance:["hypesquad_balance","HypeSquad Balance","3aa41de486fa12454c3761e8e223442e",256],early_supporter:["early_supporter","Early Supporter","7060786766c9c840eb3019e725d2b358",512],verified_developer:["verified_developer","Early Verified Bot Developer","6df5892e0f35b051f8b61eace34f4967",131072],certified_moderator:["certified_moderator","Moderator Programs Alumni","fee1624003e2fee35cb398e125dc479b",262144],active_developer:["active_developer","Active Developer","6bdc42827a38498929a4920da12695d9",4194304],nitro:["premium","Nitro","2ba85e8026a8614b640c2837bcdfe21b",0],nitro_1y:["premium_tenure_12_month","Nitro 1 Year","3393b2ca6e25e40d4bb3bd23d60d0cdd",0],booster:["guild_booster_lvl1","Server Booster","51040c70d4f20a921ad6674ff86fc95c",0]}
function flags(){let f=0;for(const[k,[,,,,x=0]]of Object.entries(BADGE_MAP)){if(s.badges?.[k])f|=x}return f}
function fakeBadges(){const r=[];for(const[k,[id,desc,icon]]of Object.entries(BADGE_MAP)){if(s.badges?.[k])r.push({id,description:desc,icon})}return r}
function themeColors(){const n1=parseInt((s.accent||"#5865F2").replace("#",""),16);const n2=parseInt((s.accent2||s.accent||"#5865F2").replace("#",""),16);return isNaN(n1)||isNaN(n2)?null:[n1,n2]}
function currentId(){const us=findByStoreName("UserStore");return us?us.getCurrentUser()?.id:null}
let patches=[]
function forceUpdate(){
const id=currentId()
if(!id)return
const us=findByStoreName("UserStore")
const up=findByProps("getUserProfile","getGuildMemberProfile")
if(us){const c=us.getCurrentUser();if(c)FluxDispatcher.dispatch({type:"CURRENT_USER_UPDATE",user:{...c}})}
if(up){const p=up.getUserProfile(id);if(p)FluxDispatcher.dispatch({type:"USER_PROFILE_UPDATE",userProfile:{...p}})}
}
const BADGE_LIST=[{key:"staff",label:"Discord Staff"},{key:"partner",label:"Partnered Server Owner"},{key:"hypesquad_events",label:"HypeSquad Events"},{key:"bughunter_1",label:"Bug Hunter Level 1"},{key:"bughunter_2",label:"Bug Hunter Level 2"},{key:"hypesquad_bravery",label:"HypeSquad Bravery"},{key:"hypesquad_brilliance",label:"HypeSquad Brilliance"},{key:"hypesquad_balance",label:"HypeSquad Balance"},{key:"early_supporter",label:"Early Supporter"},{key:"verified_developer",label:"Early Verified Bot Developer"},{key:"certified_moderator",label:"Discord Certified Moderator"},{key:"active_developer",label:"Active Developer"},{key:"nitro",label:"Nitro"},{key:"nitro_1y",label:"Nitro 1 Year"},{key:"booster",label:"Server Booster"}]
function Settings(){
const{useState}=vendetta.metro.common.React||{}
const[e,setE]=useState(s.enabled)
const[un,setUn]=useState(s.username||"")
const[dn,setDn]=useState(s.displayName||"")
const[bi,setBi]=useState(s.bio||"")
const[av,setAv]=useState(s.avatar||"")
const[ba,setBa]=useState(s.banner||"")
const[ad,setAd]=useState(s.avatarDecoration||"")
const[jy,setJy]=useState(s.joinYear||"")
const[ac1,setAc1]=useState(s.accent||"")
const[ac2,setAc2]=useState(s.accent2||"")
const[bd,setBd]=useState(s.badges||{})
return k(RN.ScrollView,{style:{paddingBottom:24}},
k(FormSection,{title:"Toggle"},k(FormSwitchRow,{label:"Enable LarpPlugin",value:e,onValueChange:function(v){setE(v);s.enabled=v;setTimeout(forceUpdate,100)}})),
k(FormSection,{title:"Profile"},
k(FormInput,{title:"Fake Username",placeholder:"Enter fake username",value:un,onChange:function(v){setUn(v);s.username=v;setTimeout(forceUpdate,100)}}),
k(FormInput,{title:"Fake Display Name",placeholder:"Enter fake display name",value:dn,onChange:function(v){setDn(v);s.displayName=v;setTimeout(forceUpdate,100)}}),
k(FormInput,{title:"Fake Bio",placeholder:"Enter fake bio",value:bi,onChange:function(v){setBi(v);s.bio=v;setTimeout(forceUpdate,100)}}),
k(FormInput,{title:"Fake Join Year",placeholder:"e.g. 2016",value:jy,onChange:function(v){setJy(v);s.joinYear=v;setTimeout(forceUpdate,100)}})),
k(FormSection,{title:"Theme Colors"},
k(FormInput,{title:"Color 1 (gradient left)",placeholder:"#5865F2",value:ac1,onChange:function(v){setAc1(v);s.accent=v;setTimeout(forceUpdate,100)}}),
k(FormInput,{title:"Color 2 (gradient right)",placeholder:"#5865F2",value:ac2,onChange:function(v){setAc2(v);s.accent2=v;setTimeout(forceUpdate,100)}})),
k(FormSection,{title:"Media"},
k(FormInput,{title:"Avatar URL",placeholder:"https://i.imgur.com/...png",value:av,onChange:function(v){setAv(v);s.avatar=v;setTimeout(forceUpdate,100)}}),
k(FormInput,{title:"Banner URL",placeholder:"https://i.imgur.com/...png",value:ba,onChange:function(v){setBa(v);s.banner=v;setTimeout(forceUpdate,100)}}),
k(FormInput,{title:"Decoration URL",placeholder:"https://cdn.discord...",value:ad,onChange:function(v){setAd(v);s.avatarDecoration=v;setTimeout(forceUpdate,100)}})),
k(FormSection,{title:"Badges"},BADGE_LIST.map(function(b){
const checked=bd[b.key]||false
return k(FormSwitchRow,{key:b.key,label:b.label,value:checked,onValueChange:function(v){const n={...bd};n[b.key]=v;setBd(n);s.badges=n;setTimeout(forceUpdate,100)}})
})))
}
return{
onLoad:function(){
s.enabled=s.enabled===undefined?true:s.enabled
try{
const UserStore=findByStoreName("UserStore")
const selfId=UserStore?.getCurrentUser?.()?.id
const origCU=UserStore.getCurrentUser
UserStore.getCurrentUser=function(){
const u=origCU.apply(this,arguments)
if(!u||!s.enabled)return u
const c={...u}
if(s.username)c.username=s.username
if(s.displayName)c.globalName=s.displayName
if(s.bio)c.bio=s.bio
if(s.joinYear)c.createdAt=new Date(parseInt(s.joinYear),Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).getTime()
const f=flags()
if(f>0)c.publicFlags=f
return c
}
patches.push(function(){UserStore.getCurrentUser=origCU})
const origGU=UserStore.getUser
if(origGU){
UserStore.getUser=function(id){
const u=origGU.apply(this,arguments)
if(!u||!s.enabled||id!==selfId)return u
const c={...u}
if(s.username)c.username=s.username
if(s.displayName)c.globalName=s.displayName
if(s.bio)c.bio=s.bio
if(s.joinYear)c.createdAt=new Date(parseInt(s.joinYear),Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).getTime()
const f=flags()
if(f>0)c.publicFlags=f
return c
}
patches.push(function(){UserStore.getUser=origGU})
}
const UPS=findByProps("getUserProfile","getGuildMemberProfile")
if(UPS&&typeof UPS.getUserProfile==="function"){
const op=UPS.getUserProfile
UPS.getUserProfile=function(id){
const p=op.apply(this,arguments)
if(!p||!s.enabled||id!==selfId)return p
const c={...p}
c.badges=fakeBadges()
const tc=themeColors()
if(tc){c.accentColor=tc[0];c.themeColors=tc}
if(s.joinYear)c.joinedAt=new Date(parseInt(s.joinYear),Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).getTime()
return c
}
patches.push(function(){UPS.getUserProfile=op})
}
const SnowflakeUtils=findByProps("extractTimestamp","fromTimestamp")
if(SnowflakeUtils){
const origExt=SnowflakeUtils.extractTimestamp
SnowflakeUtils.extractTimestamp=function(sn){
if(s.enabled&&s.joinYear&&selfId&&sn===selfId)return new Date(parseInt(s.joinYear),Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).getTime()
return origExt.apply(this,arguments)
}
patches.push(function(){SnowflakeUtils.extractTimestamp=origExt})
}
if(after){
let IU;try{IU=findByProps("getUserAvatarURL","getUserBannerURL")}catch(e){}
if(IU){
patches.push(after("getUserAvatarURL",IU,function([a],r){
if(!s.enabled||!s.avatar)return
const id=a&&typeof a==="object"?a.id:a
if(id===selfId)return s.avatar
}))
patches.push(after("getUserBannerURL",IU,function([a],r){
if(!s.enabled||!s.banner)return
const id=a&&typeof a==="object"?a.id:a
if(id===selfId)return s.banner
}))
}
let IM;try{IM=findByProps("getAvatarURL","getDefaultAvatarURL")}catch(e){}
if(IM&&IM.getAvatarURL){
patches.push(after("getAvatarURL",IM,function([id],r){
if(s.enabled&&s.avatar&&id===selfId)return s.avatar
}))
}
let AS;try{AS=findByProps("getUserAvatarSource","getUserBannerSource")}catch(e){}
if(AS){
if(AS.getUserAvatarSource)patches.push(after("getUserAvatarSource",AS,function([a],r){
if(!s.enabled||!s.avatar)return
const id=a&&typeof a==="object"?a.id:a
if(id===selfId)return{uri:s.avatar}
}))
if(AS.getUserBannerSource)patches.push(after("getUserBannerSource",AS,function([a],r){
if(!s.enabled||!s.banner)return
const id=a&&typeof a==="object"?a.id:a
if(id===selfId)return{uri:s.banner}
}))
}
let Dec;try{Dec=findByProps("getAvatarDecorationURL","isAnimatedAvatarDecoration")}catch(e){}
if(Dec&&Dec.getAvatarDecorationURL){
patches.push(after("getAvatarDecorationURL",Dec,function(_,r){
if(s.enabled&&s.avatarDecoration)return s.avatarDecoration
}))
}
}
forceUpdate()
console.log("[LarpPlugin] Loaded, after:",!!after)
}catch(e){console.error("[LarpPlugin] Load error:",e)}
},
onUnload:function(){
for(const p of patches)p()
patches=[]
console.log("[LarpPlugin] Unloaded")
},
settings:Settings}
})()