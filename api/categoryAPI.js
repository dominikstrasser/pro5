var router = require("express").Router();
var categoryModel = require("./../database/model/category.js");


function categoryDAO(){

    this.getCategories = function(req, res) {
        console.log("roomAPI - getCategories");
        categoryModel.find(function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.getCategory = function(req, res) {
        console.log("roomAPI - getCategory");
        categoryModel.findById(req.params._id,function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.postCategory = function(req, res) {
        console.log("roomAPI - postCategory");
        var room = new categoryModel(req.body);
        room.save(function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.putCategory = function(req, res) {
        console.log("roomAPI - putCategory");
        categoryModel.findOneAndUpdate({"_id" : req.params._id}, req.body, function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.deleteCategory = function(req, res) {
        console.log("roomAPI - deleteCategory");
        categoryModel.remove({"_id" : req.params._id},function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

}

var categoryDAO = new categoryDAO();

//Exact Routes before Parameterized routes!

//extra routes

//typical CRUD
router.post("/",categoryDAO.postCategory);
router.get("/",categoryDAO.getCategories);
router.get("/:_id",categoryDAO.getCategory);
router.put("/:_id",categoryDAO.putCategory);
router.delete("/:_id",categoryDAO.deleteCategory);

module.exports = router;
