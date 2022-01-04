import React from 'react';
import './Additive.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import GlobalEventHandlers from './../../../../../Utilities/GlobalEventHandlers';
import CanvasUtilities from './../../../../../Utilities/CanvasUtilities';

class Additive extends React.Component {

    PARTIALS_UPPER_LIMIT = 32

    container;
    canvas;

    xPad = 10;
    yPad = 15;

    partialPad = 8;


    totalXTravel
    totalYTravel


    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.canvas = React.createRef();

        this.state = {
            containerWidth: 0,
            containerHeight: 0,
        }
    }

    componentDidMount() {
        this.globalMouseMove = new GlobalEventHandlers();

        this.setState({
            containerWidth: this.container.current.offsetWidth,
            containerHeight: this.container.current.offsetHeight
        });

        this.containerWidth = this.container.current.offsetWidth;
        this.containerHeight = this.container.current.offsetHeight;


        this.totalXTravel = (this.containerWidth - (this.xPad * 2));
        this.totalYTravel = (this.containerHeight - (this.yPad * 2));

        this.floor = (this.containerHeight - this.yPad / 2);

        this.initCanvasUtil();

    }

    componentDidUpdate() {
        this.canvasUtil.clear();
        this.draw();
    }

    draw() {

        const totalPartialsNumber = this.props.partials.length;
        const width = this.totalXTravel / totalPartialsNumber;
        const partialPad = totalPartialsNumber < 10 ? 6 : 4

        this.props.partials.forEach((p, i) => {
            this.canvasUtil.setStyle({
                fillStyle: 'rgba(230, 85, 121, 0.3)', strokeColor: '#E65579', lineWidth: 1
            }).rect(
                this.xPad + (width * i) + (partialPad / 2),
                this.floor,
                width - partialPad,
                (this.totalYTravel * p) * -1,
                true
            )
        });

    }

    initCanvasUtil() {
        this.canvasUtil = new CanvasUtilities(this.canvas, this.xPad, this.yPad, this.containerWidth, this.containerHeight);

    }

    incrementPartial(mode) {
        let partials = [...this.props.partials];
        if (mode) {
            partials.push(1);
        } else {
            partials.pop();
        }

        if (partials.length <= this.PARTIALS_UPPER_LIMIT && partials.length >= 0) {
            this.updatePartials(partials);
        }
    }

    updatePartials(partials) {
        this.props.updateOscData({partials})
    }

    randomize() {
        const length = Math.floor(Math.random() * this.PARTIALS_UPPER_LIMIT);
        const partials = Array.from({length}).map(_ => Math.random());
        this.updatePartials(partials);
    }

    clear() {
        const partials = [];
        this.updatePartials(partials);
    }

    beginPartialManipulation = (e) => {
        this.manipulatePartial(e)
        this.globalMouseMove.initiate(e => this.manipulatePartial(e));
    }

    manipulatePartial({clientX, clientY}) {
        if (!(clientX && clientY)) {
            return 
        }
        let [x, y] = this.canvasUtil.getTrueCoordinates(clientX, clientY, true);

        const hoveredPartial = Math.floor(x * this.props.partials.length);

        const partials = this.props.partials;

        if (hoveredPartial >= partials.length) {
            return;
        }

        partials[hoveredPartial] = y;

        this.props.updateOscData(partials);
    }


    render() {
        return (
            <div className="w-100 h-100 d-flex-col">
                <div className="flex-1 w-100" ref={ this.container }>
                    <canvas onMouseDown={this.beginPartialManipulation} ref={ this.canvas } height="0"></canvas>
                </div>
                <div className="additive-controls d-flex">
                    <div className="flex-1">
                        <button className="addative-button pointer" onClick={() => this.randomize()}>
                            RANDOMIZE
                        </button>
                        <button className="addative-button pointer clear" onClick={() => this.clear()}>
                            CLEAR
                        </button>
                    </div>
                    <div className="additive-tools d-flex">
                        <div className="d-flex center-child-xy">
                            <FontAwesomeIcon icon={faMinus} className="pointer" onClick={() => this.incrementPartial(false)}/>
                        </div>
                        <div className="d-flex center-child-xy">
                            { this.props.partials.length }
                        </div>
                        <div className="d-flex center-child-xy">
                            <FontAwesomeIcon icon={faPlus} className="pointer" onClick={() => this.incrementPartial(true)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Additive;
