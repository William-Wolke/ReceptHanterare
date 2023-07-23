require('dotenv').config();
const axios = require('axios');
const menuData = require('./data/menu.json');
const recipeData = require('./data/recipe.json');
const ingredientData = require('./data/ingredient.json');

async function insertTestdata() {
    const menuUrl = new URL('/api/menu', process.env.NEXT_PUBLIC_BASE_URL);
    const ingredientUrl = new URL('/api/ingredient', process.env.NEXT_PUBLIC_BASE_URL);
    const recipeUrl = new URL('/api/recipe', process.env.NEXT_PUBLIC_BASE_URL);

    const resultPromise = Promise.all(
        [
            postData(menuUrl, menuData),
            postData(ingredientUrl, ingredientData),
            postData(recipeUrl, recipeData)
        ]
    )

    resultPromise.then(function (result) {
        console.log("🚀 ~ result:", result)
        const [menuResult, ingredientResult, recipeResult] = result;
        console.log(`
                Saved menus: ${menuResult.saved}
                Saved ingredients: ${ingredientResult.saved}
                Saved recipes: ${recipeResult.saved}

                # of errors: ${menuResult.errors + ingredientResult.errors + recipeResult.errors}
                ${menuResult.errors ? `Errors saving menus: ${menuResult.errors}` : ``}
                ${ingredientResult.errors ? `Errors saving ingredients: ${ingredientResult.errors}` : ``}
                ${recipeResult.errors ? `Errors saving recipes: ${recipeResult.errors}` : ``}
            `);
    }).catch(function (error) {
        console.log(error);
    });

};

/**
 * 
 * @param {string} url 
 * @param {object[]} data 
 */
async function postData(url, data) {
    console.log(`Inserting data to ${url}...`);

    const info = {
        saved: 0,
        errors: 0,
    }
    await data.map(async function (item) {
        try {
            const formData = new URLSearchParams();
            Object.entries(item).map(([key, value]) => {
                formData.append(key, value);
            });
            await axios.post(url, item);
            info.saved = info.saved + 1;
        } catch (e) {
            console.error(e.message);
            info.errors = info.errors + 1;
        }
    });

    return info;
}

insertTestdata();
