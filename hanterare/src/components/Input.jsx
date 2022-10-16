const InputText = ({ htmlFor, value, setter, text, type }) => {
    return (
        <div className='form-group form-element'>
            <label htmlFor={htmlFor}>{text}</label>
            <input
                type={type}
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

export default InputText;
