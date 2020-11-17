import Product from "./product"
export type FetchStoreSchema = {
	hidden: boolean;
	currentPage: number;
	pageSize: number;
	pageCount: number;
	productsCount: number;
	products: Product[],
	filterTerm: string[],
	searchTerm: string,
	orderTerm: string,
	setHidden: (hidden: boolean) => void;
	setCurrentPage: (pageNumber: number) => void
	setPageCount: (pageCount: number) => void;
	setProductsCount: (productCount: number) => void;
	setProducts: (productArr: Product[]) => void;
	setFilterTerm: (filterTerms: String[]) => void;
	setSearchTerm: (searchTerm: String) => void;
	setOrderTerm: (orderTerm: String) => void;
	addOrRemoveFilter: (item: String) => void;
	getAPI: () => Promise<void>
}
