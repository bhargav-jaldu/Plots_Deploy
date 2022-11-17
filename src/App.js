import React, { useEffect, useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";

function App() {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log(d)
      setItems(d);
    });
  };

  const [plot, setPlot] = useState();

  return (
    <div className="whole">
      <br />
      <input
        type="file"
        class="custom-file-input"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
<br />
    <input
        type="text"
         className="textbox"
         placeholder="PLOT NO"
        onChange={(e) => {
          setPlot(e.target.value)
        }}
    />

        {
          items.map(item => (
            item.plotNo == plot ?
            <div className="container">
              <h3><span>PLOT NO:</span> {item.plotNo}</h3>
              <h3><span>NAME & ADDRESS:</span> {item.nameAndAddress}</h3>
              <h3><span>CELL NO:</span> {item.cellNo}</h3>
              <div className="fee">
                <div className="fee1">
                  <h3><span>MEM FEE:</span> {item.AMOUNT}</h3>
                  <h3><span>2012-2013:</span> {item.AMOUNT2012_2013}</h3>
                  <h3><span>2013-2014:</span> {item.AMOUNT2013_2014}</h3>
                  <h3><span>2014-2015:</span> {item.AMOUNT2014_2015}</h3>
                </div>

                <div className="fee2">
                  <h3><span>2015-2016:</span> {item.AMOUNT2015_2016}</h3>
                  <h3><span>2016-2017:</span> {item.AMOUNT2016_2017}</h3>
                  <h3><span>2017-2018:</span> {item.AMOUNT2017_2018}</h3>
                  <h3><span>2018-2019:</span> {item.AMOUNT2018_2019}</h3>
                </div>
              </div>

              <h3><span>TOTAL PAID:</span> {item.PAID}</h3>
              <h3><span>PENDING:</span> {item.PENDING}</h3>
              <h3><span>TOTAL PENDING:</span> {item.TOTAL_PENDING}</h3>
              <h3><span>TOTAL INCOME:</span> {item.TOTAL_INCOME}</h3>
            </div>
            : ""
          ))
        }

    </div>
  );
}

export default App;
