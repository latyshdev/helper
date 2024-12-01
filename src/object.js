/* ========================================================================= */
function extendObjectAndReplace(obj1, obj2){

  for (let prop in obj2){
      obj1[prop] = obj2[prop];
  }

  return obj1;
}

/* ========================================================================= */
// Objects exports
exports.extendObjectAndReplace = extendObjectAndReplace;