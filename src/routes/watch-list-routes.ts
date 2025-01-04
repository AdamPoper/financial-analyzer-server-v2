import Express from 'express';
import watchListController from '../controllers/watch-list-controller';

const router = Express.Router();

router.post('/add', watchListController.addWatchList);
router.post('/add-entry', watchListController.addWatchListEntry);
router.get('/get/:userId', watchListController.getWatchLists);
router.get('/get-entries/:watchListId', watchListController.getWatchListEntries);
router.delete('/delete/:watchListId', watchListController.deleteWatchList);
router.delete('/delete-entry/:watchListEntryId/', watchListController.removeWatchListEntry);

export default router;