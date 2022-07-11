import React, { useState } from 'react';
import './EffectsRack.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Menu, SubMenu, MenuItem, MenuButton } from '@szhsin/react-menu';
import PingPongDelay from '../PingPongDelay/PingPongDelay';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import '../effect.css';
import LED from '../../LED/LED';

export function EffectsRack(props) {
    const [activeEffects, setActiveEffects] = useState([]);

    const effects = [
        {
            label: 'Delay',
            children: [
                {
                    label: 'Ping Pong Delay',
                    component: <PingPongDelay />,
                    id: 0,
                },
                {
                    label: 'Feedback Delay',
                    component: null,
                    id: 1,
                },
            ],
        },
        {
            label: 'Reverb',
            component: null,
            id: 2,
        },
        {
            label: 'Chorus',
            component: null,
            id: 3,
        },
        {
            label: 'Phaser',
            component: null,
            id: 4,
        },
        {
            label: 'Pitch Shift',
            component: null,
            id: 5,
        },
        {
            label: 'Bit Crusher',
            component: null,
            id: 6,
        },
        {
            label: 'Phaser',
            component: null,
            id: 7,
        },
        {
            label: 'Chebyshev',
            component: null,
            id: 8,
        },
        {
            label: 'Distortion',
            component: null,
            id: 9,
        },
        {
            label: 'Auto',
            component: null,
            children: [
                {
                    label: 'Panner',
                    component: null,
                    id: 10,
                },
                {
                    label: 'Wah',
                    component: null,
                    id: 11,
                },
                {
                    label: 'Tremelo',
                    component: null,
                    id: 12,
                },
                {
                    label: 'Vibrato',
                    component: null,
                    id: 13,
                },
            ],
        },
    ];

    const addEffect = effect => {
        setActiveEffects(() => [...activeEffects, effect]);
    };

    const removeEffect = effect => {
        setActiveEffects(() => {
            const newActiveEffects = [...activeEffects];
            const effectToRemoveID = newActiveEffects.findIndex(
                activeEffect => activeEffect === effect
            );
            newActiveEffects.splice(effectToRemoveID, 1);
            return newActiveEffects;
        });
    };

    return (
        <div className="d-flex-col h-100">
            <div className="d-flex title">
                <div className="flex-1"></div>
                <div className="d-flex center-child-xy icon-container">
                    <Menu
                        menuButton={<MenuButton>Open menu</MenuButton>}
                        transition
                    >
                        {effects.map((effect, fxi) =>
                            effect.children ? (
                                <SubMenu
                                    key={'list2 ' + fxi}
                                    label={effect.label}
                                >
                                    {effect.children.map((child, fxci) => (
                                        <MenuItem
                                            key={fxci}
                                            onClick={() => addEffect(child)}
                                        >
                                            {child.label}
                                        </MenuItem>
                                    ))}
                                </SubMenu>
                            ) : (
                                <MenuItem
                                    key={'list3 ' + fxi}
                                    onClick={() => addEffect(effect)}
                                >
                                    {effect.label}
                                </MenuItem>
                            )
                        )}
                    </Menu>
                </div>
            </div>
            <div className="flex-1 active-error-area">
                {activeEffects.map((effect, index) => (
                    <div key={'list ' + index} className="effect shadow-1">
                        <div className="d-flex effect-topbar">
                            <div className="d-flex center-child-xy">
                                <LED
                                    isOn={true}
                                    updateOscData={() => null}
                                ></LED>
                            </div>
                            <div className="flex-1 bold effect-label">
                                {effect.label}
                            </div>
                            <div className="d-flex center-child-xy">
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="pointer"
                                    onClick={() => removeEffect(effect)}
                                />
                            </div>
                        </div>
                        {effect.component}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EffectsRack;
