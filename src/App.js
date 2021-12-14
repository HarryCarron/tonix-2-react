import React from 'react';
import './App.css';
import Oscillator from './components/oscillator/Oscillator/Oscillator';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOscillator: 0
    }
  }

  componentDidMount() {
    // this.setState((_, props) =>  {
    //   const selected = props.id === 1;
    //   return {
    //     isOn: selected,
    //     selected: selected
    //   };
    // });
  }


  selectOscillator(selectedOscillator) {
    this.setState({selectedOscillator})
    console.log(this.state.selectedOscillator);
  } 

  render() {
    return (
      <div className="main-container d-flex center-child-xy">
        <div className="synth">
          {
            [1, 2, 3].map(v => <Oscillator selected={v === this.state.selectedOscillator} onSelectOscillator={(id) => this.selectOscillator(id)} key={v} id={v}/>)
          }
        </div>
      </div>
    );
  }
  
}

export default App;
