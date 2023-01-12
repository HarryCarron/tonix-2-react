import './Connetions.css';
import { useSelector, useDispatch } from 'react-redux';
export function Connections() {
    const attemptConnection = useSelector(state => {
        return state.connectorSlice.attempt;
    });
    const currentConnections = useSelector(state => {
        return state.connectorSlice.currentConnections;
    });
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

    const Path = (connection, isAttempt) => {
        return (
            <path
                className={
                    'connector shadow-4-connector ' +
                    (isAttempt ? 'connection-attempt' : '')
                }
                d={prepare(connection)}
                stroke="rgb(60, 60, 60, 0.5)"
                stroke-width="3"
                stroke-linecap="round"
                fill="none"
            />
        );
    };

    function test() {
        currentConnections.map(connecton => Path(connecton, false));
    }

    return (
        // prettier-ignore
        <>
            {attemptConnection.from && Path(attemptConnection, true)}
            {currentConnections.length && test(currentConnections)}
        </>
    );
}
