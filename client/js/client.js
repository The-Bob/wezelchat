const nameInput = document.getElementById("nameInput");
const nameForm = document.getElementById("nameForm");
const chatList = document.getElementById("chatList");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");


var socket = io();



nameForm.onsubmit = (e) => {
	e.preventDefault();
	document.getElementById('nameScreen').style.display = 'none';
	socket.emit('nameSubmit', chatInput.value);
}
