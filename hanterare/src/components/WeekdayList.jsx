const WeekdayList = ({ weekdays, items, key }) => {
    return (
        <div className='weekdayMenuList form-element'>
            {weekdays.map((weekday, index) => {
                return (
                    <div key={weekday.name + index} className='weekdayMenuItem'>
                        <h2 className='weekdayMenuHeader'>{weekday.name}</h2>
                        {items[weekday.name] &&
                            items[weekday.name].map((item, index) => {
                                return (
                                    <p key={'recipe' + index}>{item.name}</p>
                                );
                            })}
                    </div>
                );
            })}
        </div>
    );
};

export default WeekdayList;
