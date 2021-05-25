class Rover {
   // Write code here!
   constructor(position) {
     this.position = position;
     this.mode = "NORMAL";
     this.generatorWatts = 110;
   }

   receiveMessage(messageObject) {
     let returnObject = {
       name:messageObject.name,
       commands: messageObject.commands
     };
     if(messageObject.commands[0].commandType === "MODE_CHANGE") {
       returnObject.result = {
         completed: true
       }
     }
     else {
       returnObject.result = {
         mode: this.mode,
         generatorWatts: this.generatorWatts,
         position: this.position
       }
     }
     return returnObject;
   }
}

module.exports = Rover;