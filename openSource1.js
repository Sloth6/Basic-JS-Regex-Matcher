/*
    Copyright (C) 2013 Joel Simon
    Simple regex matcher for symbols * or c or .

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

    
    This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.
    This is free software, and you are welcome to redistribute it
    under certain conditions; type `show c' for details.
*/
'use strict';

function doesMatch(pattern, word) {
    var p = pattern.charAt(0);
    var c = word.charAt(0);
    var psufix = dropFirst(pattern);
    var wsufix = dropFirst(word);

    if (pattern.length == 0 && word.length == 0) return true;
    if (pattern.length == 0 || word.length == 0) return false;

    // . case
    if (p === '.') {
        return doesMatch(psufix, wsufix);
    // * case
    } else if (p == '*') {
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
  if (testr()) console.log("All tests passed!"); //yaaaa you rock :)
  else console.log("You Failed!"); // :'(
  function testr () {
    if (!doesMatch('ab*cd.t', 'abksdhfkjdsfcdcdcdgt')) return false;
    if (!doesMatch('*.*', 'lskjfhldsjhflsa')) return false;
    if (doesMatch('.', 'lskjfhldsjhflsa')) return false;
    if (!doesMatch('.**', 'lskjfhldsjhflsa')) return false;
    if (!doesMatch('ab.*cd***d', 'abskjfhcdlcdsjddd')) return false;
    if (!doesMatch('.*.*.', 'abc')) return false;
    return true;
  }
}
testDoesMatch();