
import React from 'react';
import CanvasUtilities from './../../../../../Utilities/CanvasUtilities';
import GlobalEventHandlers from './../../../../../Utilities/GlobalEventHandlers';
import './Amp.css'

class Amp extends React.Component {

    container;
    canvas;

    xPad = 20;
    yPad = 30;

    globalMouseMove

    containerWidth = 0;

    canvasUtil;

    totalXTravel;
    totalYTravel;

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
            return this.xPad + (this.totalXTravel * v);
        }
        );
    }

    drawAmp() {

        const floor = (this.containerHeight - this.yPad);

        const [attackX, decayX, sustainWidthX, releaseX] = this.getXpositions();

        const sustainHeight = floor - (this.props.amp.sustain * (this.containerHeight - (this.yPad * 2)));

        this.canvasUtil
        .clear()
        // attack line
        .styleProfile('ampLine');

        if (this.props.amp.attackCurve === 0) {
            this.canvasUtil.line(
                this.xPad,
                floor,
                attackX,
                this.yPad
            )
        } else if (this.props.amp.attackCurve === 1) {
            this.canvasUtil.curve(
                this.xPad,
                floor,
                attackX,
                floor,
                attackX,
                this.yPad,
            )
        } else if (this.props.amp.attackCurve === 2) {
            this.canvasUtil.curve(
                this.xPad,
                floor,
                this.yPad,
                this.xPad,
                attackX,
                this.yPad,
            )
        }
        
        this.canvasUtil.styleProfile('valueGuideLine')
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
        .styleProfile('ampLine');



        if (this.props.amp.decayCurve === 0) {
            this.canvasUtil.line(
                attackX,
                this.yPad,
                decayX,
                sustainHeight
            )
        } else if (this.props.amp.decayCurve === 1) {
            this.canvasUtil.curve(
                attackX,
                this.yPad,
                attackX,
                sustainHeight,
                decayX,
                sustainHeight
            )
        } else if (this.props.amp.decayCurve === 2) {
            this.canvasUtil.curve(
                attackX,
                this.yPad,
                decayX,
                this.yPad,
                decayX,
                sustainHeight
            )
        }

        this.canvasUtil.styleProfile('valueGuideLine')

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
        // release line
        .styleProfile('ampLine');

        if (this.props.amp.releaseCurve === 0) {
            this.canvasUtil.line(
                sustainWidthX,
                sustainHeight,
                releaseX,
                floor,
            )
        } else if (this.props.amp.releaseCurve === 1) {
            this.canvasUtil.curve(
                sustainWidthX,
                sustainHeight,
                sustainWidthX,
                floor,
                releaseX,
                floor,
            )
        } else if (this.props.amp.releaseCurve === 2) {
            this.canvasUtil.curve(
                sustainWidthX,
                sustainHeight,
                releaseX,
                sustainHeight,
                releaseX,
                floor,
            )
        }


        this.canvasUtil.styleProfile('ampHandle')
        .circle(releaseX, floor, 3)

        .styleProfile('valueText')
        .text('-', sustainWidthX, sustainHeight)
        

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

    handleClick({clientX, clientY}) {
        const [x, y] = this.getTrueCoordinates(clientX, clientY);
        console.log(x, y);

    }

    onCanvasClick = e => {
        this.handleClick(e)
        this.globalMouseMove.initiate(e => this.handleClick(e));
    }



    getCurveDetails(i) {
        if (i === 0) {
            return [this.props.amp.attack, this.props.amp.attackCurve, v => this.props.amp.attackCurve = v];
        } else if (i === 1) {
            return [this.props.amp.decay, this.props.amp.decayCurve, v => this.props.amp.decayCurve = v];
        } else if (i === 3) {
            return [this.props.amp.release, this.props.amp.releaseCurve, v => this.props.amp.releaseCurve = v];
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

    interactionSectionLayer(i, pos) {
        return <div className="interaction-section" onClick={ () => this.ampClicked(i) } style={{width: (pos * 100) + '%' }}></div>;
    }

    render() {
        return (
            <div className="w-100 h-100 canvas-layer" ref={ this.container }>
                <canvas onMouseDown={this.onCanvasClick} ref={ this.canvas }></canvas>
                <div className="h-100 w-100 interaction-layer d-flex">
                    <div style={{width: this.xPad}}></div>
                    <div className="flex-1 d-flex">
                        {
                            [
                                this.props.amp.attack,
                                this.props.amp.decay,
                                this.props.amp.sustainWidth,
                                this.props.amp.release
                            ].map((pos, i) => this.interactionSectionLayer(i, pos))
                        }
                    </div>
                    <div style={{width: this.xPad}}></div>
                </div>
            </div>
        );
    }
}

export default Amp;

