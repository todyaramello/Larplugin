// dump8.js — find every module with owned/purchased/unlocked/lock functions
(function(){
  var findAll = vendetta.metro.findAll;
  if(!findAll){console.log("findAll not found");return}
  
  var searchTerms = ["owned","purchased","canUse","unlocked","lock","entitlement","entitle","collection","inventory","collectible"];
  var found = {};
  
  for(var i = 0; i < searchTerms.length; i++){
    var term = searchTerms[i];
    var modules = findAll(function(key, mod){
      if(typeof mod != "function" && typeof mod != "object") return false;
      // Check if key matches
      if(typeof key == "string" && key.toLowerCase().indexOf(term) != -1) return true;
      // Check if mod is an object with matching function keys
      if(typeof mod == "object" && mod != null){
        for(var k in mod){
          if(typeof mod[k] == "function" && k.toLowerCase().indexOf(term) != -1) return true;
        }
      }
      return false;
    });
    
    if(modules && modules.length > 0){
      found[term] = [];
      for(var j = 0; j < modules.length; j++){
        var m = modules[j];
        var info = {keys: []};
        if(typeof m == "object" && m != null){
          for(var k in m){
            if(typeof m[k] == "function") info.keys.push(k);
          }
        }
        info.keys.sort();
        found[term].push(info);
      }
    }
  }
  
  console.log("=== FINDALL RESULTS ===");
  for(var term in found){
    console.log("\n--- " + term + " (" + found[term].length + " modules) ---");
    for(var j = 0; j < found[term].length; j++){
      var m = found[term][j];
      // Try to get a friendly name
      var namedBy = null;
      for(var k in m){
        if(k != "keys"){ namedBy = k; break }
      }
      console.log("Module " + j + " (" + (namedBy||"no key") + "): " + m.keys.join(", "));
    }
  }
  
  var done = "dump8 complete - " + Object.keys(found).length + " search terms";
  console.log(done);
  return done;
})()
