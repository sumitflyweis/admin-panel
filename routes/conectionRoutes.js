const router = require('express').Router();
const express = require("express");


// const Conection = require('../controllers/connectionController');
const Conection = require('../controllers/conectionController');
const conection = require('../models/conection');

// creating user

// login user

router.post('/follow', Conection.Follow)
router.get('/activefollowing/:id', Conection.GetAllActiveFollowing)
router.get('/pendingfollowing/:id', Conection.GetAllPendingFollowing)
router.get('/activefollow/:id', Conection.GetAllActiveFollow)
router.get('/pendingfollow/:id', Conection.GetAllPendingFollow)
router.delete('/unfollow/:id', Conection.Unfollow)
router.get('/acceptfollowing/:id', Conection.AcceptFollowingRequest)
router.get('/acceptfollowing/:id', Conection.AcceptFollowingRequest)
router.get('/acceptfollowing/:id', Conection.AcceptFollowingRequest)




module.exports = router;