const WeekdayList = ({ weekdays }) => {
  return (
    <div className="weekdayMenuList form-element">
      {weekdays.map(({ day, ingredients }, index) => {
        return (
          <div key={`${day} + ${index}`} className="weekdayMenuItem">
            <h2 className="weekdayMenuHeader">{day}</h2>
            {ingredients &&
              ingredients.map((item, index) => {
                return <p key={"recipe" + index}>{item.name}</p>;
              })}
          </div>
        );
      })}
    </div>
  );
};

export default WeekdayList;
