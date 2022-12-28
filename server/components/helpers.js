const sortShoppingList = (ingredients) => {
    let dairy = [];
    let bread = [];
    let chark = [];
    let produce = [];
    let freezer = [];
    let cupboard = [];

    let other = ingredients.map((item) => {
        if (item.section === 'dairy') {
            dairy.push(item);
        } else if (item.section === 'bread') {
            bread.push(item);
        } else if (item.section === 'chark') {
            chark.push(item);
        } else if (item.section === 'produce') {
            produce.push(item);
        } else if (item.section === 'cupboard') {
            cupboard.push(item);
        } else if (item.section === 'freezer') {
            freezer.push(item);
        } else {
            return item;
        }
    });

    return {
        dairy,
        bread,
        chark,
        produce,
        freezer,
        cupboard,
        other,
    };
};

module.exports = { sortShoppingList };
