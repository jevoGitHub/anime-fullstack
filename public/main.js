const replybtn = document.querySelectorAll(".reply-submit")
const reply = document.querySelectorAll(".reply").forEach(elem => elem.addEventListener("click", replyOption))
var trash = document.querySelectorAll(".trash")


function replyOption(event) {
  console.log(event.target.id)
  const a = event.target.id.split("_")
  const replyId = a[1]
  const replySectionId = `replysection_${replyId}`
  console.log(replySectionId)
  document.getElementById(replySectionId).classList.toggle("hidden")
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
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('episode'));
    console.log(this.dataset.replyid)
    fetch('/messages', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'msgId': this.dataset.replyid,
          'episode': urlParams.get('episode')
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});