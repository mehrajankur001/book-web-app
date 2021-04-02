var sliders = document.querySelectorAll('.slider');
var btn = document.querySelectorAll('.btn');
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
var currentSlide = 0;

prev.addEventListener('click', () => {
    removeClassAll();
    if (currentSlide <= 0) {
        currentSlide = sliders.length - 1;
    }
    else currentSlide--;
    console.log(currentSlide);
    btn[currentSlide].classList.add('active');
    sliders[currentSlide].classList.add('active');
});

next.addEventListener('click', () => {
    removeClassAll();
    if (currentSlide >= sliders.length - 1) {
        currentSlide = 0;
    }
    else currentSlide++;
    console.log(currentSlide);
    btn[currentSlide].classList.add('active');
    sliders[currentSlide].classList.add('active');
});









var removeClassAll = () => {
    sliders.forEach(slide => {
        slide.classList.remove('active');
    });
    btn.forEach(b => {
        b.classList.remove('active');
    })
};

btn.forEach((b, i) => {
    b.addEventListener('click', () => {
        removeClassAll();
        b.classList.add('active');
        sliders[i].classList.add('active');
        currentSlide = i;
        console.log(i);
    })
});











//delete all active
//check the value of i
//add active to i
//wait 1000ms
//then i++

var automation = () => {
    currentSlide = 0;


    var slider = () => {

        var active = document.querySelectorAll('.active');
        setTimeout(() => {

            [...active].forEach(element => {
                element.classList.remove('active');
            });

            sliders[currentSlide].classList.add('active');
            btn[currentSlide].classList.add('active');
            currentSlide++;

            if (currentSlide === sliders.length) {
                currentSlide = 0;
            }
            if (currentSlide >= sliders.length) {
                return;
            }
            slider();
        }, 6000);

    }
    slider();
}
automation();



// function slider() {

//     var currentSlide = 0;

//     function action() {

//         setTimeout(() => {

//             console.log(currentSlide);

//             sliders.forEach(s => { s.classList.remove('active') });
//             sliders[currentSlide].classList.add('active');
//             console.log('slider class activated')

//             btn.forEach(b => { b.classList.remove('active') });
//             btn[currentSlide].classList.add('active');
//             console.log('button class activated')

//             currentSlide++;
//             console.log(currentSlide);

//             if (currentSlide === sliders.length) {
//                 currentSlide = 0;
//             }
//             action();

//         }, 1000);
//     }
//     action()
// }
// slider();

