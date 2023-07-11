const Button = ({ text, onClickFunc, className }) => {
    return (
        <div className="form-element">
            <input type="button" value={text} className={'input button ' + className} onClick={onClickFunc} />
        </div>
    );
};

export default Button;
