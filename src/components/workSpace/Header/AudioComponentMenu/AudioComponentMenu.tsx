import './AudioComponentMenu.css';
import { componentRegistry } from '../../../../registry/componentRegistry';
import { addToWorkspace } from '../../../../store/features/activeComponents/activeComponentSlice';
import { useSelector, useDispatch } from 'react-redux';
import { ReactElement } from 'react';
export function AudioComponentMenu(): ReactElement {
    const dispatch = useDispatch();

    return (
        <div className="audio-component-menu d-flex-col">
            {/* <div className="tonix-logo">
                <span className="logo-base logo-part-1"> Tonix </span>
                <span className="logo-base logo-part-2"> Lab </span>
            </div> */}

            <input
                className="search-input"
                placeholder="Search Nodes"
                type="text"
            />
            <span className="heading">Nodes</span>
            <div className="d-flex-col">
                {componentRegistry.map(group => {
                    return (
                        <div>
                            <div className="menu-item bold label">
                                {group.label}
                            </div>
                            {group.items.map(item => {
                                return (
                                    <div
                                        className="menu-item"
                                        onClick={() =>
                                            dispatch(addToWorkspace(item.id))
                                        }
                                    >
                                        {item.label}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
