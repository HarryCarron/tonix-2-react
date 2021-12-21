
import React from 'react';
import CanvasUtilities from './../../../../../Utilities/CanvasUtilities';
import GlobalEventHandlers from './../../../../../Utilities/GlobalEventHandlers';

class Amp extends React.Component {

    container;
    canvas;

    xPad = 20;
    yPad = 30;

    xTravelUnit = 0;

    globalMouseMove

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

        this.globalMouseMove = new GlobalEventHandlers();

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
            (o.slice(0, i + 1).reduce((a, b) => a + b)) * this.containerWidth + (this.xPad * 2)
        );
    }

    drawAmp() {

        const floor = (this.containerHeight - this.yPad);

        const [attackX, decayX, sustainWidthX, releaseX] = this.getXpositions();

        const sustainHeight = floor - (this.props.amp.sustain * (this.containerHeight - (this.yPad * 2)));

        this.canvasUtil
        .clear()
        // attack line
        .styleProfile('ampLine')
        .line(
            this.xPad,
            floor,
            attackX,
            this.yPad
        )
        
        .styleProfile('valueGuideLine')
        .line(
            attackX,
            this.yPad,
            attackX,
            floor
        )
        
        .styleProfile('ampHandle')
        .circle(attackX, this.yPad, 3)

        .styleProfile('valueText')
        .text(this.props.amp.attack, attackX, floor + 12)

        // decay line
        .styleProfile('ampLine')
        .line(
            attackX,
            this.yPad,
            decayX,
            sustainHeight,
        )
                
        .styleProfile('valueGuideLine')
        .line(
            decayX,
            sustainHeight,
            decayX,
            this.containerHeight - this.yPad
        )
        .styleProfile('ampHandle')
        .circle(decayX, sustainHeight, 3)

        .styleProfile('valueText')
        .text(this.props.amp.decay, decayX, this.containerHeight - this.yPad + 12)


        // sustain line
        .styleProfile('ampLine')
        .line(
            decayX,
            sustainHeight,
            sustainWidthX,
            sustainHeight,
        )

        .styleProfile('valueGuideLine')
        .line(
            this.yPad,
            sustainHeight,
            decayX,
            sustainHeight
        )

        .styleProfile('ampHandle')
        .circle(sustainWidthX, sustainHeight, 3)

        .styleProfile('valueText')
        .text(this.props.amp.sustain, this.xPad - 10, sustainHeight)


        // release line
        .styleProfile('ampLine')
        .line(
            sustainWidthX,
            sustainHeight,
            releaseX,
            floor,
        )
        .styleProfile('ampHandle')
        .circle(releaseX, floor, 3)

        .styleProfile('valueText')
        .text('-', sustainWidthX, sustainHeight)



        
        .styleProfile('baseLine')
        .line(
            this.xPad,
            floor,
            this.containerWidth - this.xPad,
            floor,
        )

        .styleProfile('baseLine')
        .line(
            this.xPad,
            floor,
            this.xPad,
            this.yPad,
        )

    }

    handleClick({clientX, clientY}) {
        const canvasBB = this.canvas.current.getBoundingClientRect();
        const canvasTop = canvasBB.top;
        const canvasLeft = canvasBB.left;
        const relativeY = Math.floor((this.containerHeight - (this.yPad * 2)) - ((clientY - canvasTop) - this.yPad));
        const relativeX = Math.floor((clientX - canvasLeft) - this.xPad);

        let x = relativeX > 0 ? relativeX : 0;
        let y = relativeY > 0 ? relativeY : 0;
        
        console.log(x, y);
    }

    onCanvasClick() {
        this.globalMouseMove.initiate(
            e => this.handleClick(e),

        )
    }


    render() {
        return (
            <div className="w-100 h-100" ref={ this.container }>
                <canvas onMouseDown={ (e) => this.onCanvasClick(e)} ref={ this.canvas }></canvas>
            </div>
        );
    }
}

export default Amp;
