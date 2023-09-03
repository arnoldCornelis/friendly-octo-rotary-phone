import { Router } from 'express';
import { productFSService } from '../services/productFSService.js';
import { productDBService } from '../services/productDBService.js';
import { uploader } from '../utils/multerUtil.js';

const router = Router();
//const ProductService = new productFSService('Products.json');
const ProductService = new productDBService();

router.get('/', async (req, res) => {
    const products = await ProductService.getAllProducts();

    res.send(products);
});

router.post('/', uploader.array('thumbnails', 3), async (req, res) => {

    if (req.files) {
        req.body.thumbnails = [];
        req.files.forEach((file) => {
            req.body.thumbnails.push(file.filename);
        });
    }

    const result = await ProductService.createProduct(req.body);

    res.send({
        message: result
    });
});

export default router;
