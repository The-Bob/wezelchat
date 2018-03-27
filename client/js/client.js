const nameInput = document.getElementById("nameInput");
const nameForm = document.getElementById("nameForm");
const chatList = document.getElementById("chatList");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");


var socket = io();



chatForm.onsubmit = (e) => {
	e.preventDefault();

	socket.emit('nameSubmit', chatInput.value);
}
