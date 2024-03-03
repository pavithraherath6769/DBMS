import React, { Component } from 'react';

class Footer extends Component {
  render () {
    return (
      <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between py-2">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © <a href="https://www.tetherfi.com/" target="_blank" rel="noopener noreferrer">tetherfi.com </a>2022</span>
          <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Provided by <a href="https://www.tetherfi.com/" target="_blank" rel="noopener noreferrer"> Tetherfi SL </a> </span>
        </div>
      </footer> 
    );
  }
}

export default Footer;