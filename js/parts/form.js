function form() {
    // 1) Создание объекта, в котором будут содержаться различные состояния нашего запроса, мы будем использовать текстовый формат оповещения, но это могут быть картинки, анимации, что угодно
    let message = {
        loading: 'Загрузка...', // Эта строка будет показываться, когда наш запрос еще не обработался
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.getElementsByClassName('main-form')[0],
        formBottom = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'); // Элемент, в котором будет находится message
    
    statusMessage.classList.add('status');

    // Для того, чтобы отправить форму, нужно, чтобы было button, либо <input type="sumbit">
    function sendForm(elem) { // создаем функцию
        elem.addEventListener('submit', function(e) { // обработчик событий на submit каждой формы, а НЕ КНОПКИ!!!
            e.preventDefault(); // отменяет стандартное поведение отправки формы
            elem.appendChild(statusMessage); // при отправке каждой формы добавляем в форму div, в котором будет выводиться сообщение о статусе запроса
            let formData = new FormData(elem); // каждый раз создается именно та formData, откуда получаем данные, вместо elem указанная форма через аргумент

            function postData(data) { // в аргумент подставляется formData
                return new Promise(function(resolve,reject) { // возвращаем сразу новый промис без функции

                    let request = new XMLHttpRequest(); // создаем запрос
                    request.open('POST', 'server.php');
                    request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded'); // мы говорим, что наш контент будет содержать данные, которые мы получили из формы
                    // Получаем данные из формы (в инпутах, из которых мы получаем данные, в них должны быть прописаны атрибуты name, иначе данные могут передаться некорректно)

                    request.onreadystatechange = function() { // обработчий события readystatechange, каждый раз проверяет изменения текущего статуса запроса
                        if (request.readyState < 4) {
                            resolve();
                        } else if(request.readyState === 4) {
                            if (request.status == 200 && request.status < 300) {
                                // здесь мы можем добавлять абсолютно любые вещи, даже прогресс бар загрузки
                                resolve();
                            }
                            else {
                                reject();
                            }
                        }
                    };
                    request.send(data); // открываем соединение, другими словами отправляем данные
                });
            } // End postData
        
            function clearInput() {
                for (let i = 0; i < input.length; i++) { // после сабмита очищаем все наши инпуты
                    input[i].value = '';
                }
            }

            postData(formData) // вызываем функцию
                .then(()=> statusMessage.innerHTML = message.loading)
                .then(()=> statusMessage.innerHTML = message.success)
                .catch(()=> statusMessage.innerHTML = message.failure)
                .then(clearInput) // если then идет после catch, то оно будет всегда выполняться вне зависимости от выполнения обещания
        });
    }
    sendForm(form);
    sendForm(formBottom);
};

module.exports = form;