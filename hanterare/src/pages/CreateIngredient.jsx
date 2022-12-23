import React, { useState } from 'react';
import UseAxios from '../hooks/UseAxios.js';
import Input from '../components/Input.jsx';
import InputSelect from '../components/InputSelect.jsx';

const CreateIngredient = () => {
    const [name, setName] = useState('');
    const [preferredUnit, setPreferredUnit] = useState('G');
    const [pieces, setPieces] = useState(0);
    const [grams, setGrams] = useState(0);
    const [liters, setLiters] = useState(0);
    const [section, setSection] = useState('');
    const [isCreated, setIsCreated] = useState(false);
    const [isError, setIsError] = useState(false);


    const handleSubmit = async (e) => {
        //Prevent reload
        e.preventDefault();

        let conversion = [
            {
                unit: 'St',
                amount: pieces,
            },
            {
                unit: 'G',
                amount: grams,
            },
            {
                unit: 'L',
                amount: liters,
            },
        ];

        let data = {
            name: name,
            unit: {
                preferredUnit: preferredUnit,
                conversion: conversion,
            },
            section: section,
        };

        let res = await UseAxios('/ingredient/create/', data);
        if (res) {
            console.log('Created ingredient');
            setIsCreated(true);
        } else {
            console.log('Failed');
            setIsError(true);
        }
    };

    return (
        <div className='createIngredientContainer card'>
            <form onSubmit={handleSubmit} className='createIngredientForm'>
                <div className='createIngredientItem form-element'>
                    <h1>Skapa ingrediens</h1>
                </div>

                <Input
                    text='Namn'
                    htmlFor='name'
                    type='text'
                    value={name}
                    setter={setName}
                />

                <InputSelect
                    text='Prefererad enhet'
                    htmlFor='preferred'
                    value={preferredUnit}
                    setter={setPreferredUnit}
                    optionList={['L', 'St', 'G']}
                />

                <div className='form-group form-element'>
                    <h2>Skapa omvandlingstabell</h2>
                </div>

                <Input
                    text='St'
                    htmlFor='pieces'
                    type='number'
                    value={pieces}
                    setter={setPieces}
                />

                <Input
                    text='G'
                    htmlFor='grams'
                    type='number'
                    value={grams}
                    setter={setGrams}
                />

                <Input
                    text='L'
                    htmlFor='liters'
                    type='number'
                    value={liters}
                    setter={setLiters}
                />

                <InputSelect
                    text='Del i butiken'
                    htmlFor='storeSection'
                    value={section}
                    setter={setSection}
                    optionList={[
                        'Mjölk',
                        'Bröd',
                        'Kött',
                        'Grönsaker',
                        'Skafferi',
                        'Frys',
                    ]}
                />

                <div className='form-group form-element'>
                    <input type='submit' value='Submit' className='input' />
                </div>

                {isCreated && (
                    <div>Ingrediens skapad</div>
                )}
                {isError && (
                    <div>Något gick fel</div>
                )}
            </form>
        </div>
    );
};

export default CreateIngredient;