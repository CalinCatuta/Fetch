const div = document.querySelector("div");
const section = document.querySelector(".bt-grp");
const btns = document.querySelectorAll("button");

let a = 0;

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
  // send 0 or 5 or 10
  fetchData(a);
  changeButton(a);
}, 5000);

// add class active on click
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".color")?.classList.remove("color");
    btn.classList.add("color");
    fetchOnClick(btn);
  });
});
// fetch when click on btn
function fetchOnClick(btn) {
  if (btn.classList.contains("btn1")) {
    fetchData(0);
  } else if (btn.classList.contains("btn2")) {
    fetchData(5);
  } else if (btn.classList.contains("btn3")) {
    fetchData(10);
  }
}
// change button class to active after 5sec
function changeButton(a) {
  if (a === 0) {
    changeClassActive(0);
  } else if (a === 5) {
    changeClassActive(1);
  } else {
    changeClassActive(2);
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
