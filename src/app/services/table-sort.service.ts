import { Injectable } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class TableSortService {

  /**
   * Applies sorting to the provided data source based on the given column and current direction.
   */
  applyCustomSort<T>(
    dataSource: MatTableDataSource<T>,
    sort: MatSort,
    column: string,
    currentColumn:string,
    currentDirection: 'asc' | 'desc'
  ):  { newDirection: 'asc' | 'desc'; newColumn: string }  {

    let nextDirection: 'asc' | 'desc' = 'asc';

  // If the same column is clicked again, toggle direction
  if (column === currentColumn) {
    nextDirection = currentDirection === 'asc' ? 'desc' : 'asc';
  }

    sort.active = column;
    sort.direction = nextDirection;

    // Optional customization
    //dataSource.sortingDataAccessor = (item: T, property: string) => item[property as keyof T];

    // Manually trigger sort and reassign data to refresh view
    sort.sortChange.emit({ active: column, direction: nextDirection });
    dataSource.data = [...dataSource.data];

    return {newDirection:nextDirection, newColumn:column};
  }

  /**
   * Returns the appropriate sort icon for the given column.
   */
  getSortIcon(column: string, currentColumn: string, currentDirection: 'asc' | 'desc'): string {
    if (column !== currentColumn) {
      return 'swap_vert'; // default
    }

    return currentDirection === 'asc' ? 'arrow_upward' :
           currentDirection === 'desc' ? 'arrow_downward' :
           'swap_vert';
  }
}
