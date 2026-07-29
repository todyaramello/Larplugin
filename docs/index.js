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
const{after,instead}=vendetta.patcher
const BADGE_MAP={staff:["staff","Discord Staff","5e74e9b61934fc1f67c65515d1f7e60d",1],partner:["partner","Partnered Server Owner","3f9748e53446a137a052f3454e2de41e",2],hypesquad_events:["hypesquad_events","HypeSquad Events","bf01d1073931f921909045f3a39fd264",4],bughunter_1:["bughunter_1","Bug Hunter Level 1","2717692c7dca7289b35297368a940dd0",8],bughunter_2:["bughunter_2","Bug Hunter Level 2","848f79194d4be5ff5f81505cbd0ce1e6",16384],hypesquad_bravery:["hypesquad_bravery","HypeSquad Bravery","8a88d63823d8a71cd5e390baa45efa02",64],hypesquad_brilliance:["hypesquad_brilliance","HypeSquad Brilliance","011940fd013da3f7fb926e4a1cd2e618",128],hypesquad_balance:["hypesquad_balance","HypeSquad Balance","3aa41de486fa12454c3761e8e223442e",256],early_supporter:["early_supporter","Early Supporter","7060786766c9c840eb3019e725d2b358",512],verified_developer:["verified_developer","Early Verified Bot Developer","6df5892e0f35b051f8b61eace34f4967",131072],certified_moderator:["certified_moderator","Moderator Programs Alumni","fee1624003e2fee35cb398e125dc479b",262144],active_developer:["active_developer","Active Developer","6bdc42827a38498929a4920da12695d9",4194304],nitro:["premium","Nitro","2ba85e8026a8614b640c2837bcdfe21b",0],bronze:["premium_tenure_1_month_v2","Nitro Bronze (1mo)","4f33c4a9c64ce221936bd256c356f91f",0],silver:["premium_tenure_3_month_v2","Nitro Silver (3mo)","4514fab914bdbfb4ad2fa23df76121a6",0],gold:["premium_tenure_6_month_v2","Nitro Gold (6mo)","2895086c18d5531d499862e41d1155a6",0],platinum:["premium_tenure_12_month_v2","Nitro Platinum (1yr)","0334688279c8359120922938dcb1d6f8",0],diamond:["premium_tenure_24_month_v2","Nitro Diamond (2yr)","0d61871f72bb9a33a7ae568c1fb4f20a",0],emerald:["premium_tenure_36_month_v2","Nitro Emerald (3yr)","11e2d339068b55d3a506cff34d3780f3",0],ruby:["premium_tenure_60_month_v2","Nitro Ruby (5yr)","cd5e2cfd9d7f27a8cdcd3e8a8d5dc9f4",0],opal:["premium_tenure_72_month_v2","Nitro Opal (6yr+)","5b154df19c53dce2af92c9b61e6be5e2",0],orb:["orb_profile_badge","Orb Profile Badge","5cf444b0ba58a98d2d569f07d3081ca6",0],booster:["guild_booster_lvl4","Server Booster","b6f22629cb1f88def1e5f9f25c398700",0]}
function calculateFlags(){let flags=0;for(const[k,[id,desc,icon,f]]of Object.entries(BADGE_MAP)){if(s.badges?.[k]&&f>0)flags|=f}return flags}
function getFakeBadges(){const r=[];for(const[k,[id,desc,icon]]of Object.entries(BADGE_MAP)){if(s.badges?.[k])r.push({id,description:desc,icon})}return r}
function getDecoSku(hash){
  var m={
    "a_490c2310195e1403c68b73301f083929":"1483915211428724806","a_a526d8dcab9c49a17c7d28244989b2fe":"1483915867468202125","a_e091aa2bdff020b60be22c794a3e66bd":"1483915448818073600","a_8012b964f7124bf0d35ccb573cfea98f":"1483915623154188360","a_f37320babca6e37d8392950cd1a9fc4c":"1483916168787132477","a_ff85aecc3d7611da24364952db4b5c4e":"1486724373556629524","a_faa80b24bf12f5878b47a89cb63dea7a":"1486724374529839278","a_660864ff7dd56109fbbae3d607f664ae":"1483914997330608168","a_1ab42e495777eb9e8728a6c636b0a954":"1488180278475227266","a_4786361f20944a2dfe2c55986ee79571":"1488243577019695174","a_8dfc22a5f29064737dd2628b153da17a":"1488243796239061062","a_d6b900c052726061be62b8ff4278d135":"1488243999306416303","a_bb6cedd7a96db71ac1e3eb5392f03a0b":"1488244261362340101","a_ba85f37e87d48950a6cc7135c6302afb":"1488244383466651909","a_451ba8354eb5749a606c8a3a89970064":"1488244507689484432","a_ee77df4c2dc6f8aa9dc11aacc1effcd8":"1488244619144855712","a_a16394f64b8d9fa38fa75078dc408689":"1488242384113369300","a_35784f5c1ae9662eecddba177c0a21a3":"1488244167045021816","a_06e1b28461422fc20d3b3d908cc0c8fb":"1493341414766018600","a_f5957a07b90ded4cfe3c5aa499573bf0":"1493344973230440638","a_c7935ecfee94ff0329fcaddc0c37d48d":"1493344745383002332","a_7d5e7264c04937c754d03acadf718d4f":"1493344853596180490","a_c9a52215698a9b4b75bd6e9bdd14f8b1":"1495805433405767680","a_29d98532a4aaa984c3000296548e4124":"1495805987133849610","a_8cda4fb38c18ce7a3ccc513030148e24":"1495805817792761976","a_aea83b1702c0fd1ae17309be873856bb":"1495806200468607117","a_fc10280d008d9749f3e5048af8d0f54f":"1498445907169902712","a_7a37ce9e5674681cb80476e6772f78ff":"1498446254072528926","a_7cc34759ebc9a802f33d4feaa852d162":"1498446412306714644","a_80b79cc42a0db76b02c45f080a44ceff":"1498446571140939860","a_5ab3e4dd9aba6876c9eb858fa530505c":"1498446695510577243","a_cbe3d48e08e71e05c787f0952c59e02f":"1498447374496956567","a_5a84fbea96f5b12798e7401c859884ce":"1498447487348904087","a_ad4ccdcd7723bbd2f841217d8c7cfbaf":"1498447602054598888","a_0e25685f403ba17f91b70ed424ce685e":"1500907134190354576","a_f8593dfb05bee7e07dc87e2031f74b03":"1500908412009975970","a_1df2f56a1f84177ecf5855e06850357f":"1500908587256381571","a_ab3d61ff09b06bb1e762d6a577b78469":"1500908088184668302","a_1110d2ad9e435ed20d27656ed4e3fe7c":"1500908791145955389","a_48c10661910ea9ba20a8070f2cd6549f":"1500908955780775977","a_098e92341db5d984ca066bebe558ffdf":"1500909195933782167","a_29b87e18aa419c48c2da8d364bbe642e":"1500909310971220020","a_07a06a98a40f22c7f717fbb063eec0e3":"1500909656669687940","a_a2163cdb93b395b783a09d1458e28298":"1500909535668473996","a_2a3fed28dc9fad924231bb6d27834e4e":"1503448977599627264","a_fff53c484a7da03e67af8ea73b777654":"1503449511132004553","a_c2d919770fd26b8dbc0500803e1aa434":"1505981973347176658","a_68867e2b93812d18d3d58f216e99ad3c":"1506049399703474186","a_c07d52db7a61437a2f3d92bcdcad3242":"1508882842845843637","a_6aa5661fb0e9943dfbb0ceb207d54954":"1508884204010737745","a_d10e9efc4d97fd568e3318a3aa65e615":"1508884078827540600","a_0577e3f15bebcffbdef53cc86a234d57":"1509959424633081866","a_1056325e3cf0530355a6a44abc968758":"1509959759342604399","a_60cabc5a271010c657fc305383b01f44":"1509960096577228881","a_7793b9c298459b048f36d1d93181f064":"1511762112647794738","a_9bc062879215d7e4e152a87f93c39634":"1513658048445550815","a_e54f6d80d1df914c0fe3f9a51d91631e":"1513657068161208404","a_9897ce5d2c3ea3a556497146ddbb29de":"1513657855792906431","a_89159445e0bf6cc419df521830282e05":"1513660143726760126","a_77be01e933f2592c117683f32589f253":"1513660377076990114","a_e41629f941e4934965f1182e3de80704":"1513660478654779502","a_4999addbe13c79d9f8b55f0e9e7327e5":"1513660582077792449","a_a75fce1d7ba62f0237a1b7c72c42f341":"1513660690722979860","a_afd5dbb05635f0c5c6c7566643552555":"1514488122937966682","a_38208d183f070e4ea6344e97d5396de7":"1514692555374330068","a_556fc50ced539b4050f57769bdf7006b":"1514721229658001570","a_427663a38a52b740595bcc447695adf6":"1516169877256147175","a_7c29485d405c05c5bf16e003faf0e70c":"1516523989927858267","a_bec26d0726a0f2eb7491a7cd40ac9c73":"1516559294819074088","a_9ffd1869bb54b5f4eda59512a1f4509d":"1516559585601786028","a_3f5af01be989c3690d901f33dc4e508a":"1516559674776752290","a_4a1f982c664249b04ee2eb16ad439e33":"1517277871138279654","a_1c4016e16beaa185cd8422a1f2071a20":"1498717411958849686","a_16c37062979f43db8074d72792890f50":"1498719106642219108","a_8681a2d5fe171dc5c6558d65fafd356f":"1521661571665756180","a_a154a52df1669716dc6a2e15d7020203":"1520179502062243860","a_4ba8a7ffcd18f74e1d9746469a5291e9":"1524568831958323341","a_a01b2aa7f13dbf885b70b7ebb1a54d0b":"1493643897577144401"
  };
  return m[hash]||"1493341414766018600"
}
const DEFAULT_DECO_HASH="a_06e1b28461422fc20d3b3d908cc0c8fb"

function getDecoAsset(){
if(s.avatarDecoration&&s.avatarDecoration.startsWith("a_"))return s.avatarDecoration
if(s.enabled)return DEFAULT_DECO_HASH
return null
}

function getDecoObj(){
const a=getDecoAsset()
if(!a)return null
return{asset:a,skuId:getDecoSku(a)}
}

function applyFakes(user){
if(!user||!s.enabled)return user
user.premiumType=2;user.premiumFlags=7
if(s.orbBalance){const n=parseInt(s.orbBalance);if(!isNaN(n))user.orbBalance=n}
if(s.username)user.username=s.username
if(s.displayName)user.globalName=s.displayName
if(s.email)user.email=s.email
if(s.phone)user.phone=s.phone
if(s.bio)user.bio=s.bio
if(s.avatar)user.avatar=s.avatar
if(s.banner)user.banner=s.banner
var d=getDecoObj()
if(d){user.avatarDecoration=d;user.avatarDecorationData=d}
if(s.joinYear){const d=new Date(parseInt(s.joinYear),Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).getTime();user.createdAt=d;user.timestamp=d}
if(s.accent||s.accent2){const n1=s.accent?parseInt(s.accent.replace("#",""),16):0;const n2=s.accent2?parseInt(s.accent2.replace("#",""),16):0;const ok1=!isNaN(n1)&&s.accent;const ok2=!isNaN(n2)&&s.accent2;if(ok1)user.accentColor=n1;if(ok1||ok2)user.themeColors=[ok1?n1:n2,ok2?n2:n1]}
const flags=calculateFlags();if(flags>0){user.flags=flags;user.publicFlags=flags}
return user
}

function refreshUser(){
const UserStore=findByStoreName("UserStore")
const raw=UserStore?.getCurrentUser?.()
if(!raw)return
applyFakes(raw)
FluxDispatcher.dispatch({type:"CURRENT_USER_UPDATE",user:raw})
FluxDispatcher.dispatch({type:"USER_UPDATE",user:raw})
}
function refreshProfile(){
try{
const raw=findByStoreName("UserStore")?.getCurrentUser?.()
if(!raw)return
const id=raw.id
const UPS=findByProps("getUserProfile","getGuildMemberProfile")
if(!UPS)return
let p=UPS.getUserProfile(id)
if(p){
p={...p}
var d=getDecoObj()
if(d){p.avatarDecoration=d;p.avatarDecorationData=d}
FluxDispatcher.dispatch({type:"USER_PROFILE_UPDATE",userProfile:p})
FluxDispatcher.dispatch({type:"USER_PROFILE_FETCH_SUCCESS",user:raw,user_profile:p,connected_accounts:p.connectedAccounts||[]})
}
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
h(FormInput,{title:"Fake Banner URL",placeholder:"https://i.imgur.com/...png",value:ba,onChange:function(v){setBa(v);s.banner=v;refreshUser()}})),
h(FormSection,{title:"Avatar Decoration"},
h(FormInput,{title:"Custom Asset Hash",placeholder:"a_... (or select a preset below)",value:ad,onChange:function(v){setAd(v);s.avatarDecoration=v;refreshUser();setTimeout(refreshProfile,100)}}),
View?h(View,{style:{flexDirection:"row",flexWrap:"wrap",paddingHorizontal:12,paddingBottom:8}},[["None","",0],["Busy Bee","a_06e1b28461422fc20d3b3d908cc0c8fb",1],["Cinnamoroll","a_4786361f20944a2dfe2c55986ee79571",2],["Hello Kitty","a_1ab42e495777eb9e8728a6c636b0a954",3],["Cloud Nine","a_c9a52215698a9b4b75bd6e9bdd14f8b1",4],["Fairy Wings","a_098e92341db5d984ca066bebe558ffdf",5],["Guardian Wings","a_29b87e18aa419c48c2da8d364bbe642e",6],["Cosmic Guardian","a_a2163cdb93b395b783a09d1458e28298",7],["Star Struck","a_8cda4fb38c18ce7a3ccc513030148e24",8]].map(function(p){return h(View,{key:p[2],style:{paddingHorizontal:12,paddingVertical:8,margin:4,backgroundColor:"#2f3136",borderRadius:8},onTouchEnd:function(){setAd(p[1]);s.avatarDecoration=p[1];refreshUser();setTimeout(refreshProfile,100)}},h(Text,{style:{color:"#b9bbbe",fontSize:13}},p[0]))})):null),
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
return{
onLoad:function(){
s.enabled=s.enabled===undefined?true:s.enabled
if(s.avatarDecoration===undefined)s.avatarDecoration=DEFAULT_DECO_HASH
const UserStore=findByStoreName("UserStore")
function ensureDeco(user){
  if(!user||!s.enabled)return user
  applyFakes(user)
  Object.defineProperty(user,"avatarDecoration",{
    get:function(){var d=getDecoObj();return d||undefined},
    configurable:true,enumerable:true
  })
  Object.defineProperty(user,"avatarDecorationData",{
    get:function(){var d=getDecoObj();return d||undefined},
    configurable:true,enumerable:true
  })
  return user
}
patches.push(instead("getCurrentUser",UserStore,function(args,orig){
var ret=orig.apply(this,args)
return ensureDeco(ret)
}))
patches.push(after("getUser",UserStore,function(args,ret){
if(!ret||!s.enabled)return ret
const selfId=UserStore.getCurrentUser()?.id
if(selfId&&args[0]===selfId)return ensureDeco(ret)
return ret
}))
const UPS=findByProps("getUserProfile","getGuildMemberProfile")
if(UPS){
patches.push(after("getUserProfile",UPS,function([id],profile){
if(!profile||!s.enabled)return profile
const selfId=findByStoreName("UserStore")?.getCurrentUser()?.id
if(selfId&&id===selfId){
profile.badges=getFakeBadges()
profile.premiumType=2;profile.premiumFlags=7
if(s.orbBalance){const n=parseInt(s.orbBalance);if(!isNaN(n))profile.orbBalance=n}
var d=getDecoObj()
if(d){profile.avatarDecoration=d;profile.avatarDecorationData=d}
if(s.accent||s.accent2){
const n1=s.accent?parseInt(s.accent.replace("#",""),16):0
const n2=s.accent2?parseInt(s.accent2.replace("#",""),16):0
const ok1=!isNaN(n1)&&s.accent
const ok2=!isNaN(n2)&&s.accent2
if(ok1)profile.accentColor=n1
if(ok1||ok2)profile.themeColors=[ok1?n1:n2,ok2?n2:n1]
}
}
return profile
}))
}
const SnowflakeUtils=findByProps("extractTimestamp","fromTimestamp")
if(SnowflakeUtils){
patches.push(instead("extractTimestamp",SnowflakeUtils,function(args,orig){
const id=args[0]
if(s.enabled&&s.joinYear){
const selfId=findByStoreName("UserStore")?.getCurrentUser()?.id
if(selfId&&id===selfId)return new Date(parseInt(s.joinYear),Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).getTime()
}
return orig.apply(this,args)
}))
}
const DecorationURL=findByProps("getAvatarDecorationURL","default")
if(DecorationURL){
patches.push(instead("getAvatarDecorationURL",DecorationURL,function(args,orig){
var d=args[0]
if(!d||!s.enabled)return orig.apply(this,args)
var asset=null
if(typeof d==="string")asset=d
else if(d&&d.asset)asset=d.asset
else if(d&&d.avatarDecoration&&d.avatarDecoration.asset)asset=d.avatarDecoration.asset
    if(asset&&s.avatarDecoration&&asset===s.avatarDecoration){
      var skuId=getDecoSku(asset)
      return"https://cdn.discordapp.com/media/v1/collectibles-shop/"+skuId+"/static"
    }
    return orig.apply(this,args)
  }))
}
const DecorationURL2=findByProps("getUserAvatarURL","getAvatarDecorationURL")
if(DecorationURL2&&DecorationURL2!==DecorationURL){
  patches.push(instead("getAvatarDecorationURL",DecorationURL2,function(args,orig){
    var d=args[0]
    if(!d||!s.enabled)return orig.apply(this,args)
    var asset=null
    if(typeof d==="string")asset=d
    else if(d&&d.asset)asset=d.asset
    else if(d&&d.avatarDecoration&&d.avatarDecoration.asset)asset=d.avatarDecoration.asset
    if(asset&&s.avatarDecoration&&asset===s.avatarDecoration){
      var skuId=getDecoSku(asset)
      return"https://cdn.discordapp.com/media/v1/collectibles-shop/"+skuId+"/static"
    }
    return orig.apply(this,args)
  }))
}
function patchDecoHook(module,propName){
  if(!module||!module[propName])return
  patches.push(instead(propName,module,function(args,orig){
    if(!s.enabled)return orig.apply(this,args)
    var userId=args[0]
    var selfId=findByStoreName("UserStore")?.getCurrentUser()?.id
    if(userId&&userId!==selfId)return orig.apply(this,args)
    var d=getDecoObj()
    if(d)return d
    return orig.apply(this,args)
  }))
}
patchDecoHook(findByProps("useAvatarDecoration"),"useAvatarDecoration")
patchDecoHook(findByProps("useUserAvatarDecoration"),"useUserAvatarDecoration")
const DecorationGetter=findByProps("getAvatarDecoration")
if(DecorationGetter&&DecorationGetter.getAvatarDecoration){
  patches.push(instead("getAvatarDecoration",DecorationGetter,function(args,orig){
    var d=getDecoObj()
    if(d)return d
    return orig.apply(this,args)
  }))
}
const PreviewUrlMod=findByProps("getAvatarDecorationPreviewUrl")
if(PreviewUrlMod&&PreviewUrlMod.getAvatarDecorationPreviewUrl){
patches.push(instead("getAvatarDecorationPreviewUrl",PreviewUrlMod,function(args,orig){
var d=args[0]
if(!d||!s.enabled)return orig.apply(this,args)
var asset=null
if(typeof d==="string")asset=d
else if(d&&d.asset)asset=d.asset
else if(d&&d.avatarDecoration&&d.avatarDecoration.asset)asset=d.avatarDecoration.asset
if(asset&&s.avatarDecoration&&asset===s.avatarDecoration){
var skuId=getDecoSku(asset)
return"https://cdn.discordapp.com/media/v1/collectibles-shop/"+skuId+"/static"
}
return orig.apply(this,args)
}))
}
const PurchaseStore=findByStoreName("CollectiblesPurchaseStore")
if(PurchaseStore){
patches.push(instead("getPurchase",PurchaseStore,function(args,orig){
const skuId=args[0]
if(skuId&&s.enabled){
var d=getDecoObj()
if(d&&d.skuId===skuId)return{purchasedAt:new Date(),skuId:skuId}
}
return orig.apply(this,args)
}))
}
var reapplyTimer=setInterval(function(){
  if(!s.enabled)return
  var us=findByStoreName("UserStore")
  var cu=us?.getCurrentUser()
  if(cu)applyFakes(cu)
  var sid=us?.getCurrentUser()?.id
  var UPS2=findByProps("getUserProfile","getGuildMemberProfile")
  if(UPS2&&sid){
    var pp=UPS2.getUserProfile(sid)
    if(pp){
      var d=getDecoObj()
      if(d){pp.avatarDecoration=d;pp.avatarDecorationData=d}
    }
  }
  FluxDispatcher.dispatch({type:"CURRENT_USER_UPDATE",user:cu})
  if(pp){
    FluxDispatcher.dispatch({type:"USER_PROFILE_UPDATE",userProfile:pp})
    FluxDispatcher.dispatch({type:"USER_PROFILE_FETCH_SUCCESS",user:cu,user_profile:pp,connected_accounts:pp.connectedAccounts||[]})
  }
},500)
patches.push(function(){clearInterval(reapplyTimer)})
refreshUser()
setTimeout(refreshProfile,500)
setTimeout(patchOrbStore,1000)
setInterval(function(){
if(!s.enabled)return
try{
var hook=window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
if(!hook)return;
var selfId=findByStoreName("UserStore")?.getCurrentUser()?.id
if(!selfId)return
var d=getDecoObj()
if(!d)return
var decoUrl="https://cdn.discordapp.com/media/v1/collectibles-shop/"+d.skuId+"/static"
hook.renderers.forEach(function(ren,id){
if(id!==2)return;
var roots=hook.getFiberRoots(id);
if(!roots||!roots.size)return;
function walk(f){
if(!f)return;
var mp=f.memoizedProps
var t=f.type
var dn=(t&&t.displayName)||(t&&t.name)||''
if(dn&&mp){
if(dn==='CutoutableAvatarDecoration'||dn==='AvatarDecoration'||dn.indexOf('Decoration')>=0){
if(!mp.source||mp.source.uri!==decoUrl){
try{
f.memoizedProps={...mp,source:{uri:decoUrl}}
}catch(e){}
}
}else if(mp&&mp.avatarDecoration&&!mp.avatarDecoration.asset){
try{
f.memoizedProps={...mp,avatarDecoration:d,avatarDecorationData:d}
}catch(e){}
}
}
walk(f.child)
walk(f.sibling)
}
walk(roots.values().next().value.current)
})
}catch(e){vendetta.logger.log("[FIBER] error "+e.message)}
},2000)
vendetta.logger.log("[LarpPlugin] Loaded")
},
onUnload:function(){
for(const p of patches)p()
patches=[]
vendetta.logger.log("[LarpPlugin] Unloaded")
},
settings:Settings}
})()
