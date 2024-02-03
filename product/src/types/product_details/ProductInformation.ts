
export interface ProductInformation{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Product Name : Data	*/
	product_name?: string
	/**	Product Group : Link - Product Groups	*/
	product_group?: string
	/**	Image : Attach	*/
	image?: string
	/**	ML Model : Link - ML Model	*/
	ml_model?: string
	/**	Company : Data	*/
	company?: string
	/**	Status : Select	*/
	status?: "Active" | "In-Active"
}