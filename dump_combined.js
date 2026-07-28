// dump_combined.js — runs all three dump strategies in one eval
(function(){
  var findAll = vendetta.metro.findAll;
  var findStore = vendetta.metro.findByStoreName;
  if(!findAll){console.log("findAll not found");return}
  
  console.log("=== PART 1: KEYWORD SEARCH ===");
  var searchTerms = ["owned","purchased","canUse","unlocked","lock","entitlement","collection","inventory","collectible"];
  for(var i=0;i<searchTerms.length;i++){
    var term=searchTerms[i];
    try{
      var mods=findAll(function(k,m){
        if(typeof m!="function"&&typeof m!="object")return false;
        if(typeof k=="string"&&k.toLowerCase().indexOf(term)!=-1)return true;
        if(typeof m=="object"&&m!=null){
          for(var kk in m)if(typeof m[kk]=="function"&&kk.toLowerCase().indexOf(term)!=-1)return true;
        }
        return false;
      });
      if(mods&&mods.length>0){
        console.log("--- "+term+" ("+mods.length+" modules) ---");
        for(var j=0;j<mods.length;j++){
          var m=mods[j],keys=[];
          if(typeof m=="object"&&m!=null)for(var k in m)if(typeof m[k]=="function")keys.push(k);
          console.log("  M"+j+": "+keys.join(", "));
        }
      }
    }catch(e){}
  }
  
  console.log("=== PART 2: STORES ===");
  var storeNames=["CollectiblesStore","DecorationStore","AvatarDecorationStore","InventoryStore","EntitlementStore","PremiumStore","SubscriptionStore","NitroStore","DecorationInventoryStore","AvatarDecorationInventoryStore","CollectibleStore","CollectiblesShopStore","UserStore"];
  for(var i=0;i<storeNames.length;i++){
    var name=storeNames[i];
    try{
      var store=findStore(name);
      if(!store){console.log(name+": NOT FOUND");continue}
      var methods=[];
      var proto=Object.getPrototypeOf(store);
      while(proto&&proto!=Object.prototype){
        var names=Object.getOwnPropertyNames(proto);
        for(var j=0;j<names.length;j++){
          var n=names[j];
          if(n!="constructor"&&typeof store[n]=="function"&&methods.indexOf(n)==-1)methods.push(n);
        }
        proto=Object.getPrototypeOf(proto);
      }
      var own=Object.getOwnPropertyNames(store);
      for(var j=0;j<own.length;j++)if(typeof store[own[j]]=="function"&&methods.indexOf(own[j])==-1)methods.push(own[j]);
      methods.sort();
      console.log(name+" ("+methods.length+" methods)");
      for(var j=0;j<methods.length;j++){
        try{
          var mn=methods[j];
          if(mn.toLowerCase().indexOf("owned")!=-1||mn.toLowerCase().indexOf("purchased")!=-1||mn.toLowerCase().indexOf("collection")!=-1||mn.toLowerCase().indexOf("inventory")!=-1||mn.toLowerCase().indexOf("entitle")!=-1||mn.toLowerCase().indexOf("canuse")!=-1||mn.toLowerCase().indexOf("locked")!=-1){
            var val=store[mn]();
            console.log("  "+mn+"() -> "+JSON.stringify(val).substring(0,300));
          }
        }catch(e2){}
      }
    }catch(e){console.log(name+": ERROR");}
  }
  
  console.log("=== PART 3: PATTERN SEARCH ===");
  var patterns=["isDecoration","hasDecoration","getDecoration","ownsAvatar","isAvatar","canUseAvatar","getOwnedAvatar","ownedAvatar","isPurchased","isOwned","hasPremium","isPremium","getPremium","isEntitled","hasEntitlement","isLocked","locked","showLocked","getLocked","useAvatarDecoration","isEligible","getUserTier","premiumTier"];
  for(var pi=0;pi<patterns.length;pi++){
    var pat=patterns[pi];
    try{
      var mods=findAll(function(k,m){
        if(typeof m!="object"||m==null)return false;
        for(var kk in m)if(typeof m[kk]=="function"&&kk.indexOf(pat)!=-1)return true;
        return false;
      });
      if(mods&&mods.length>0){
        console.log("--- "+pat+" ("+mods.length+" modules) ---");
        for(var ri=0;ri<mods.length;ri++){
          var m=mods[ri],fns=[];
          for(var k in m)if(typeof m[k]=="function")fns.push(k);
          fns.sort();
          console.log("  M"+ri+": "+fns.join(", "));
          for(var fi=0;fi<fns.length;fi++){
            try{var val=m[fns[fi]]();console.log("    "+fns[fi]+"() -> "+JSON.stringify(val).substring(0,150))}catch(e2){}
          }
        }
      }
    }catch(e){}
  }
  
  console.log("=== DUMP COMPLETE ===");
  return "done";
})()
