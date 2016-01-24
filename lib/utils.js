exports.isArray=function(array){
  return Object.prototype.toString.call(array)==="[object Array]";
};

exports.isString=function(string){
  return Object.prototype.toString.call(string)==="[object String]";
};
