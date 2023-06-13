
export interface PaginationInterface {
    page: number;
    perPage: number;
}

export interface PaginationInterfaceCategories {
    page: number;
    size: number;
    filters?: string;
    sorting?: string;
}
