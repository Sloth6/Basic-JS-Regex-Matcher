/*
  Joel Simon c:

  The problem....
  Given that we have a 15 seats minivan with a 1000 lbs weight limit. 
  20 passengers signed up for seats through an online auction and each paid a 
  different price. The passengers also have different weight. Create a program 
  to find the best list of passengers to maximize the amount of money collected
   while staying under the weight limit. 
*/

'use strict'; // Must be strict with your javascript else it learns bad habits.


/**
 * Solves who to put on the bus. (by buying a bigger bus...)
 *
 * @param {number} sc Seat Capacity.
 * @param {number} wc The Weight Capacity.
 * @param {object list} ppl The list of people
 * @return {ppl list * int * int} people indexes, total weight, total value.
 */
var whoGoes = function(SC, WC, PPL) {
  /*
    achieve pseudo-polynomial time by storing a lot of partial results. 
    For every person case on whether or not to take, then pick the higher value.
  */
  var seen = {};
  var ops = 0;
  var result =  whoGoesRec(SC, WC, PPL, PPL.length);
  result.ops = ops
  return result;

  function whoGoesRec(sc, wc, ppl, n) {
    ops ++;
    //Make a unique hash key for differnt calls.
    var hKey = ''+sc+wc+n;
    var nthPerson = ppl[n-1];

    //check hash
    if (seen[hKey])
      return (seen[hKey]);

    // Base cases.
    if (sc === 0 || wc <= 0 || n === 0)
      return hash( { ppl : [], weight : 0, value : 0 } )

    // Over weight :(
    if (nthPerson.weight > wc)
      return hash ( whoGoesRec(sc, wc, ppl, n-1) );

    // Recurse on both cases.
    var withNth = whoGoesRec(sc-1, wc-nthPerson.weight, ppl, n-1);
    var withoutNth = whoGoesRec(sc, wc, ppl, n-1);

    withNth.value += nthPerson.value;
    withNth.weight += nthPerson.weight;
    withNth.ppl.push(n-1);

    // Take the larger one.
    if (withNth.value >= withoutNth.value )
      return hash( withNth );
    else
      return hash( withoutNth );
    
    function hash(value) {
      seen[hKey] = value;
      return value;
    }
  }
}

var Person = function (weight, value) {
  this.weight = weight;
  this.value = value;
}

// resist temptation to extend array obj
function arrays_equal(a,b) { return !(a<b || b<a); }

var TestCase = function (test) {
  this.ppl = [];
  for (var i = 0; i < test.weights.length; i++) {
    this.ppl.push(new Person(test.weights[i], test.values[i]));
  }
  this.result = test.result;
  this.wc = test.wc;
  this.sc = test.sc;
}

TestCase.prototype.confirm = function(result) {
  if (arrays_equal(result.ppl, this.result)) {
    console.log('Test Passed! Input of ', this.ppl.length, 'in', result.ops, ' calls.'); // :)
  
  } else {
    console.log('Test Failed!!', result,  this); // :(
  }
}

var tester = function( f ){
  var testcases = [];

  // wc is the limit case
  testcases.push(new TestCase({
    weights : [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100],
    values : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    sc : 15,
    wc : 1000,
    result : [10,11,12,13,14,15,16,17,18,19]
  }));
  // sc is the limit case
  testcases.push(new TestCase({
    weights : [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],
    values : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,0,0],
    sc : 15,
    wc : 1000,
    result : [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  }));
  // one person case.
  testcases.push(new TestCase({
    weights : [200,100,1000,100,100],
    values : [1,1,1000,2,3],
    sc : 15,
    wc : 1000,
    result : [2]
  }));
  testcases.push(new TestCase({
    weights : [200,100,600,100,100, 400],
    values : [1,1,1000,2,3, 1000],
    sc : 15,
    wc : 1000,
    result : [2,5]
  }));

  var test;
  for (var i = 0; i < testcases.length; i++) {
    test = testcases[i];
    test.confirm(f(test.sc, test.wc, test.ppl));
  };
}

tester(whoGoes);