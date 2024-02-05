import { QIParameterAnalysis } from './QIParameterAnalysis'

export interface QualityInspection{
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
	/**	Product  Id : Link - Product Information	*/
	product__id?: string
	/**	Date : Date	*/
	date?: string
	/**	Product Name : Data	*/
	product_name?: string
	/**	Time : Time	*/
	time?: string
	/**	Product Group : Data	*/
	product_group?: string
	/**	Input Product Image : Attach	*/
	product_picture?: string
	/**	Output Product Image : Attach	*/
	output_product_image?: string
	/**	Product Status : Select	*/
	product_status?: "OK" | "NOT OK"
	/**	Parameter Analysis : Table - QI Parameter Analysis	*/
	parameter_analysis?: QIParameterAnalysis[]
	/**	Model Name : Data	*/
	model_name?: string
	/**	Computation Time : Data	*/
	computation_time?: string
	/**	Accuracy : Float	*/
	accuracy?: number
}