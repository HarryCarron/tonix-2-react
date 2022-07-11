import React, { useState } from 'react';
import './SettingsRack.css';
import Amp from './Amp/Amp';
import Additive from './Additive/Additive';

function SettingRackTab(props) {
    let classes = 'setting-tab flex-1 d-flex center-child-y';

    if (props.selected) {
        classes += ' selected-setting';
    }

    return (
        <div className={classes} onClick={() => props.onChangeTab(props.id)}>
            {props.label}
        </div>
    );
}

export default function SettingsRack(props) {
    const [activeTab, setActiveTab] = useState(1);

    const settings = [
        {
            label: 'Overview',
            id: 0,
        },
        {
            label: 'Amp',
            id: 1,
        },
        {
            label: 'Additive',
            id: 2,
        },
    ];

    return (
        <div className="settings-rack settings">
            <div className="d-flex h-100">
                <div className="d-flex-col tabs tab-seperator">
                    {settings.map(({ id, label }) => (
                        <SettingRackTab
                            key={id}
                            id={id}
                            onChangeTab={setActiveTab}
                            selected={activeTab === id}
                            label={label}
                        />
                    ))}
                </div>

                <div
                    className="flex-1 setting-area h-100"
                    style={{ height: props.height, width: props.width }}
                >
                    {/* {
                        activeTab === 0 && <Overview></Overview>
                    } */}
                    {activeTab === 1 && (
                        <Amp
                            dims={{ height: props.height, width: props.width }}
                        ></Amp>
                    )}
                    {activeTab === 2 && (
                        <Additive
                            dims={{ height: props.height, width: props.width }}
                            partials={props.partials}
                            setPartials={props.setPartials}
                        ></Additive>
                    )}
                </div>
            </div>
        </div>
    );
}

// export default React.memo(SettingsRack, (prevProps, nextProps) => {
//     return prevProps.activeOscillator === nextProps.activeOscillator;
// });
