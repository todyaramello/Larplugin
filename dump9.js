// dump9.js — find stores by name and check for owned decoration IDs
(function(){
  var findStore = vendetta.metro.findByStoreName;
  var findAll = vendetta.metro.findAll;
  if(!findStore){console.log("findByStoreName not found");return}
  
  var storeNames = [
    "CollectiblesStore", "DecorationStore", "AvatarDecorationStore",
    "InventoryStore", "EntitlementStore", "PremiumStore",
    "SubscriptionStore", "NitroStore", "GiftStore",
    "DecorationInventoryStore", "AvatarDecorationInventoryStore",
    "CollectibleStore", "CollectiblesShopStore",
    "ApplicationStore", "ChannelStore", "GuildStore",
    "UserStore"
  ];
  
  for(var i = 0; i < storeNames.length; i++){
    var name = storeNames[i];
    try{
      var store = findStore(name);
      if(store){
        console.log("=== " + name + " FOUND ===");
        // Get method names
        var methods = [];
        var proto = Object.getPrototypeOf(store);
        while(proto && proto != Object.prototype){
          var names = Object.getOwnPropertyNames(proto);
          for(var j = 0; j < names.length; j++){
            var n = names[j];
            if(n != "constructor" && typeof store[n] == "function" && methods.indexOf(n) == -1){
              methods.push(n);
            }
          }
          proto = Object.getPrototypeOf(proto);
        }
        // Also own props
        var own = Object.getOwnPropertyNames(store);
        for(var j = 0; j < own.length; j++){
          var n = own[j];
          if(typeof store[n] == "function" && methods.indexOf(n) == -1){
            methods.push(n);
          }
        }
        methods.sort();
        console.log("Methods (" + methods.length + "): " + methods.join(", "));
        
        // Try calling methods with "owned" or "collection" or "purchased" in name
        for(var j = 0; j < methods.length; j++){
          try{
            var mn = methods[j];
            if(mn.toLowerCase().indexOf("owned") != -1 ||
               mn.toLowerCase().indexOf("purchased") != -1 ||
               mn.toLowerCase().indexOf("collection") != -1 ||
               mn.toLowerCase().indexOf("inventory") != -1 ||
               mn.toLowerCase().indexOf("entitle") != -1 ||
               mn.toLowerCase().indexOf("canuse") != -1 ||
               mn.toLowerCase().indexOf("locked") != -1){
              var val = store[mn]();
              console.log("  " + mn + "() -> " + JSON.stringify(val).substring(0,200));
            }
          }catch(e2){}
        }
      } else {
        console.log(name + ": NOT FOUND");
      }
    } catch(e){
      console.log(name + ": ERROR " + e.message);
    }
  }
  
  var done = "dump9 complete";
  console.log(done);
  return done;
})()
