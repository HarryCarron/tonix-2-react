import Keyboard from '../components/keyboard/Keyboard';
import OscillatorBus from '../components/oscillatorBus/OscillatorBus';
import PingPongDelay from '../components/EffectsRack/PingPongDelay/PingPongDelay';
import Filter from '../components/VisualisedFilters/filter/Filter';

export const componentRegistry = [
    {
        label: 'Sources',
        groupId: '74bf2e24-3907-4933-a35a-3853cab53f05',
        items: [
            {
                label: 'Keyboard',
                id: 'cfb26f22-8ed8-4def-80b5-ca115c25a622',
                component: Keyboard,
            },
        ],
    },
    {
        label: 'Synth',
        groupId: '78ca7c6b-4ab0-4bc7-86cf-e4a6a7cdce37',
        items: [
            {
                label: 'Polysynth',
                id: 'b4d2e17a-4cca-4b02-ac5f-4cb6ae7d7a2e',
                component: OscillatorBus,
            },
        ],
    },
    {
        label: 'Effects',
        groupId: '38d5680b-983f-4662-b0be-b9cf287c8f2a',
        items: [
            {
                label: 'Filter',
                id: '0027d308-0f2c-497d-910b-3907752e67a7',
                component: Filter,
            },
        ],
    },
];

export const componentRegistryMap = {
    'cfb26f22-8ed8-4def-80b5-ca115c25a622': Keyboard,
    'b4d2e17a-4cca-4b02-ac5f-4cb6ae7d7a2e': OscillatorBus,
    '0027d308-0f2c-497d-910b-3907752e67a7': Filter,
};
