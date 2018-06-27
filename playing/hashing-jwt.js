const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

/**
 * ~~~~~~~~ HASHING PASSWORD ~~~~~~~ seni mengubah password
 * $ npm i bycryptjs --save
 * ~~~~~~ have 2 method
 * 1. genSalt()
 * 2. hash method 
 */

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log('HASIL HASHING PASSWORD');
var password = '123456qwerty';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash); // hasilnya selalu berubah
    });
});

var hashedPassword = '$2a$10$wzF1MsnuDZWQ.4UAzECKjuAjRH1l.zPx4fr1/TCLyeNK52BOTpuVC';
var hashedPassword2 = '$2a$10$u9HV4ERAJn5Jg3j5LMilo.6PKL/LYXJ9ANEz6DOZPZacW2Yx8dU7a';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log('~~~~~~ membandingkan password VS hashPass ~~~ hasile true');
    console.log(res);
});


bcrypt.compare('123', hashedPassword, (err, res) => {
    console.log('~~~~~ membandingkan BUKAN pass VS hash ~~~ hasile false');
    console.log(res);
});

bcrypt.compare(password, hashedPassword2, (err, res) => {
    console.log(res);
})