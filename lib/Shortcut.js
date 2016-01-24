var utils=require("./utils");

var Shortcut=function(properties){
  properties=properties || {};

  Object.defineProperty(this,"appname",{
    get: this.getAppName,
    set: this.setAppName
  });
  Object.defineProperty(this,"exe",{
    get: this.getExe,
    set: this.setExe
  });
  Object.defineProperty(this,"StartDir",{
    get: this.getStartDir,
    set: this.setStartDir
  });
  Object.defineProperty(this,"icon",{
    get: this.getIcon,
    set: this.setIcon
  });
  Object.defineProperty(this,"ShortcutPath",{
    get: this.getShortcutPath,
    set: this.setShortcutPath
  });
  Object.defineProperty(this,"hidden",{
    get: this.isHidden,
    set: this.setHidden
  });
  Object.defineProperty(this,"tags",{
    get: this.getTags,
    set: this.setTags
  });
  Object.defineProperty(this,"favorite",{
    get: this.isFavorite,
    set: this.setFavorite
  });
  this.appname=properties.appname;
  this.exe=properties.exe;
  this.StartDir=properties.StartDir;
  this.icon=properties.icon;
  this.ShortcutPath=properties.ShortcutPath;
  this.hidden=properties.hidden;
  this.tags=properties.tags;
};

Shortcut.prototype.getAppName=function(){
  return this._appname;
};

Shortcut.prototype.setAppName=function(appname){
  this._appname=appname?String(appname):"";
};

Shortcut.prototype.getExe=function(){
  return this._exe;
};

Shortcut.prototype.setExe=function(exe){
  this._exe=exe?String(exe):"";
};

Shortcut.prototype.getStartDir=function(){
  return this._StartDir;
};

Shortcut.prototype.setStartDir=function(StartDir){
  this._StartDir=StartDir?String(StartDir):"";
};

Shortcut.prototype.getIcon=function(){
  return this._icon;
};

Shortcut.prototype.setIcon=function(icon){
  this._icon=icon?String(icon):"";
};

Shortcut.prototype.getShortcutPath=function(){
  return this._ShortcutPath;
};

Shortcut.prototype.setShortcutPath=function(ShortcutPath){
  this._ShortcutPath=ShortcutPath?String(ShortcutPath):"";
};

Shortcut.prototype.isHidden=function(){
  return this._hidden;
};

Shortcut.prototype.setHidden=function(hidden){
  this._hidden=!!hidden;
};

Shortcut.prototype.getTags=function(){
  var tags=[];
  for(var tag in this._tags){
    if(this._tags.hasOwnProperty(tag) && this._tags[tag]){
      tags.push(tag);
    }
  }
  return tags;
};

Shortcut.prototype.setTags=function(tags){
  this._tags={};
  this.addTags(tags);
};

Shortcut.prototype.addTags=function(tags){
  if(!tags){
    return;
  }
  if(utils.isArray(tags)){
    for(var i=0;i<tags.length;++i){
      this.addTags(tags[i]);
    }
  }else{
    var tag=String(tags);
    if(tag.toLowerCase()==="favorite"){
      tag="favorite";
    }
    this._tags[tag]=true;
  }
};

Shortcut.prototype.addTag=Shortcut.prototype.addTags;

Shortcut.prototype.removeTags=function(tags){
  if(!tags){
    return;
  }
  if(utils.isArray(tags)){
    for(var i=0;i<tags.length;++i){
      this.removeTags(tags[i]);
    }
  }else{
    var tag=String(tags);
    if(tag.toLowerCase()==="favorite"){
      tag="favorite";
    }
    this._tags[tag]=false;
  }
};

Shortcut.prototype.removeTag=Shortcut.prototype.removeTags;

Shortcut.prototype.isFavorite=function(){
  return !!this._tags["favorite"];
};

Shortcut.prototype.setFavorite=function(favorite){
  this._tags["favorite"]=!!favorite;
};

Shortcut.prototype.getSHA1=function() {
    return require("sha1")(this._exe);
};

Shortcut.prototype.toJson=function(){
  return {
    appname: this.appname,
    exe: this.exe,
    StartDir: this.StartDir,
    icon: this.icon,
    ShortcutPath: this.ShortcutPath,
    hidden: this.hidden,
    tags: this.tags
  };
};

Shortcut.prototype.equals=function(other){
  if(!other){
    return false;
  }
  if(this===other){
    return true;
  }
  if(!(other instanceof Shortcut)){
    other=new Shortcut(other);
  }
  var equal=(this.appname===other.appname) && (this.exe===other.exe) && (this.StartDir===other.StartDir)
    && (this.icon===other.icon) && (this.ShortcutPath===other.ShortcutPath) && (this.hidden===other.hidden)
    && (this.tags.length===other.tags.length);
  if(equal){
    for(var tag in this._tags){
      if(this._tags.hasOwnProperty(tag) && ((this._tags[tag] && !other._tags[tag]) || (!this._tags[tag] && other._tags[tag]))){
        equal=false;
        break;
      }
    }
  }
  return equal;
};

module.exports=Shortcut;
