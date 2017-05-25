import config from './config';
const base64 = require('base-64');

module.exports.linkToServer = linkToServer;
module.exports.getToken = getToken;
module.exports.getCategories = getCategories;
module.exports.getProductList = getProductList;
module.exports.addCart = addCart;

function linkToServer(username,password,token) {  
  return fetch(config.API_ADDRESS + '/link-bl-to-user', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      BLToken:token
    })
  })
  .then(response => {
    if(response.status == 200) return true;
    return false;
  });
}

function getToken(username,password) {  
  const userPass = ''+username+':'+password+'';

  return fetch('https://api.bukalapak.com/v2/authenticate.json', {
    headers: {
      'Authorization': 'Basic '+base64.encode(userPass),
    },
    method: 'POST'
  })
  .then(response => {
    return response.json();
  })
  .then(result => {
    const uid = result.user_id;
    const tk = result.token;
    if( !uid || !tk ) throw 'getToken fail!';
    const token = ''+uid+':'+tk+'';
    return token;
  });
}

function getCategories(token) {  
  return fetch('https://api.bukalapak.com/v2/categories.json', {
    headers: {
      'Authorization': 'Basic '+base64.encode(token),
    },
    method: 'GET'
  })
  .then(response => {
    return response.json();
  })
  .then(result => {
    const cats = result.categories;
    if(!cats || cats.length == 0) throw "getCategories fail!!";
    const arr = [];
    for(let i=0;i<cats.length;i++) {
      const cat = cats[i];
      arr.push({id:cat.id,name:cat.name});
    }
    return arr;
  });
}

function getProductList(token,categoryId,searchTerm) {  
  const keywords = encodeURIComponent(searchTerm);
  let url = 'https://api.bukalapak.com/v2/products.json?keywords='+keywords;

  if( categoryId != 'all' )
    url = 'https://api.bukalapak.com/v2/products.json?category_id='+categoryId+'&keywords='+keywords;

  return fetch(url, {
    headers: {
      'Authorization': 'Basic '+base64.encode(token),
    },
    method: 'GET'
  })
  .then(response => {
    return response.json();
  })
  .then(result => {
    const prods = result.products;
    if(!prods || prods.length == 0) throw "getProductList fail!!";
    const arr = [];
    for(let i=0;i<prods.length;i++) {
      const prod = prods[i];
      arr.push({
        id:prod.id,
        name:prod.name,
        seller:prod.seller_name,
        price:prod.price,
        img:prod.small_images[0],
        num:1
      });
    }
    return arr;
  });
}

function addCart(token,productId) {  
  const url = 'https://api.bukalapak.com/v2/carts/add_product/'+productId+'.json';
  
  return fetch(url, {
    headers: {
      'Authorization': 'Basic '+base64.encode(token),
    },
    method: 'POST'
  })
  .then(response => {
    return response.json();
  })
  .then(result => {
    console.warn(JSON.stringify(result));
    const cartId = result.cart_id;
    return cartId;
  });
}