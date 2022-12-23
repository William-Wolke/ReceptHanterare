const fs = require('node:fs');
const path = require('node:path');
const { Document, Packer, Paragraph } = require('docx');
// const { sortShoppingList } = require('./helpers');

const renderDocxWeekMenu = (title, list) => {
  // const { dairy, bread, chark, produce, freezer, cupboard } = sortShoppingList(ingredients);

    const sections = renderSection(list);
    const doc = renderDocument([sections]);
    saveDocx(title, doc);
};

const renderSection = (list) => {
    return {
        children: list.map((item) => {
            return new Paragraph({
                text: item.name,
                bullet: {
                    level: 0,
                },
            });
        }),
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
        fs.writeFileSync(path.join(process.cwd(), 'documents', fileName), buffer);
    });
};

module.exports = { renderDocxWeekMenu };
