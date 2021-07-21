const maxAttempts = 3;

const getMessages = () => {
    const messagesRef = firebase.database().ref();
        messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        //console.log(data);
        for(let key in data) {
            const message = data[key];
            console.log(message);
        }
    });
};

const findMessage = (myPass) => {
    const messagesRef = firebase.database().ref();
        messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        //console.log(data);
        let count = 0;  //counts number of passcode matches
        for(let key in data) {
            const message = data[key];
            //console.log(message);
            if(myPass == message.passcode) {
                renderMessage(message);
                count ++;
            }
        }

        //MEDIUM STRETCH

        if(count == 0) { //no passcode matches

            //SPICY STRETCH

            if (attempts <= maxAttempts) {
                //display error message, #attempts remaining
                document.querySelector("#message").innerHTML = `bad passcode: ${4-attempts} remaining`;
            }
            else {
                //SPICY 1
                document.querySelector("#passcodeInput").style.display = "none";
                document.querySelector("#message").innerHTML = "try again later";
                //SPICY2
                setTimeout(() => {
                    location.reload();
                }, 3000);  //in practice, should be higher than 3000
            }
        }
    });
};

const renderMessage = (message) => {
    document.querySelector("#passcodeInput").style.display = "none";
    //concatenate & add line break for multiple messages w/ same passcode
    document.querySelector("#message").innerHTML = document.querySelector("#message").innerHTML + message.message + "<br>";
}

let attempts = 0;
document.querySelector("#viewMsg").addEventListener("click", () => {
    attempts ++;
    const passcode = document.querySelector("#passcode").value;
    //clear error message
    document.querySelector("#message").innerHTML = "";
    findMessage(passcode);
})
