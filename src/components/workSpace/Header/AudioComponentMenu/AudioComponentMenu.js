import './AudioComponentMenu.css';

export function AudioComponentMenu() {
    function selectAudioComponent() {}

    const AudioComponentMenu = [
        {
            label: 'Sources',
            items: [
                {
                    label: 'keyboard',
                    id: [0, 0],
                },
            ],
        },
        {
            label: 'Synth',
            items: [
                {
                    label: 'Polysynth',
                    id: [1, 0],
                },
            ],
        },
        {
            label: 'Effects',
            items: [
                {
                    label: 'Ping pong delay',
                    id: [2, 0],
                },
            ],
        },
    ];

    return (
        <div className="audio-component-menu absolute d-flex-col">
            <div className="d-flex-col">
                {AudioComponentMenu.map(group => {
                    return (
                        <>
                            <div className="row bold">{group.label}</div>
                            {group.items.map(item => {
                                return (
                                    <div
                                        className="menu-item"
                                        onClick={selectAudioComponent(item.id)}
                                    >
                                        {item.label}
                                    </div>
                                );
                                // return (
                                //     <div
                                //         className="row relative menu-item"
                                //         onClick={selectAutoComponent(item.id)}
                                //     >
                                //         {item.label}
                                //     </div>
                                // );
                            })}
                        </>
                    );
                })}
            </div>
        </div>
    );
}
