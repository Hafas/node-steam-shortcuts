# node-steam-shortcuts
Parse and build shortcuts.vdf files to manage Non-Steam Games in Valve's Steam-Client

<a name="examples"></a>
## Examples
<a name="example_builder"></a>
### Builder example
```js
var Builder=require("node-steam-shortcuts").Builder;
var fs=require("fs");

var shortcuts=Builder.build([
  {
    appname: "A Non-Steam Game",
    exe: "C:\\Games\\NonSteamGame\\game.exe",
    StartDir: "C:\\Games\\NonSteamGame",
    tags: ["favorite","RPG","Dragons"]
  },
  {
    appname: "An other Non-Steam Game",
    exe: "C:\\Games\\NonSteamGame2\\game.exe",
    StartDir: "C:\\Games\\NonSteamGame2",
    tags: ["Racing","Arcade"]
  }
]);
fs.writeFile("shortcuts.vdf",shortcuts,function(err){
  if(err){
    return console.error("oops:",err);
  }
  console.log("done!");
});
```
<a name="example_parser"></a>
### Parser example

```js
var fs=require("fs");
var Parser=require("node-steam-shortcuts").Parser;

//Let's read the file we wrote in the builder example
fs.readFile("shortcuts.vdf",function(err,shortcuts){
  if(err){
    return console.error("oops:",err);
  }
  shortcuts=Parser.parse(shortcuts).toJSON();
  console.log(shortcuts.length);  //2
  console.log(shortcuts[0].appname);  //"A Non-Steam Game"
  console.log(shortcuts[0].tags); //["favorite","RPG","Dragons"]
});
```
<a name="documentation"></a>
## Documentation
<a name="documentation_shortcut"></a>
### Shortcut([properties])

Creates a `new Shortcut`-Object.

<a name="documentation_shortcut_arguments"></a>
#### Arguments

* `properties`
  * `appname` - A string. The name of the Non-Steam Game. Default `""`.
  * `exe` - A String. The absolute path to the executable of the Non-Steam Game. Default `""`.
  * `StartDir` - A string. The absolute path to the working directory for the Non-Steam Game. Usually the directory where the executable resides. Default `""`.
  * `icon` - A string. The absolute path to a file containing the icon for the Non-Steam Game. If empty, the icon of the executable will be used. Default `""`.
  * `ShortcutPath` - A string. Purpose unknown. Default `""`.
  * `hidden` - A boolean. Determines if the Non-Steam Game shall be hidden in the Client. Does not seem to work though. Default `false`.
  * `tags` - An array of strings. Contains the tags associated with the Non-Steam Game. Default `[]`.

```js
var Shortcut=require("node-steam-shortcuts").Shortcut;
var shortcut=new Shortcut({
  appname: "A Non-Steam Game",
  exe: "C:\\Games\\NonSteamGame\\game.exe",
  StartDir: "C:\\Games\\NonSteamGame",
  tags: ["favorite","RPG","Dragons"]
});
```

<a name="documentation_shortcut_properties"></a>
#### Properties
Additionally to the [properties](#documentation_shortcut_arguments_properties) provided in the arguments, there is also:
* `favorite` - A boolean. Indicates whether or not the Non-Steam Game is listed with the Favorites.

```js
shortcut.appname="A fancier name";
shortcut.favorite=false;  //removes the tag "favorite" from the tags-array
```

<a name="documentation_shortcut_functions"></a>
#### Functions
<a name="documentation_shortcut_functions_addTags"></a>
##### addTags(tags)/addTag(tag)
Adds one ore more tags to the shortcut. Both functions are identical.
###### Arguments
* `tags`: A string or an array of strings.

<a name="documentation_shortcut_functions_removeTags"></a>
##### removeTags(tags)/removeTag(tag)
Removes one or more tags from the shortcut. Both functions are identical.
###### Arguments
* `tags`: A string or an array of strings.

<a name="documentation_shortcut_functions_getSHA1"></a>
##### getSHA1()
Returns an SHA1-Hash of this shortcut. This value is only dependent on the `exe` property.

##### toJSON()
Returns a JSON-Object that describes the `Shortcut`-Object.

<a name="documentation_shortcutcollection"></a>
### ShortcutCollection([shortcutCollection])

Creates a `new ShortcutCollection`-Object. A `ShortcutCollection` is a __Set__ of `Shortcut`s. A `ShortcutCollection` can not contain two `Shortcut`s with the same SHA1-Hash.

<a name="documentation_shortcutcollection_arguments"></a>
#### Arguments

* `shortcutCollection` - A `Shortcut` or an object describing a `Shortcut` or an array of `Shortcuts`s and/or of objects describing `Shortcut`s.

```js
var Shortcut=require("node-steam-shortcuts").Shortcut;
var ShortcutCollection=require("node-steam-shortcuts").ShortcutCollection;
var shortcut={
  appname: "A Game",
  exe: "C:\\Games\\NonSteamGame\\game.exe"
};
var shortcuts=new ShortcutCollection(shortcut);
//OR
shortcuts=new ShortcutCollection(new Shortcut(shortcut));
//OR
shortcuts=new ShortcutCollection([shortcut]);
//OR
shortcuts=new ShortcutCollection([new Shortcut(shortcut)]);
```

<a name="documentation_shortcutcollection_functions"></a>
#### Functions

##### addShortcuts(shortcuts)/addShortcut(shortcut)
Adds one ore more shortcuts to the collection. Both functions are identical.
###### Arguments
* `shortcuts`: A `Shortcut`or an object describing a `Shortcut` or an array of `Shortcut`s and/or of objects describing `Shortcut`s

##### toJSON()
Returns a JSON-Object that describes the `ShortcutCollection`-Object.

<!-- TODO Builder & Parser -->
