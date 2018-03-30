const nameInput = document.getElementById("nameInput");
const nameForm = document.getElementById("nameForm");
const chatList = document.getElementById("chatList");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");


var socket = io();



nameForm.onsubmit = (e) => {
	e.preventDefault();

	console.log(nameInput.value);
	socket.emit('nameSubmit', nameInput.value);

	document.getElementById('nameScreen').style.display = 'none';
	chatInput.focus();
}

chatForm.onsubmit = (e) => {
	e.preventDefault();

	socket.emit('chatSubmit', chatInput.value);
	chatInput.value = '';
}

socket.on('updateChat', (data) =>{
	chatList.innerHTML += `<li id="message-${data.id}" class="message">${data.text}</li>`
});
