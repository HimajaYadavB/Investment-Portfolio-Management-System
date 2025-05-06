import { Request, Response } from 'express';
import sql from 'mssql';

export async function getPendingBrokers(res: Response, pool: sql.ConnectionPool) {
    try {
        const result = await pool.request()
            .query('SELECT * FROM Brokers WHERE IsApproved = 0');

        return res.status(200).json({ brokers: result.recordset });
    } catch (error) {
        console.error("Error fetching brokers:", error);
        res.status(500).json({ message: 'Error fetching brokers', error });
    }
}
