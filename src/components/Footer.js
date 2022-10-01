import React from 'react';
import './../style.css'

const Footer = () => {
  return(
    <footer id="footer" className="text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <p className="lead mb-0">Expense Tracker</p>
            <p>Catat setiap pemasukan dan pengeluaranmu.
              Belum terdaftar di OJK :)</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;