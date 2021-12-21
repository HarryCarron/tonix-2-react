
import React from 'react';
import './SettingsRack.css';
import Amp from './Amp/Amp';
import Additive from './Additive/Additive';
import Overview from './Overview/Overview';


function SettingRackTab(props) {

    let classes = 'setting-tab flex-1 d-flex center-child-xy';

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

class SettingsRack extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            activeSetting: props.activeSetting
        };
    }

    componentDidUpdate() {
    }

    settings = [
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

    onChangeTab = (activeSetting) => this.setState({ activeSetting });

    render() {

        return (
            <div className="settings-rack settings">

                {/* <div className="header">
                    HellO!
                </div> */}

                <div className="d-flex">
                    <div className="d-flex-col tab-seperator">
                        { 
                            this.settings.map(
                                setting =>
                                        <SettingRackTab
                                            key={setting.id}
                                            id={setting.id}
                                            onChangeTab={this.onChangeTab}
                                            selected={this.state.activeSetting === setting.id}
                                            label={setting.label}
                                        />
                            )
                        }
                    </div>


                    <div className="setting-area">
                        {
                            this.state.activeSetting === 0 && <Overview></Overview>
                        }
                        {
                            this.state.activeSetting === 1 && <Amp amp={this.props.activeOscillator.amp}></Amp>
                        }
                        {
                            this.state.activeSetting === 2 && <Additive></Additive>
                        }
                    </div>
                </div>

            </div>
        );
    }


}

export default SettingsRack;
