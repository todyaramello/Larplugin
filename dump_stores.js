// dump_stores.js — dump decoration-related stores, returns all output as string
(function(){
  var findStore=vendetta.metro.findByStoreName;
  if(!findStore)return "findByStoreName not found";
  var r=[];
  function add(s){r.push(s)}
  var names=["CollectiblesStore","DecorationStore","AvatarDecorationStore","InventoryStore","EntitlementStore","PremiumStore","SubscriptionStore","NitroStore","DecorationInventoryStore","AvatarDecorationInventoryStore","CollectibleStore","CollectiblesShopStore","UserStore"];
  for(var i=0;i<names.length;i++){
    var n=names[i];
    try{
      var s=findStore(n);
      if(!s){add(n+": NOT FOUND");continue}
      var m=[];
      var p=Object.getPrototypeOf(s);
      while(p&&p!=Object.prototype){
        var o=Object.getOwnPropertyNames(p);
        for(var j=0;j<o.length;j++)if(o[j]!="constructor"&&typeof s[o[j]]=="function"&&m.indexOf(o[j])==-1)m.push(o[j]);
        p=Object.getPrototypeOf(p);
      }
      var own=Object.getOwnPropertyNames(s);
      for(var j=0;j<own.length;j++)if(typeof s[own[j]]=="function"&&m.indexOf(own[j])==-1)m.push(own[j]);
      m.sort();
      add(n+" ("+m.length+" methods)");
      // Also try calling some common getters to see state
      var tryNames=["getOwnedAvatarDecorationIds","getOwnedAvatarDecorations","getOwned","getUserAvatarDecoration","getAvatarDecoration","getDecoration","getOwnedDecorationIds","getOwnedCollectibles","getCollectibles","getUserProfile","getCurrentUser"];
      for(var ti=0;ti<tryNames.length;ti++){
        if(m.indexOf(tryNames[ti])!=-1){
          try{
            var val=s[tryNames[ti]]();
            add("  "+tryNames[ti]+"() -> "+JSON.stringify(val).substring(0,500));
          }catch(e){add("  "+tryNames[ti]+"() -> ERROR: "+e.message)}
        }
      }
    }catch(e){add(n+": ERROR")}
  }
  return r.join("\n");
})()
