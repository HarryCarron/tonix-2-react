
import React from 'react';
import CanvasUtilities from './../../../../../Utilities/CanvasUtilities';
import GlobalEventHandlers from './../../../../../Utilities/GlobalEventHandlers';
import './Amp.css'

class Amp extends React.Component {

    container;
    canvas;

    xPad = 20;
    yPad = 30;

    globalMouseMove;
    
    floor = 0;

    sustainHeight = 0;

    containerWidth = 0;

    canvasUtil;

    totalXTravel = 0;
    totalYTravel = 0;

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
            ampLine: {lineWidth: 3, strokeColor: '#E65579', lineDash:[0]},
            ampHandle: {lineWidth: 3, strokeColor: '#FFFD47', lineDash:[]},
            baseLine: {lineWidth: 2, strokeColor: 'white', lineDash:[0]},
            valueGuideLine: {lineWidth: 1, strokeColor: '#707070', lineDash:[1, 3]},
            valueText: { fillStyle: 'white' }
        })
    }

    initCanvas(width, height) {

        this.canvas.current.width = width * 3;
        this.canvas.current.height = height * 3;

        this.canvas.current.style.width = `${width}px`;
        this.canvas.current.style.height = `${height}px`;

        this.totalXTravel = (this.containerWidth - (this.xPad * 2));
        this.totalYTravel = (this.containerHeight - (this.yPad * 2));

        this.floor = (this.containerHeight - this.yPad);

        this.sustainHeight = this.floor - (this.props.amp.sustain * (this.containerHeight - (this.yPad * 2)));

        this.ctx = this.canvas.current.getContext('2d');

        this.ctx.scale(3, 3);

    }


    getXpositions(){
        return [
            this.props.amp.attack,
            this.props.amp.decay,
            this.props.amp.sustainWidth,
            this.props.amp.release
        ].map((_, i, o) => {
            const a = o.slice(0, i + 1);
            const v = a.reduce((a, b) => a + b);
            return this.xPad + ((this.totalXTravel || 1) * v);
        }
        );
    }

    drawAmp() {


        const [attackX, decayX, sustainWidthX, releaseX] = this.getXpositions();


        this.canvasUtil
        .clear()
        // attack line
        .styleProfile('ampLine');

        if (this.props.amp.attackCurve === 0) {
            this.canvasUtil.line(
                this.xPad,
                this.floor,
                attackX,
                this.yPad
            )
        } else if (this.props.amp.attackCurve === 1) {
            this.canvasUtil.curve(
                this.xPad,
                this.floor,
                attackX,
                this.floor,
                attackX,
                this.yPad,
            )
        } else if (this.props.amp.attackCurve === 2) {
            this.canvasUtil.curve(
                this.xPad,
                this.floor,
                this.xPad,
                this.yPad,
                attackX,
                this.yPad,
            )
        }
        
        this.canvasUtil.styleProfile('valueGuideLine')
        .line(
            attackX,
            this.yPad,
            attackX,
            this.floor
        )
        
        .styleProfile('ampHandle')
        .circle(attackX, this.yPad, 3)

        .styleProfile('valueText')
        .text('A ' + this.props.amp.attack.toFixed(2), attackX, this.floor + 12)

        // decay line
        .styleProfile('ampLine');



        if (this.props.amp.decayCurve === 0) {
            this.canvasUtil.line(
                attackX,
                this.yPad,
                decayX,
                this.sustainHeight
            )
        } else if (this.props.amp.decayCurve === 1) {
            this.canvasUtil.curve(
                attackX,
                this.yPad,
                attackX,
                this.sustainHeight,
                decayX,
                this.sustainHeight
            )
        } else if (this.props.amp.decayCurve === 2) {
            this.canvasUtil.curve(
                attackX,
                this.yPad,
                decayX,
                this.yPad,
                decayX,
                this.sustainHeight
            )
        }

        this.canvasUtil.styleProfile('valueGuideLine')

        .styleProfile('ampHandle')
        .circle(decayX, this.sustainHeight, 3)

        .styleProfile('valueText')
        .text('D ' + this.props.amp.decay.toFixed(2), decayX, this.containerHeight - this.yPad + 12)


        // sustain line
        .styleProfile('ampLine')
        .line(
            decayX,
            this.sustainHeight,
            sustainWidthX,
            this.sustainHeight,
        )

        .styleProfile('valueGuideLine')
        .line(
            this.xPad,
            this.sustainHeight,
            decayX,
            this.sustainHeight
        )

        .styleProfile('ampHandle')
        .circle(sustainWidthX, this.sustainHeight, 3)

        .styleProfile('valueText')
        .text(this.props.amp.sustain, this.xPad - 10, this.sustainHeight)

        .styleProfile('baseLine')
        .line(
            this.xPad,
            this.floor,
            this.containerWidth - this.xPad,
            this.floor,
        )

        .styleProfile('baseLine')
        .line(
            this.xPad,
            this.floor,
            this.xPad,
            this.yPad,
        )
        // release line
        .styleProfile('ampLine');

        if (this.props.amp.releaseCurve === 0) {
            this.canvasUtil.line(
                sustainWidthX,
                this.sustainHeight,
                releaseX,
                this.floor,
            )
        } else if (this.props.amp.releaseCurve === 1) {
            this.canvasUtil.curve(
                sustainWidthX,
                this.sustainHeight,
                sustainWidthX,
                this.floor,
                releaseX,
                this.floor,
            )
        } else if (this.props.amp.releaseCurve === 2) {
            this.canvasUtil.curve(
                sustainWidthX,
                this.sustainHeight,
                releaseX,
                this.sustainHeight,
                releaseX,
                this.floor,
            )
        }


        this.canvasUtil.styleProfile('ampHandle')
        .circle(releaseX, this.floor, 3)

        .styleProfile('valueText')
        .text('-', sustainWidthX, this.sustainHeight)
        

    }

    validateValue(v) {
        if (v >= 1) {
            return 1;
        }
        if (v <= 0) {
            return 0;
        }
        return v;
    }

    getTrueCoordinates(clientX, clientY) {
        const canvasBB = this.canvas.current.getBoundingClientRect();
        const canvasTop = canvasBB.top;
        const canvasLeft = canvasBB.left;
        const relativeY = Math.floor(this.totalYTravel - ((clientY - canvasTop) - this.yPad));
        const relativeX = Math.floor((clientX - canvasLeft) - this.xPad);

        const mappedX = relativeX / this.totalXTravel
        const mappedY = relativeY / this.totalYTravel

        return [
            this.validateValue(mappedX),
            this.validateValue(mappedY),
        ];
    }

    handleClick({clientX, clientY}, i) {
        if (!(clientX && clientY)) {
            return 
        }
        const [x, y] = this.getTrueCoordinates(clientX, clientY);
        
        const curveDetails = this.getCurveDetails(i);
        curveDetails[3](x);
        this.props.updateOscData({amp: this.props.amp})
    }

    onHandleDrag = (e, i) => {
        this.handleClick(e, i)
        this.globalMouseMove.initiate(e => this.handleClick(e, i));
    }



    getCurveDetails(i) {
        if (i === 0) {
            return [this.props.amp.attack, this.props.amp.attackCurve, v => this.props.amp.attackCurve = v, v => this.props.amp.attack = v];
        } else if (i === 1) {
            return [this.props.amp.decay, this.props.amp.decayCurve, v => this.props.amp.decayCurve = v, v => this.props.amp.decay = v];
        } else if (i === 3) {
            return [this.props.amp.release, this.props.amp.releaseCurve, v => this.props.amp.releaseCurve = v, v => this.props.amp.release = v];
        }
    }

    ampClicked(i) {
        const curveDetails = this.getCurveDetails(i);
        const curve = curveDetails[1];
        let newCurve;
        if (curve === 2) {
            newCurve = 0;
        } else {
            newCurve = curve + 1;
        }
        curveDetails[2](newCurve);
        this.props.updateOscData({amp: this.props.amp})
    }

    
    render() {
        return (
            <div className="w-100 h-100 d-flex-col canvas-layer" ref={ this.container }>
                <div className="flex-1">
                    <canvas onMouseDown={this.onHandleDrag} ref={ this.canvas }></canvas>
                    <div className="flex-1 interaction-layer d-flex">
                        <svg height={ this.containerHeight } width={ this.containerWidth }>
                            <rect className="cursor-pointer" onClick={() => this.ampClicked(0)} x={ this.xPad } y="0" width={ this.props.amp.attack * this.totalXTravel } fillOpacity="0" height="100%" />
                            <rect className="cursor-pointer"  onClick={() => this.ampClicked(1)} x={ this.xPad + this.props.amp.attack * this.totalXTravel } y="0" width={ this.props.amp.attack + this.props.amp.decay * this.totalXTravel } fillOpacity="0" height="100%" />
                            <rect className="cursor-pointer" onClick={() => this.ampClicked(2)} x={ this.xPad + ((this.props.amp.attack + this.props.amp.decay) * this.totalXTravel) } y="0" width={ this.props.amp.sustainWidth * this.totalXTravel } fillOpacity="0" height="100%" />
                            <rect className="cursor-pointer"  onClick={() => this.ampClicked(3)} x={ this.xPad + (this.props.amp.attack + this.props.amp.decay + this.props.amp.sustainWidth) * this.totalXTravel } y="0" width={ this.props.amp.release * this.totalXTravel } fillOpacity="0" height="100%" />
                            
                            <circle className="cursor-grab" onMouseDown={($event) => this.onHandleDrag($event, 0)} cx={ this.xPad + this.props.amp.attack * this.totalXTravel } cy={this.yPad} r="5" fillOpacity="0" height="100%" />
                            <circle className="cursor-grab" onMouseDown={($event) => this.onHandleDrag($event, 1)} cx={ this.xPad + (this.props.amp.attack + this.props.amp.decay) * this.totalXTravel } cy={this.sustainHeight} r="5" fillOpacity="0" height="100%" />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}

export default Amp;

