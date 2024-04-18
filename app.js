var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var div = document.querySelector("div");
var section = document.querySelector(".bt-grp");
var btns = document.querySelectorAll("button");
var perPage = 5;
var limit = 10;
var intervalNumber = 5000;
var a = 0;
var x = 0;
var btnsNum = btns.length - 1;
function fetchData(a) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, news;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("data.json")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    news = data.news;
                    getNews(news, a);
                    return [2 /*return*/];
            }
        });
    });
}
// run every 5sec
var offsetChange = window.setInterval(function () {
    if (a < limit) {
        a = a + perPage;
    }
    else {
        a = 0;
    }
    // change x to send in the changeButton
    if (x < btnsNum) {
        x = x + 1;
    }
    else {
        x = 0;
    }
    // send 0 or 5 or 10
    fetchData(a);
    changeButton(x);
}, intervalNumber);
// add class active on click
btns.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
        var _a;
        (_a = document.querySelector(".color")) === null || _a === void 0 ? void 0 : _a.classList.remove("color");
        btn.classList.add("color");
        fetchOnClick(index);
    });
});
// fetch when click on btn
function fetchOnClick(index) {
    a = index * perPage;
    x = index;
    fetchData(a);
    changeButton(x);
}
// change button class to active after 5sec
function changeButton(x) {
    changeClassActive(x);
}
// get the order of the button we want to have the class
// don't repeat the code using this function
function changeClassActive(n) {
    var _a;
    if (!section) {
        throw new Error("Element not found");
    }
    (_a = document.querySelector(".color")) === null || _a === void 0 ? void 0 : _a.classList.remove("color");
    section.children[n].classList.add("color");
    return;
}
// display the News on web
function getNews(news, a) {
    var output = "";
    if (!div) {
        throw new Error("Element not found");
    }
    news.slice(a, a + perPage).forEach(function (stiri) {
        output += "\n            <h1>".concat(stiri.title, "</h1>\n            <p>").concat(stiri.details, "</p>\n        ");
    });
    div.innerHTML = output;
}
// call on f load with first news
fetchData(a);
