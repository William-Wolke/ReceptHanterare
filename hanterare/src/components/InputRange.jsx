const InputRange = ({ htmlFor, value, setter, text, type, min, max }) => {
    return (
        <div className='form-group form-element'>
            <label htmlFor={htmlFor}>{text}</label>
            <input
                type={type}
                id={htmlFor}
                value={value}
                min={min}
                max={max}
                className='input'
                onChange={(e) => {
                    setter(e.target.value);
                }}
            />
        </div>
    );
};

export default InputRange;
