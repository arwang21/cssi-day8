var MD5 = new Hashes.MD5;

const charMax = 280;
const messagesRef = firebase.database().ref();
const btn = document.querySelector("#sendMsg");
const messField = document.querySelector("#message");
const passField = document.querySelector("#passcode");
let charDiv = document.querySelector("#chars");
let charCount = messField.value.length;

// MILD 1
messField.maxLength = charMax;

messField.addEventListener('keyup', (e) => {
    charCount = messField.value.length;
    charDiv.innerHTML = (charCount) + "/" + charMax;
    // MILD 2
    if(charCount == charMax) {
        alert("You have reached the maximum character count");
    }
})

btn.addEventListener('click', (e) => {
    console.log(messField.disabled);
    if(messField.disabled) {
        location.reload();  //alternative methods always trigger browser's flag for empty field :(
    }
    // MEDIUM
    let message = messField.value;
    let passcode = passField.value;
    console.log(message);
    console.log(passcode);
    if(/\d/g.test(passcode) && /[A-Z]/g.test(passcode)) {
        messagesRef.push({
          message: message,
          passcode: MD5.hex(passcode)   //SPICY
         });
        messField.disabled = true;
        passField.disabled = true;
        btn.innerHTML = "Send Another Message"
    }
    else if(passcode != "")
        alert("Your passcode must contain at least 1 capital letter and 1 number");
    else
        return;  //when passcode field is empty, no alert needed bc browser flag
})