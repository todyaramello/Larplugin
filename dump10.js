// dump10.js — find specific function patterns by property names
(function(){
  var findAll = vendetta.metro.findAll;
  if(!findAll){console.log("findAll not found");return}
  
  // Search for modules with specific property name patterns
  var patterns = [
    "isDecoration", "hasDecoration", "getDecoration",
    "ownsAvatar", "isAvatar", "canUseAvatar",
    "getOwnedAvatar", "ownedAvatar", "ownedAvatarDecoration",
    "getPurchase", "isPurchased", "isOwned",
    "hasPremium", "isPremium", "getPremium",
    "isEntitled", "getEntitlement", "hasEntitlement",
    "buy", "purchase", "unlock",
    "_isLocked", "isLocked", "locked",
    "showLocked", "shouldShowLocked", "getLocked",
    "useAvatarDecoration", "isEligible",
    "getUserTier", "getPremiumType", "premiumTier"
  ];
  
  console.log("=== SEARCHING ALL MODULES BY PROPERTY NAME ===");
  
  // For each pattern, search ALL modules
  // We search by looking at the module's exported keys
  for(var pi = 0; pi < patterns.length; pi++){
    var pattern = patterns[pi];
    try{
      var results = findAll(function(key, mod){
        if(typeof mod != "object" || mod == null) return false;
        for(var k in mod){
          if(typeof mod[k] == "function" && k.indexOf(pattern) != -1) return true;
        }
        return false;
      });
      
      if(results && results.length > 0){
        console.log("\n--- Pattern: " + pattern + " (" + results.length + " modules) ---");
        for(var ri = 0; ri < results.length; ri++){
          var mod = results[ri];
          var fns = [];
          for(var k in mod){
            if(typeof mod[k] == "function") fns.push(k);
          }
          fns.sort();
          console.log("  Module " + ri + " (" + fns.length + " fns): " + fns.join(", "));
          
          // Try invoking each function with no args to see return value
          for(var fi = 0; fi < fns.length; fi++){
            try{
              var fnName = fns[fi];
              var val = mod[fnName]();
              console.log("    " + fnName + "() -> " + JSON.stringify(val).substring(0,150));
            } catch(e){}
          }
        }
      }
    } catch(e){
      console.log("Pattern " + pattern + " ERROR: " + e.message);
    }
  }
  
  console.log("\n=== DUMP10 COMPLETE ===");
  return "dump10 complete";
})()
