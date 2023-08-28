export default function InputTextArea({ htmlFor, value, setter, text, placeholder, inputRef, className }) {
    return (
        <div className={'form-group form-element ' + className}>
            <label htmlFor={htmlFor}>{text}</label>
            <textarea
                id={htmlFor}
                value={value}
                className="input"
                onChange={(e) => {
                    setter(e.target.value);
                }}
                placeholder={placeholder}
                ref={inputRef}
            />
        </div>
    );
}
