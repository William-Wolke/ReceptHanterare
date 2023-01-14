const InputList = ({ dataList, htmlFor, value, setter, text, listName, className, inputRef }) => {
    return (
        <div className={"form-group form-element " + className}>
            <label htmlFor={htmlFor}>{text}</label>
            <input
                type="text"
                id={htmlFor}
                value={value}
                className="input add-ingredient-input"
                list={listName}
                onChange={(e) => {
                    setter(e.target.value);
                }}
                ref={inputRef}
            />

            <datalist id={listName}>
                {dataList.length &&
                    dataList.map((option, index) => {
                        return (
                            <option value={option.name} key={index}>
                                {option.name}
                            </option>
                        );
                    })}
            </datalist>
        </div>
    );
};

export default InputList;
