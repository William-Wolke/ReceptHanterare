import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';

const Recipe = () => {
    const { name } = useParams();

    const {
        data: recipe,
        isPending,
        error,
    } = useFetch(`/recipe/one/${name}/`, 'GET');

    return (
        <div className='recept'>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {recipe && (
                <div key={recipe.name}>
                    <div>
                        <div className='receptIntro'>
                            <h2>{recipe.name}</h2>
                            <div className='receptInfo'>
                                <i></i>
                                <p>
                                    {recipe.attribute.time
                                        ? recipe.attribute.time
                                        : 0}{' '}
                                    min
                                </p>
                                <i></i>
                                <div className='måltidsTyp'>
                                    {recipe.attribute.meal.map(
                                        (meal, index) => {
                                            return (
                                                <p key={'meal' + index}>
                                                    {meal}
                                                </p>
                                            );
                                        }
                                    )}
                                </div>
                                <div className='receptBeskrivning'>
                                    <p>{recipe.description}</p>
                                </div>
                                <div>
                                    <button>
                                        <i></i>
                                        <p>Lägg till i veckomenyn</p>
                                    </button>
                                </div>
                                <div className='receptAttribut'>
                                    <i></i>
                                    <div>
                                        {recipe.attribute.kitchen.map(
                                            (kitchen, index) => {
                                                return (
                                                    <p key={'kitchen' + index}>
                                                        {kitchen}
                                                    </p>
                                                );
                                            }
                                        )}
                                    </div>
                                    <div>
                                        {recipe.attribute.diet.map(
                                            (diet, index) => {
                                                return (
                                                    <p key={'diet' + index}>
                                                        {diet}
                                                    </p>
                                                );
                                            }
                                        )}
                                    </div>
                                    <div>
                                        {recipe.attribute.properties.map(
                                            (propertie, index) => {
                                                return (
                                                    <p
                                                        key={
                                                            'propertie' + index
                                                        }>
                                                        {propertie}
                                                    </p>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='receptBild'>
                            <img
                                src={
                                    new URL(
                                        '/static/' + recipe.image,
                                        process.env.REACT_APP_DB_HOSTNAME
                                    ).href
                                }
                                alt={recipe.alt}
                                height='400'
                                width='400'
                            />
                        </div>
                    </div>

                    <div className='ingredienser'>
                        <h3>Ingredienser</h3>
                        <div className='portioner'>
                            <button>
                                <i></i>
                            </button>
                            <p>{recipe.attribute.portions} portioner</p>
                            <button>
                                <i></i>
                            </button>
                        </div>
                        <div>
                            <div>
                                {recipe.ingredients &&
                                    recipe.ingredients.map(
                                        (ingredient, index) => {
                                            return (
                                                <div key={'ingredient' + index}>
                                                    <p>{ingredient.name}</p>
                                                    <p>{ingredient.amount}</p>
                                                    <p>{ingredient.unit}</p>
                                                </div>
                                            );
                                        }
                                    )}
                            </div>
                        </div>
                    </div>

                    <div className='instruktioner'>
                        <div>
                            <i></i>
                            <h3>Gör så här</h3>
                        </div>
                        <div>
                            {recipe.steps.map((step, index) => {
                                return (
                                    <div key={index}>
                                        <input type='checkbox' />
                                        <div>
                                            <p>{index + 1 + '.'}</p>
                                            <p>{step}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <i></i>
                            <h3>Klart!</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recipe;
