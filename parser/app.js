var needle = require('needle');
var cheerio = require('cheerio');
var cheerio2 = require('cheerio');
var trim = require('trim');
const mysql = require("mysql");
var arr = require('./words2.json');

let connection = null;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'english'
    });
}

var temp = arr;
for (let i = 0; i < arr.length; i++) {
    needle.get(`https://wooordhunt.ru/word/${arr[i].phrase}`, (err, res) => {
        let $ = cheerio.load(res.body);
        let $transcription = $('#us_tr_sound > .transcription');
        temp[i].transcription = $transcription.text();
        console.log(temp[i]);
    });
}

// // это стартовая урла для парсера (она же первая страница для парера)
// var startUrl = 'https://lardi-trans.com/ru/gruz/?foi=&filter_marker=new&countryfrom=UA&countryto=UA&areafrom=17&areato=23&cityFrom=&cityIdFrom=0&cityTo=&cityIdTo=&dateFrom=&dateTo=&bt_chbs_slc=&strictBodyTypes=on&mass=20&mass2=&value=&value2=&gabDl=&gabSh=&gabV=&zagruzFilterId=&adr=-1&showType=all&npredlFrom=all&sortByCountriesFirst=on&startSearch=%D0%A1%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C+%D0%B2%D1%8B%D0%B1%D0%BE%D1%80%D0%BA%D1%83&notFirstLoad=done&page=1&fi=28f45d64-88b7-4a9a-8280-d491df588046';
// // объявляем массив для хранения всех ссылок для парсинга
// var url = [];
//
// needle.get(startUrl, function (err, res){
//     // Передаём страницу в cheerio
//     var $ = cheerio.load(res.body);
//
//     // добавим в наш массив ссылку первой страницы
//     url.push(startUrl);
//     // считываем страницу, создаем дополнительный массив для хранения тегов, заносим в него
//     // все теги "а" родителем которых является класс ".gui_navigator",
//     // в этот массив попадут теги "а" от 2 стр до последней,
//     // если есть 10 стр то ее нужно добавить вручную
//     var arr = $('.gui_navigator a');
//     arr.each(function (i,val) {
//         if (parseInt($(val).text())>=2 || parseInt($(val).text())<=9)
//             url.push('https://lardi-trans.com/ru' + $(val).attr('href'));
//     });
//
//     // for (var i=0; i<url.length; i++){
//     //     console.log('#'+i+' | '+url[i]+'\n\n');
//     // }
//
//     // теперь когда у нас есть массив с ссылками, мы можем запустить цикл,
//     // который переберет все страницы и выдаст нужную нам информацию
//     // важно это делать через setTimeout, чтобы не полусить бан
//
//     function start(i, callback) {
//         callback(i);
//     }
//
//     function result(i) {
//         console.log('Делаем заход № '+i);
//         needle.get(url[i], function (err, res) {
//
//             //Передаём страницу в cheerio
//             var $ = cheerio.load(res.body);
//             var arr_product = $('.predlInfoRow .predlInfo:nth-child(8)');
//             var arr_sum = $('.predlInfoRow .predlInfo:nth-child(9)');
//             // arr.each(function (i, val) {
//             //    console.log($(val).attr('title'));
//             // });
//             for (var i = 0; i < arr_product.length; i++) {
//                 if (parseInt($(arr_sum[i]).text()) > 0) {
//                     console.log('Груз: ' + trim($(arr_product[i]).text()) + '\n' + 'Оплата: ' + trim($(arr_sum[i]).text()));
//                 }
//             }
//         });
//     }
//     for (var i=0; i<url.length; i++) {
//         start(i,result);
//     }
// });

//**************переделываю программу с использованием promises********************************************
// let parserStart = () => {
//     let startUrl = 'https://lardi-trans.com/trans/?foi=&filter_marker=new&countryfrom=UA&countryto=UA&areafrom=17&areato=23&cityFrom=&cityIdFrom=&cityTo=&cityIdTo=&dateFrom=&dateTo=&bt_chbs_slc=&mass=&mass2=&value=&value2=&gabDl=&gabSh=&gabV=&zagruzFilterId=&adr=-1&npredlFrom=all&sortByCountriesFirst=on&startSearch=%D0%A1%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C+%D0%B2%D1%8B%D0%B1%D0%BE%D1%80%D0%BA%D1%83&notFirstLoad=done&page=1&fi=6f65cb10-c932-46da-ab2d-cf4d1ce1aabc';
//     return new Promise((resolve, reject) => {
//         let url = [];
//         needle.get(startUrl, (err, res) => {
//             let $ = cheerio.load(res.body);
//             url.push(startUrl);
//             let arr = $('.gui_navigator a');
//             arr.each((i,val) => {
//                 if (parseInt($(val).text())>=2 || parseInt($(val).text())<=9)
//                     url.push('https://lardi-trans.com' + $(val).attr('href'));
//             });
//             if (url.length>0) resolve(url);
//             else reject('По какой-то причине писок страниц не сформерован!');
//         });
//     });
// };


// let result = (url) => {
//     url.forEach((val, i) => {
//         needle.get(val, (err, res) => {
//             console.log(`Парсим ссылку № ${i}: ${val}`);
//             let $ = cheerio.load(res.body);
//             let $arr_product = $('.predlInfoRow .predlInfo:nth-child(8)');
//             let $arr_sum = $('.predlInfoRow .predlInfo:nth-child(9)');
//             $arr_product.each((i,val) => {
//                 if (parseInt($(arr_sum[i]).text()) > 0) {
//                     console.log(`Груз: ${trim($(val).text())} | Оплата: ${trim($($arr_sum[i]).text())}`);
//                 }
//             });
//         });
//     });
// needle.get('http://englishstyle.net/grammar/verb/irregular-verbs/', (err, res) => {
//     let $ = cheerio.load(res.body);
//     let $arr_infinitive = $('tbody tr td:nth-child(1) strong');
//     let $arr_t1 = $('tbody tr td:nth-child(2)');
//     let $arr_tense = $('tbody tr td:nth-child(3) strong');
//     let $arr_t2 = $('tbody tr td:nth-child(4)');
//     let $arr_participle = $('tbody tr td:nth-child(5) strong');
//     let $arr_t3 = $('tbody tr td:nth-child(6)');
//     let $arr_translate = $('tbody tr td:nth-child(7)');
//     // $arr_infinitive.each((i, val) => {
//     //     console.log(`infinitive: ${trim($(val).text())}, t1: ${trim($(val).text())}`);
//     // });
//     for (let i = 0; i < $arr_infinitive.length; i++) {
//         // console.log(`${trim($($arr_infinitive[i]).text())}${trim($($arr_t1[i]).text())}, ${trim($($arr_tense[i]).text())}${trim($($arr_t2[i]).text())}, ${trim($($arr_participle[i]).text())}${trim($($arr_t3[i]).text())}, ${trim($($arr_translate[i]).text())},`);
//         let query = "INSERT INTO `irregular_verbs` (`id`, `infinitive`, `t1`, `past_simple`, `t2`, `past_participle`, `t3`, `translate`) VALUES (NULL,'" + trim($($arr_infinitive[i]).text()) + "','" + trim($($arr_t1[i]).text()) + "','" + trim($($arr_tense[i]).text()) + "','" + trim($($arr_t2[i]).text()) + "','" + trim($($arr_participle[i]).text()) + "','" + trim($($arr_t3[i]).text()) + "','" + trim($($arr_translate[i]).text()) + "')";
//         connection.query(query, function (error, data, fields) {
//             if (error) throw error;
//             console.log("запись ок " + i);
//             // res.json(req.body);
//         });
//     }
// });

// needle.get('https://student.friendsclub.com.ua/study/', (err, res) => {
//     let $ = cheerio.load(res.body);
//     let $arr_eng = $('.modalRoot');
//     console.log($arr_eng.length);
//     for (let i = 0; i < $arr_eng.length; i++) {
//         console.log(`${trim($($arr_eng[i]).text())}`);
//         // let query = "INSERT INTO `irregular_verbs` (`id`, `infinitive`, `t1`, `past_simple`, `t2`, `past_participle`, `t3`, `translate`) VALUES (NULL,'" + trim($($arr_infinitive[i]).text()) + "','" + trim($($arr_t1[i]).text()) + "','" + trim($($arr_tense[i]).text()) + "','" + trim($($arr_t2[i]).text()) + "','" + trim($($arr_participle[i]).text()) + "','" + trim($($arr_t3[i]).text()) + "','" + trim($($arr_translate[i]).text()) + "')";
//         // connection.query(query, function (error, data, fields) {
//         //     if (error) throw error;
//         //     console.log("запись ок " + i);
//         //     // res.json(req.body);
//         // });
//     }
// });




        // let parser = function(){
        //     let promise = new Promise(function (resolve, reject) {
        //         let data = [];
        //         needle.get(url[i], function (err, res) {
        //             console.log('Парсим страницу №' + i);
        //             let $ = cheerio.load(res.body);
        //             let arr_product = $('.predlInfoRow .predlInfo:nth-child(8)');
        //             let arr_sum = $('.predlInfoRow .predlInfo:nth-child(9)');
        //             for (let i = 0; i < arr_product.length; i++) {
        //                 if (parseInt($(arr_sum[i]).text()) > 0) {
        //                     data.push(`Груз: ${trim($(arr_product[i]).text())} | Оплата: ${trim($(arr_sum[i]).text())}`);
        //                 }
        //                 // else console.log('На данной странице нет предложений с ценой');
        //             }
        //         });
        //         (data.length > 0) ? resolve(data) : reject(`На странице № ${i} нет предложений с ценой!`)
        //     });
        //     return promise;
        // };
        // let result = (data) => {
        //     console.info('data ok');
        //     return new Promise(function (resolve, reject){
        //         setTimeout(() => resolve(data), 2000);
        //     });
        // };
        // parser()
        //     .this(result)
        //     .catch((error) => console.error(error));
// };

// parserStart()
//     .then(result)
//     .catch((error)=>console.log(error));

