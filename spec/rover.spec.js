const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
    const testObj = new Rover(98382);
    expect(testObj.mode)
      .toEqual("NORMAL");
    expect(testObj.generatorWatts)
      .toEqual(110);
  })

  it("response returned by receiveMessage contains name of message", function() {
    const testCommand = new Command("MOVE", 20);
    const testMessage = new Message("Move message", [testCommand]);
    const testObj = new Rover("");
    expect(testObj.receiveMessage(testMessage).name)
      .toEqual("Move message");
  })

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    const testCommandOne = new Command("MOVE", 20);
    const testCommandTwo = new Command("MOVE", 40);
    const testMessage = new Message("move message", [testCommandOne, testCommandTwo]);
    const testObj = new Rover(98382);
    expect(testObj.receiveMessage(testMessage).commands)
      .toEqual([testCommandOne, testCommandTwo]);
  })

  it("responds correctly to status check command", function() {
    const testCommand = new Command("STATUS_CHECK");
    const testMessage = new Message("status check message", [testCommand]);
    const testObj = new Rover(98382);
    expect(testObj.receiveMessage(testMessage).name)
      .toEqual("status check message");
    expect(testObj.receiveMessage(testMessage).commands)
      .toEqual([testCommand]);
    expect(testObj.receiveMessage(testMessage).result.mode)
      .toEqual("NORMAL");
    expect(testObj.receiveMessage(testMessage).result.generatorWatts)
      .toEqual(110);
    expect(testObj.receiveMessage(testMessage).result.position)
      .toEqual(98382);
  })

  it("responds correctly to mode change command", function() {
    const testCommand = new Command("MODE_CHANGE", "LOW_POWER");
    const testMessage = new Message("message name", [testCommand]);
    const testRover = new Rover(98382);
    const testRoverResult = testRover.receiveMessage(testMessage);
    expect(testRoverResult.result.completed)
      .toEqual(true);

  })

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    const testCommandOne = new Command("MODE_CHANGE", "LOW_POWER");
  })

});
