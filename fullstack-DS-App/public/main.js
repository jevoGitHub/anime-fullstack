const replybtn = document.querySelectorAll(".reply-submit")
const reply = document.querySelector(".reply").addEventListener("click", replyOption)

function replyOption() {
  document.querySelector(".reply-section").classList.remove("hidden")
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

//  for(let i = 0; i < reply.length; i++) {
//   reply[i].addEventListener("click", replyOption)
// }

//  async function replyOption(event) {
//   document.querySelector(".reply").classList.remove("hidden")
    
//       const json = await result.json()
//       window.location.reload(true)
//  }