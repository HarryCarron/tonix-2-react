
import React, { useEffect, useRef } from 'react';
import CanvasUtilities from '../../../../../Utilities/CanvasUtilities';
import GlobalEventHandlers from '../../../../../Utilities/GlobalEventHandlers';
import './Amp.css'

export function Amp(props) {

    const xPad = 35;
    const yPad = 30;

    const utils = useRef({
        globalMouseMove: new GlobalEventHandlers(),
        canvas: null
    });

    const ampValues = useRef({
        floor: props.dims.height - yPad,
        totalXTravel: props.dims.width - (xPad * 2),
        totalYTravel: props.dims.height - (yPad * 2),
        sustainWidth: 0,
    });

    const canvas = useRef();

    useEffect(_ => {

        utils.current.canvas = new CanvasUtilities(canvas, xPad, yPad, props.dims.width, props.dims.height)
        .setStyle({
            lineCap: 'round',
            textAlign: 'center',
            font: 'bold 8px Helvetica'
        })
        .setStyleProfiles({
            ampLine: {lineWidth: 2, strokeColor: '#E65579', lineDash:[0]},
            ampHandle: {lineWidth: 2, strokeColor: '#FFFD47', lineDash:[]},
            baseLine: {lineWidth: 1, strokeColor: '#C3C3CE', lineDash:[0]},
            valueGuideLine: {lineWidth: 1, strokeColor: '#707070', lineDash:[2, 3]},
            valueText: { fillStyle: '#C3C3CE' }
        });

    }, []);

    useEffect(_ => {
        setSustainHeight();
        drawAmp();
    }, [props.amp]);

    const getXpositions = () => {
        return [
            props.amp.attack,
            props.amp.decay,
            props.amp.sustainWidth,
            props.amp.release
        ].map((_, i, o) => {
            const a = o.slice(0, i + 1);
            const v = a.reduce((a, b) => a + b);
            return xPad + ((ampValues.current.totalXTravel || 1) * v);
        });
    }

    const getCurveName = () => {
        return [
            props.amp.attackCurve,
            props.amp.decayCurve,
            props.amp.releaseCurve,
        ].map(curve => {
            if (curve === 0) {
                return 'LIN';
            } else if (curve === 1) {
                return 'EXP';
            } else {
                return 'COS';
            }
        })
    }

    const setSustainHeight = () => {
        ampValues.current.sustainHeight = ampValues.current.floor - (props.amp.sustain * (props.dims.height  - (yPad * 2)));
    }

    const drawAmp = () => {
        const [attackX, decayX, sustainWidthX, releaseX] = getXpositions();
        const [attackCurveName, decayCurveName, releaseCurveName] = getCurveName();

        const sustainHeight = ampValues.current.sustainHeight;
        const floor = ampValues.current.floor;
        const canvas = utils.current.canvas;

        
        canvas.clear()
        .styleProfile('baseLine')
        .multiple(
            (ctx, params) => ctx.line(...params),
            [xPad, floor, props.dims.width - xPad, floor],
            [xPad, floor, xPad, yPad]
        )
        .styleProfile('valueGuideLine')
        .multiple(
            (ctx, params) => ctx.line(...params),
            [attackX, yPad, attackX, floor],
            [decayX, sustainHeight, decayX, yPad],
            [xPad, sustainHeight, decayX, sustainHeight]
        )
        .styleProfile('valueText')
        .multiple(
            (ctx, params) => ctx.text(...params),
            [`A: ${ props.amp.attack.toFixed(2) } ${attackCurveName}`, attackX, floor + 15],
            [`D: ${ props.amp.decay.toFixed(2) } ${ decayCurveName }`, decayX, yPad - 8],
            [`S:  ${ props.amp.sustain.toFixed(1) }`, xPad - 18, sustainHeight],
            [`R: ${props.amp.release.toFixed(2)} ${ releaseCurveName }`, releaseX, floor + 15]
        )
        .styleProfile('ampLine')

        .conditional(
            [
                [
                    ctx => ctx.line(xPad, floor, attackX, yPad),
                    props.amp.attackCurve === 0,
                ],
                [
                    ctx => ctx.curve(xPad, floor, attackX, floor, attackX, yPad),
                    props.amp.attackCurve === 1
                ],
                [
                    ctx => ctx.curve(xPad, floor, xPad, yPad, attackX, yPad),
                    props.amp.attackCurve === 2
                ],
                [
                    ctx => ctx.line(attackX, yPad, decayX, sustainHeight),
                    props.amp.decayCurve === 0
                ],
                [
                    ctx => ctx.curve(attackX, yPad, attackX, sustainHeight, decayX, sustainHeight),
                    props.amp.decayCurve === 1
                ],
                [
                    ctx => ctx.curve(attackX, yPad, decayX, yPad, decayX, sustainHeight),
                    props.amp.decayCurve === 2
                ],
                [
                    ctx => ctx.line(sustainWidthX, sustainHeight, releaseX, floor),
                    props.amp.releaseCurve === 0
                ],
                [
                    ctx => ctx.curve(sustainWidthX, sustainHeight, sustainWidthX, floor, releaseX, floor),
                    props.amp.releaseCurve === 1
                ],
                [
                    ctx => ctx.curve(sustainWidthX, sustainHeight, releaseX, sustainHeight, releaseX, floor),
                    props.amp.releaseCurve === 2
                ],
            ]
        )
        .line(
            decayX,
            sustainHeight,
            sustainWidthX,
            sustainHeight,
        ).styleProfile('ampHandle')
        .multiple(
            (ctx, params) => ctx.circle(...params),
            [attackX, yPad, 3],
            [decayX, sustainHeight, 3],
            [sustainWidthX, sustainHeight, 3],
            [releaseX, floor, 3]
        );

    }

    const validateValue = v => {
        if (v >= 1) {
            return 1;
        }
        if (v <= 0) {
            return 0;
        }
        return v;
    }

    const ampValid = () => {
        return [
            props.amp.attack,
            props.amp.decay,
            props.amp.sustainWidth,
            props.amp.release,
        ].reduce((a, b) => a + b) <= 1;

    }

    const handleClick = ({clientX, clientY}, i) => {
        if (!(clientX && clientY)) {
            return 
        }
        let [x, y] = utils.current.canvas.getTrueCoordinates(clientX, clientY);
        
        if (i === 0) {
            const attack = getCurveDetails(0);
            x = validateValue(x);
            attack[3](x);
        }
        if (i === 1) {
            x = validateValue(x - props.amp.attack);
            y = validateValue(y);
            const decay = getCurveDetails(i);
            const sustain = getCurveDetails(2);
            decay[3](x);
            sustain[3](y);
        }
        if (i === 2) {
            x = validateValue(x - (props.amp.attack + props.amp.decay));
            y = validateValue(y);
            const decay = getCurveDetails(2);
            const sustain = getCurveDetails(2);
            decay[4](x);
            sustain[3](y);
        }
        if (i === 3) {
            x = validateValue(x - props.amp.release);
            const release = getCurveDetails(3);
            release[3](x);
            console.log(x);
        }
        if (ampValid()) {
            props.updateOscData({amp: props.amp});
        }
    }

    const onHandleDrag = (e, i) => {
        handleClick(e, i)
        utils.current.globalMouseMove.initiate(e => handleClick(e, i));
    }

    const getCurveDetails = (i) => {
        if (i === 0) {
            return [props.amp.attack, props.amp.attackCurve, v => props.amp.attackCurve = v, v => props.amp.attack = v];
        } else if (i === 1) {
            return [props.amp.decay, props.amp.decayCurve, v => props.amp.decayCurve = v, v => props.amp.decay = v];
        } else if (i === 2) {
            return [props.amp.sustain, null, null, v => props.amp.sustain = v, v => props.amp.sustainWidth = v];
        } else if (i === 3) {
            return [props.amp.release, props.amp.releaseCurve, v => props.amp.releaseCurve = v, v => props.amp.release = v];
        }
    }

    const ampClicked = (i) => {
        const curveDetails = getCurveDetails(i);
        const curve = curveDetails[1];
        let newCurve;
        if (curve === 2) {
            newCurve = 0;
        } else {
            newCurve = curve + 1;
        }
        curveDetails[2](newCurve);
        props.updateOscData({amp: props.amp});
    }

    const get = id => {
        
        const sustainHeight = ampValues.current.sustainHeight;
        const amp = props.amp;
        const all = [amp.attack, amp.decay, amp.sustainWidth, amp.release];
        const pointY = [yPad, sustainHeight, sustainHeight, ampValues.current.floor];

        const x = xPad + (all.slice(0, id).reduce((a, b) => a + b, 0) * ampValues.current.totalXTravel);
        const width = all[id] * ampValues.current.totalXTravel;

        return {
            x,
            width,
            handle: {
                x: x + width,
                y: pointY[id]
            }
        }

    }

    return (
        <div className="wh-100 canvas-layer">
            <canvas ref={ canvas }></canvas>
            <div className="flex-1 interaction-layer d-flex">
                <svg className="interaction-layer" height={ props.dims.height } width={ props.dims.width }>
                    {
                        [0, 1, 2, 3].map(i => interactionPanel(get(i), i, () => ampClicked(i)))
                    }

                    {
                        [0, 1, 2, 3].map(i => interactionHandle(get(i), i, (e) => onHandleDrag(e, i)))
                    }
                </svg>
            </div>
        </div>
    );
}

const interactionPanel = ({x, width}, i, onAmpClick) => <rect key={i} onClick={ onAmpClick } x={ x } width={ width } y="0"/> 

const interactionHandle = ({handle: {x, y}}, i, onHandleDrag) => <circle key={i} onMouseDown={ onHandleDrag } cx={ x } cy={ y } r="5"/> 

export default Amp;