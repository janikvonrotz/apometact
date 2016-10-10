
function setValue(object, key, value) {
  key = key.split('.');
  for (var index = 0; index < key.length - 1; index++){
      object = object[key[index]];
  }
  object[key[index]] = value;
  return object;
}

function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

function scorePassword(password) {
  var score = 0;
  if (!password)
    return score;

  // award every unique letter until 5 repetitions
  var letters = new Object();
  for (var i=0; i<password.length; i++) {
    letters[password[i]] = (letters[password[i]] || 0) + 1;
    score += 5.0 / letters[password[i]];
  }

  // bonus points for mixing it up
  var variations = {
    digits: /\d/.test(password),
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    nonWords: /\W/.test(password),
  }

  var variationCount = 0;
  for (var check in variations) {
    variationCount += (variations[check] == true) ? 1 : 0;
  }
  score += (variationCount - 1) * 10;

  return parseInt(score);
}

function checkPassStrength(password) {
  var score = scorePassword(password);
  if (score > 80)
    return "strong";
  if (score > 60)
    return "good";
  if (score >= 30)
    return "still weak";
  if (score >= 0)
    return "weak";

  return "";
}

// Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
// @param obj1
// @param obj2
// @returns obj3 a new object based on obj1 and obj2
function objectAssign(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

export {setValue, slugify, scorePassword, checkPassStrength, objectAssign}
