import { Request, Response } from 'express';
import sql from 'mssql';

export async function approveAsset(req:Request, res: Response, pool: sql.ConnectionPool) {
    const {assetId} = req.body;
    try {
        await pool.request()
            .input('assetId', sql.Int, assetId)
            .query('UPDATE Assets SET IsApproved = 1 WHERE AssetID = @assetId');

        res.status(200).json({ message: 'Asset approved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error approving asset', error });
    }
}