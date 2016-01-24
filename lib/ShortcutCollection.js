var Shortcut=require("./Shortcut");
var utils=require("./utils");

var ShortcutCollection=function(shortcutCollection){
  shortcutCollection=shortcutCollection || undefined;
  Object.defineProperty(this,"shortcuts",{
      get: this.getShortcuts,
      set: this.setShortcuts
  });
  this.shortcuts=shortcutCollection;
};

ShortcutCollection.prototype.getShortcuts=function(){
  var shortcuts=[];
  for(var sha1 in this._shortcuts){
    if(this._shortcuts.hasOwnProperty(sha1)){
      shortcuts.push(this._shortcuts[sha1]);
    }
  }
  return shortcuts;
};

ShortcutCollection.prototype.setShortcuts=function(shortcuts){
  this._shortcuts={};
  this.addShortcuts(shortcuts);
};

ShortcutCollection.prototype.addShortcuts=function(shortcuts){
  if(!shortcuts){
    return;
  }
  if(utils.isArray(shortcuts)){
    for(var i=0;i<shortcuts.length;++i){
      this.addShortcuts(shortcuts[i]);
    }
  }else if(shortcuts instanceof Shortcut){
    this._shortcuts[shortcuts.getSHA1()]=shortcuts;
  }else{
    var shortcut=new Shortcut(shortcuts);
    this.addShortcut(shortcut);
  }
};

ShortcutCollection.prototype.addShortcut=ShortcutCollection.prototype.addShortcuts;

ShortcutCollection.prototype.toJson=function(){
  var json=[];
  for(var sha1 in this._shortcuts){
    if(this._shortcuts.hasOwnProperty(sha1)){
      json.push(this._shortcuts[sha1].toJson());
    }
  }  
  return json;
};

ShortcutCollection.prototype.equals=function(other){
  if(!other){
    return false;
  }
  if(this===other){
    return true;
  }
  if(!(other instanceof ShortcutCollection)){
    other=new ShortcutCollection(other);
  }
  var equal=this.shortcuts.length===other.shortcuts.length;
  if(equal){
    for(var sha1 in this._shortcuts){
      if(this._shortcuts.hasOwnProperty(sha1) && !this._shortcuts[sha1].equals(other._shortcuts[sha1])){
        equal=false;
        break;
      }
    }
  }
  return equal;
};

module.exports=ShortcutCollection;
