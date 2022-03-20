import got from 'got';

got.get('http://192.168.137.57', {responseType: 'json'})
  .then(res => {
  
    console.log('Status Code:', res.statusCode);
    console.log(res.body);

   
   
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });