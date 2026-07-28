(()=>{
const s=vendetta.plugin.storage
const{FluxDispatcher}=vendetta.metro.common
const{Forms}=vendetta.ui.components
const RN=vendetta.metro.common.ReactNative
const h=vendetta.metro.common.React.createElement
const{FormInput,FormSwitchRow,FormSection}=Forms
const{findByProps}=vendetta.metro
const findByStoreName=vendetta.metro.findByStoreName.bind(vendetta.metro)
const{after,instead,before}=vendetta.patcher||{}
const COLORS=["#5865F2","#57F287","#FEE75C","#ED4245","#EB459E","#FF8C00","#9B59B6","#1ABC9C","#00AFFA","#FFFFFF","#95A5A6","#000000"]
const BADGE_MAP={staff:["staff","Discord Staff","5e74e9b61934fc1f67c65515d1f7e60d",1],partner:["partner","Partnered Server Owner","3f9748e53446a137a052f3454e2de41e",2],hypesquad_events:["hypesquad_events","HypeSquad Events","bf01d1073931f921909045f3a39fd264",4],bughunter_1:["bughunter_1","Bug Hunter Level 1","2717692c7dca7289b35297368a940dd0",8],bughunter_2:["bughunter_2","Bug Hunter Level 2","848f79194d4be5ff5f81505cbd0ce1e6",16384],hypesquad_bravery:["hypesquad_bravery","HypeSquad Bravery","8a88d63823d8a71cd5e390baa45efa02",64],hypesquad_brilliance:["hypesquad_brilliance","HypeSquad Brilliance","011940fd013da3f7fb926e4a1cd2e618",128],hypesquad_balance:["hypesquad_balance","HypeSquad Balance","3aa41de486fa12454c3761e8e223442e",256],early_supporter:["early_supporter","Early Supporter","7060786766c9c840eb3019e725d2b358",512],verified_developer:["verified_developer","Early Verified Bot Developer","6df5892e0f35b051f8b61eace34f4967",131072],certified_moderator:["certified_moderator","Moderator Programs Alumni","fee1624003e2fee35cb398e125dc479b",262144],active_developer:["active_developer","Active Developer","6bdc42827a38498929a4920da12695d9",4194304],nitro:["premium","Nitro","2ba85e8026a8614b640c2837bcdfe21b",0],nitro_1y:["premium_tenure_12_month","Nitro 1 Year","3393b2ca6e25e40d4bb3bd23d60d0cdd",0],booster:["guild_booster_lvl1","Server Booster","51040c70d4f20a921ad6674ff86fc95c",0]}
function calculateFlags(){let flags=0;for(const[k,[id,desc,icon,f]]of Object.entries(BADGE_MAP)){if(s.badges?.[k]&&f>0)flags|=f}return flags}
function getFakeBadges(){const r=[];for(const[k,[id,desc,icon]]of Object.entries(BADGE_MAP)){if(s.badges?.[k])r.push({id,description:desc,icon})}return r}
function getThemeColors(){
const n1=parseInt((s.accent||"#5865F2").replace("#",""),16)
const n2=parseInt((s.accent2||s.accent||"#5865F2").replace("#",""),16)
return isNaN(n1)||isNaN(n2)?null:[n1,n2]
}
let patches=[]
const BADGE_LIST=[{key:"staff",label:"Discord Staff"},{key:"partner",label:"Partnered Server Owner"},{key:"hypesquad_events",label:"HypeSquad Events"},{key:"bughunter_1",label:"Bug Hunter Level 1"},{key:"bughunter_2",label:"Bug Hunter Level 2"},{key:"hypesquad_bravery",label:"HypeSquad Bravery"},{key:"hypesquad_brilliance",label:"HypeSquad Brilliance"},{key:"hypesquad_balance",label:"HypeSquad Balance"},{key:"early_supporter",label:"Early Supporter"},{key:"verified_developer",label:"Early Verified Bot Developer"},{key:"certified_moderator",label:"Discord Certified Moderator"},{key:"active_developer",label:"Active Developer"},{key:"nitro",label:"Nitro"},{key:"nitro_1y",label:"Nitro 1 Year"},{key:"booster",label:"Server Booster"}]
function ColorRow({colors,current,onPick}){
return h(RN.View,{style:{flexDirection:"row",flexWrap:"wrap",gap:8,marginVertical:8}},colors.map(function(c){
const s2=(c.toUpperCase()===(current||"#5865F2").toUpperCase())
return h(RN.TouchableOpacity,{key:c,style:{width:36,height:36,borderRadius:18,backgroundColor:c,borderWidth:s2?3:0,borderColor:"#fff"},onPress:function(){onPick(c)}})
}))
}
function Settings(){
const[useState]=vendetta.metro.common.React&&vendetta.metro.common.React.useState?[vendetta.metro.common.React.useState]:[]
if(!useState)return h(RN.View,null,h(RN.Text,null,"React hooks unavailable"))
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
return h(RN.ScrollView,{style:{paddingBottom:24}},
h(FormSection,{title:"Toggle"},h(FormSwitchRow,{label:"Enable LarpPlugin",value:e,onValueChange:function(v){setE(v);s.enabled=v;patches.forEach(function(p){try{p()}catch(e){}})}})),
h(FormSection,{title:"Profile"},
h(FormInput,{title:"Fake Username",placeholder:"Enter fake username",value:un,onChange:function(v){setUn(v);s.username=v}}),
h(FormInput,{title:"Fake Display Name",placeholder:"Enter fake display name",value:dn,onChange:function(v){setDn(v);s.displayName=v}}),
h(FormInput,{title:"Fake Bio",placeholder:"Enter fake bio",value:bi,onChange:function(v){setBi(v);s.bio=v}}),
h(FormInput,{title:"Fake Join Year",placeholder:"e.g. 2020 (random day/month)",value:jy,onChange:function(v){setJy(v);s.joinYear=v}})),
h(FormSection,{title:"Theme Colors (Gradient)"},
h(RN.Text,{style:{color:"#ccc",marginBottom:4}},"Color 1 (left)"),
h(ColorRow,{colors:COLORS,current:ac1,onPick:function(v){setAc1(v);s.accent=v}}),
h(FormInput,{title:"",placeholder:"e.g. #FF0000",value:ac1,onChange:function(v){setAc1(v);s.accent=v}}),
h(RN.Text,{style:{color:"#ccc",marginTop:8,marginBottom:4}},"Color 2 (right)"),
h(ColorRow,{colors:COLORS,current:ac2,onPick:function(v){setAc2(v);s.accent2=v}}),
h(FormInput,{title:"",placeholder:"e.g. #0000FF",value:ac2,onChange:function(v){setAc2(v);s.accent2=v}})),
h(FormSection,{title:"Media"},
h(RN.TouchableOpacity,{style:{backgroundColor:"#5865F2",padding:12,borderRadius:8,marginBottom:8,alignItems:"center"},onPress:function(){let I;try{I=findByProps("launchImageLibrary")}catch(e){}if(I&&I.launchImageLibrary){I.launchImageLibrary({mediaType:"photo",quality:1,includeBase64:true},function(r){if(r.assets&&r.assets[0]?.base64){const u="data:image/jpeg;base64,"+r.assets[0].base64;setAv(u);s.avatar=u}else if(r.assets&&r.assets[0]?.uri){setAv(r.assets[0].uri);s.avatar=r.assets[0].uri}})}else console.warn("[LarpPlugin] No image picker")}},h(RN.Text,{style:{color:"#fff",fontWeight:"600"}},"Pick Avatar")),
av?h(RN.Image,{source:{uri:av},style:{width:64,height:64,borderRadius:32,marginBottom:8}}):null,
h(FormInput,{title:"Avatar URL",placeholder:"https://i.imgur.com/...png",value:av,onChange:function(v){setAv(v);s.avatar=v}}),
h(RN.TouchableOpacity,{style:{backgroundColor:"#5865F2",padding:12,borderRadius:8,marginBottom:8,alignItems:"center"},onPress:function(){let I;try{I=findByProps("launchImageLibrary")}catch(e){}if(I&&I.launchImageLibrary){I.launchImageLibrary({mediaType:"photo",quality:1,includeBase64:true},function(r){if(r.assets&&r.assets[0]?.base64){const u="data:image/jpeg;base64,"+r.assets[0].base64;setBa(u);s.banner=u}else if(r.assets&&r.assets[0]?.uri){setBa(r.assets[0].uri);s.banner=r.assets[0].uri}})}else console.warn("[LarpPlugin] No image picker")}},h(RN.Text,{style:{color:"#fff",fontWeight:"600"}},"Pick Banner")),
ba?h(RN.Image,{source:{uri:ba},style:{width:"100%",height:96,borderRadius:8,marginBottom:8}}):null,
h(FormInput,{title:"Banner URL",placeholder:"https://i.imgur.com/...png",value:ba,onChange:function(v){setBa(v);s.banner=v}}),
h(RN.TouchableOpacity,{style:{backgroundColor:"#5865F2",padding:12,borderRadius:8,marginBottom:8,alignItems:"center"},onPress:function(){let I;try{I=findByProps("launchImageLibrary")}catch(e){}if(I&&I.launchImageLibrary){I.launchImageLibrary({mediaType:"photo",quality:1,includeBase64:true},function(r){if(r.assets&&r.assets[0]?.base64){const u="data:image/jpeg;base64,"+r.assets[0].base64;setAd(u);s.avatarDecoration=u}else if(r.assets&&r.assets[0]?.uri){setAd(r.assets[0].uri);s.avatarDecoration=r.assets[0].uri}})}else console.warn("[LarpPlugin] No image picker")}},h(RN.Text,{style:{color:"#fff",fontWeight:"600"}},"Pick Decoration")),
ad?h(RN.Image,{source:{uri:ad},style:{width:64,height:64,borderRadius:32,marginBottom:8}}):null,
h(FormInput,{title:"Decoration URL",placeholder:"https://cdn.discord...",value:ad,onChange:function(v){setAd(v);s.avatarDecoration=v}})),
h(FormSection,{title:"Badges"},BADGE_LIST.map(function(b){
const checked=bd[b.key]||false
return h(FormSwitchRow,{key:b.key,label:b.label,value:checked,onValueChange:function(v){const n={...bd};n[b.key]=v;setBd(n);s.badges=n}})
})))
}
return{
onLoad:function(){
s.enabled=s.enabled===undefined?true:s.enabled
try{
const UserStore=findByStoreName("UserStore")
const currentId=UserStore?.getCurrentUser?.()?.id
if(UserStore&&after){
patches.push(after("getCurrentUser",UserStore,function(_,user){
if(!user||!s.enabled)return
if(s.username)user.username=s.username
if(s.displayName)user.globalName=s.displayName
if(s.bio)user.bio=s.bio
if(s.joinYear){const d=new Date(parseInt(s.joinYear),Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).getTime();user.createdAt=d}
const flags=calculateFlags()
if(flags>0){user.flags=flags;user.publicFlags=flags}
}))
patches.push(after("getUser",UserStore,function([id],user){
if(!user||!s.enabled||id!==currentId)return
if(s.username)user.username=s.username
if(s.displayName)user.globalName=s.displayName
if(s.bio)user.bio=s.bio
if(s.joinYear){const d=new Date(parseInt(s.joinYear),Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).getTime();user.createdAt=d}
const flags=calculateFlags()
if(flags>0){user.flags=flags;user.publicFlags=flags}
}))
}
const UPS=findByProps("getUserProfile","getGuildMemberProfile")
if(UPS&&after){
patches.push(after("getUserProfile",UPS,function([id],profile){
if(!profile||!s.enabled||id!==currentId)return
profile.badges=getFakeBadges()
const tc=getThemeColors()
if(tc){profile.accentColor=tc[0];profile.themeColors=tc}
if(s.joinYear){profile.joinedAt=new Date(parseInt(s.joinYear),Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).getTime()}
}))
}
let IU;try{IU=findByProps("getUserAvatarURL","getUserBannerURL")}catch(e){}
if(IU&&after){
patches.push(after("getUserAvatarURL",IU,function([a],result){
if(!s.enabled||!s.avatar)return
const id=a&&typeof a==="object"?a.id:a
if(id===currentId)return s.avatar
}))
patches.push(after("getUserBannerURL",IU,function([a],result){
if(!s.enabled||!s.banner)return
const id=a&&typeof a==="object"?a.id:a
if(id===currentId)return s.banner
}))
}
let IM;try{IM=findByProps("getAvatarURL","getDefaultAvatarURL")}catch(e){}
if(IM&&after){
patches.push(after("getAvatarURL",IM,function([id],result){
if(s.enabled&&s.avatar&&id===currentId)return s.avatar
}))
}
let AS;try{AS=findByProps("getUserAvatarSource","getUserBannerSource")}catch(e){}
if(AS&&after){
patches.push(after("getUserAvatarSource",AS,function([a],result){
if(!s.enabled||!s.avatar)return
const id=a&&typeof a==="object"?a.id:a
if(id===currentId)return{uri:s.avatar}
}))
patches.push(after("getUserBannerSource",AS,function([a],result){
if(!s.enabled||!s.banner)return
const id=a&&typeof a==="object"?a.id:a
if(id===currentId)return{uri:s.banner}
}))
}
const SnowflakeUtils=findByProps("extractTimestamp","fromTimestamp")
if(SnowflakeUtils&&after){
patches.push(after("extractTimestamp",SnowflakeUtils,function([sn],result){
if(!s.enabled||!s.joinYear||sn!==currentId)return
return new Date(parseInt(s.joinYear),Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).getTime()
}))
}
let Dec;try{Dec=findByProps("getAvatarDecorationURL","isAnimatedAvatarDecoration")}catch(e){}
if(Dec&&after){
patches.push(after("getAvatarDecorationURL",Dec,function(_,result){
if(s.enabled&&s.avatarDecoration)return s.avatarDecoration
}))
}
console.log("[LarpPlugin] Loaded, patches:",patches.length)
}catch(e){console.error("[LarpPlugin] Load error:",e)}
},
onUnload:function(){
for(const p of patches)p()
patches=[]
console.log("[LarpPlugin] Unloaded")
},
settings:Settings}
})()