class Rover {
   // Write code here!
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }

  receiveMessage(messageObject) {

    let resultsArray = [];

    for(let commandObject of messageObject.commands) {
      let pushTarget = commandObject;
      if(commandObject.commandType === "STATUS_CHECK") {
        pushTarget = {}
        pushTarget["completed"] = true;
        let roverStatus = {};
        roverStatus["position"] = this.position;
        roverStatus["mode"] = this.mode;
        roverStatus["generatorWatts"] = this.generatorWatts;
        pushTarget["roverStatus"] = roverStatus;
      }
      if(commandObject.commandType === "MODE_CHANGE") {
        pushTarget = {}
        this.mode = commandObject.value;
        pushTarget["completed"] = true;
      }
      if(commandObject.commandType === "MOVE") {
        pushTarget = {};
        if(this.mode === "LOW_POWER") {
          pushTarget["completed"] = false;
        }
        else {
          pushTarget["completed"] = true;
          this.position = commandObject.value;
        }
      }
      resultsArray.push(pushTarget);

    }

    return {
      message: messageObject.name,
      results: resultsArray
    }
  }
}

module.exports = Rover;