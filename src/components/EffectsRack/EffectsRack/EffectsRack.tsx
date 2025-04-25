import { ReactElement, useState } from 'react';
import './EffectsRack.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Menu, SubMenu, MenuItem, MenuButton } from '@szhsin/react-menu';
import PingPongDelay from '../PingPongDelay/PingPongDelay';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import '../effect.css';
import LED from '../../LED/LED';
import { NestedListOption } from '../../../shared/types/nestedListOption';

type EffectOption = NestedListOption<ReactElement>;

export function EffectsRack(): ReactElement {
    const [activeEffects, setActiveEffects] = useState<EffectOption[]>([]);

    const effects: NestedListOption<ReactElement>[] = [
        {
            label: 'Delay',
            children: [
                {
                    label: 'Ping Pong Delay',
                    data: <PingPongDelay />,
                    id: 0,
                },
                {
                    label: 'Feedback Delay',
                    id: 1,
                },
            ],
        },
        {
            label: 'Reverb',
            id: 2,
        },
        {
            label: 'Chorus',
            id: 3,
        },
        {
            label: 'Phaser',
            id: 4,
        },
        {
            label: 'Pitch Shift',
            id: 5,
        },
        {
            label: 'Bit Crusher',
            id: 6,
        },
        {
            label: 'Phaser',
            id: 7,
        },
        {
            label: 'Chebyshev',
            id: 8,
        },
        {
            label: 'Distortion',
            id: 9,
        },
        {
            label: 'Auto',
            children: [
                {
                    label: 'Panner',
                    id: 10,
                },
                {
                    label: 'Wah',
                    id: 11,
                },
                {
                    label: 'Tremelo',
                    id: 12,
                },
                {
                    label: 'Vibrato',
                    id: 13,
                },
            ],
        },
    ];

    const addEffect = (effect: EffectOption) => {
        setActiveEffects(() => [...activeEffects, effect]);
    };

    const removeEffect = (effect: EffectOption) => {
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
                {activeEffects.map((effect: EffectOption, index: number) => (
                    <div key={'list ' + index} className="effect shadow-1">
                        <div className="d-flex effect-topbar">
                            <div className="d-flex center-child-xy">
                                <LED
                                    isOn={true}
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
                        {effect.data}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EffectsRack;
