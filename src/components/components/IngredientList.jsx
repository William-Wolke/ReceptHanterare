import Button from '../components/Button';

const IngredientList = ({ list, setList }) => {
    return (
        <>
            <div className="ingredient-list form-element">
                <div className="ingredient-list-item">
                    <p className="ingredient-list-value">Namn</p>
                    <p className="ingredient-list-value">Mängd</p>
                    <p className="ingredient-list-value">Enhet</p>
                </div>
            </div>

            <div className="ingredient-list form-element">
                {list &&
                    list.map((item, index) => {
                        return (
                            <div key={`looseIngredientList${index}`} className="ingredient-list-item">
                                <p className="ingredient-list-value">{item.name ? item.name : 'Inget'}</p>
                                <p className="ingredient-list-value">{item.amount ? item.amount : 0}</p>
                                <p className="ingredient-list-value">{item.unit ? item.unit : 'Ingen'}</p>
                                <Button
                                    text="-"
                                    onClickFunc={() => {
                                        list.pop(index);
                                        setList(list);
                                    }}
                                    
                                />
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default IngredientList;
