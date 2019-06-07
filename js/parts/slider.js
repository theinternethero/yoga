function slider() {
    let slideIndex = 1, // параметр текущего слайда, именно его мы и будем менять
        slides = document.querySelectorAll('.slider-item'), // получаем псевдомассив со всеми слайдами
        prev = document.querySelector('.prev'), // правая стрелочка навигации
        next = document.querySelector('.next'), // левая стрелочка навигации
        dotsWrap = document.querySelector('.slider-dots'), // обертка переключателей
        dots = document.querySelectorAll('.dot'); // получили псевдомассив со всеми переключателями
    
    // 1) Необходимо написать функцию, которая оставляла бы один слайдер, а другие скрывала, она должна принимать аргумент - номер слайдера, который нам необходимо показать
    // 2) При изменении slideIndex, у нас должны изменяться и точки
    // 3) Функция переключения слайдов

    showSlides(slideIndex); // вызываем функцию сокрытия слайдов по умолчанию

    function showSlides(n) { // аргумент n, для того чтобы когда мы будем вызывать эту функцию, она нам переключала слайды

        if (n > slides.length) { // проверка: если наши слайды закончились в каруселе, то мы возвращаемся к первому
            slideIndex = 1;
        }

        if (n < 1) { // если n < 1, то мы возвращаемся к самому последнему слайдеру
            slideIndex = slides.length; // индекс + 1 в length
        }

        slides.forEach((item) => item.style.display = 'none'); // перебрали и скрыли все слайды
        // for (let i = 0; i < slides.length; i++) { // то же самое, что выше
        //     slides[i].style.display = 'none';
        // }
        dots.forEach((item) => item.classList.remove('dot-active')); // убрали у всех точек активный класс

        slides[slideIndex - 1].style.display = 'block'; // вычитаем 1, потому что lingth это индекс +1
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) { // сюда мы например подставляем 1
        showSlides(slideIndex += n); // из за +=n , 1 становится 2, и мы 2 аргументом передаем в функцию showSlides вызывая ее, тем самым показывая необходимый нам слайд
    }
    function currentSlide(n) { // когда мы тыкаем на четвертую точку например
        showSlides(slideIndex = n); // наш видимый слайд становится 4
    }

    prev.addEventListener('click', function() {
        plusSlides(-1); // перемещаемся назад от нашего текущего слайда, от этого значения зависит через сколько слайдов мы хотим путешествовать
    });

    next.addEventListener('click', function() {
        plusSlides(1); // перемещаемся вперед от нашего текущего слайда
    });

    // делегирование событий применяем:
    dotsWrap.addEventListener('click', function(event) {
        // нам нужно перебрать все точки и понять а на какую именно мы кликнули
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });
};

module.exports = slider;