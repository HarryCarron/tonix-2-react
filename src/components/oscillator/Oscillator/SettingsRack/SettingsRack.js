
import React, { useState } from 'react';
import './SettingsRack.css';
import Amp from './Amp/Amp';
import Additive from './Additive/Additive';
import Overview from './Overview/Overview';


function SettingRackTab(props) {

    let classes = 'setting-tab flex-1 d-flex center-child-y';

    if (props.selected) {
        classes += ' selected-setting';
    }

    return (
        <div className={ classes } onClick={ () => props.onChangeTab(props.id) }>
            {
                props.label
            }
        </div>
    );
}

function SettingsRack(props) {
    const [activeTab, setActiveTab] = useState(1);

    const settings = [
        {
            label: 'Overview',
            id: 0,
        },
        {
            label: 'Amp',
            id: 1
        },
        {
            label: 'Additive',
            id: 2,
        },
    ];

    return (
        <div className="settings-rack settings">
            <div className="d-flex h-100">
                <div className="d-flex-col tab-seperator">
                    { 
                        settings.map(
                            setting =>
                                    <SettingRackTab
                                        key={setting.id}
                                        id={setting.id}
                                        onChangeTab={setActiveTab}
                                        selected={activeTab === setting.id}
                                        label={setting.label}
                                    />
                        )
                    }
                </div>


                <div className="setting-area h-100">
                    {
                        activeTab === 0 && <Overview></Overview>
                    }
                    {
                        activeTab === 1 && <Amp amp={props.activeOscillator.amp}></Amp>
                    }
                    {
                        activeTab === 2 && <Additive></Additive>
                    }
                </div>
            </div>

        </div>
    );
}


export default React.memo(SettingsRack,
    (prevProps, nextProps) => {
        console.log(prevProps.activeOscillator === nextProps.activeOscillator);
        return prevProps.activeOscillator === nextProps.activeOscillator
    });
