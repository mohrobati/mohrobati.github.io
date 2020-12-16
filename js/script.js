let current = 1

let changeTab = () => {
    Array.from(document.querySelectorAll("#scene-body section")).forEach((el, idx) => {
        if(idx === current) {
            el.style.display = 'block'
        } else {
            el.style.display = 'none'
        }
    })
}

changeTab()

Array.from(document.querySelectorAll("#scene-tabbar .list-item")).forEach((el, idx) => {
    el.addEventListener('click', () => {
        console.log('hi')
        current = idx
        changeTab()
    })
})