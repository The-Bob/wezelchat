const nameInput = document.getElementById("nameInput");
const nameForm = document.getElementById("nameForm");
const chatList = document.getElementById("chatList");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const newMessageIndicator = document.getElementById("newMessageIndicator");

var socket = io();

var scrolledAway;
var unseenMessages = 0;

var blankNameResponses = ["You need a name.", "No, seriously", "C'mon man", "I'mma restart now"];
var blankNameI = 0;

nameForm.onsubmit = (e) => {
  e.preventDefault();

  if(nameInput.value.length>0){
    console.log(nameInput.value);
    socket.emit('nameSubmit', nameInput.value);

    document.getElementById('nameScreen').style.display = 'none';
    chatInput.focus();
  } else {
    nameInput.placeholder = blankNameResponses[blankNameI];
    blankNameI++;
    if(blankNameI >= blankNameResponses.length){
      blankNameI = 0;
    }
  }
};

chatForm.onsubmit = (e) => {
  e.preventDefault();

  if(chatInput.value.length>0){
    socket.emit('chatSubmit',chatInput.value);
    chatInput.placeholder = "Type your message here!";
    chatInput.focus();
  } else {
    chatInput.placeholder = "No blank messages!";
  }
  chatInput.value = '';
};

//Make chatInput text area newline on shift
chatInput.addEventListener('keydown', function(e){
  if (e.keyCode === 13) {
      if(e.shiftKey) {
        console.log('shift+enter');
        return true;
      }else {
        console.log('enter');
        e.preventDefault();
        chatSubmit.click();
        return false;
      }
    }
});

socket.on('updateChat', (data) =>{
  console.log(`new message ${data.text}`);
  chatList.innerHTML += `<li id="message-${data.id}" class="message"><span>${data.senderName} says:</span><p>${data.text}</p></li>`;
  if(!scrolledAway){
    chatList.scroll({
      top: chatList.scrollHeight,
      behavior: 'smooth'
    });
  } else {
    unseenMessages++;
    newMessageIndicator.innerHTML = `${unseenMessages} new`;
    newMessageIndicator.style.display = "block";
  }
});

socket.on('serverMessage', (data) =>{
  chatList.innerHTML += `<li id="message-${data.id}" class="message server"><strong>The Server</strong> says: ${data.text}</li>`;
  if(!scrolledAway){
    chatList.scroll({
      top: chatList.scrollHeight,
      behavior: 'smooth'
    });
  } else {
    unseenMessages++;
    newMessageIndicator.innerHTML = `${unseenMessages} new`;
    newMessageIndicator.style.display = "block";
  }
});

chatList.addEventListener("scroll", () =>{
  if(chatList.scrollTop >= chatList.scrollHeight - chatList.offsetHeight - 1) {
    scrolledAway = false;

  } else {
    scrolledAway = true;
  }
});
