
import React from 'react';
import CanvasUtilities from './../../../../../Utilities/CanvasUtilities';


class Amp extends React.Component {

    container;
    canvas;

    xPad = 20;
    yPad = 20;

    xTravelUnit = 0;

    containerWidth = 0;

    canvasUtil;

    constructor(props) {
        super(props);

        this.state = {
            containerHeight: 0,
            containerWidth: 0
        }

        this.container = React.createRef();
        this.canvas = React.createRef();
    }

    componentDidUpdate() {
        this.drawAmp();
    }

    componentDidMount() {
        this.setState({
            containerWidth: this.container.current.offsetWidth,
            containerHeight: this.container.current.offsetHeight
        });

        this.containerWidth = this.container.current.offsetWidth;
        this.containerHeight = this.container.current.offsetHeight;

        this.initCanvas(this.containerWidth, this.containerHeight);

        this.initCanvasUtil();


    }

    initCanvasUtil() {
        this.canvasUtil = new CanvasUtilities(this.ctx, this.containerWidth, this.containerHeight);
        this.canvasUtil.setStyle({
            lineCap: 'round',
            textAlign: 'center',
            font: '8px Helvetica'
        })
        .setStyleProfiles({
            ampLine: {lineWidth: 2, strokeColor: '#E65579', lineDash:[0]},
            ampHandle: {lineWidth: 2, strokeColor: '#FFFD47', lineDash:[]},
            baseLine: {lineWidth: 1, strokeColor: 'white', lineDash:[0]},
            valueGuideLine: {lineWidth: 1, strokeColor: '#707070', lineDash:[1, 3]},
            valueText: { fillStyle: 'white' }
        })
    }

    initCanvas(width, height) {

        this.xTravelUnit = width - (this.xPad * 2) / 100;
        this.yTravelUnit = height - (this.yPad * 2) / 100;

        this.canvas.current.width = width * 3;
        this.canvas.current.height = height * 3;

        this.canvas.current.style.width = `${width}px`;
        this.canvas.current.style.height = `${height}px`;

        this.ctx = this.canvas.current.getContext('2d');

        this.ctx.scale(3, 3);

    }


    getXpositions(){
        return [
            this.props.amp.attack,
            this.props.amp.decay,
            this.props.amp.sustainWidth,
            this.props.amp.release
        ].map((_, i, o) => 
            (o.slice(0, i + 1).reduce((a, b) => a + b)) * this.xTravelUnit
        );
    }

    drawAmp() {

        const [attackX, decayX, sustainWidthX, releaseX] = this.getXpositions();

        this.canvasUtil
        .clear()
        .styleProfile('baseLine')
        .line(
            this.xPad,
            this.containerHeight - this.yPad,
            this.containerWidth - this.xPad,
            this.containerHeight - this.yPad,
        )


        // attack line
        .styleProfile('ampLine')
        .line(
            this.xPad,
            this.containerHeight - this.yPad,
            attackX,
            this.yPad
        )
        
        .styleProfile('valueGuideLine')
        .line(
            attackX,
            this.yPad,
            attackX,
            this.containerHeight - this.yPad
        )
        
        .styleProfile('ampHandle')
        .circle(attackX, this.yPad, 3)

        .styleProfile('valueText')
        .text(this.props.amp.attack, attackX, this.containerHeight - this.yPad + 12)

        // decay line
        .styleProfile('ampLine')
        .line(
            attackX,
            this.yPad,
            decayX,
            this.props.amp.sustain * this.yTravelUnit,
        )
                
        .styleProfile('valueGuideLine')
        .line(
            decayX,
            this.props.amp.sustain * this.yTravelUnit,
            decayX,
            this.containerHeight - this.yPad
        )
        .styleProfile('ampHandle')
        .circle(decayX, this.props.amp.sustain * this.yTravelUnit, 3)

        .styleProfile('valueText')
        .text(this.props.amp.decay, decayX, this.containerHeight - this.yPad + 12)


        // sustain line
        .styleProfile('ampLine')
        .line(
            decayX,
            this.props.amp.sustain * this.yTravelUnit,
            sustainWidthX,
            this.props.amp.sustain * this.yTravelUnit,
        )

        .styleProfile('valueGuideLine')
        .line(
            this.yPad,
            this.props.amp.sustain * this.yTravelUnit,
            decayX,
            this.props.amp.sustain * this.yTravelUnit
        )

        .styleProfile('ampHandle')
        .circle(sustainWidthX, this.props.amp.sustain * this.yTravelUnit, 3)

        .styleProfile('valueText')
        .text(this.props.amp.sustain, this.xPad - 10, this.props.amp.sustain * this.yTravelUnit)


        // release line
        .styleProfile('ampLine')
        .line(
            sustainWidthX,
            this.props.amp.sustain * this.yTravelUnit,
            releaseX,
            this.containerHeight - this.yPad,
        )
        .styleProfile('ampHandle')
        .circle(releaseX, this.containerHeight - this.yPad, 3)

        .styleProfile('baseLine')
        .line(
            this.xPad,
            this.containerHeight - this.yPad,
            this.xPad,
            this.yPad,
        )

    }


    render() {
        return (
            <div className="w-100 h-100" ref={ this.container }>
                <canvas  ref={ this.canvas }></canvas>
            </div>
        );
    }
}

export default Amp;
