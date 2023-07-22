export default function AttributeList({ list }) {
    return (
        <div className="form-element recipeAttributeList">
            {list.map((item, index) => {
                return (
                    <div className="recipeAttributeItem" key={index}>
                        {item}
                    </div>
                );
            })}
        </div>
    );
};
