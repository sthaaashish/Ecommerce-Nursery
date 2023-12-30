const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');
const checkUser = require('../MiddleWare/authCheck');
const checkFile = require('../MiddleWare/fileCheck');

router.get('/', productController.getAllProduct);

router.get('/product/:id', productController.getProductById);

router.get('/productCollection/:collection', productController.getProductByCollection);
router.get('/productCategory/:category', productController.getProductByCategory);
router.post('/api/create-product', checkUser.adminCheck,checkFile.fileCheck,productController.createProduct)
router.patch('/api/update-product/:id', checkUser.adminCheck,checkFile.updateCheck,productController.updateProduct)
router.delete('/api/delete-product/:id',checkUser.adminCheck,productController.deleteProduct)
router.patch('/api/review-product/:id',checkUser.userCheck, productController.PostReview)
router.get('/api/search-product/:keyword', productController.searchProducts)



module.exports = router;
