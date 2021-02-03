const db = require("../models")
const express = require('express');
const moment = require('moment')
const dbConfig = require ('../config/config.json')
const router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize(dbConfig.development);
const { QueryTypes } = require('sequelize');
const Course = db.Course
const Blog = db.Blog
const User = db.User
const Enroll = db.Enroll
blog_count_query = `SELECT count(*) as count FROM blogs`;
book_count_query = `SELECT count(*) as count FROM books`;
course_count_query = `SELECT count(*) as count FROM courses`;
user_count_query = `SELECT count(*) as count FROM profileinfos`;
weekly_sales_query = `SELECT SUM(fees) as weekly_sale FROM courses WHERE createdAt >= DATE(NOW()) - INTERVAL 7 DAY ORDER BY createdAt DESC`;
subscriptions_query = `SELECT count(*) as count , DATE_FORMAT(createdAt,"%m/%Y") as Month FROM enrolls where createdAt >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) group by Month`
monthly_sales_query = `SELECT SUM(fees) AS monthlysale, DATE_FORMAT(createdAt,"%m/%Y") as Month FROM courses WHERE createdAt >= DATE(NOW()) - INTERVAL 6 MONTH GROUP BY Month ORDER BY createdAt DESC`;

const pastWeek = [...new Array(6)].map((i, idx) => moment().endOf("month").subtract(idx, "months").format("MM/YYYY"));

router.get('/subscriptions/month', async function (req, res) {
    await sequelize.query(subscriptions_query, {model: Enroll,type: QueryTypes.SELECT, raw: true})
  .then(async function(actions) {
    actions_response = mergeData(pastWeek, actions);
    var ReverseArray = [];
    var length = actions_response.length;
    for(var i = length-1;i>=0;i--){
        ReverseArray.push(actions_response[i]);
    }
    await res.send(ReverseArray)
  });
});

router.get('/monthly-sales', async function (req, res) {
    await sequelize.query(monthly_sales_query, {model: Enroll,type: QueryTypes.SELECT, raw: true})
  .then(async function(actions) {
    actions_response = mergeData(pastWeek, actions);
    var ReverseArray = [];
    var length = actions_response.length;
    for(var i = length-1;i>=0;i--){
        ReverseArray.push(actions_response[i]);
    }
    await res.send(ReverseArray)
  });
});

router.get('/weekly-sales', async function (req, res) {
    await sequelize.query(weekly_sales_query, {model: Enroll,type: QueryTypes.SELECT, raw: true})
  .then(async function(actions) {
    actions_response = mergeData(pastWeek, actions);
    var ReverseArray = [];
    var length = actions_response.length;
    for(var i = length-1;i>=0;i--){
        ReverseArray.push(actions_response[i]);
    }
    await res.send(ReverseArray)
  });
});
router.get('/blogs-count', async function (req, res) {
    await sequelize.query(blog_count_query, {model: Blog,type: QueryTypes.SELECT, raw: true})
  .then(async function(actions) {
    await res.send(actions)
  });
});
router.get('/books-count', async function (req, res) {
    await sequelize.query(book_count_query, {model: Blog,type: QueryTypes.SELECT, raw: true})
  .then(async function(actions) {
    await res.send(actions)
  });
});

router.get('/users-count', async function (req, res) {
    await sequelize.query(user_count_query, {model: Blog,type: QueryTypes.SELECT, raw: true})
  .then(async function(actions) {
    await res.send(actions)
  });
});
router.get('/courses-count', async function (req, res) {
    await sequelize.query(course_count_query, {model: Blog,type: QueryTypes.SELECT, raw: true})
  .then(async function(actions) {
    await res.send(actions)
  });
});
function mergeData(monthsArray,actionsArray){
    let arr_new_data = [];
    for (i=0; i < monthsArray.length; i++) 
    {
      let is_day_found = false;
      let j = 0;
      while (j < actionsArray.length && !is_day_found) 
      {
        if (actionsArray[j].Month == monthsArray[i]) 
        {
          arr_new_data.push(actionsArray[j]);
          is_day_found = true;
        }
        j++;
      }
        if (!is_day_found) {
          arr_new_data.push({
          Month:monthsArray[i],
          count:0
        });
        }
    }
    return arr_new_data;
  }

  module.exports = router;