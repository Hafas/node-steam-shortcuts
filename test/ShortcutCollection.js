var assert=require("chai").assert;
var Shortcut=require("../index").Shortcut;
var ShortcutCollection=require("../index").ShortcutCollection;

describe("ShortcutCollection",function(){
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
      appname: "Some cool game",
      exe: '"/path/to/gameB" --exec="something"',
      StartDir: '"/path/to/game"',
      icon: "",
      ShortcutPath: "",
      hidden: false,
      tags: ["RPG","Dragons","FAVORITE"]
    });
    var shortcutC=new Shortcut({
      appname: "Some other game",
      exe: '"/path/to/gameC" --exec="something"',
      StartDir: '"/path/to/game"',
      icon: "",
      ShortcutPath: "",
      hidden: true,
      tags: ["RPG","Dragons","FAVORITE"]
    });

    var collectionA=new ShortcutCollection([shortcutA,shortcutB]);
    var collectionB=new ShortcutCollection([shortcutA,shortcutC]);
    var collectionC=new ShortcutCollection([shortcutB,shortcutA]);
    var collectionD=new ShortcutCollection([shortcutB,shortcutC]);
    var collectionE=new ShortcutCollection([shortcutC,shortcutA]);
    var collectionF=new ShortcutCollection([shortcutC,shortcutB]);
    assert.isTrue(collectionA.equals(collectionA));
    assert.isTrue(collectionB.equals(collectionB));
    assert.isTrue(collectionC.equals(collectionC));
    assert.isTrue(collectionD.equals(collectionD));
    assert.isTrue(collectionE.equals(collectionE));
    assert.isTrue(collectionF.equals(collectionF));

    assert.isTrue(collectionA.equals(collectionC));
    assert.isTrue(collectionC.equals(collectionA));
    assert.isTrue(collectionB.equals(collectionE));
    assert.isTrue(collectionE.equals(collectionB));
    assert.isTrue(collectionD.equals(collectionF));
    assert.isTrue(collectionF.equals(collectionD));

    assert.isFalse(collectionA.equals(collectionD));
    assert.isFalse(collectionB.equals(collectionF));
    assert.isFalse(collectionC.equals(collectionB));
    assert.isFalse(collectionD.equals(collectionA));
    assert.isFalse(collectionE.equals(collectionC));
    assert.isFalse(collectionF.equals(collectionE));
  });
});
