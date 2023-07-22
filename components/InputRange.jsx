export default function InputRange({ htmlFor, value, setter, text, type = 'number', min = 0, max = 9999, className }) {
    return (
        <div className={'form-group form-element ' + className}>
            <label htmlFor={htmlFor}>{text}</label>
            <input
                type={type}
                id={htmlFor}
                value={value}
                min={min}
                max={max}
                className="input"
                step="0.0001"
                onChange={(e) => {
                    setter(e.target.value);
                }}
            />
        </div>
    );
};
