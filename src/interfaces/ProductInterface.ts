
export interface ItemProduct {
    id: string;
	category: string;
	productName: string;
	price: number;
    urlImage: string;
	cantity: number;
	available: boolean;
}

export interface ItemProductClient {
	id: string;
	category: string;
	productName: string;
	price: number;
	cantity: number;	
}