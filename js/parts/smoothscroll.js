function smoothScroll() {
    let menu = document.getElementsByTagName('nav')[0];
    menu.addEventListener('click', function(event) {
        event.preventDefault(); // отменили действия по умолчанию;
        let target = event.target, // создали переменную в которой будет кликнутая ссылка
            blockID = target.getAttribute('href'), // эта переменная, в этой кликнутей ссылке будет помещен атрибут ссылка
            blockTarget = document.querySelectorAll(blockID)[0]; // хз
        blockTarget.scrollIntoView({ // 
            behavior: "smooth" // судя по всему анимация хз
        });
    });
};

module.exports = smoothScroll;