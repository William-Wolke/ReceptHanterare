import fs from 'node:fs';
import path from 'node:path';
import { Document, Packer, Paragraph, HeadingLevel } from 'docx';
import { sortShoppingList } from './helpers';

export function renderDocxWeekMenu(title, list) {
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
}

function renderSection(title, list) {
    let children = [];
    children.push(
        new Paragraph({
            text: title,
            heading: HeadingLevel.HEADING_2,
        }),
    );

    list.forEach((item) => {
        children.push(
            new Paragraph({
                text: item.name,
                bullet: {
                    level: 0,
                },
            }),
        );
    });

    return {
        children: children,
    };
}

function renderDocument(sections) {
    return new Document({
        sections: sections,
    });
}

function saveDocx(fileName, doc) {
    if (!fileName.endsWith('.docx')) {
        fileName = fileName + '.docx';
    }
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(path.join(process.cwd(), 'temp', fileName), buffer);
    });
}
