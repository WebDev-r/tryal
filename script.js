function start(){
  setInterval(loadConversation,2000)
}

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
function loadConversation(){
  fetch("https://colorful-red-tadpole.cyclic.app/login/convertation",  {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      "u_id": localStorage.getItem("u_id"),
      "ps_wd":localStorage.getItem("ps_wd"),
      "friend_uid": localStorage.getItem("friend"),
    }),
    redirect: 'follow'
  })
  .then(response => response.json())
  .then(result =>{console.log(result)
                  arrangeChat(result.chat)
                   })
  .catch(error => console.log('error', error));
                  }
  function arrangeChat(chat){
    console.log(chat.length);
    const temp=document.getElementById('temp');
    
   document.querySelector('#msgbox').innerHTML=''

    for(var i=0;i<chat.length;i++){
      var temp_div=temp.content.cloneNode(true);
      temp_div.querySelector('.msg').innerHTML=chat[i].chat;
      if(chat[i].from==localStorage.getItem("u_id")){
        temp_div.querySelector('.msg').classList.add("me");
      }else{
        temp_div.querySelector('.msg').classList.add("friend")
      }
      document.getElementById('msgbox').appendChild(temp_div)
    }
  }


const now =new Date()
document.getElementById('send-btn').addEventListener('click',()=>{

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var time={year:now.getFullYear(),
    month:now.getMonth(),
    date:now.getDate(),
    hours:now.getHours(),
    min:now.getMinutes(),
    sec:now.getSeconds()}
  var raw = JSON.stringify({
    "u_id": localStorage.getItem("u_id"),
  "ps_wd":localStorage.getItem("ps_wd"),
    "to": localStorage.getItem("friend"),
    "msg":document.getElementById('inputbox').value,
    "time":time
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://colorful-red-tadpole.cyclic.app/login/msg", requestOptions)
  .then(response => response.json())
  .then(result =>{console.log(result)
                
                   })
  .catch(error => console.log('error', error))
                  


  var childElemLen=document.getElementById('msgbox').childElementCount;
  
  if(childElemLen<10){
  const temp=document.getElementById('temp');
  const temp_div=temp.content.cloneNode(true);
  console.log(document.getElementById('inputbox').value)
  temp_div.querySelector('.msg').innerHTML=document.getElementById('inputbox').value
  temp_div.querySelector('.msg').classList.add("me");
  document.getElementById('msgbox').appendChild(temp_div);
  }
  else{
  const temp=document.getElementById('temp');
  const temp_div=temp.content.cloneNode(true);
  console.log(document.getElementById('inputbox').value)
  temp_div.querySelector('.msg').innerHTML=document.getElementById('inputbox').value
  temp_div.querySelector('.msg').classList.add("me");
  document.getElementById('msgbox').removeChild(document.getElementById('msgbox').firstElementChild)
  document.getElementById('msgbox').appendChild(temp_div);
  }
}
  )

document.getElementById('set').addEventListener('click',()=>{
  localStorage.setItem("u_id",document.getElementById('uid').value)
  localStorage.setItem("ps_wd",document.getElementById('ps_wd').value)
  localStorage.setItem("friend",document.getElementById('friend').value)
  start()
})





