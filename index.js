const TV = require('./VieraTVRemote')

const axios = require('axios')
const readline = require('readline');
const keypress = require('keypress');

const useReadline = false

var tv = new TV();
tv._options.ip = process.argv[3] || '192.168.1.133'

tv.execute = function(requestUrl, requestMethod, requestHeaders, requestData) {
    // Make the HTTP request using axios
    return axios({
        method: requestMethod,
        url: requestUrl,
        headers: requestHeaders,
        data: requestData,
    })
        .then(response => {
        // Handle the response
        //console.log('Response:', response.data);
        })
        .catch(error => {
        // Handle errors
        console.error('Error:', error.message);
        });    
};

// Enable the stdin to begin emitting "keypress" events
process.stdin.setRawMode(true);
process.stdin.resume();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  // Prompt the user for input
  function ask(){
    if(useReadline){
        rl.question('Enter cmd: ', (userInput) => {
            console.log(`You entered: ${userInput}`);
        
            var cmd = ''

            if(userInput == 'ok') cmd = 'NRC_ENTER-ONOFF'

            if(userInput == 'ret') cmd = 'NRC_RETURN-ONOFF'

            if(userInput == 'up') cmd = 'NRC_UP-ONOFF'
            if(userInput == 'down') cmd = 'NRC_DOWN-ONOFF'
            if(userInput == 'right') cmd = 'NRC_RIGHT-ONOFF'
            if(userInput == 'left') cmd = 'NRC_LEFT-ONOFF'

            if(cmd)
                tv.sendCommand(cmd)

            ask()
        });
    }
    else {
        // Listen for the "keypress" event
        process.stdin.on('keypress', function (ch, key) {
            console.log("pressed ", ch, key)

            //return;

            let name = key.name

            if (name === 'q') cmd = 'NRC_POWER-ONOFF'

            if (name === 'a') cmd = 'NRC_APPS-ONOFF'
            if (name === 'h') cmd = 'NRC_HOME-ONOFF'

            if (name === 'up') cmd = 'NRC_UP-ONOFF'
            if (name === 'down') cmd = 'NRC_DOWN-ONOFF'
            if (name === 'left') cmd = 'NRC_LEFT-ONOFF'
            if (name === 'right') cmd = 'NRC_RIGHT-ONOFF'

            if(name == 'return') cmd = 'NRC_ENTER-ONOFF'
            if(name == 'backspace') cmd = 'NRC_RETURN-ONOFF'

            if(cmd)
                tv.sendCommand(cmd)
        });
    }


}

ask();
  
// Listen for the 'close' event to know when the interface is closed
rl.on('close', () => {
console.log('Readline interface closed.');
});

