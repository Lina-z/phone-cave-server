const router = require("express").Router();
const mongoose = require("mongoose");
const Phone = require("../models/Phone.model")

// GET /api/phones -  Retrieves all of the phones
router.get("/phones", (req, res, next) => {
    Phone.find()
      .then((response) => {
        console.log(response);
        res.json(response);
      })
      .catch((err) => {
        console.log("error getting list of phones", err);
        res.status(500).json({
          message: "error getting list of phones",
          error: err,
        });
      });
  });

//  GET /api/phones/:phoneId  -  Get details of a specific phone by id
router.get("/phones/:phoneId", (req, res, next) => {
    const { phoneId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(phoneId)) {
      res.status(400).json({ message: "Specified ID is not valid" });
      return;
    }
  
    Phone.findById(phoneId)
      .populate("reviews") 
      .then((phone) => res.json(phone))
      .catch((err) => {
        console.log("error getting details of a phone", err);
        res.status(500).json({
          message: "error getting details of a phone",
          error: err,
        });
      });
  });

  module.exports = router;

