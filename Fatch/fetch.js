const div = document.querySelector('div')
const section = document.querySelector('.bt-grp')
const btns = document.querySelectorAll("button")
window.addEventListener('DOMContentLoaded', getNews)
window.addEventListener('DOMContentLoaded', changeBtn)


// OFFSET value
window.a = 0
window.b = 5


// button function
btns.forEach(function () {
    document.addEventListener('click', (e) => {
        let click = e.target
        if (click.classList.contains('btn1')) {
            window.a = 0
            window.b = 5
        } else if (click.classList.contains('btn2')) {
            window.a = 5
            window.b = 10
        } else {
            window.a = 10
            window.b = 15
        }
        getNews();
    })
})

// Add class

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.color')?.classList.remove('color')
        btn.classList.add('color')
    })
})

// auto change value
var offsetChange = window.setInterval(function () {
    if (window.a < 10 && window.b < 15) {
        window.a = window.a + 5
        window.b = window.b + 5

    } else {
        window.a = 0
        window.b = 5
    }
    getNews();

}, 5000)

// add color class after 15sec
function changeBtn() {
    let x = 0;
    setInterval(() => {
        if (x < 2) {
            x = x + 1
        } else {
            x = 0
        }
        document.querySelector('.color')?.classList.remove('color')
        section.children[x].classList.add('color')
    }, 5000)
}

// DOM loaded

// function getNews() {
//     fetch('data.json')
//         .then(res => res.json())
//         .then(data => {
//             let output = ''
//             data.news.slice(window.a, window.b).forEach(function (stiri) {
//                 output += `
//                 <h1>${stiri.title}</h1>
//                 <p>${stiri.details}</p>
//                 `
//             })
//             div.innerHTML = output;
//         })
// }

async function getNews() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        let output = '';
        
        data.news.slice(window.a, window.b).forEach(function (stiri) {
            output += `
                <h1>${stiri.title}</h1>
                <p>${stiri.details}</p>
            `;
        });
        
        div.innerHTML = output;
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}
