import { Request, Response } from 'express';
import sql from 'mssql';

export async function approveBroker(req:Request, res: Response, pool: sql.ConnectionPool) {
    const {brokerId} = req.body;
    try {
        await pool.request()
            .input('brokerId', sql.Int, brokerId)
            .query('UPDATE Brokers SET IsApproved = 1 WHERE BrokerID = @brokerId');

        res.status(200).json({ message: 'Broker approved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error approving broker', error });
    }
}