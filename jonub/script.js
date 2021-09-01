
var audio = new Audio("./khoda.mp3");
audio.loop = true
var flag = 1;
document.getElementsByClassName('sun')[0].addEventListener("click", function () {
    flag ? audio.play() : audio.pause();
    flag = 1 - flag
})


var controller = new ScrollMagic.Controller();

var speed = 500

var skyScene = new ScrollMagic.Scene({
    duration: speed * 10,
})

    .setTween(".sky", { transform: "translate(-500px, 0px)" })
    .addTo(controller)

var seaScene = new ScrollMagic.Scene({
    duration: speed * 10,
})

    .setTween(".sea", { transform: "translate(-500px, 0px)" })
    .addTo(controller)

var sunScene = new ScrollMagic.Scene({
    duration: speed * 5,
})

    .setTween(".sun", { transform: "rotate(-180.1deg)", left: "-65%", filter: "hue-rotate(360deg)" })
    .addTo(controller)

var cloudScene = new ScrollMagic.Scene({
    offser: speed * 1,
    duration: speed * 10,
})

    .setTween(".cloud", { right: "100%" })
    .addTo(controller)

var houseScene = new ScrollMagic.Scene({
    offset: speed * 2,
    duration: speed * 3,
})
    .setTween(".house", { top: "24%" })
    .addTo(controller)

var houseScene = new ScrollMagic.Scene({
    offset: speed * 5,
    duration: speed * 3,
})
    .setTween(".house", { left: "35%" })
    .addTo(controller)

var houseScene = new ScrollMagic.Scene({
    offset: speed * 8,
    duration: speed * 5,
})
    .setTween(".house", { top: "-30%" })
    .addTo(controller)


var darakScene = new ScrollMagic.Scene({
    offset: speed * 5,
    duration: speed * 3,
})
    .setTween(".darak", { top: "30%" })
    .addTo(controller)

var darakScene = new ScrollMagic.Scene({
    offset: speed * 5,
    duration: speed * 3,
})
    .setTween(".darak", { right: "15%" })
    .addTo(controller)

var darakScene = new ScrollMagic.Scene({
    offset: speed * 8,
    duration: speed * 5,
})
    .setTween(".darak", { top: "-30%" })
    .addTo(controller)



var seaScene = new ScrollMagic.Scene({
    offset: speed * 8,
    duration: speed * 5,
})

    .setTween(".sea", { transform: "translate(-500px, -520px)" })
    .addTo(controller)

var boatScene = new ScrollMagic.Scene({
    offset: speed * 8,
    duration: speed * 5,
})

    .setTween(".boat", { bottom: "60%", left: "10%" })
    .addTo(controller)

var cityScene = new ScrollMagic.Scene({
    offset: speed * 11,
    duration: speed * 5,
})

    .setTween(".city", { bottom: "-40%" })
    .addTo(controller)


var cityScene = new ScrollMagic.Scene({
    offset: speed * 16,
    duration: speed * 24,
})

    .setTween(".city", { bottom: "-40%", right: "60%" })
    .addTo(controller)


var gateScene = new ScrollMagic.Scene({
    offset: speed * 20,
    duration: speed * 20,
})

    .setTween(".gate", { right: "0%" })
    .addTo(controller)


var seaScene = new ScrollMagic.Scene({
    offset: speed * 16,
    duration: speed * 28,
})

    .setTween(".sea", { transform: "translate(-1200px, -520px)" })
    .addTo(controller)



////////////
var palm1Scene = new ScrollMagic.Scene({
    offset: speed * 13,
    duration: speed * 5,
})

    .setTween(".palm1", { bottom: "10%", right: "70%" })
    .addTo(controller)

var palm1Scene = new ScrollMagic.Scene({
    offset: speed * 18,
    duration: speed * 15,
})

    .setTween(".palm1", { bottom: "10%", right: "130%" })
    .addTo(controller)

//////////////
var palm2Scene = new ScrollMagic.Scene({
    offset: speed * 18,
    duration: speed * 5,
})

    .setTween(".palm2", { bottom: "7%", right: "30%" })
    .addTo(controller)

var palm2Scene = new ScrollMagic.Scene({
    offset: speed * 23,
    duration: speed * 20,
})

    .setTween(".palm2", { bottom: "7%", right: "90%" })
    .addTo(controller)



var boatScene = new ScrollMagic.Scene({
    offset: speed * 40,
    duration: speed * 10,
})

    .setTween(".boat", { bottom: "60%", left: "47%" })
    .addTo(controller)


var boatScene = new ScrollMagic.Scene({
    offset: speed * 50,
    duration: speed * 10,
})

    .setTween(".boat", { bottom: "25%", left: "47%" })
    .addTo(controller)

var taghScene = new ScrollMagic.Scene({
    offset: speed * 40,
    duration: speed * 10,
})

    .setTween(".tagh", { opacity: "1" })
    .addTo(controller)

var taghScene = new ScrollMagic.Scene({
    offset: speed * 50,
    duration: speed * 10,
})
    .setTween(".tagh", { filter: "hue-rotate(720deg)" })
    .addTo(controller)