import Link from 'next/link';
import { db } from '../../src/db';

export async function getServerSideProps() {
    const menuData = await db.Menu.find({}).lean();
    return {
        props: {
            menus: JSON.parse(JSON.stringify(menuData)),
        },
    };
};

export default function MenuList({ menus }) {
    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const swWeekdays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];

    return (
        <div className="menuListContainer">
            {menus &&
                menus.map((item, index) => {
                    return (
                        <div className="menuListItemContainer card" key={'menu' + index}>
                            <div className="menuListItem">
                                {/* Titel */}
                                <div>
                                    <Link href={`/menu/${item.year}/${item.week}`}>
                                        <h1>
                                            {item.year}: V.{item.week}
                                        </h1>
                                    </Link>
                                </div>

                                <div className="menuListItemScheduleContainer menuListItemSection">
                                    <div>
                                        <h2>Recept för veckan</h2>
                                    </div>

                                    {weekdays.map((weekday, index) => {
                                        return (
                                            item[weekday] &&
                                            item[weekday].map((recipeName) => {
                                                return (
                                                    <div key={weekday + index} className="menuListItemScheduleItem">
                                                        <div className="menuListItemScheduleDay">
                                                            <p>{`${swWeekdays[index]}:`}</p>
                                                        </div>
                                                        <div className="menuListItemScheduleRecipe">
                                                            <Link href={`/recept/${recipeName}`}>
                                                                <p>{recipeName}</p>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        );
                                    })}
                                </div>

                                <div className="menuListItemSection">
                                    <div>
                                        <h2>Inköpslista</h2>
                                    </div>

                                    {/* SHopping list */}
                                    {item.shoppingList &&
                                        item.shoppingList.map((shoppingItem, index) => {
                                            return (
                                                <div key={shoppingItem.name + index} className="menuListIngredientList">
                                                    <p>{shoppingItem.name}</p>

                                                    <p>{shoppingItem.amount}</p>

                                                    <p>{shoppingItem.unit}</p>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
