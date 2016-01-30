var Builder={};

Builder.build=function(shortcuts){
  var ShortcutCollection=require("./ShortcutCollection");
  if(!(shortcuts instanceof ShortcutCollection)){
    shortcuts=new ShortcutCollection(shortcuts).toJSON();
  }
  var shortcutsAsString="\00shortcuts\00";
  shortcutsAsString+=buildShortcuts(shortcuts);
  shortcutsAsString+="\b\b";
  return shortcutsAsString;
};

var buildShortcuts=function(shortcuts){
  var shortcutsAsString="";
  for(var i=0;i<shortcuts.length;++i){
    shortcutsAsString+="\00"+i+"\00";
    shortcutsAsString+=buildShortcut(shortcuts[i]);
    shortcutsAsString+="\b";
  }
  return shortcutsAsString;
};

var buildShortcut=function(shortcut){
  var shorcutAsString="";
  shorcutAsString+="\01appname\00"+shortcut.appname+"\00";
  shorcutAsString+="\01exe\00"+shortcut.exe+"\00";
  shorcutAsString+="\01StartDir\00"+shortcut.StartDir+"\00";
  shorcutAsString+="\01icon\00"+shortcut.icon+"\00";
  shorcutAsString+="\01ShortcutPath\00"+shortcut.ShortcutPath+"\00";
  shorcutAsString+="\02hidden\00"+(shortcut.hidden?"\01":"\00")+"\00\00\00";
  shorcutAsString+=buildTags(shortcut.tags);
  return shorcutAsString;
};

var buildTags=function(tags){
  var tagsAsString="\00tags\00";
  for(var i=0;i<tags.length;++i){
    tagsAsString+="\01"+i+"\00"+tags[i]+"\00";
  }
  tagsAsString+="\b";
  return tagsAsString;
};

module.exports=Builder;
