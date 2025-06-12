import { Request, Response } from 'express';
import sql from 'mssql';

export async function rejectAsset(req: Request, res: Response, pool: sql.ConnectionPool) {
    const { assetId } = req.body;
    console.log('Received assetId for rejection:', assetId);
    try {
        await pool.request()
            .input('assetId', sql.Int, assetId)
            .query('DELETE FROM Assets WHERE AssetID = @assetId');

        res.status(200).json({ message: 'Asset rejected and deleted' });
    } catch (error:any) {
        console.error('SQL Error Details:', error); // ✅ log exact SQL error
        res.status(500).json({ message: 'Error rejecting asset', error: error.message || error });    }
}