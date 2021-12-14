import './LED.css';

function LED({isOn, onToggleOnState}){
    let classes = "pointer led ";
    classes += isOn ? "is-on" : "";
    return <div onClick={() => onToggleOnState() } className={classes}></div>
};

export default LED;
