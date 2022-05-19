const renderWeekMenu = (week, ingredients) => {

    let dairy = [];
    let bread = [];
    let chark = [];
    let produce = [];
    let freezer = [];
    let cupboard = [];

    let leftover = ingredients.map((item) => {
        if (item.section === "dairy") {
            dairy.push(item);
        } else if (item.section === "bread") {
            bread.push(item);
        } else if (item.section === "chark") {
            chark.push(item);
        } else if (item.section === "produce") {
            produce.push(item);
        } else if (item.section === "cupboard") {
            cupboard.push(item);
        } else if (item.section === "freezer") {
            freezer.push(item);
        } else {
            return item;
        }
    });

    return (
        `
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
                    <h1>Inköpslista för V.${week}</h1>
                </header>
                <main>
                    <div class="list">
                        ${bread && 
                            `<div>
                                <h1>Bröd</h1>
                                ${bread.map((item, index) => {
                                    return (`
                                        <div class="rows" id="row1">
                                            <input type="checkbox" class="checkbox" name="${index}">
                                            <label for="${index}">${item.amount} ${item.unit} ${item.name}</label>
                                        </div>
                                    `)
                                })}
                            </div>`
                        }
                        ${dairy && 
                            `<div>
                                <h1>Mjölk</h1>
                                ${dairy.map((item, index) => {
                                    return (`
                                        <div class="rows" id="row1">
                                            <input type="checkbox" class="checkbox" name="${index}">
                                            <label for="${index}">${item.amount} ${item.unit} ${item.name}</label>
                                        </div>
                                    `)
                                })}
                            </div>`
                        }
                        ${produce && 
                            `<div>
                                <h1>Grönt</h1>
                                ${produce.map((item, index) => {
                                    return (`
                                        <div class="rows" id="row1">
                                            <input type="checkbox" class="checkbox" name="${index}">
                                            <label for="${index}">${item.amount} ${item.unit} ${item.name}</label>
                                        </div>
                                    `)
                                })}
                            </div>`
                        }
                        ${chark && 
                            `<div>
                                <h1>Kött</h1>
                                ${chark.map((item, index) => {
                                    return (`
                                        <div class="rows" id="row1">
                                            <input type="checkbox" class="checkbox" name="${index}">
                                            <label for="${index}">${item.amount} ${item.unit} ${item.name}</label>
                                        </div>
                                    `)
                                })}
                            </div>`
                        }
                        ${cupboard && 
                            `<div>
                                <h1>Skafferi</h1>
                                ${cupboard.map((item, index) => {
                                    return (`
                                        <div class="rows" id="row1">
                                            <input type="checkbox" class="checkbox" name="${index}">
                                            <label for="${index}">${item.amount} ${item.unit} ${item.name}</label>
                                        </div>
                                    `)
                                })}
                            </div>`
                        }
                        ${freezer && 
                            `<div>
                                <h1>Grönt</h1>
                                ${freezer.map((item, index) => {
                                    return (`
                                        <div class="rows" id="row1">
                                            <input type="checkbox" class="checkbox" name="${index}">
                                            <label for="${index}">${item.amount} ${item.unit} ${item.name}</label>
                                        </div>
                                    `)
                                })}
                            </div>`
                        }
                        ${leftover && 
                            `<div>
                                <h1>Annat</h1>
                                ${leftover.map((item, index) => {
                                    return (`
                                        <div class="rows" id="row1">
                                            <input type="checkbox" class="checkbox" name="${index}">
                                            <label for="${index}">${item.amount} ${item.unit} ${item.name}</label>
                                        </div>
                                    `)
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
        `
    );
}

module.exports = renderWeekMenu;