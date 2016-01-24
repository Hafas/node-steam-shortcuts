var assert=require("chai").assert;
var Builder=require("../index").Builder;
var Parser=require("../index").Parser;
var ShortcutCollection=require("../index").ShortcutCollection;

describe("Builder",function(){
  it("builds and then parses shortcuts",function(){
    var shortcutsAsArray=[
      {
        appname: "some game",
        exe: "/path/to/some/game",
        StartDir: "/path/to/some",
        icon: "",
        ShortcutPath: "",
        hidden: false,
        tags: ["favorite","Dungeons","Dragons"]
      },
      {
        appname: "some other game",
        exe: "/path/to/some/other/game",
        StartDir: "/path/to/some/other",
        icon: "/path/to/some/icon.ico",
        ShortcutPath: "",
        hidden: true,
        tags: ["boring"]
      },
      {
        appname: "legendary game",
        exe: "/path/to/legendary/game",
        StartDir: "/path/to/legendary",
        icon: "",
        ShortcutPath: "",
        hidden: false,
        tags: ["legendary"]
      }
    ];
    var builtShortcuts=Builder.build(shortcutsAsArray);
    var parsedShortcuts=Parser.parse(builtShortcuts);
    assert.isTrue(new ShortcutCollection(shortcutsAsArray).equals(parsedShortcuts));
  });
});
