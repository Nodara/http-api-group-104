const http = require('http');

const PORT = 3001;

const store = [
  {
    title: 'Apple',
    price: 200,
    amount: 5,
    isDeleted: false,
  },
  {
    title: 'Orange',
    price: 350,
    amount: 2,
    isDeleted: false,
  },
  {
    title: 'Watermelon',
    price: 100,
    amount: 10,
    isDeleted: false,
  }
]


const server = http.createServer((req, res) => {
  // send cookies
  // res.setHeader('Set-Cookie', 'userId=1');
  // res.end();

  // redirect
  // res.statusCode = 301;
  // res.setHeader('Location', 'https://stackoverflow.com/questions/35222934/sequelize-js-how-to-handle-reconnection-with-mysql' );
  // res.end();

  // res.setHeader('Content-Type', 'text/json');
  // res.write(JSON.stringify(tag));
  // res.end();

  // read
  // create
  // update
  // delete

  const { method, url  } = req;

  if(method === 'GET') { 
    const products = store.filter((pr) => !pr.isDeleted);

    res.setHeader('Content-Type', 'text/json')
    res.write(JSON.stringify(products));

    return res.end();
  } 


  if(method === 'POST') { 
    const body = [];

    req.on('data', (data) => {
      body.push(data);
    });

    req.on('end', () => {
      const { title, price, amount } = JSON.parse(body.toString());

      const productInStore = store.find((product) => product.title === title);

      if(!productInStore){
        store.push({ title, price: +price, amount: +amount, isDeleted: false });
        res.statusCode = 201;
        return res.end();
      }

      if(+productInStore.price === +price){
        productInStore.amount += +amount;
        res.statusCode = 200;
        return res.end();
      }

      res.statusCode = 300;
      res.write('PRODUCT_ALREADY_EXIST');
      return res.end();
    });
  } 
  

  // TODO: implement product update functionality
  if(method === 'PUT') { 

  } 
  

  if(method === 'DELETE') { 
    const productTitle = url.split('/')[1];

    const productInStore = store.find((product) => product.title === productTitle);

    if(!productInStore) { 
      res.statusCode = 404;
      res.write('PRODUCT_NOT_FOUND');
      return res.end();
    };

    productInStore.isDeleted = true;

    return res.end();
  } 
});

server.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`)
})