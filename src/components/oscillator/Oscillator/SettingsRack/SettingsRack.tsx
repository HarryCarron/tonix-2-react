import React, { ReactElement } from 'react';
import './SettingsRack.css';
import Additive from './Additive/Additive';

export default function SettingsRack(): ReactElement {
    return (
        <div className="settings-rack settings">
            <Additive></Additive>
        </div>
    );
}
