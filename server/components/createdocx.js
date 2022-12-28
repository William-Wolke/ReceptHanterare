const fs = require('node:fs');
const path = require('node:path');
const { Document, Packer, Paragraph, HeadingLevel } = require('docx');
const { sortShoppingList } = require('./helpers');

const renderDocxWeekMenu = (title, list) => {
    const { bread, dairy, chark, produce, freezer, cupboard, other } = sortShoppingList(list);
    let sections = [];

    sections.push(renderSection('Bröd', bread));
    sections.push(renderSection('Mjölkdisken', dairy));
    sections.push(renderSection('Köttdisken', chark));
    sections.push(renderSection('Grönsaker', produce));
    sections.push(renderSection('Frysen', freezer));
    sections.push(renderSection('Skafferi', cupboard));
    sections.push(renderSection('Annat', other));

    const doc = renderDocument(sections);
    saveDocx(title, doc);
};

const renderSection = (title, list) => {
    let children = [];
    children.push(
        new Paragraph({
            text: title,
            heading: HeadingLevel.HEADING_2,
        })
    );

    list.forEach((item) => {
        children.push(
            new Paragraph({
                text: item.name,
                bullet: {
                    level: 0,
                },
            })
        );
    });

    return {
        children: children,
    };
};

const renderDocument = (sections) => {
    return new Document({
        sections: sections,
    });
};

const saveDocx = (fileName, doc) => {
    if (!fileName.endsWith('.docx')) {
        fileName = fileName + '.docx';
    }
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(path.join(process.cwd(), 'temp', fileName), buffer);
    });
};

module.exports = { renderDocxWeekMenu };
