/**
 * JSON WEB TOKEN
 * ~~~~~~~~~~~~~~ install npm cypto-js
 * $ npm i crypto-js --save
 * 
 */

const {SHA256} = require('crypto-js');

var pesan = 'Saya adalah hehehe';
var hash = SHA256(pesan).toString();

console.log(`Pesan : ${pesan}`);
console.log(`Hash : ${hash}`);
console.log('Angka 3 : '+ SHA256('3').toString());

var data = {
    id : 4
};

var token = {
    data,
    hash: SHA256(JSON.stringify(data)+ 'some').toString()
}

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

var hasilHash = SHA256(JSON.stringify(token.data) + 'some').toString();

console.log(hasilHash);
console.log(token.hash);

if (hasilHash === token.hash){
    console.log('data tidak berubah');
} else {
    console.log('data berubah. jangan percaya~!');
}

/***
 * 8-3
 * SAMPAI VIDEO @10.44
 */