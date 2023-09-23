import { defineConfig } from 'tinacms';
import * as constants from '../src/constants.json';

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const units = constants.metric.map((item) => item.unit);

export default defineConfig({
    branch,
    clientId: null, // Get this from tina.io
    token: null, // Get this from tina.io

    build: {
        outputFolder: 'admin',
        publicFolder: 'public',
    },
    media: {
        tina: {
            mediaRoot: '',
            publicFolder: 'public',
        },
    },
    schema: {
        collections: [
            {
                name: 'recipes',
                label: 'Recipes',
                path: 'content/recipes',
                format: 'yaml',
                ui: {
                    // router: (props) => {
                    //     return '/';
                    // },
                    filename: {
                        slugify: (values) => {
                            // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
                            return `${values?.title?.toLowerCase().replace(/ /g, '-')}`;
                        },
                    },
                },
                fields: [
                    {
                        type: 'string',
                        name: 'title',
                        label: 'Title',
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: 'rich-text',
                        name: 'description',
                        label: 'Description',
                        isBody: true,
                    },
                    {
                        type: 'string',
                        name: 'time',
                        label: 'Time',
                    },
                    {
                        type: 'number',
                        name: 'servings',
                        label: 'Servings',
                    },
                    {
                        type: 'string',
                        name: 'tags',
                        label: 'Tags',
                        list: true,
                    },
                    {
                        type: 'object',
                        name: 'ingredients',
                        label: 'Ingredients',
                        list: true,
                        fields: [
                            {
                                type: 'reference',
                                name: 'name',
                                label: 'name',
                                collections: ['ingredients'],
                            },
                            {
                                type: 'number',
                                name: 'amount',
                                label: 'Amount',
                            },
                            {
                                type: 'string',
                                name: 'unit',
                                label: 'Unit',
                                options: units,
                            },
                        ],
                        ui: {
                            itemProps: (item) => {
                                // Field values are accessed by item?.<Field name>
                                return { label: item?.name };
                            },
                        },
                    },
                    {
                        type: 'rich-text',
                        name: 'instructions',
                        label: 'Instructions',
                    },
                    {
                        type: 'image',
                        name: 'image',
                        label: 'Image',
                    },
                    {
                        type: 'object',
                        name: 'recipes',
                        label: 'Recipes',
                        list: true,
                        fields: [
                            {
                                type: 'reference',
                                name: 'name',
                                label: 'Name',
                                collections: ['recipes'],
                            },
                        ],
                        ui: {
                            itemProps: (item) => {
                                // Field values are accessed by item?.<Field name>
                                return { label: item?.title };
                            },
                        },
                    },
                ],
            },
            {
                name: 'ingredients',
                label: 'Ingredients',
                path: 'content/ingredients',
                format: 'yaml',
                fields: [
                    {
                        type: 'string',
                        name: 'title',
                        label: 'Title',
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: 'string',
                        name: 'prefered_unit',
                        label: 'Prefered Unit',
                        options: units,
                    },
                    {
                        type: 'object',
                        name: 'conversion',
                        label: 'Conversion',
                        list: true,
                        fields: [
                            {
                                type: 'string',
                                name: 'unit',
                                label: 'Unit',
                                options: units,
                            },
                            {
                                type: 'number',
                                name: 'amount',
                                label: 'Amount',
                            },
                        ],
                    },
                    {
                        type: 'string',
                        name: 'section',
                        label: 'Section',
                    },
                ],
            },
            {
                name: 'menus',
                label: 'Menus',
                path: 'content/menus',
                format: 'yaml',
                fields: [
                    {
                        type: 'string',
                        name: 'title',
                        label: 'Title',
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: 'rich-text',
                        name: 'description',
                        label: 'Description',
                    },
                    {
                        type: 'object',
                        name: 'recipes',
                        label: 'Recipes',
                        list: true,
                        fields: [
                            {
                                type: 'reference',
                                name: 'name',
                                label: 'Name',
                                collections: ['recipes'],
                            },
                            {
                                type: 'string',
                                name: 'day',
                                label: 'Day',
                                options: weekdays,
                            },
                        ],
                    },
                ],
            },
        ],
    },
});
