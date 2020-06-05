let search = window.document.querySelector("#page-home main a")

let modal = window.document.querySelector("#modal")

let close = window.document.querySelector("#modal .header a")

search.addEventListener(
    "click",
    function () {
        modal.classList.remove("hide")
    })

close.addEventListener(
    "click",
    function () {
        modal.classList.add("hide")
    })