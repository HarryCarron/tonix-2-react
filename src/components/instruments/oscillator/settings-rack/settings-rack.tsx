import React, { ReactElement } from 'react';
import './SettingsRack.css';
import Additive from '../../../shared/additive/additive';

export default function SettingsRack(): ReactElement {
    return (
        <div className="settings-rack settings">
            <Additive></Additive>
        </div>
    );
}
