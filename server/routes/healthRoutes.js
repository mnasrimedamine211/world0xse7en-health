const express = require('express');
const router = express.Router();

router.route('/health')
    .get('', ()=>{console.log("Server is up and running")})