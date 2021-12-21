import React from 'react';


class Additive extends React.Component {

    container;
    canvas;

    xPad = 20;
    yPad = 20;

    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.canvas = React.createRef();
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="w-100 h-100" ref={ this.container }>
                <canvas  ref={ this.canvas }></canvas>
            </div>
        );
    }
    
}

export default Additive;
