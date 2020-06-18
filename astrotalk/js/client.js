const socket=io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInp =document.getElementById('messageInp');
const messageContainer =document.querySelector(".container");
const append= (message,position)=>{

  
    const messageElemet = document.createElement('div');
     messageElemet.innerText=message;
    
    messageElemet.classList.add('message');
    messageElemet.classList.add(position);
    messageContainer.append(messageElemet);
   
}


form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const messageq =messageInp.value;
  append(`you: ${messageq}` , 'right');
  socket.emit('send',messageq);
  messageInp.value='' ;
})
 



const name = prompt("enter your name to join :) ");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
  append(`${name} joined the chat`, 'right');

})

socket.on('receive',data=>{
  append(`${data.name}:  ${data.message}`,'left');

})

socket.on('left',name=>{
  append(`${name} left the chat`,'left');

})