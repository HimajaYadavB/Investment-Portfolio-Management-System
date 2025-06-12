import { Request, Response } from 'express';
import sql from 'mssql';

export async function importPortfolios(req: Request, res: Response, pool: sql.ConnectionPool) {
  const {portfolios} = req.body; 

  try {
    const tvp = new sql.Table(); // Create a TVP
    tvp.columns.add('UserID', sql.Int);
    tvp.columns.add('PortfolioName', sql.VarChar(100));
    tvp.columns.add('PortfolioType', sql.VarChar(50));
    tvp.columns.add('DateCreated', sql.DateTime);

    portfolios.forEach((p: any) => {
      tvp.rows.add(p.UserID, p.PortfolioName, p.PortfolioType, new Date());
    });

    await pool.request()
      .input('PortfolioTVP', tvp)
      .execute('InsertPortfoliosBulk');

    res.status(201).json({ message: 'Bulk insert successful' });
  } catch (error) {
    console.error('Error importing portfolios:', error);
    res.status(500).json({ message: 'Error during bulk import', error });
  }
}
