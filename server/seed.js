import { Tasks, Deals, Categories } from './connectors';

var seed = () => {

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

  // year, month, day [, hour, minute, second, millisecond ]
  var expiresAt = new Date("October 31, 2016 00:00:00");
  var publishAt = new Date("October 1, 2016 00:00:00");

  Deals.find({}, (error, response) => {
    if (response.length === 0 ) {
      console.log('Adding mongodb deals data');
      [
        {
          title: "ok.- energy cola",
          description: "2 für CHF 1.-",
          categoryId: "Beverages",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/1Energy+Cola.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/2050001767868.gif",
          pointOfSale: ["k kiosk", "Press & Books"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "ok.- energy drink ginger breeze",
          description: "CHF 0.60 statt CHF 1.20",
          categoryId: "Welcome Deal",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/1Ginger+Breeze.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/2050001767868.gif",
          pointOfSale: ["k kiosk", "Press & Books"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "ok.- bier",
          description: "2 für CHF 2.50",
          categoryId: "Beverages",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/1Bier.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/2050001767851.gif",
          pointOfSale: ["k kiosk", "Press & Books"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "ok.- mineralwasser still",
          description: "2 für CHF 1.50",
          categoryId: "Beverages",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/1Wasser+Blau.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/2050001767875.gif",
          pointOfSale: ["k kiosk", "Press & Books"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "ok.- happy snack",
          description: "2 für CHF 2.-",
          categoryId: "Food",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/1Happy+Snack.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/2050001767882.gif",
          pointOfSale: ["k kiosk", "Press & Books"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "ok.- chewing gum",
          description: "2 für CHF 1.50",
          categoryId: "Food",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/1Happy+Kaugummi.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/2050001767899.gif",
          pointOfSale: ["k kiosk", "Press & Books"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "ok.- traveller's favourite",
          description: "2 für CHF 1.50",
          categoryId: "Food",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/1Travellers+Favorite.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/2050001767905.gif",
          pointOfSale: ["k kiosk", "Press & Books"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "ok.- umbrella und ok.- touch screen gloves",
          description: "CHF 12.- statt CHF 16.-",
          categoryId: "Nonfood",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/1Schirm+&+Gloves.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/2050001768018.gif",
          pointOfSale: ["k kiosk", "Press & Books"],
          publishAt: publishAt,
          expiresAt: expiresAt,
          createdAt: today
        },
        {
          title: "ok.- umbrella",
          description: "CHF 6.- statt 8.- pro Stück",
          categoryId: "Nonfood",
          productDetails: "",
          itemUrl: "http://www.okpunktstrich.ch/de/",
          imageUrl: "https://s3.amazonaws.com/chatbotbackend/1Schirm.png",
          qrImageUrl: "https://s3.amazonaws.com/chatbotbackend/2050001768025.gif",
          pointOfSale: ["k kiosk", "Press & Books"],
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

export default seed;
