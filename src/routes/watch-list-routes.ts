import Express from 'express';
import watchListController from '../controllers/watch-list-controller';

const router = Express.Router();

router.post('/add', watchListController.addWatchList);

export default router;