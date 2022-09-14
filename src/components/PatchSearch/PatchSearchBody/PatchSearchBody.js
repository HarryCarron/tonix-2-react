import React, { useState } from 'react';
import { useEffect } from 'react';
import './PatchSearchBody.css';

import { PatchSearchFilters } from './PatchSearchFilters/PatchSearchFilters';
import { PatchSearchResults } from './PatchSearchResults/PatchSearchResults';

export const PatchSearchBody = ({ searchTerm, setOpen }) => {
    const [filteredPatches, setFilteredPatches] = useState([]);

    useEffect(() => {
        const all = [
            {
                name: 'SuperMegaSaw',
                tags: ['Industrial', 'Heavy', 'Lead', 'Noise', 'Popular'],
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt nibh sem, ac molestie nisi hendrerit commodo. Donec felis dui, eleifend vitae gravida et, ornare nec est',
                createdBy: 'Tonix',
            },
            {
                name: 'Demon Pluck',
                tags: ['Industrial', 'Dark', 'Pluck'],
                description:
                    'Praesent interdum suscipit fringilla. Nullam non turpis consectetur, porttitor ligula ac, suscipit arcu. Nunc blandit semper vehicula.',
                createdBy: 'Tonix',
            },
            {
                name: 'IceDub Chord',
                tags: ['Atmospheric', 'Dissonant'],
                description:
                    'Nunc vehicula ligula sed leo ultricies, quis sodales metus scelerisque. Duis rhoncus, magna eget iaculis eleifend',
                createdBy: 'Tonix',
            },
            {
                name: 'HardTek Citroen Picasso Bass',
                tags: ['Wide', 'Kick', 'Popular'],
                description:
                    'Mauris condimentum eros vel turpis aliquam, id laoreet magna varius. Proin felis dui, imperdiet',
                createdBy: 'Tonix',
            },
            {
                name: 'Marmite',
                tags: ['Atmospheric', 'Abstract'],
                description:
                    'Vivamus varius urna tempor arcu convallis, at scelerisque justo luctus.',
                createdBy: 'Tonix',
            },
        ];

        const filtered = all.filter(a => {
            const lowerName = a.name.toLowerCase();
            const lowerTerm = searchTerm.toLowerCase();
            return lowerName.includes(lowerTerm);
        });

        setFilteredPatches(() => filtered);
    }, [searchTerm]);

    return (
        <div
            className="w-100 d-flex-col border-top"
            onClick={() => setOpen(false)}
        >
            <PatchSearchFilters />
            <PatchSearchResults filteredPatches={filteredPatches} />
        </div>
    );
};
