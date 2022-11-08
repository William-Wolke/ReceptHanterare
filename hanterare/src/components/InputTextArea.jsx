const InputTextArea = ({ htmlFor, value, setter, text }) => {
    return (
        <div className='form-group form-element'>
            <label htmlFor={htmlFor}>{text}</label>
            <textarea
                id={htmlFor}
                value={value}
                className='input'
                onChange={(e) => {
                    setter(e.target.value);
                }}
            />
        </div>
    );
};

export default InputTextArea;
