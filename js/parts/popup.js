function popup() {
    
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriptionBtn = document.querySelectorAll('.description-btn');
    
    // Мой вариант:
    // for (let i = 0; i < descriptionBtn.length; i++) {
    //     descriptionBtn[i].addEventListener('click', function() {
    //     overlay.style.display = 'block';
    //     this.classList.add('more-splash');
    //     document.body.style.overflow = 'hidden';
    //     });
    // };

    // Вариант с forEach (ошибка потому что нельзя использовать стрелочную функцию в обработчике событий она не имеет контекста вызова):
    // descriptionBtn.forEach((descriptionBtn) => { // перебираю созданный массив аргументом является целый массив
    //     descriptionBtn.addEventListener('click', () => { // вешаю событие
    //         overlay.style.display = 'block';
    //         this.classList.add('more-splash'); // работать не будет брат
    //         document.body.style.overflow = 'hidden';
    //     });
    // });

    // Правильно (в ES5):
    descriptionBtn.forEach(function(descriptionBtn) { // перебираю созданный массив аргументом является целый массив
        descriptionBtn.addEventListener('click', function() { // вешаю событие
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });
    
    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden'; // запретили прокрутку странице при открытом модальном окном
    });

    close.addEventListener('click', function() { // здесь можно использовать стрелочные функции, но хз зачем
        for (let i = 0; i < descriptionBtn.length; i++) {
            descriptionBtn[i].classList.remove('more-splash');
        }
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = ''; // возвращем в исходное состояние
    });

    overlay.addEventListener('click', function(event) { // функция, реализующая закрытие попапа при клике на overlay
        if(event.target == overlay) { // проверка на то что, именно когда мы тыкаем по overlay закрывалось модальное окно
            for (let i = 0; i < descriptionBtn.length; i++) { 
                descriptionBtn[i].classList.remove('more-splash');
            }
            this.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
        }
    });
};

module.exports = popup;