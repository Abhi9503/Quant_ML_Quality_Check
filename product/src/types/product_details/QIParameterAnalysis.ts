
export interface QIParameterAnalysis{
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
	/**	Parameter  : Data	*/
	parameter?: string
	/**	Quantity : Float	*/
	quantity?: number
}