import React, { useRef, useState, useEffect, ReactElement } from 'react';
import { DragAndDrop } from '../../../utilities/drag-and-drop';
import './Knob.css';

interface RotaryControlProps {
    value: number;
    size: number;
    color?: string;
    arcWidth: number;
}

function RotaryControl({
    value,
    size,
    color,
    arcWidth,
}: RotaryControlProps): ReactElement<RotaryControlProps> {
    const [_value, setValue] = useState(value);
    const rotaryControl = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        new DragAndDrop<SVGSVGElement>(rotaryControl.current!)
            .getDomRect((node: SVGSVGElement) => {
                return node!.getBBox();
            })
            .onDrag(val => {

                const x = val?.[1];

                if (x) {
                    setValue(x);
                }
            });
    }, []);

    function polarToCartesian(
        centerX: number,
        centerY: number,
        radius: number,
        angleInDegrees: number
    ) {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        };
    }

    function describeArc(
        x: number,
        y: number,
        radius: number,
        startAngle: number,
        endAngle: number
    ) {
        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

        return [
            'M',
            start.x,
            start.y,
            'A',
            radius,
            radius,
            0,
            largeArcFlag,
            0,
            end.x,
            end.y,
        ].join(' ');
    }

    return (
        <div className="d-flex-col">
            <div className="w-100 d-flex center-child-x">
                <div className="d-flex center-child-xy input-container width">
                    {(value * 100).toFixed(0)}
                </div>
            </div>

            <div className="flex-1 center-child-xy">
                <svg height={size} width={size} ref={rotaryControl}>
                    <path
                        fill="none"
                        stroke="#969696"
                        strokeWidth={arcWidth}
                        strokeLinecap="round"
                        d={describeArc(size / 2, size / 2, size / 2, 210, 510)}
                    />

                    <path
                        fill="none"
                        stroke="black"
                        strokeWidth={arcWidth}
                        strokeLinecap="round"
                        d={describeArc(
                            size / 2,
                            size / 2,
                            size / 2,
                            210,
                            210 + value * 300
                        )}
                    />
                    <g
                        className="grabbable rotating-component"
                        style={{ transform: `rotate(${30 + value * 300}deg)` }}
                    >
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={size / 2}
                            fill="transparent"
                        />
                        <line
                            x1={size / 2}
                            y1={size - 6}
                            x2={size / 2}
                            y2={size}
                            strokeWidth="3"
                            strokeLinecap="round"
                            stroke="black"
                        ></line>
                    </g>
                </svg>
            </div>
        </div>
    );
}

export default React.memo(RotaryControl);
