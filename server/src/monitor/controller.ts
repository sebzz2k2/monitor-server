import { Request, Response } from 'express';
import { createNewMonitor, deleteMonitorById, findUniqueMonitor, getAllMonitorsByUserId, updateMonitorById } from './service';
const logger = require('../../../logger/logger')

export const getAllMonitors = async (req: Request, res: Response) => {
    const { user } = req.body;
    logger.debug(user)
    const monitors = await getAllMonitorsByUserId(parseInt(user.id));
    logger.debug(monitors)
    if (!monitors) {
        return res.status(500).json({ error: 'something went wrong' });
    }
    return res.status(200).json({ monitors });

}
export const getMonitorById = async (req: Request, res: Response) => {
    const { id } = req.params;
    logger.debug(id)
    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }
    const monitor = await findUniqueMonitor(parseInt(id));
    logger.debug(monitor)
    if (!monitor) {
        return res.status(404).json({ error: 'monitor not found' });
    }
    return res.status(200).json({ monitor });
}
export const createMonitor = async (req: Request, res: Response) => {
    const { name, url, interval, user } = req.body;
    logger.debug(user)
    logger.debug(name)
    logger.debug(url)
    logger.debug(interval)

    if (!name) {
        return res.status(400).json({ error: 'name is required' });
    }
    if (!url) {
        return res.status(400).json({ error: 'url is required' });
    }
    if (!interval) {
        return res.status(400).json({ error: 'interval is required' });
    }
    const monitor = await createNewMonitor(name, url, interval, user.id);
    logger.debug(monitor)
    if (!monitor) {
        return res.status(500).json({ error: 'something went wrong' });
    }
    return res.status(200).json({ message: "monitor created successfully" })
}
export const updateMonitor = async (req: Request, res: Response) => {
    const { name, url, interval } = req.body;
    const { id } = req.params;
    logger.debug(id)
    logger.debug(name)
    logger.debug(url)
    logger.debug(interval)

    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }
    if (!name) {
        return res.status(400).json({ error: 'name is required' });
    }
    if (!url) {
        return res.status(400).json({ error: 'url is required' });
    }
    if (!interval) {
        return res.status(400).json({ error: 'interval is required' });
    }
    const monitor = await updateMonitorById(parseInt(id), name, url, interval);
    logger.debug(monitor)
    if (!monitor) {
        return res.status(500).json({ error: 'something went wrong' });
    }
    return res.status(200).json({ message: "monitor updated successfully" })

}
export const deleteMonitor = async (req: Request, res: Response) => {
    const { id } = req.params;
    logger.debug(id)
    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }
    const monitor = await deleteMonitorById(parseInt(id));
    logger.debug(monitor)
    if (!monitor) {
        return res.status(500).json({ error: 'something went wrong' });
    }
    return res.status(200).json({ message: "monitor deleted successfully" })
}




