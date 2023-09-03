import { Router } from 'express';
import { productFSService } from '../services/productFSService.js';

const router = Router();
const ProductService = new productFSService('Products.json');

router.get('/', (req, res) => {
    res.render(
        'index',
        {
            title: 'CoderHouse',
            style: 'index.css',
            products: ProductService.getAllProducts()
        }
    )
});

export default router;