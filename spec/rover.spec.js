const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let testRover = new Rover(55555);
    expect(testRover.position)
      .toEqual(55555);
    expect(testRover.mode)
      .toEqual("NORMAL");
    expect(testRover.generatorWatts)
      .toEqual(110);
  });

  it("response returned by receiveMessage contains name of message", function() {
    let testRover = new Rover(55555);
    let testCommandOne = new Command('STATUS_CHECK');
    let testMessage = new Message("Message name", [testCommandOne]);
    let messageResponse = testRover.receiveMessage(testMessage);
    expect(messageResponse.message)
      .toEqual("Message name");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let testRover = new Rover(55555);
    let testCommandOne = new Command('STATUS_CHECK');
    let testCommandTwo = new Command('MOVE', 40);
    let testMessage = new Message("Message name", [testCommandOne, testCommandTwo]);
    let messageResponse = testRover.receiveMessage(testMessage);
    expect(messageResponse.results.length)
      .toEqual(2);
  });

  it("responds correctly to status check command", function() {
    let testRover = new Rover(55555);
    let testCommandOne = new Command('STATUS_CHECK');
    let testMessage = new Message("Message name", [testCommandOne]);
    let messageResponse = testRover.receiveMessage(testMessage);
    expect(messageResponse.results.length)
      .toEqual(1);
    expect(messageResponse.results[0].roverStatus.position)
      .toEqual(55555);
    expect(messageResponse.results[0].roverStatus.mode)
      .toEqual("NORMAL");
    expect(messageResponse.results[0].roverStatus.generatorWatts)
      .toEqual(110);
  });

  it("responds correctly to mode change command", function() {
    let testRover = new Rover(55555);
    let testCommandOne = new Command('MODE_CHANGE', "LOW_POWER");
    let testMessage = new Message("Message name", [testCommandOne]);
    let messageResponse = testRover.receiveMessage(testMessage);
    expect(messageResponse.results.length)
      .toEqual(1);
    expect(messageResponse.results[0].completed)
      .toBeTrue();
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let testRover = new Rover(55555);
    testRover.mode = "LOW_POWER";
    let testCommandOne = new Command('MOVE', 20);
    let testMessage = new Message("Message name", [testCommandOne]);
    let messageResponse = testRover.receiveMessage(testMessage);
    expect(messageResponse.results.length)
      .toEqual(1);
    expect(messageResponse.results[0].completed)
      .toBeFalse();
  });
  
  it("responds with position for move command", function() {
    let testRover = new Rover(55555);
    let testCommandOne = new Command('MOVE', 20);
    let testMessage = new Message("Message name", [testCommandOne]);
    let messageResponse = testRover.receiveMessage(testMessage);
    expect(messageResponse.results.length)
      .toEqual(1);
    expect(messageResponse.results[0].completed)
      .toBeTrue();
    expect(testRover.position)
      .toEqual(20);
  });

});
