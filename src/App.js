import React, { Fragment, useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Transaction from './components/Transaction';
import SaldoBox from './components/SaldoBox';
import AddTransaction from './components/AddTransaction';

  let url = "https://my-expense-tracker-application-default-rtdb.";
    url += "asia-southeast1.firebasedatabase.app";
    url += "/transaction.json";

function App() {
  const [transactions,setTransactions] = useState([]);
  const [submitCount, setSubmitCount] = useState(0)

  // useEffect untuk menampilkan data
  useEffect(() => {
    const myFetch = async () => {
        try {
          let response = await fetch(url);
          if (!response.ok) {
            throw new Error(response.status);
          }
          let responseData = await response.json();

          const initTransactions = [];
          for (const key in responseData){
            initTransactions.push({
              id : key,
              tanggal : responseData[key].tanggal,
              keterangan : responseData[key].keterangan,
              nominal : responseData[key].nominal,
            })
          }
          // console.log(initTransactions);
          // console.log(JSON.stringify(initTransactions));
          // atur ulang urutan transaction agar tanggal terkecil di bagian atas
          initTransactions.sort((a,b) => a.tanggal - b.tanggal);

          setTransactions(initTransactions);
          
          }
  
          catch (error) {
            console.log(`Terjadi gangguan dengan pesan : "${error}"`)
          }
        }
      myFetch();
  },[submitCount]);

  // handle untuk menambah data transaction,
  // akan di tigger dari komponen AddTransaction
  const handleTambahTransaction = async (data) => {
    // kirim data ke server firebase
    try {
      let response = await fetch(url,{
        method : "POST",
        body : JSON.stringify(data)
      })

      // handle perubahan transaction dependency
      const newTransactions = [...transactions,data];
      // atur ulang urutan transaction agar tanggal terkecil di bagian atas
      newTransactions.sort((a,b) => a.tanggal - b.tanggal);
      setTransactions(newTransactions)

      if (!response.ok){
        throw new Error(response.status);
      }
      setSubmitCount(submitCount+1);
    }
    catch (error) {
      console.log(`Terjadi gangguan dengan pesan : "${error}"`)
    } 
  }

  // handler untuk menghapus data transaction di komponen AddTransaction
  const handleHapusTransaction = async (e) => {
    // Rangkai alamat url agar berisi data yang dihapus
    let url = "https://my-expense-tracker-application-default-rtdb.";
    url += "asia-southeast1.firebasedatabase.app";
    url += "/transaction/";
    url += `${e.target.id}.json`;

    // Kirim delete request ke server (firebase)
    try {
      let response = await fetch(url,{
        method : "DELETE",
      })
      if (!response.ok){
        throw new Error(response.status);
      }
      setSubmitCount(submitCount+1);
    }
    catch (error) {
      console.log(`Terjadi gangguan dengan pesan : "${error}"`)
    } 
  }

  return (
    <Fragment>
      <Header/>
      <SaldoBox transactions={transactions}/>
      <Transaction transactions={transactions} onHapusTransaction={handleHapusTransaction}/>
      <AddTransaction onTambahTransactions={handleTambahTransaction}/>
      <Footer/>
    </Fragment>
  );
}

export default App;
