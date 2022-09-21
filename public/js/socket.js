const socket = io('http://localhost:5000')
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')

const name = prompt('what is your name?')
appendMessage({message: `You joined`, name: name})
socket.emit('new-user', name)

// send message to chat event
socket.on('chat-message', data => {
  appendMessage(data)
})

// connect event
socket.on('user-connected', name => {
  appendMessage({message: 'connected!', name: name})
})

// disconnect event
socket.on('user-disconnected', data => {
  appendMessage(data)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value
  appendMessage({message: message, name: name})
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(data) {
  const messageElement = document.createElement('div')
  messageElement.setAttribute('class', 'd-flex flex-row justify-content-start mb-4')
  messageElement.innerHTML = `<div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
  <p>${data.name}: ${data.message}</p></div>`
  messageContainer.appendChild(messageElement)
}
