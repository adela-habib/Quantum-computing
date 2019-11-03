import React from 'react';
import { faArrowRight, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from './logo.svg';
import './App.css';

function Desc(props) {
  return (
    <p className="col-md-6 text-left">
      {props.value}
    </p>
  );
}

function Gate(props) {
  return (
    <span className="Gate col-md-2">
      <FontAwesomeIcon icon={faArrowRight}/>
      <div className="btn btn-outline-info disabled">{props.value}</div>
      <FontAwesomeIcon icon={faArrowRight}/>
    </span>
  );
}

function SingleOutQubit(props) {
  return (
    <div className="col-md-2">
      <span className="bar">|</span>
      <div className="btn btn-outline-primary bit disabled">
        {props.value}
      </div>
      <FontAwesomeIcon icon={faChevronRight} size='lg'/>
    </div>
  );
}

function TwoOutQubits(props) {
  return (
    <div className="col-md-2">
      <span className="bar">|</span>
      <div className="btn btn-outline-primary bit disabled">{props.value[0]}</div>
      <div className="btn btn-outline-primary bit disabled">{props.value[1]}</div>
      <FontAwesomeIcon icon={faChevronRight} size='lg'/>
    </div>
  );
}

function OutBit(props) {
  return (
    <div className="col-md-2">
      <div className="btn btn-outline-primary bit disabled">{props.value}</div>
    </div>
  );
}

class NOT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleClick() {
    const value = !this.state.value;
    this.setState({
      value: value,
    });
  }

  render() {
    return (
      <div className="row">
        <Desc value="NOT gate flips the bit"/>
        <div className="col-md-2">
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick()}>
            {this.state.value?'1':'0'}
          </button>
        </div>
        <Gate value="NOT"/>
        <OutBit value={this.state.value?'0':'1'}/>
      </div>
    );
  }
}

class AND extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bitsIn: Array(2).fill(1),
      bitOut: 1
    };
  }

  handleClick(i) {
    const bitsIn = this.state.bitsIn.slice();
    bitsIn[i] = bitsIn[i]==1?0:1;
    this.setState({
      bitsIn: bitsIn,
      bitOut: (bitsIn[0] && bitsIn[1]),
    });
  }

  render() {
    return (
      <div className="row">
        <Desc value="AND gate produces true when both input bits are true"/>
        <div className="col-md-2">
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick(0)}>{this.state.bitsIn[0]}</button>
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick(1)}>{this.state.bitsIn[1]}</button>
        </div>
        <Gate value="AND"/>
        <OutBit value={this.state.bitOut}/>
      </div>
    );
  }
}

class XOR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bit1: 0,
      bit2: 1,
      value: 1
    };
  }

  handleClick(i) {
    let bit1 = this.state.bit1;
    let bit2 = this.state.bit2;
    if (i==1) {
      bit1 = bit1==1?0:1;
    } else {
      bit2 = bit2==1?0:1;
    }
    const value = bit1 != bit2?'1':'0';
    this.setState({
      bit1: bit1,
      bit2: bit2,
      value: value,
    });
  }

  render() {
    return (
      <div className="row">
        <Desc value="XOR gate produces true when both input bits are different"/>
        <div className="col-md-2">
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick(1)}>{this.state.bit1}</button>
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick(2)}>{this.state.bit2}</button>
        </div>
        <Gate value="XOR"/>
        <OutBit value={this.state.value}/>
      </div>
    );
  }
}

class X extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qubitIn: 0
    };
  }

  handleClick() {
    const qubitIn = !this.state.qubitIn;
    this.setState({
      qubitIn: qubitIn,
    });
  }

  render() {
    return (
      <div className="row">
        <Desc value="X quantum gate flips the qubit"/>
        <div className="col-md-2">
          <span className="bar">|</span>
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick()}>
            {this.state.qubitIn?'1':'0'}
          </button>
          <FontAwesomeIcon icon={faChevronRight} size="lg"/>
        </div>
          <Gate value="X"/>
          <SingleOutQubit value={this.state.qubitIn?'0':'1'}/>
      </div>
    );
  }
}

class SWAP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qubitsIn:  Array(2).fill(0),
      qubitsOut: Array(2).fill(0),
    };
  }

  handleClick(i) {
    const qubitsIn  = this.state.qubitsIn.slice();
    qubitsIn[i] = qubitsIn[i]==1?0:1;

    const qubitsOut = this.state.qubitsOut.slice();
    qubitsOut[0] = qubitsIn[1];
    qubitsOut[1] = qubitsIn[0];
    this.setState({
      qubitsIn:  qubitsIn,
      qubitsOut: qubitsOut,
    });
  }

  render() {
    return (
      <div className="row">
        <Desc value="SWAP quantum gate swaps two qubits"/>
        <div className="col-md-2">
          <span className="bar">|</span>
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick(0)}>{this.state.qubitsIn[0]}</button>
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick(1)}>{this.state.qubitsIn[1]}</button>
          <FontAwesomeIcon icon={faChevronRight} size='lg'/>
        </div>
        <Gate value="SWAP"/>
        <TwoOutQubits value={this.state.qubitsOut}/>
      </div>
    );
  }
}

class CNOT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qubitsIn:  Array(2).fill(0),
      qubitsOut: Array(2).fill(0),
    };
  }

  handleClick(i) {
    const qubitsIn  = this.state.qubitsIn.slice();
    qubitsIn[i] = qubitsIn[i]==1?0:1;

    const qubitsOut = this.state.qubitsOut.slice();
    qubitsOut[0] = qubitsIn[0];
    if (qubitsIn[0]==1) {
      qubitsOut[1] = qubitsIn[1]==1?0:1;
    } else {
      qubitsOut[1] = qubitsIn[1];      
    }
    this.setState({
      qubitsIn:  qubitsIn,
      qubitsOut: qubitsOut,
    });
  }

  render() {
    return (
      <div className="row">
        <Desc value="CNOT quantum gate flips the second qubit if first qubit is |1>"/>
        <div className="col-md-2">
          <span className="bar">|</span>
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick(0)}>{this.state.qubitsIn[0]}</button>
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick(1)}>{this.state.qubitsIn[1]}</button>
          <FontAwesomeIcon icon={faChevronRight} size='lg'/>
        </div>
        <Gate value="CNOT"/>
        <TwoOutQubits value={this.state.qubitsOut}/>
      </div>
    );
  }
}

class CCNOT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qubit1: 0,
      qubit2: 0,
      qubit3: 0,
      qubit4: 0,
      qubit5: 0,
    };
  }

  handleClick(i) {
    let qubit1 = this.state.qubit1;
    let qubit2 = this.state.qubit2;
    if (i==1) {
      qubit1 = !qubit1;
    } else {
      qubit2 = !qubit2;
    }
    this.setState({
      qubit1: qubit1,
      qubit2: qubit2,
      qubit3: qubit2,
      qubit4: (qubit1? !qubit2 : qubit2),
      qubit5: (qubit1? !qubit2 : qubit2),
    });
  }

  render() {
    return (
      <div className="row">
        <Desc value="CCNOT quantum gate ...."/>
        <div className="col-md-2">
          <span className="bar">|</span>
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick(1)}>{this.state.qubit1?'1':'0'}</button>
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick(2)}>{this.state.qubit2?'1':'0'}</button>
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick(3)}>{this.state.qubit3?'1':'0'}</button>
          <FontAwesomeIcon icon={faChevronRight} size='lg'/>
        </div>
          <Gate value="CNOT"/>
        <div className="col-md-2">
          <span className="bar">|</span>
          <div className="btn btn-outline-primary bit disabled">{this.state.qubit1?'1':'0'}</div>
          <div className="btn btn-outline-primary bit">{this.state.qubit4?'1':'0'}</div>
          <div className="btn btn-outline-primary bit">{this.state.qubit5?'1':'0'}</div>
          <FontAwesomeIcon icon={faChevronRight} size='lg'/>
        </div>
      </div>
    );
  }
}

class CSWAP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qubit1: 0,
      qubit2: 0,
      qubit3: 0,
      qubit4: 0,
      qubit5: 0,
    };
  }

  handleClick(i) {
    let qubit1 = this.state.qubit1;
    let qubit2 = this.state.qubit2;
    if (i==1) {
      qubit1 = !qubit1;
    } else {
      qubit2 = !qubit2;
    }
    this.setState({
      qubit1: qubit1,
      qubit2: qubit2,
      qubit3: qubit2,
      qubit4: (qubit1? !qubit2 : qubit2),
      qubit5: (qubit1? !qubit2 : qubit2),
    });
  }

  render() {
    return (
      <div className="row">
        <Desc value="CSWAP quantum gate ...."/>
        <div className="col-md-2">
          <span className="bar">|</span>
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick(1)}>{this.state.qubit1?'1':'0'}</button>
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick(2)}>{this.state.qubit2?'1':'0'}</button>
          <button className="btn btn-outline-primary bit" onClick={() => this.handleClick(3)}>{this.state.qubit3?'1':'0'}</button>
          <FontAwesomeIcon icon={faChevronRight} size='lg'/>
        </div>
          <Gate value="CNOT"/>
        <div className="col-md-2">
          <span className="bar">|</span>
          <div className="btn btn-outline-primary bit disabled">{this.state.qubit1?'1':'0'}</div>
          <div className="btn btn-outline-primary bit">{this.state.qubit4?'1':'0'}</div>
          <div className="btn btn-outline-primary bit">{this.state.qubit5?'1':'0'}</div>
          <FontAwesomeIcon icon={faChevronRight} size='lg'/>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="row text-center">
          <div className="col-md-6">Description</div>
          <div className="col-md-2">Input</div>
          <div className="col-md-2">Gate</div>
          <div className="col-md-2">Output</div>
        </div>
        <h2 className="text-left">Single bit gates</h2>
        <NOT />
        <h2 className="text-left">Two bit gates</h2>
        <AND />
        <XOR />
        <h2 className="text-left">Single qubit gates</h2>
        <X />
        <h2 className="text-left">Two qubit gates</h2>
        <SWAP />
        <CNOT />
        <h2 className="text-left">Three qubit gates</h2>
        <CCNOT />
        <CSWAP />
      </div>
    );
  }
}

export default App;
