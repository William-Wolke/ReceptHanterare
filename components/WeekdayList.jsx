export default function WeekdayList({ weekdays }) {
    return (
        <div className="weekdayMenuList form-element">
            {weekdays.map(({ name, ingredients }, index) => {
                return (
                    <div key={`${name} + ${index}`} className="weekdayMenuItem">
                        <h2 className="weekdayMenuHeader">{name}</h2>
                        {ingredients &&
                            ingredients.map((item, index) => {
                                return <p key={'recipe' + index}>{item.name}</p>;
                            })}
                    </div>
                );
            })}
        </div>
    );
}
