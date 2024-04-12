const tagList =  [
    {tagLabel: "50-e", tagValue: "50e"},
    {tagLabel: "60-e", tagValue: "60e"},
    {tagLabel: "70-e", tagValue: "70e"},
    {tagLabel: "80-e", tagValue: "80e"},
    {tagLabel: "90-e", tagValue: "90e"},
    {tagLabel: "Antologijski", tagValue: "antologijski"},
    {tagLabel: "Azijski", tagValue: "azijski"},
    {tagLabel: "Body horor", tagValue: "body-horor"},
    {tagLabel: "Creature feature", tagValue: "creature-feature"},
    {tagLabel: "Duhovi", tagValue: "duhovi"},
    {tagLabel: "Čudovišta", tagValue: "cudovista"},
    {tagLabel: "Egzorcizam", tagValue: "egzorcizam"},
    {tagLabel: "Folk horor", tagValue: "folk-horor"},
    {tagLabel: "Found footage", tagValue: "found-footage"},
    {tagLabel: "Gothic", tagValue: "gothic"},
    {tagLabel: "Izvanzemaljci i ekipa", tagValue: "izvanzemaljci-i-ekipa"},
    {tagLabel: "Klasici", tagValue: "klasici"},
    {tagLabel: "Komedija", tagValue: "komedija"},
    {tagLabel: "Lutke", tagValue: "lutke"},
    {tagLabel: "Manijaci", tagValue: "manijaci"},
    {tagLabel: "Nezavisni", tagValue: "nezavisni"},
    {tagLabel: "Psihološki", tagValue: "psiholoski"},
    {tagLabel: "Religija", tagValue: "religija"},
    {tagLabel: "Remake", tagValue: "remake"},
    {tagLabel: "Slasher", tagValue: "slasher"},
    {tagLabel: "Talijanski", tagValue: "talijanski"},
    {tagLabel: "Torture porn", tagValue: "torture-porn"},
    {tagLabel: "Uklete kuće", tagValue: "uklete-kuce"},
    {tagLabel: "Vampiri", tagValue: "vampiri"},
    {tagLabel: "Vukodlaci", tagValue: "vukodlaci"},
    {tagLabel: "Zombiji", tagValue: "zombiji"},
    {tagLabel: "Demoni", tagValue: "demoni"},
];

// Remove duplicates by creating a new Set with unique tag labels
const uniqueTags = new Set(tagList.map(tag => tag.tagValue));

// Create a new array with unique tags
const uniqueTagList = Array.from(uniqueTags).map(value => tagList.find(tag => tag.tagValue === value));

export const sortedTags = uniqueTagList.sort((a, b) => a.tagLabel.localeCompare(b.tagLabel));
