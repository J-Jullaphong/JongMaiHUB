declare type GetColumnsAndPathsOptions<T> = {
    getParent: (item: T) => T | undefined;
    getChildren: (item: T) => readonly T[] | undefined;
};
/**
 * Calculate columns to be displayed:
 *
 * - Every ancestor level of activeItem should be displayed
 * - The level that activeItem is at should be displayed
 * - If activeItem is a parent node, its child level should be displayed
 *
 * @param items
 * @param value
 * @param options
 * @returns
 */
export declare function getColumnsAndPaths<T extends Record<string, unknown>>(items: readonly T[], pathTarget: T | undefined, options: GetColumnsAndPathsOptions<T>): {
    columns: (readonly T[])[];
    path: T[];
};
declare type UsePathsParams<T> = {
    data: T[];
    /**
     * The item where the focus is on
     */
    activeItem: T | undefined;
    /**
     * The item selected by Cascader's value
     */
    selectedItem: T | undefined;
    getParent: (item: T) => T | undefined;
    getChildren: (item: T) => readonly T[] | undefined;
};
/**
 * Caculate following 3 things
 *
 * - The columns of items to be displayed
 * - The path towards the current focused item
 * - The path towards the current selected item (referred to by Cascader's value)
 *
 * @param params
 * @returns
 */
export declare function usePaths<T extends Record<string, unknown>>({ data, activeItem, selectedItem, getParent, getChildren }: UsePathsParams<T>): {
    columnsToDisplay: (readonly T[])[];
    pathTowardsSelectedItem: T[];
    pathTowardsActiveItem: T[];
};
export {};
