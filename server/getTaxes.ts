import { Request, Response } from 'express';
import sql from 'mssql';

export async function getTaxes(user: any, req: Request, res: Response, pool: sql.ConnectionPool) {
    const userID = user.UserID;

    try {
        const taxQuery = `
            SELECT 
                TaxType, 
                SUM(TaxAmount) AS TotalAmount,
                MAX(PaymentDate) AS LatestPaymentDate
            FROM TaxPayments 
            WHERE UserID = @userID 
            GROUP BY TaxType
        `;

        const taxRes = await pool.request()
            .input('userID', sql.Int, userID)
            .query(taxQuery);

        if (taxRes.recordset.length === 0) {
            return res.status(404).json({ message: 'User has not paid any tax' });
        }
        console.log("Taxes: ",taxRes.recordset);

        return res.status(200).json({ taxes: taxRes.recordset });

    } catch (error) {
        return res.status(500).json({ message: 'Error fetching taxes', error });
    }
}
