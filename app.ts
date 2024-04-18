const div = document.querySelector("div");
const section = document.querySelector(".bt-grp");
const btns = document.querySelectorAll("button");

const perPage = 5;
const limit = 10;
const intervalNumber = 5000;
let a = 0;
let x = 0;
const btnsNum = btns.length - 1;

interface NewsItem {
  title: string;
  details: string;
}

async function fetchData(a: number): Promise<void> {
  const response: Response = await fetch("data.json");
  const data: { news: NewsItem[] } = await response.json();
  const { news } = data;
  getNews(news, a);
}
// run every 5sec
var offsetChange = window.setInterval(function () {
  if (a < limit) {
    a = a + perPage;
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
  changeButton(x);
}, intervalNumber);

// add class active on click
btns.forEach((btn: HTMLButtonElement, index: number) => {
  btn.addEventListener("click", () => {
    document.querySelector(".color")?.classList.remove("color");
    btn.classList.add("color");
    fetchOnClick(index);
  });
});
// fetch when click on btn
function fetchOnClick(index: number) {
  a = index * perPage;
  x = index;
  fetchData(a);
  changeButton(x);
}
// change button class to active after 5sec
function changeButton(x: number): void {
  changeClassActive(x);
}
// get the order of the button we want to have the class
// don't repeat the code using this function
function changeClassActive(n: number) {
  if (!section) {
    throw new Error("Element not found");
  }
  document.querySelector(".color")?.classList.remove("color");
  section.children[n].classList.add("color");
  return;
}
// display the News on web
function getNews(news: NewsItem[], a: number) {
  let output = "";
  if (!div) {
    throw new Error("Element not found");
  }
  news.slice(a, a + perPage).forEach(function (stiri: NewsItem) {
    output += `
            <h1>${stiri.title}</h1>
            <p>${stiri.details}</p>
        `;
  });

  div.innerHTML = output;
}
// call on f load with first news
fetchData(a);
