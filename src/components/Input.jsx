const InputText = ({ htmlFor, value, setter, text, type, placeholder }) => {
    return (
        <div className="form-group form-element">
            <label htmlFor={htmlFor}>{text}</label>
            <input
                type={type}
                id={htmlFor}
                value={value}
                className="input"
                onChange={(e) => {
                    setter(e.target.value);
                }}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputText;
