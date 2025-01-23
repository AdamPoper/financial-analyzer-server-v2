import { Persistence } from '../persistence/persistence';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { WatchList, WATCH_LIST_TABLE, WatchListQueries } from '../entity/watch-list';
import { WATCH_LIST_ENTRY_TABLE, WatchListEntry, WatchListEntryModel, WatchListEntryQueries } from '../entity/watch-list-entry';

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

const getWatchLists = async (req: Request, res: Response) => {
    const userId = req.query.userId;
    if (!userId) {
        res.status(400).json({message: 'No user id provided'});
        return;
    }

    const watchLists = await Persistence.selectEntitiesByNamedQuery<WatchList>(WatchListQueries.GET_WATCH_LISTS_BY_USER_ID, [userId]);
    res.status(200).json(watchLists);
}

const deleteWatchList = async (req: Request, res: Response) => {
    const {watchListId} = req.params;
    if (!watchListId) {
        res.status(400).json({message: 'No watch list id provided'});
        return;
    }

    const watchList = await Persistence.selectEntityById<WatchList>(WATCH_LIST_TABLE, parseInt(watchListId));
    if (!watchList) {
        res.status(404).json({message: 'Watch list not found'});
        return;
    }

    const entries = await Persistence.selectEntitiesByNamedQuery(WatchListEntryQueries.GET_WATCH_LIST_ENTRIES_BY_WATCH_LIST_ID, [watchListId]);
    entries.forEach(async entry => await Persistence.deleteEntity(WATCH_LIST_ENTRY_TABLE, entry.id));

    Persistence.deleteEntity(WATCH_LIST_TABLE, watchListId)
        .then(() => res.status(200).json({message: `Watch list ${watchList.name} deleted`}))
        .catch(() => res.status(500).json({message: 'Error deleting watch list'}));
}

const addWatchListEntry = async (req: Request, res: Response) => {
    const model = req.body as WatchListEntryModel;
    if (!model.watchListId) {
        res.status(400).json({message: 'No watch list id provided'});
        return;
    }

    const existingEntry = await Persistence.selectEntityByNamedQuery(WatchListEntryQueries.GET_WATCH_LIST_ENTRY_BY_WATCH_LIST_ID_AND_SYMBOL, [model.watchListId, model.symbol]);
    if (existingEntry) {
        res.status(400).json({message: 'Watch list entry already exists'});
        return;
    }

    const entry = {
        watch_list_id: model.watchListId,
        symbol: model.symbol
    } as WatchListEntry;

    Persistence.persistEntity(WATCH_LIST_ENTRY_TABLE, entry)
        .then(() => res.status(200).json({message: 'Watch list entry added'}))
        .catch(() => res.status(500).json({message: 'Error saving watch list entry'}));
}

const removeWatchListEntry = async (req: Request, res: Response) => {
    const {watchListEntryId} = req.params;

    if (!watchListEntryId) {
        res.status(400).json({message: 'No watch list entry id provided'});
        return;
    }

    Persistence.deleteEntity(WATCH_LIST_ENTRY_TABLE, watchListEntryId)
        .then(() => res.status(200).json({message: 'Watch list entry deleted'}))
        .catch(() => res.status(500).json({message: 'Error deleting watch list entry'}));
}

const getWatchListEntries = async (req: Request, res: Response) => {
    const {watchListId} = req.params;
    if (!watchListId) {
        res.status(400).json({message: 'No watch list id provided'});
        return;
    }

    Persistence.selectEntitiesByNamedQuery(WatchListEntryQueries.GET_WATCH_LIST_ENTRIES_BY_WATCH_LIST_ID, [watchListId])
        .then(entries => res.status(200).json(entries))
        .catch(() => res.status(500).json({message: 'Error getting watch list entries'}));
}

export default {addWatchList, getWatchLists, getWatchListEntries, deleteWatchList, addWatchListEntry, removeWatchListEntry};