import { Request, Response } from 'express';
import sql from 'mssql';

export async function getBrokers(res: Response, pool: sql.ConnectionPool) {
    try{
        console.log("Fetching brokers")

        const result = await pool.request()
            .query('SELECT * from Brokers');

        console.log("Brokers:",result.recordset)
        return res.status(200).json({brokers: result.recordset});
    }
    catch (error) {
        console.error("Error fetching broker details:", error);
         res.status(500).json({ message: 'Error fetching broker details', error });
        
    }
}