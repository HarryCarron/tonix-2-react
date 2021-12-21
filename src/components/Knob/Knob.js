import React from 'react';
import './Knob.css';


class Knob extends React.Component {

    height;

    knobLineWidth = 5;
    
    initialY = 0;
    currentY = 0;

    constructor() {
        super();
        this.container = React.createRef();

        this.state = {
            height: 0,
            width: 0,
            value: 0,
        }
    }

    mouseMoving = (e) => {
        this.currentY = (this.initialY - e.clientY) / 100;

        if (this.currentY >= 0 && this.currentY <= 1) {
            this.setState({value: this.currentY});
        }
    }

    mouseUp = (e) => this.removeGlobalEventListeners();

    removeGlobalEventListeners() {
        window.removeEventListener("mousemove", this.mouseMoving);
        window.removeEventListener("mouseup", this.mouseUp);
    }

    initiate(e) {
        this.initialY = e.clientY;
        window.addEventListener('mousemove', this.mouseMoving);
        window.addEventListener('mouseup', this.mouseUp);
    }

    componentDidMount() {
        this.setState({
                height: this.container.current.offsetHeight,
                width: this.container.current.offsetWidth,
            });
    }

    render() {
        return (
            <>
                <div className="h-100 center-child-xy" ref={this.container} onMouseDown={($event) => this.initiate($event)}>
                    <svg height={this.state.height} width={this.state.width}>
                        <g>
                            <circle cx={this.state.width / 2} cy={this.state.height / 2} r="20" strokeWidth="1" fill="#262626"/>
                        </g>

                        <g className="grabbable rotating-component" style={{transform: `rotate(${30 + this.state.value * 300}deg)`}}>
                            <circle cx={this.state.width / 2} cy={this.state.height / 2} r="13" fill="#32303d" strokeWidth="6"/>
                            <rect x={(this.state.width / 2) - this.knobLineWidth / 2} y={this.state.height / 2} width={this.knobLineWidth} stroke="#fffd47" strokeWidth="1" height="10" rx="3" style={{fill: '#fffd47'}}/>
                        </g>
                    </svg>
                </div>

            </>
        );
            

    }
}


export default Knob;