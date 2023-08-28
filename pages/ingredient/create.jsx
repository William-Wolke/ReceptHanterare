import { useState } from 'react';
import apiPost from '../../src/api.js';
import Input from '../../components/Input.jsx';
import InputRange from '../../components/InputRange.jsx';
import InputSelect from '../../components/InputSelect';
import InputList from '../../components/InputList.jsx';
import constants from '../../src/constants.json';
import { getLostIngredients } from '../../src/db';

export async function getServerSideProps() {
    const lostIngredients = await getLostIngredients();
    return {
        props: {
            lostIngredients: JSON.parse(JSON.stringify(lostIngredients)),
        },
    };
}

export default function CreateIngredient({ lostIngredients }) {
    const [name, setName] = useState('');
    const [preferredUnit, setPreferredUnit] = useState('G');
    const [pieces, setPieces] = useState(0);
    const [grams, setGrams] = useState(0);
    const [liters, setLiters] = useState(0);
    const [section, setSection] = useState('');
    const [isCreated, setIsCreated] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let conversion;

        if ((pieces && grams) || (pieces && liters) || (grams && liters)) {
            conversion = [
                {
                    unit: 'St',
                    amount: Number(pieces) || undefined,
                },
                {
                    unit: 'G',
                    amount: grams || undefined,
                },
                {
                    unit: 'L',
                    amount: Number(liters) || undefined,
                },
            ];
        }

        if (name && preferredUnit) {
            const data = {
                name: name,
                unit: {
                    preferredUnit: preferredUnit,
                    conversion: conversion,
                },
                section: section || '',
            };

            const isOk = await apiPost('/ingredient/create/', data);
            if (isOk) {
                console.log('Created ingredient');
                setIsCreated(true);
            } else {
                console.log('Failed');
                setIsError(true);
            }
        } else {
            console.error('Invalid ingredient');
        }
    };

    return (
        <div className="createIngredientContainer">
            <form onSubmit={handleSubmit} className="createIngredientForm">
                <div className="createIngredientItem form-element">
                    <h1>Skapa ingrediens</h1>
                </div>

                <div className="create-ingredient-row">
                    {lostIngredients ? (
                        <InputList
                            text="Namn"
                            htmlFor="name"
                            type="text"
                            value={name}
                            setter={setName}
                            listName="lost-ingredients"
                            dataList={lostIngredients}
                        />
                    ) : (
                        <Input text="Namn" htmlFor="name" type="text" value={name} setter={setName} />
                    )}
                    <InputSelect
                        text="Prefererad enhet"
                        htmlFor="preferred"
                        value={preferredUnit}
                        setter={setPreferredUnit}
                        optionList={constants.preferredMeasurmentTypes}
                    />
                    <InputSelect
                        text="Del i butiken"
                        htmlFor="storeSection"
                        value={section}
                        setter={setSection}
                        optionList={constants.sectionTypes}
                    />
                </div>

                <div className="form-group form-element">
                    <h2>Skapa omvandlingstabell</h2>
                </div>

                <div className="create-ingredient-row">
                    <InputRange text="St" htmlFor="pieces" value={pieces} setter={setPieces} />

                    <InputRange text="G" htmlFor="grams" value={grams} setter={setGrams} />

                    <InputRange text="L" htmlFor="liters" value={liters} setter={setLiters} />
                </div>

                <div className="form-group form-element">
                    <input type="submit" value="Submit" className="input" />
                </div>

                {isCreated && <div>Ingrediens skapad</div>}
                {isError && <div>Något gick fel</div>}
            </form>
        </div>
    );
}
