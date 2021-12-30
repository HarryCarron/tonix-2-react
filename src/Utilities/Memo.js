export default function MultiKeyMemoCheck(states, keys = []) {
    return keys.every(k => states.every(s => s === k));
}