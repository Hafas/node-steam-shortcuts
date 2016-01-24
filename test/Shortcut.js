var assert=require("chai").assert;
var Shortcut=require("../index").Shortcut;

describe("Shortcut",function(){
  it("equality test",function(){
    var shortcutA=new Shortcut({
      appname: "Some game",
      exe: '"/path/to/game" --exec="something"',
      StartDir: '"/path/to/game"',
      icon: "",
      ShortcutPath: "",
      hidden: false,
      tags: ["favorite","RPG","Dragons"]
    });
    var shortcutB=new Shortcut({
      appname: "Some game",
      exe: '"/path/to/game" --exec="something"',
      StartDir: '"/path/to/game"',
      icon: "",
      ShortcutPath: "",
      hidden: false,
      tags: ["RPG","Dragons","FAVORITE"]
    });
    var shortcutC=new Shortcut({
      appname: "Some game",
      exe: '"/path/to/game" --exec="something"',
      StartDir: '"/path/to/game"',
      icon: "",
      ShortcutPath: "",
      hidden: true,
      tags: ["RPG","Dragons","FAVORITE"]
    });
    assert.isTrue(shortcutA.equals(shortcutA));
    assert.isTrue(shortcutB.equals(shortcutB));
    assert.isTrue(shortcutA.equals(shortcutB));
    assert.isTrue(shortcutB.equals(shortcutA));
    assert.isFalse(shortcutA.equals(shortcutC));
    assert.isFalse(shortcutC.equals(shortcutB));
  });
});
