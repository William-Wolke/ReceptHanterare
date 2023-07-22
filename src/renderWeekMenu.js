const { sortShoppingList } = require('./helpers');

export function renderWeekMenu (year, week, shoppingList) {
    const { dairy, bread, chark, produce, freezer, cupboard, other } = sortShoppingList(shoppingList);

    return `
            <!DOCTYPE html>
            <html lang="sv">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Inköpslista</title>
                <style>
                    .rows {
                        display: flex;
                        flex-direction: row;
                        width: 80%;
                        margin: auto;
                    }
                    .checked {
                        background-color: #d3d1d1;
                        text-decoration: line-through;
                    }
                </style>
            </head>
            <body>
                <header>
                    <h1>Inköpslista för ${year} V.${week}</h1>
                </header>
                <main>
                    <div class="list">
                        ${
                            bread &&
                            `<div>
                                <h1>Bröd</h1>
                                ${bread.map((item, index) => {
                                    return `
                                        <div class="rows" id="row1">
                                            <input type="checkbox" class="checkbox" name="${index}">
                                            <label for="${index}">${item.amount} ${item.unit} ${item.name}</label>
                                        </div>
                                    `;
                                })}
                            </div>`
                        }
                        ${
                            dairy &&
                            `<div>
                                <h1>Mjölk</h1>
                                ${dairy.map((item, index) => {
                                    return `
                                        <div class="rows" id="row1">
                                            <input type="checkbox" class="checkbox" name="${index}">
                                            <label for="${index}">${item.amount} ${item.unit} ${item.name}</label>
                                        </div>
                                    `;
                                })}
                            </div>`
                        }
                        ${
                            produce &&
                            `<div>
                                <h1>Grönt</h1>
                                ${produce.map((item, index) => {
                                    return `
                                        <div class="rows" id="row1">
                                            <input type="checkbox" class="checkbox" name="${index}">
                                            <label for="${index}">${item.amount} ${item.unit} ${item.name}</label>
                                        </div>
                                    `;
                                })}
                            </div>`
                        }
                        ${
                            chark &&
                            `<div>
                                <h1>Kött</h1>
                                ${chark.map((item, index) => {
                                    return `
                                        <div class="rows" id="row1">
                                            <input type="checkbox" class="checkbox" name="${index}">
                                            <label for="${index}">${item.amount} ${item.unit} ${item.name}</label>
                                        </div>
                                    `;
                                })}
                            </div>`
                        }
                        ${
                            cupboard &&
                            `<div>
                                <h1>Skafferi</h1>
                                ${cupboard.map((item, index) => {
                                    return `
                                        <div class="rows" id="row1">
                                            <input type="checkbox" class="checkbox" name="${index}">
                                            <label for="${index}">${item.amount} ${item.unit} ${item.name}</label>
                                        </div>
                                    `;
                                })}
                            </div>`
                        }
                        ${
                            freezer &&
                            `<div>
                                <h1>Grönt</h1>
                                ${freezer.map((item, index) => {
                                    return `
                                        <div class="rows" id="row1">
                                            <input type="checkbox" class="checkbox" name="${index}">
                                            <label for="${index}">${item.amount} ${item.unit} ${item.name}</label>
                                        </div>
                                    `;
                                })}
                            </div>`
                        }
                        ${
                            other &&
                            `<div>
                                <h1>Annat</h1>
                                ${other.map((item, index) => {
                                    return `
                                        <div class="rows" id="row1">
                                            <input type="checkbox" class="checkbox" name="${index}">
                                            <label for="${index}">${item.amount} ${item.unit} ${item.name}</label>
                                        </div>
                                    `;
                                })}
                            </div>`
                        }
                    </div>
                </main>
                <script>
                    let rows = document.getElementsByClassName('row');
                    let checkboxes = document.getElementsByClassName('checkbox');

                    checkboxes.foreach((item) => {
                        item.addEventListener('click', checkCheckBox)
                    });


                    function checkCheckBox() {
                        if (this.checked) {
                            document.getElementById("row" + this.name).classList.add('checked');
                        }
                        else {
                            document.getElementById("row" + this.name).classList.remove('checked');
                        }
                    }
                </script>
            </body>
            </html>
        `;
};
