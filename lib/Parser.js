var utils=require("./utils");
var Parser={};


var VDF_PATTERN=/^\00shortcuts\00(.*)[\b\b]$/i;
Parser.parse=function(vdfAsString){
  var ShortcutCollection=require("./ShortcutCollection");
  if(!utils.isString(vdfAsString)){
    vdfAsString=String(vdfAsString);
  }
  var match=VDF_PATTERN.exec(vdfAsString);
  if(!match){
    throw new Error("Invalid shortcuts.vdf file");
  }
  return new ShortcutCollection(parseShortcuts(match[1]));
};

var SHORTCUT_PATTERN=/(.*)\00[0-9]+\00(\01appname\00.*)[\b]/i;
var parseShortcuts=function(shortcutsAsString){
  var shortcuts=[];
  var match;
  while(match=SHORTCUT_PATTERN.exec(shortcutsAsString)){
    shortcutsAsString=match[1];
    shortcuts.push(parseShortcut(match[2]));
  }
  shortcuts.reverse();
  return shortcuts;
};

var APPNAME_PATTERN=/\01appname\00(.*?)\00/i;
var EXE_PATTERN=/\01exe\00(.*?)\00/i;
var STARTDIR_PATTERN=/\01startdir\00(.*?)\00/i;
var ICON_PATTERN=/\01icon\00(.*?)\00/i;
var SHORTCUTPATH_PATTERN=/\01shortcutpath\00(.*?)\00/i;
var HIDDEN_PATTERN=/\02hidden\00(.)\00/i;
var TAGS_PATTERN=/\00tags\00(.*?)[\b]/i;
var parseShortcut=function(shortcutAsString){
  var appname=APPNAME_PATTERN.exec(shortcutAsString);
  var exe=EXE_PATTERN.exec(shortcutAsString);
  var StartDir=STARTDIR_PATTERN.exec(shortcutAsString);
  var icon=ICON_PATTERN.exec(shortcutAsString);
  var ShortcutPath=SHORTCUTPATH_PATTERN.exec(shortcutAsString);
  var hidden=HIDDEN_PATTERN.exec(shortcutAsString);
  var tags=TAGS_PATTERN.exec(shortcutAsString);
  return {
    appname: appname?appname[1]:"",
    exe: exe?exe[1]:"",
    StartDir: StartDir?StartDir[1]:"",
    icon: icon?icon[1]:"",
    ShortcutPath: ShortcutPath?ShortcutPath[1]:"",
    hidden: hidden?hidden[1]==="\01":false,
    tags: tags?parseTags(tags[1]):[]
  };
};

var TAG_PATTERN=/\01[0-9]+\00(.*?)\00(.*)/i;
var parseTags=function(tagsAsString){
  var tags=[];
  var match;
  while(match=TAG_PATTERN.exec(tagsAsString)){
    tagsAsString=match[2];
    tags.push(match[1]);
  }
  return tags;
};

module.exports=Parser;
