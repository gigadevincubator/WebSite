currentMousePos = { x: -1, y: -1 }

const navbarBackgroundColor = 'rgb(255,255,255)';
const accentColor = 'rgb(47, 206, 124)';

$(document).ready(function(){
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });

    navbarContainerInit()
    cardsScrollInit()
    entitySliderInit()
})

function navbarContainerInit() {
    let navBarContain = $(".navBarContainer")
    // lent fading in of the shine
    $(navBarContain).mousemove(function(event) {
        navBarContain.css({"background": navbarBackgroundColor, "background": `linear-gradient(90deg, 
                            ${navbarBackgroundColor} 0%, 
                            ${navbarBackgroundColor} ${currentMousePos.x-250}px, 
                            ${accentColor} ${currentMousePos.x}px, 
                            ${navbarBackgroundColor} ${currentMousePos.x+250}px, 
                            ${navbarBackgroundColor} 100%)`})
    });

    $(navBarContain).mouseout(function(event) {
        navBarContain.css({"background": ""})
        navBarContain.css({"background": navbarBackgroundColor})
    })
}

function cardsScrollInit(){
    cardsContainer = $(".cardsContainer")
    var timeout;
    cardsContainer.mouseenter(function(event){
        timeout = setInterval(function(){
            if(VSectionFromPos() === 3){
                let pos3 = posFromVSection(3)
                let mouse = currentMousePos.x - pos3.min
                let max = pos3.max - pos3.min
                let movPerc = (mouse / max * 100) / 100
                let old = cardsContainer.scrollLeft()
                cardsContainer.scrollLeft(old+40*movPerc);
            }
            if(VSectionFromPos() === 1){
                let pos1 = posFromVSection(1)
                let mouse = currentMousePos.x - pos1.min
                let max = pos1.max - pos1.min
                let movPerc = (100 - mouse / max * 100) / 100
                let old = cardsContainer.scrollLeft()
                cardsContainer.scrollLeft(old-40*movPerc);
            }
        }, 25)
    })

    cardsContainer.mouseleave(function (event) {
        clearInterval(timeout)
    })


}

function VSectionFromPos(positionX = currentMousePos.x){
    if (positionX >= (posFromVSection(3).min)){
        return 3
    }else if(positionX < (posFromVSection(2).min)){
        return 1
    }else{
        return 2
    }
}

function posFromVSection(number) {
    if (number === 1){
        return {min: 0, max: $(window).width() / 3 }
    }else if (number === 2){
        return {min: $(window).width() / 3 + 1, max: $(window).width() / 3 * 2 }
    }else if (number === 3){
        return {min: $(window).width() / 3 * 2 + 1, max: $(window).width() }
    }

}

function entitySliderInit() {
    let businessOwnerBtn = $('#entBusinessOwnBtn')
    let studentBtn = $('#entStudentBtn')
    let imgs = $('#entSliderImg')

    let busOwnInfo = $('#busOwnInfo')
    let studInfo = $('#studInfo')

    businessOwnerBtn.mouseenter(function (event) {
        imgs.animate({"right": "0"}, "slow")
    })

    studentBtn.mouseenter(function (event) {
        imgs.animate({"right": "100%"}, "slow")
    })

    businessOwnerBtn.click(function (event) {
        studInfo.removeClass("show")
        busOwnInfo.addClass("show")
        scrollTo('#info');
    })

    studentBtn.click(function (event) {
        busOwnInfo.removeClass("show")
        studInfo.addClass("show")
        scrollTo('#info');
    })
}

function scrollTo(selector) {
    let pos = $(selector).offset().top - $('#navigationBar').height()
    $('html, body').animate({"scrollTop": pos}, "slow", "linear");
}