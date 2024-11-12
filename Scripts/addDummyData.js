const mongoose = require('mongoose');
const Item = require('./item.js'); // Adjust this path to the actual location of your Item model

const dbUrl = 'mongodb+srv://lost-and-found:lostAndFound@cluster0.px7evg2.mongodb.net/DSMJ';

const CATEGORIES = [
    'Electronics',
    'Clothing',
    'Documents',
    'Accessories',
    'Jewelry',
    'Books',
    'Keys',
    'Wallets',
    'Bags',
    'Sports Equipment',
    'Toys',
    'Tools',
    'Footwear',
    'Home Goods',
    'Other'
];
const LOCATIONS = [
    'Ljubljana',
    'Maribor',
    'Celje',
    'Kranj',
    'Velenje',
    'Koper',
    'Novo Mesto',
    'Ptuj',
    'Trbovlje',
    'Kamnik',
    'Jesenice',
    'Izola',
    'Domžale',
    'Škofja Loka',
    'Murska Sobota',
    'Nova Gorica',
    'Slovenj Gradec',
    'Ravne na Koroškem',
    'Piran',
    'Sežana',
    'Idrija',
    'Radovljica',
    'Slovenska Bistrica',
    'Brežice',
    'Postojna',
    'Tolmin',
    'Ajdovščina',
    'Litija',
    'Črnomelj',
    'Vrhnika',
    'Ljutomer',
    'Metlika',
    'Rogaška Slatina',
    'Laško',
    'Gornja Radgona',
    'Šentjur',
    'Ilirska Bistrica',
    'Kočevje',
    'Bled',
    'Vipava',
    'Žalec',
    'Hrastnik',
    'Ribnica',
    'Preddvor',
    'Portorož',
    'Šoštanj',
    'Radenci',
    'Cerknica',
    'Ormož',
    'Turnišče',
    'Šmarje pri Jelšah',
    'Moravče',
    'Dravograd',
    'Planina',
    'Polhov Gradec',
    'Kobarid',
    'Divača',
    'Logatec',
    'Ankaran',
    'Žiri',
    'Črna na Koroškem',
    'Lovrenc na Pohorju',
    'Kidričevo',
    'Destrnik',
    'Bohinj',
    'Borovnica',
    'Komenda',
    'Šentjernej',
    'Tržič',
    'Mirna',
    'Velika Polana'
];

const NAMES = [
    'Lost Wallet', 'Keys Found', 'Smartphone', 'Bag Left', 'Passport', 'Gold Ring', 'Toy Car',
    'Laptop', 'Sports Shoes', 'Sunglasses', 'Backpack', 'Earrings', 'Notebook', 'Headphones', 'Watch'
];

// Generate random lorem ipsum text for descriptions
const generateLorem = () => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.';

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateRandomItem = () => ({
    name: getRandomElement(NAMES),
    type: Math.random() > 0.5 ? 'lost' : 'found',
    description: generateLorem(),
    category: getRandomElement(CATEGORIES),
    dateFound: Math.random() > 0.5 ? new Date(Date.now() - Math.floor(Math.random() * 1e10)) : null,
    dateLost: Math.random() > 0.5 ? new Date(Date.now() - Math.floor(Math.random() * 1e10)) : null,
    locationFound: getRandomElement(LOCATIONS),
    status: Math.random() > 0.5 ? 'listed' : 'claimed',
    email: Math.random() > 0.5 ? `user${Math.floor(Math.random() * 1000)}@example.com` : null,
    number: Math.random() > 0.5 ? `+386${Math.floor(10000000 + Math.random() * 90000000)}` : null,
    image: null
});

const populateDatabase = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB');

        const items = Array.from({ length: 10000 }, () => generateRandomItem());

        await Item.insertMany(items);
        console.log('Database populated with 10,000 items');

    } catch (error) {
        console.error('Error populating database:', error);
    } finally {
        mongoose.connection.close();
    }
};

populateDatabase();
