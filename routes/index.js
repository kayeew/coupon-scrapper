// index.js

var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');

let kfc_coupons = [];
let kfc_coupons_price = [];
let kfc_coupons_img = [];
let kfc_counter = 0; 

let carlsjr_coupons = [];
let carlsjr_counter = 0;

let wendys_coupons = [];
let wendys_counter = 0;

let bk_coupons = [];


// =============================================================
// KFC
// =============================================================
axios.get('https://www.kfc.co.nz/coupons/').then((response) => {
  // Load the web page source code into a cheerio instance
  const $ = cheerio.load(response.data);
  const couponElems = $('.coupon-details');
  const imageElems = $('.coupon-details').children('img');
  
  // loop through all the elements found
  for (let i = 0; i < couponElems.length; i++) {
    let data1 = $(couponElems[i]);
    let data2 = $(imageElems[i]);

    // proceed if the element exists
    if (data1) {
      kfc_counter++;
      let deal = $(data1).text(); // get deal description
      kfc_coupons.push(deal);
    }

    if (data2) {
      let deal_img = $(data2).attr('src'); // get img link
      let deal_img_url = "https://www.kfc.co.nz" + deal_img; 
      kfc_coupons_img.push(deal_img_url);
    }
  }
});

// =============================================================
// Carl's' Jr
// =============================================================
axios.get('https://www.carlsjr.co.nz/chargrilled-burger-deals/').then((response) => {
  // Load the web page source code into a cheerio instance
  const $ = cheerio.load(response.data);
  const carlsjr = $('.ContentPadding').children('div').children('img');

  // loop through all the elements found
  for (let i = 0; i < carlsjr.length; i++) {
    let carlsjr_element = $(carlsjr[i]);

    if (carlsjr_element) {
      carlsjr_counter++;
      let carlsjr_deal = $(carlsjr_element).attr('src'); // get img link
      let carlsjr_deal_url = "https://www.carlsjr.co.nz" + carlsjr_deal; 
      carlsjr_coupons.push(carlsjr_deal_url);
    }
  }
});

// =============================================================
// Wendys
// =============================================================
axios.get('https://www.wendys.co.nz/news').then((response) => {
  // Load the web page source code into a cheerio instance
  const $ = cheerio.load(response.data);
  const wendys = $('.a-slideshow-image').children('a').children('img');

  // loop through all the elements found
  for (let i = 0; i < wendys.length; i++) {
    let wendys_element = $(wendys[i]);

    if (wendys_element) {
      wendys_counter++;
      let wendys_deal = $(wendys_element).attr('src'); // get img link
      let wendys_deal_url = "https://www.wendys.co.nz" + wendys_deal; 
      wendys_coupons.push(wendys_deal_url);
    }
  }
});

// =============================================================
// Burger King
// =============================================================
axios.get('https://burgerking.co.nz/offers').then((response) => {
  // Load the web page source code into a cheerio instance
  const $ = cheerio.load(response.data);
  const bk = $('.mainImage').children('a');

  // loop through all the elements found
  for (let i = 0; i < bk.length; i++) {
    let bk_element = $(bk[i]);

    if (bk_element) {
      let bk_deal = $(bk_element).attr('href'); // get pdf link
      bk_coupons.push(bk_deal);
    }
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getcoupon', function(req, res, next) {

    res.render('index', {
      kfc_counter: kfc_counter,
      kfc_coupons: kfc_coupons,
      kfc_coupons_price: kfc_coupons_price,
      kfc_coupons_img: kfc_coupons_img,
      carlsjr_counter: carlsjr_counter,
      carlsjr_coupons: carlsjr_coupons,
      wendys_counter: wendys_counter,
      wendys_coupons: wendys_coupons,
      bk_coupons: bk_coupons
    });
});

module.exports = router;
