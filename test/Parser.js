var assert=require("chai").assert;
var Async=require("async");
var fs=require("fs");
var path=require("path");

var Parser=require("../index").Parser;

describe("Parser",function(){
    it("parse a valid shortcuts.vdf file",function(done){
      Async.waterfall([
        function(callback){
          var shortcutFile=path.join(__dirname,"resources","shortcuts_valid.vdf");
          fs.readFile(shortcutFile,callback);
        },
        function(fileContent,callback){
          var shortcuts=Parser.parse(fileContent).toJson();
          assert.lengthOf(shortcuts,2);

          assert.equal(shortcuts[0].appname,"A Game");
          assert.equal(shortcuts[0].exe,'"C:\\path\\to\\a\\game.exe"');
          assert.equal(shortcuts[0].StartDir,'"C:\\path\\to\\a\\"');
          assert.equal(shortcuts[0].icon,"");
          assert.equal(shortcuts[0].ShortcutPath,"");
          assert.isTrue(shortcuts[0].hidden);
          assert.include(shortcuts[0].tags,"favorite");
          assert.include(shortcuts[0].tags,"test_tag");
          assert.include(shortcuts[0].tags,"test_tag2");

          assert.equal(shortcuts[1].appname,"A second game");
          assert.equal(shortcuts[1].exe,'"C:\\path\\to\\2nd\\game.exe"');
          assert.equal(shortcuts[1].StartDir,'"C:\\path\\to\\2nd\\"');
          assert.equal(shortcuts[1].icon,"");
          assert.equal(shortcuts[1].ShortcutPath,"");
          assert.isFalse(shortcuts[1].hidden);
          assert.include(shortcuts[1].tags,"favorite");
          assert.include(shortcuts[1].tags,"test_tag");
          assert.include(shortcuts[1].tags,"test_tag3");
          callback();
        }
      ],function(err){
        assert.notOk(err);
        done();
      });
  });

  it("compatibility test with a vdf file created by ICE",function(done){
    Async.waterfall([
      function(callback){
        var shortcutFile=path.join(__dirname,"resources","shortcuts_ice.vdf");
        fs.readFile(shortcutFile,callback);
      },
      function(fileContent,callback){
        var shortcuts=Parser.parse(fileContent).toJson();
        assert.lengthOf(shortcuts,1000);
        callback();
      }
    ],function(err){
      assert.notOk(err);
      done();
    });
  });

  it("vdf file with no shortcuts",function(done){
    Async.waterfall([
      function(callback){
        var shortcutFile=path.join(__dirname,"resources","shortcuts_empty.vdf");
        fs.readFile(shortcutFile,callback);
      },
      function(fileContent,callback){
        var shortcuts=Parser.parse(fileContent).toJson();
        assert.lengthOf(shortcuts,0);
        callback();
      }
    ],function(err){
      assert.notOk(err);
      done();
    });
  });
});
