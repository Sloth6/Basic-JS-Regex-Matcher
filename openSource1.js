// Simple regex matcher for symbols * or c or .
'use strict';

function doesMatch(pattern, word) {
    var p = pattern.charAt(0);
    var c = word.charAt(0);
    var psufix = dropFirst(pattern);
    var wsufix = dropFirst(word);

    if (pattern.length == 0 && word.length == 0) return true;
    if (pattern.length == 0 || word.length == 0) return false;

    // I'm too lazy to do any modification of this code, so meh :-P
    // . case
    if (p === '*') {
        return doesMatch(psufix, wsufix);
    // * case
    } else if (p == '.') {
        if (pattern.length == 1) return true;
        var pnext = pattern.charAt(1);
        if (c === pnext || pnext === '.' || pnext === '*') {
            // two cases, try both. 
            return (doesMatch(psufix, word))||(doesMatch(pattern, wsufix))
        } else {
            return doesMatch(pattern, wsufix)
        }
    // char case
    } else {
        if (p === c) return doesMatch(psufix, wsufix);
        else return false;
    }
    function dropFirst(s) {
        return s.substring(1, s.length);
    }
}

function testDoesMatch() {
    assert (doesMatch('ab*cd.t', 'abksdhfkjdsfcdcdcdgt'), 'ab*cd.t');
    assert (doesMatch('*.*', 'lskjfhldsjhflsa'), '*.*');
    assert (!doesMatch('.', 'lskjfhldsjhflsa'), '.');
    assert (doesMatch('.**', 'lskjfhldsjhflsa'), '.**');
    assert (doesMatch('ab.*cd***d', 'abskjfhcdlcdsjddd'), 'ab.*cd***d');
    assert (doesMatch('.*.*.', 'abc'), '.*.*.');
    console.log("All tests passed!");
}
<<<<<<< HEAD

function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

testDoesMatch();
=======
testDoesMatch();
>>>>>>> 12b9d576afc94570329d1970ed30e3cbea661c91
