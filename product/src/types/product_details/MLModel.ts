
export interface MLModel{
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
	/**	Model Name : Data	*/
	model_name?: string
	/**	Product Group : Link - Product Groups	*/
	product_group?: string
}