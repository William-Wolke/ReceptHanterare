const Button = ({ text, onClickFunc }) => {
  <div className="form-element">
    <input
      type="button"
      value={text}
      className="input button"
      onClick={onClickFunc}
    />
  </div>;
};

export default Button;
