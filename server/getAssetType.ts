import { Request, Response } from 'express';
import sql from 'mssql';

export async function getAssetType(res: Response, pool: sql.ConnectionPool) {
    try{
        console.log("Fetching asset types")

        const result = await pool.request()
            .query('SELECT AssetType from AssetTypes');

        console.log("Asset types:",result.recordset)
        return res.status(200).json({assetTypes: result.recordset});
    }
    catch (error) {
        console.error("Error fetching user details:", error);
         res.status(500).json({ message: 'Error fetching asset types', error });
        
    }
}