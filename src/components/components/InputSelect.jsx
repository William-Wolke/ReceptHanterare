const InputSelect = ({ optionList, htmlFor, value, setter, text, className }) => {
    return (
        <div className={'form-group form-element ' + className}>
            <label htmlFor={htmlFor}>{text}</label>
            <select
                id={htmlFor}
                className='input' 
                value={value}
                onChange={(e) => {
                    setter(e.target.value);
                }}
            >
                {optionList && optionList.map((option, index) => {
                    return (<option value={option.name} key={index}>{option.name}</option>)
                })}
            </select>
        </div>
    );
};

export default InputSelect;
