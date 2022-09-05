import {GridApi, Column, ColDef, RowNode, ColumnApi} from 'ag-grid-community';

interface ICellRendererComp {
    // Optional - Params for rendering. The same params that are passed to the cellRenderer function.
    init?(params: ICellRendererParams): void;

    // Mandatory - Return the DOM element of the component, this is what the grid puts into the cell
    getGui(): HTMLElement;

    // Optional - Gets called once by grid after rendering is finished - if your renderer needs to do any cleanup,
    // do it here
    destroy?(): void;

    // Mandatory - Get the cell to refresh. Return true if the refresh succeeded, otherwise return false.
    // If you return false, the grid will remove the component from the DOM and create
    // a new component in it's place with the new values.
    refresh(params: any): boolean;
}

interface ICellRendererParams {
    value: any; // value to be rendered
    valueFormatted: any; // value to be rendered formatted
    getValue: () => any; // convenience function to get most recent up to date value
    setValue: (value: any) => void; // convenience to set the value
    formatValue: (value: any) => any; // convenience to format a value using the columns formatter
    data: any; // the rows data
    node: RowNode; // row rows row node
    colDef: ColDef; // the cells column definition
    column: Column; // the cells column
    rowIndex: number; // the current index of the row (this changes after filter and sort)
    api: GridApi; // the grid API
    eGridCell: HTMLElement; // the grid's cell, a DOM div element
    eParentOfValue: HTMLElement; // the parent DOM item for the cell renderer, same as eGridCell unless using checkbox selection
    columnApi: ColumnApi; // grid column API
    context: any; // the grid's context
    refreshCell: () => void; // convenience function to refresh the cell
}
