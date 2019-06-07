function timer() {
    // 1) Задать дедлайн, время до которого наш таймер будет отсчитывать;
    // 2) Получить разницу между дедлайном и текущем временем и из этого значения вытащить секунды, минуты, часы
    // 3) Написать функцию, которая будет передавать данные на страницу
    // 4) Написать функцию, которая будет обновлять эти данные, каждую секунду, если у нас таймер
    
    // 1) Задать дедлайн, время до которого наш таймер будет отсчитывать:
    let deadline = '2019-06-02';
    
    // 2) Получить разницу между дедлайном и текущем временем и из этого значения вытащить секунды, минуты, часы:
    function getTimeRemaining(endtime) { // функция, которая будет считать разницу между дедлайном и текущем временем
        // endtime - аргумент, дата дедлайн в будущем
        let t = Date.parse(endtime) - Date.parse(new Date()), // разница между дедлайном и текущим временем
            // Date.parse(new Date()) - создает новую дату с текущем временем
            seconds = Math.floor((t/1000) % 60), // Math.floor - получаем только целые числа; % 60 - это чтобы получать хвостик-остаток от целого и чтобы число не было больше 60
            // например если бы мы разделили 5000 на 60, мы были получили количество минут и какие-то значения после запятой, это и есть наши секунды, которых не хватает до целой минуты
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60))); // так как финальное число, но если бы еще были дни:
            // Math.floor((t/(1000*60*60))) - математически это тоже самое что t делить на каждое число в знаменатели
            // hours = Math.floor((t/1000/60/60) % 24);
            // days = Math.floor((t/(1000*60*60*24)));

        return { // говорим функции верни нам это
        // так как мы не можем вернуть из функции сразу несколько функций
            'total' : t, // в будущемы будем использовать эту переменную как таймер, как только только она станет 0 мы остановим функцию
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }
    
    // 3) Написать функцию, которая будет передавать данные на страницу:
    function setClock(id, endtime) { // аргумент id - это айди родителя всех спанов со значениями, то есть айди обертки, куда мы будем вставлять все значения
        let timer = document.getElementById(id), // указанный id обертки
            hours = timer.querySelector('.hours'), // querySelector получает первый элемент с таким классом на странице
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000); // создаем переменную в котором говорится что функция updateClock(пускай она еще не создана) будет повторяться каждую секунду, она будет работать сама без вызова
            // timeInterval своего рода цикл, его не нужно вызывать
        
        // 3) и 4) 
        function updateClock() {
            let t = getTimeRemaining(endtime); // заточаем в переменную t, тот объект который мы вернули из функции пунктом 2)
            // if (t.hours < 10) { // проверка значения hours объекта из 2)
            //     hours.textContent = '0' + t.hours;
            // } else {
            //     hours.textContent = t.hours; // изменяем контент на ключ hours
            // }
            // if (t.minutes < 10) {
            //     minutes.textContent = '0' + t.minutes;
            // } else {
            //     minutes.textContent = t.minutes;
            // }
            // if (t.seconds < 10) {
            //     seconds.textContent = '0' + t.seconds;
            // } else {
            //     seconds.textContent = t.seconds;
            // }

            // Версия автора:
            function addZero(num) {
                if(num <= 9) {
                    return '0' + num;
                } else {
                    return num;
                }
            }

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
            
            if (t.total <= 0) { // как только total будет равно 0 или меньше все останавливай
                clearInterval(timeInterval); // останавливаем переменную
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline); // вызываем функции с аргументами id и endtime
    // в будущем мы можем еще создать этим вызовом еще одну функцию только со своим дедлайном и оберткой
};

module.exports = timer;