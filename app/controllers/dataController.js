//import got from 'got';
import got from 'got';

const readData = (ip) => {
    try {
        const response = await got('http://'+ip, { json: true });
        console.log(response.body.url);
        console.log(response.body.explanation);
      } catch (error) {
        console.log(error.response.body);
      }
};

export default {
    readData,
};