const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

/**
 * jwt.sign     --- asiggn return token value
 * jwt.verify   --- token and secret
 */

var data = {
    id: 18
};
/// id - id
/// iat - issues at timestamp???

var token = jwt.sign(data, "123abdf");
console.log(`TOKEN : ${token}`);

var decoded = jwt.verify(token, "123abdf");
var a = JSON.stringify(decoded);
console.log(`DECODE : ${a}`);
console.log(decoded);

/**
 * ~~~~~~~~~~ TOKEN pada JWT ~~~~~ terdiri 3 bagian ~~~~~~
 * 
 * ~~~ pemisah bagian token ini menggunakan tanda . (titik)
 * xxxxx. 1. Header   : berisi algoritme dan tipe token
 * yyyyy. 2. Payload  : berisi data
 * zzzzz. 3. Verify Signature
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * xxxxx.yyyyy.zzzzz
 */

//console.log('testing JWT');
