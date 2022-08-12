import { useState } from 'react';
import * as XLSX from 'xlsx';
import './App.css';
import Home from './components/Home/Home';
import ModalForm from './components/Modal';

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
      setItems(d);
    });


  };

  return (
    <>
      <div>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
      </div>
    <div>
    <table className="table">
        <thead>
          <tr>
            <th scope="col">Request</th>
            <th scope="col">Picture</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.request}>
              <th>{d.request}</th>
              <td>{d.picture}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
    <table className="table">
        <thead>
          <tr>
            <th scope="col">Request</th>
            <th scope="col">Picture</th>
          </tr>
        </thead>
        <tbody>
            <th> item1 </th>
            <th> <Home /> </th>
        </tbody>
        <tbody>
            <th> item1 </th>
            <th> <Home /> </th>
        </tbody>
      </table>
    </div>
    <div>
        <Home />
    </div>
    <div>
      <ModalForm />
    </div>
    </>
  );
}

export default App;
