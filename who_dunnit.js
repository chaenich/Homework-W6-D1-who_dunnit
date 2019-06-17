// Brief
// Using your knowledge about scope and variable declarations in JavaScript, look at the following code snippets and predict what the output or error will be and why. Copy the following episodes into a JavaScript file and add comments under each one detailing the reason for your predicted output.

// MVP
// Episode 1
const scenario = {
  murderer: 'Miss Scarlet',
  room: 'Library',
  weapon: 'Rope'
};

const declareMurderer = function() {
  return `The murderer is ${scenario.murderer}.`;
}

const verdict = declareMurderer();
console.log(verdict);
// Predicted Outcome: The murderer is Miss Scarlet
// Why: scenario object is at same level / in same block as the test but murderer is available to declareMurderer function (lexical scope)
// -> Correct

// Episode 2
const murderer = 'Professor Plum';

const changeMurderer = function() {
  murderer = 'Mrs. Peacock';
}

const declareMurderer = function() {
  return `The murderer is ${murderer}.`;
}

changeMurderer();
const verdict = declareMurderer();
console.log(verdict);
// Predicted Outcome:  The murderer is Professor Plum
// Why: const value cannot be changed in this case. 
// -> Correct


// Episode 3
let murderer = 'Professor Plum';

const declareMurderer = function() {
  let murderer = 'Mrs. Peacock';
  return `The murderer is ${murderer}.`;
}

const firstVerdict = declareMurderer();
console.log('First Verdict: ', firstVerdict);

const secondVerdict = `The murderer is ${murderer}.`;
console.log('Second Verdict: ', secondVerdict);
// Predicted Outcome :
// First verdict: The murderer is Mrs Peacock
// Why: This value is actually returned from declareMurderer:
// Second verdict: The murderer is Professor Plum
// Why: The assignment of Mrs Peacock is hidden so the value used is that available at same level / in same block
// -> Correct


// Episode 4
let suspectOne = 'Miss Scarlet';
let suspectTwo = 'Professor Plum';
let suspectThree = 'Mrs. Peacock';

const declareAllSuspects = function() {
  let suspectThree = 'Colonel Mustard';
  return `The suspects are ${suspectOne}, ${suspectTwo}, ${suspectThree}.`;
}

const suspects = declareAllSuspects();
console.log(suspects);
console.log(`Suspect three is ${suspectThree}.`);
// Predicted Outcome :
// Suspects are Miss Scarlet, Professor Plum, Colonel Mustard
// Why: Although the reassignment of suspect 3 is hidden, the updated list of suspects is actually passed back from the function.
// Suspect 3 is Mrs Peacock
// Why: Suspect 3 remains as Mrs Peacock as the reassignment is restricted to the declareAllSuspects function
// -> Correct


// Episode 5
const scenario = {
  murderer: 'Miss Scarlet',
  room: 'Kitchen',
  weapon: 'Candle Stick'
};

const changeWeapon = function(newWeapon) {
  scenario.weapon = newWeapon;
}

const declareWeapon = function() {
  return `The weapon is the ${scenario.weapon}.`;
}

changeWeapon('Revolver');
const verdict = declareWeapon();
console.log(verdict);
// Predicted Outcome: The weapon is the candlestick
// Why: The new value of weapon (revolver) is only available in declareWeapon
// -> Wrong. Assuming this is because scenario is at same level / same block and we go from object level - reviewing next few answers...


// Episode 6
let murderer = 'Colonel Mustard';

const changeMurderer = function() {
  murderer = 'Mr. Green';

  const plotTwist = function() {
    murderer = 'Mrs. White';
  }

  plotTwist();
}

const declareMurderer = function () {
  return `The murderer is ${murderer}.`;
}

changeMurderer();
const verdict = declareMurderer();
console.log(verdict);
// Predicted Outcome : The murderer is colonel Mustard
// Why: The assignments of different murderers are visible only within their functions
// -> Wrong - but believe I see why - the assignment of Mr. Green and Mrs. White are to global variables and as Mrs White was last - she is the current value. Reviewing next exercises with this in mind...


// Episode 7
let murderer = 'Professor Plum';

const changeMurderer = function() {
  murderer = 'Mr. Green';

  const plotTwist = function() {
    let murderer = 'Colonel Mustard';

    const unexpectedOutcome = function() {
      murderer = 'Miss Scarlet';
    }

    unexpectedOutcome();
  }

  plotTwist();
}

const declareMurderer = function() {
  return `The murderer is ${murderer}.`;
}

changeMurderer();
const verdict = declareMurderer();
console.log(verdict);
// Original Predicted Outcome: The murderer is Professor Plum
// Why: The assignments of different murderers are visible only within their functions
// -> New answer: The murderer is Miss Scarlet
// -> Why: Miss Scarlet is assigned to a global variable as the last operation (unexpectedOutcome) and so is the current value.
// -> Wrong - need this explained!


// Episode 8
const scenario = {
  murderer: 'Mrs. Peacock',
  room: 'Conservatory',
  weapon: 'Lead Pipe'
};

const changeScenario = function() {
  scenario.murderer = 'Mrs. Peacock';
  scenario.room = 'Dining Room';

  const plotTwist = function(room) {
    if (scenario.room === room) {
      scenario.murderer = 'Colonel Mustard';
    }

    const unexpectedOutcome = function(murderer) {
      if (scenario.murderer === murderer) {
        scenario.weapon = 'Candle Stick';
      }
    }

    unexpectedOutcome('Colonel Mustard');
  }

  plotTwist('Dining Room');
}

const declareWeapon = function() {
  return `The weapon is ${scenario.weapon}.`
}

changeScenario();
const verdict = declareWeapon();
console.log(verdict);
// Predicted Outcome: The weapon is Lead pipe
// Why: The assignments of different murderers are visible only within their functions
// -> New answer: Candlestick - based on what I believe is happening in Episode 5 - object attributes are updated even though at apparently outer block so the logic follows and we get to candlestick
// -> Correct


// Episode 9
let murderer = 'Professor Plum';

if (murderer === 'Professor Plum') {
  let murderer = 'Mrs. Peacock';
}

const declareMurderer = function() {
  return `The murderer is ${murderer}.`;
}

const verdict = declareMurderer();
console.log(verdict);
// Predicted Outcome : The murder is Professor Plum
// Why: The assignment of a different murderer is visible only within the if block
// -> Correct
