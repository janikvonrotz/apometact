import { Tasks, Deals, Categories } from './connectors';

export default () => {

  var today = new Date();

  Categories.find({}, (error, response) => {
    if (response.length === 0 ) {
      console.log('Adding mongodb categories data');
      [
        {label: 'Beverages'},
        {label: 'Food'},
        {label: 'Nonfood'},
        {label: 'Energy Drinks'},
        {label: 'Welcome Deal'},
      ].map((item) => {
        item.createdAt = today;
        (new Categories(item)).save()
      })
    }
  })

  var expiresAt = new Date('2016-12-31')
  var publishAt =  new Date('2016-10-01')

  Deals.find({}, (error, response) => {
    if (response.length === 0 ) {
      console.log('Adding mongodb deals data');
      [
        {
          title: "Energy Cola",
          description: "2 für 1",
          categoryId: "Energy Drinks",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/Energy+Cola.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/ean-13_2050001767868.gif",
          pointOfSale: ["KKiosk", "Avec"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "Ginger Breeze",
          description: "50%",
          categoryId: "Welcome Deal",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/Ginger+Breeze.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/ean-13_2050001767868.gif",
          pointOfSale: ["KKiosk", "Avec"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "Bier",
          description: "2 für 1",
          categoryId: "Beverages",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/Bier.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/ean-13_2050001767851.gif",
          pointOfSale: ["KKiosk", "Avec"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "Wasser Blau",
          description: "2 für 1",
          categoryId: "Beverages",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/Wasser+Blau.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/ean-13_2050001767875.gif",
          pointOfSale: ["KKiosk", "Avec"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "Happy Snack",
          description: "2 für 1",
          categoryId: "Food",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/Happy+Snack.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/ean-13_2050001767882.gif",
          pointOfSale: ["KKiosk", "Avec"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "Happy Kaugummi",
          description: "2 für 1",
          categoryId: "Food",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/Happy+Kaugummi.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/ean-13_2050001767899.gif",
          pointOfSale: ["KKiosk", "Avec"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "Traveller's Favorite",
          description: "2 für 1",
          categoryId: "Food",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/Travellers+Favorite.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/ean-13_2050001767905.gif",
          pointOfSale: ["KKiosk", "Avec"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "Schirm & Gloves",
          description: "12.- statt 16.-",
          categoryId: "Nonfood",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/Schirm+&+Gloves.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/ean-13_2050001768018.gif",
          pointOfSale: ["KKiosk", "Avec"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "Schirm",
          description: "6.- statt 8.-",
          categoryId: "Nonfood",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/Schirm.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/ean-13_2050001768025.gif",
          pointOfSale: ["KKiosk", "Avec"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
      ].map((item) => {
        Categories.findOne({label: item.categoryId}).then((category) => {
          item.categoryId = category._id;
          (new Deals(item)).save()
        });
      })
    }
  })
};
