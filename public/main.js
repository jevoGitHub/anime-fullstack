const replybtn = document.querySelectorAll(".reply-submit")
const reply = document.querySelectorAll(".reply").forEach(elem => elem.addEventListener("click", replyOption))
var trash = document.querySelectorAll(".trash")

function replyOption() {
  document.querySelector(".reply-section").classList.toggle("hidden")
}

for(let i = 0; i < replybtn.length; i++) {
    replybtn[i].addEventListener("click", replyFunc)
}

 async function replyFunc(event) {
  document.querySelector(".reply-section").classList.add("hidden")
    const replyInputId = `input_${event.target.id}`
    const result = await fetch("/reply", {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'msgId': event.target.id,
          'msg': document.getElementById(replyInputId).value
        })
      })
      const json = await result.json()
      window.location.reload(true)
 }

 Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.childNodes[0]
      console.log(name)
      console.log(msg)
    fetch('messages', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'msg': msg
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});