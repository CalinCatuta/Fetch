import { useState, useEffect } from "react";
import data from "./data.json";

function App() {
  const [active, setActive] = useState([true, false, false]);
  const [slice, setSlice] = useState([0, 5]);
  const [news] = useState(data);

  const addClassHan = (e) => {
    if (e.target.classList.contains("btn1")) {
      setActive([true, false, false]);
      setSlice([0, 5]);
    } else if (e.target.classList.contains("btn2")) {
      setActive([false, true, false]);
      setSlice([5, 10]);
    } else if (e.target.classList.contains("btn3")) {
      setActive([false, false, true]);
      setSlice([10, 15]);
    }
  };
  useEffect(() => {
    if (slice[0] === 0) {
      setActive([true, false, false]);
    } else if (slice[0] === 5) {
      setActive([false, true, false]);
    } else if (slice[0] === 10) {
      setActive([false, false, true]);
    }
  }, [slice]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      changeSliceValue(); // Call
    }, 15000); // 5000 milliseconds = 5 seconds

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const changeSliceValue = () => {
    setSlice((prevSlice) => {
      if (prevSlice[0] < 10 && prevSlice[1] < 15) {
        return [prevSlice[0] + 5, prevSlice[1] + 5];
      } else {
        return [0, 5];
      }
    });
  };

  return (
    <div>
      <div className="bt-grp">
        <button
          onClick={(e) => addClassHan(e)}
          className={` btn1 ${active[0] ? "active " : ""}`}
        >
          1
        </button>
        <button
          onClick={(e) => addClassHan(e)}
          className={` btn2 ${active[1] ? "active " : ""}`}
        >
          2
        </button>
        <button
          onClick={(e) => addClassHan(e)}
          className={` btn3 ${active[2] ? "active " : ""}`}
        >
          3
        </button>
      </div>
      <div>
        {news.slice(slice[0], slice[1]).map((stire) => (
          <div key={stire.title}>
            <h1>{stire.title}</h1>
            <p>{stire.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
