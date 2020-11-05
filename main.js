'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
  //console.log("*********")
}

//console.log( "hello yousif :)")
//getting into the stacks
//console.log(stacks.a[1])

// Next, what do you think this function should do? 
    // this moves our pieces to the new stack, only after it is called in the isLegal function
const movePiece = (startStack, endStack) => {
  let placeholder = stacks[startStack].pop() // take first stacks top piece
  stacks[endStack].push(placeholder) // pick second stack and push into it
  return stacks
}

const isLegal = (startStack, endStack) => {
  // console.log(startStack, endStack)
  // the top piece should always be less than the one below it. 
  // the user has to pick a, b or c only
  // user cannot move an empty array
  let firsttemp = stacks[startStack].length-1
  let lasttemp = stacks[endStack].length-1
  // console.log('start stack length =', firsttemp, 'end stack length =', lasttemp) // watching the logs of current stats
  // console.log("*********")
  // console.log("top piece in start array =",stacks[startStack][firsttemp],"top piece in end array =", stacks[endStack][lasttemp])
  // console.log("*********")
 if(stacks[startStack][firsttemp] > stacks[endStack][lasttemp]){//compares if the firststacks last position is bigger than the end stack
    console.log('invalid move, board does not change')
    return false
  } else if(stacks[startStack][firsttemp] == undefined ){  //checks first stack is not empty
    console.log('invalid move, board does not change')
    return false
  }  else {
  movePiece(startStack, endStack) //moves the pieces!
  return true
  }
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = (stacks) => {  
  //console.log(stacks.c)
  if((stacks.c.length == 4)||(stacks.b.length == 4)){
   // console.log("You Win!") 
    return true
  } else {
   // console.log("You havent won, yet.")
    return false
  }
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // console.log(startStack)
  startStack = startStack.toLowerCase()
  startStack = startStack.trim()
  endStack = endStack.toLowerCase()
  endStack = endStack.trim()
   
  // console.log(startStack)
  
  isLegal(startStack, endStack) // check legal move // move piece
  checkForWin(stacks) // check for win conditions
  printStacks() // log board

  return startStack, endStack
  
  
}

// towersOfHanoi('B ', 'a')  // invalid move
// towersOfHanoi('a','b' )
// towersOfHanoi('a','c')
// towersOfHanoi('c', 'b')  // invalid move
// towersOfHanoi('b', 'c')
// towersOfHanoi('a', 'b')
// towersOfHanoi('c','a')
// towersOfHanoi('c', 'b')
// towersOfHanoi('a','b')
// towersOfHanoi('a','c')
// towersOfHanoi('b','a')
// towersOfHanoi('b','c')
// towersOfHanoi('a','b')
// towersOfHanoi('c','a')
// towersOfHanoi('b','a')
// towersOfHanoi('b','c')
// towersOfHanoi('a','b')
// towersOfHanoi('a','c')
// towersOfHanoi('b','c')

const getPrompt = (startStack, endStack) => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

getPrompt()
// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(stacks), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(stacks), false);
    });
  });
    describe('should handle uppercase inputs', () => {
      it('should take in uppercase letters', () => {
        stacks = { a: [], b: [4, 3, 2, 1], c: [] };
        assert.equal(towersOfHanoi('B', 'a'), ('b','a'));
       
      });
  });
  describe('should handle whitespace', () => {
    it('should take spaces and remove them', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(towersOfHanoi(' b ', 'a '), ('b','a'));
     
    });
});
describe('should not move a empty piece', () => {
  it('should not move an empty piece', () => {
    stacks = { a: [], b: [4, 3, 2, 1], c: [] };
    assert.equal(isLegal('a', 'b'), false);
   
  });
})

} else {

  getPrompt();

}


 // tempABC = startStack
  // tempNum = startStack[largestStackPosition] //biggest number
  // tempHolder = stacks.tempABC[tempNum]
  // for (let i = 0; i <= tempABC.length; i++){
  //   tempNum[i]
  //   largestStackPosition = tempABC[x]
  // }

  // if((startStack !== 'a')||(startStack !== 'b') ||(startStack !== 'c') ){
  //   console.log('invalid move, board does not change')
  // } else