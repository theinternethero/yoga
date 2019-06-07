function calc() {
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0, // когда пользователь будет записывать количество людей, будем записывать их в эту переменную
        daysSum = 0, // будем записывать количество дней
        total = 0; // финальная сумма
    
    totalValue.innerHTML = 0;

    persons.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            personsSum = +this.value;
            total = (daysSum + personsSum) * 4000;

            if (restDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        }
    });

    restDays.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            daysSum = +this.value;
            total = (daysSum + personsSum) * 4000;
        
            if (persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        }
    });

    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total; // создаем промежуточную переменную, чтобы постоянно не переопределять переменную total
            totalValue.innerHTML = a * this.options[this.selectedIndex].value; // конструкция, которая позволяет использовать выбранный селект
        }
    });
};

module.exports = calc;