const WeekdayList = ({ weekdays, items, key }) => {
    return (
        <>
            {weekdays.map((weekday, index) => {
                return (
                    <div key={weekday + index} className='weekdayMenuItem'>
                        <h2 className='weekdayMenuHeader'>{weekday}</h2>
                        {items[weekday] &&
                            items[weekday].map((item, index) => {
                                return (
                                    <p key={'recipe' + index}>{item.name}</p>
                                );
                            })}
                    </div>
                );
            })}
        </>
    );
};

export default WeekdayList;
