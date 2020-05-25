import React, { useState, useEffect } from "react";
import "./styles.css";
export default function App(props) {
  const row = 6;
  const col = 8;
  const [movie, setMovie] = useState(props.info[0]);
  const [error, setError] = useState([
    false,
    false,
    false,
    false,
    false,
    false
  ]);
  const [selectList, setSelectList] = useState([]);
  const [occupyList, setOccupyList] = useState([
    [1, 3],
    [1, 4],
    [2, 6],
    [2, 7],
    [4, 3],
    [4, 4],
    [5, 4],
    [5, 5],
    [5, 6]
  ]);

  const handleClick = (r, c) => {
    const tmpO = occupyList
      .slice()
      .filter(item => item[0] === r && item[1] === c);

    if (tmpO.length === 1) return;

    const tmpS = selectList
      .slice()
      .filter(item => item[0] !== r || item[1] !== c);

    if (tmpS.length === selectList.length) {
      tmpS.push([r, c]);
    }
    setSelectList(tmpS);

    const noAvailable = [
      ...occupyList.filter(item => item[0] === r).map(item => item[1]),
      ...tmpS.filter(item => item[0] === r).map(item => item[1])
    ];

    const tmpError = error.slice();

    for (let i of noAvailable) {
      if (i === 0 || i === 1 || i === 4 || i === 5) continue;
      if (
        noAvailable.indexOf(i + 1) === -1 &&
        noAvailable.indexOf(i + 2) !== -1
      ) {
        tmpError[r] = true;
        setError(tmpError);
        break;
      }
      tmpError[r] = false;
      setError(tmpError);
    }
  };

  const handleSelectMovie = e => {
    const tmp = e.target.value.slice().split(" ( $ ");
    setMovie({ name: tmp[0], price: tmp[1].slice().split(" )")[0] });
  };

  return (
    <div className="app">
      <div>
        <label>
          Pick a movie:
          <select onChange={e => handleSelectMovie(e)}>
            {props.info.map(item => (
              <option key={item["name"]}>{` ${item["name"]} ( $ ${
                item["price"]
              } )`}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="one-row label-margin">
        <div className="semi-circle na" /> N/A
        <div className="semi-circle selected" /> Selected
        <div className="semi-circle occupied" /> Occupied
      </label>
      <div className="screen one-row"> </div>
      <div>
        {[...Array(row).keys()].map(rows => (
          <div key={"row" + rows} className="one-row">
            {[...Array(col).keys()].map(cols => (
              <div
                key={"row" + rows + "col" + cols}
                className={`semi-circle na
                 ${
                   selectList.filter(
                     item => item[0] === rows && item[1] === cols
                   ).length === 1
                     ? "selected"
                     : ""
                 } ${
                  occupyList.filter(
                    item => item[0] === rows && item[1] === cols
                  ).length === 1
                    ? "occupied"
                    : ""
                } ${cols === 1 || cols === 5 ? "large-margin-right" : ""}`}
                onClick={() => handleClick(rows, cols)}
              />
            ))}
          </div>
        ))}
      </div>
      <p>
        You have selected <span className="blue-font">{selectList.length}</span>{" "}
        seats for a price of ${" "}
        <span className="blue-font">{selectList.length * movie["price"]}</span>
      </p>
      <div
        className={`${
          error.filter(item => item === true).length > 0 ? "error" : "hide"
        }`}
      >
        Not allowed to select two seats seperately
      </div>
    </div>
  );
}
