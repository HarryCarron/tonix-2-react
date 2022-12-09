export function Connections({ connectionAttempt, activeConnectons = [] }) {
    const prepare = connection => {
        const connectorBB = {
            height: connection.from.y - connection.to.y,
            width: connection.from.x - connection.to.x,
        };

        // prettier-ignore
        return  [
            `M${connection.from.x},${connection.from.y} `,
            `Q${connection.to.x + connectorBB.width / 2},${connection.from.y} `,
            `${connection.to.x + connectorBB.width / 2},${connection.to.y + connectorBB.height / 2} `,
            `Q${connection.to.x + connectorBB.width / 2},${connection.from.y - connectorBB.height} `,
            `${connection.to.x},${connection.to.y} `,
        ].join('');
    };

    const Path = connection => {
        return (
            <path
                className="connection-attempt"
                d={prepare(connection)}
                stroke="rgb(60, 60, 60)"
                stroke-width="3"
                stroke-linecap="round"
                fill="none"
            />
        );
    };

    return (
        // prettier-ignore
        <>
            {connectionAttempt && Path(connectionAttempt)}
            {activeConnectons.length && activeConnectons.map(connecton => Path(connecton))}
        </>
    );
}
