const div = document.querySelector("div");
const section = document.querySelector(".bt-grp");
const btns = document.querySelectorAll("button");

let a = 0;
let x = 0;
const btnsNum = btns.length - 1;

async function fetchData(a) {
  const response = await fetch("data.json");
  const data = await response.json();
  const { news } = data;
  getNews(news, a);
}
// run every 5sec
var offsetChange = window.setInterval(function () {
  if (a < 10) {
    a = a + 5;
  } else {
    a = 0;
  }
  // change x to send in the changeButton
  if (x < btnsNum) {
    x = x + 1;
  } else {
    x = 0;
  }
  // send 0 or 5 or 10
  fetchData(a);
  changeButton(a, x);
}, 5000);

// add class active on click
btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    document.querySelector(".color")?.classList.remove("color");
    btn.classList.add("color");
    fetchOnClick(index);
  });
});
// fetch when click on btn
function fetchOnClick(index) {
  a = index * 5;
  x = index;
  fetchData(a);
  changeButton(a, x);
}
// change button class to active after 5sec
function changeButton(a, x) {
  if (a === 0) {
    changeClassActive(x);
  } else if (a === 5) {
    changeClassActive(x);
  } else {
    changeClassActive(x);
  }
}
// get the order of the button we want to have the class
// don't repeat the code using this function
function changeClassActive(n) {
  document.querySelector(".color")?.classList.remove("color");
  section.children[n].classList.add("color");
  return;
}
// display the News on web
function getNews(news, a) {
  let output = "";

  news.slice(a, a + 5).forEach(function (stiri) {
    output += `
            <h1>${stiri.title}</h1>
            <p>${stiri.details}</p>
        `;
  });

  div.innerHTML = output;
}
// call on f load with first news
fetchData(a);
