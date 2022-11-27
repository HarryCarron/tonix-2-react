import './PatchSearch.css';
import React, { useRef, useEffect } from 'react';
import { PatchSearchBody } from './PatchSearchBody/PatchSearchBody';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faWaveSquare } from '@fortawesome/free-solid-svg-icons';
import { ClickOutside } from './../../Utilities/ClickOutside';

export function PatchSearch() {
    const [open, setOpen] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const clickOutside = useRef(new ClickOutside());
    const patchSearchRef = useRef();

    useEffect(() => {
        clickOutside.current.listen(() => {
            setOpen(false);
        }, patchSearchRef.current);
    }, [patchSearchRef]);

    let psClasses = 'ps-search d-flex-col ';

    return (
        <>
            {open && <div className="bg-blur h-100 w-100"></div>}

            <div
                className={psClasses}
                ref={patchSearchRef}
                onClick={() => setOpen(true)}
            >
                <div className="ps-search-container d-flex w-100">
                    <div className="ps-search-icon-container d-flex center-child-xy">
                        <FontAwesomeIcon icon={faWaveSquare} />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Explore Patches..."
                        onChange={e => setSearchTerm(e.target.value)}
                        className="flex-1 ps-input"
                    />

                    {!!searchTerm && (
                        <div
                            onClick={e => setSearchTerm('')}
                            className="ps-clear-search-container d-flex center-child-xy pointer"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    )}
                </div>

                {open && (
                    <div className="w-100 patch-search-body flex-1 d-flex">
                        {
                            <PatchSearchBody
                                searchTerm={searchTerm}
                                setOpen={setOpen}
                            />
                        }
                    </div>
                )}
            </div>
        </>
    );
}
