import { Request, Response } from 'express';
import sql from 'mssql';

export async function rejectBroker(req: Request, res: Response, pool: sql.ConnectionPool) {
    const { brokerId } = req.body;
    console.log('Received brokerId for rejection:', brokerId);
    try {
        await pool.request()
            .input('brokerId', sql.Int, brokerId)
            .query('DELETE FROM Brokers WHERE BrokerID = @brokerId');

        res.status(200).json({ message: 'Broker rejected and deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting broker', error });
    }
}