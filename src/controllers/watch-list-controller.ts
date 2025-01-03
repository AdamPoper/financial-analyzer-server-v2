import { Persistence } from '../persistence/persistence';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { WatchList, WATCH_LIST_TABLE, WatchListQueries } from '../entity/watch-list';
import { watch } from 'fs';

dotenv.config();

const addWatchList = async (req: Request, res: Response) => {
    const watchList = req.body as WatchList;
    const existingWatchList = await Persistence
        .selectEntityByNamedQuery<WatchList>(WatchListQueries.GET_WATCH_LIST_BY_NAME_AND_USER_ID, [watchList.name, watchList.user_id]);
    if (existingWatchList != null) {
        res.status(400).json({message: 'Watch list with name ' + watchList.name + ' already exists'});
        return;
    }

    Persistence.persistEntity<WatchList>(WATCH_LIST_TABLE, watchList)
        .then(() => res.status(200).json({message: `Watch list ${watchList.name} added`}))
        .catch(() => res.status(500).json({message: 'Error saving watch list'}));
}

export default {addWatchList};