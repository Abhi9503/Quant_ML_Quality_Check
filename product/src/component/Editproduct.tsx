import {useFrappeGetDocList } from "frappe-react-sdk";
import {ChangeEvent, useState} from "react";
import {Bounce,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface EditproductProps {
    company:string,
    name: string;
    product_name: string;
    product_group: string;
    status: string;
    image: string;
  }
const Editproduct: React.FC<EditproductProps> = ({ productData }) =>{
    interface ProductGroup{
        name:string,
    }
    const {data} = useFrappeGetDocList<ProductGroup>('Product Groups', {
        fields: ["name"]
      });

      //for inmage validation
    const [error, setError] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | null>(productData.image);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const allowedExtensions = ['.png', '.jpg', '.jpeg'];
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();

            if (!allowedExtensions.includes(`.${fileExtension}`)) {
                setError('Invalid file format. Please select a valid image file.');
                setSelectedImage(null);
            } else {
                setError('');
                // Read the selected image and set it in state for display
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        setSelectedImage(e.target.result as string);
                    }
                };
                reader.readAsDataURL(selectedFile);
            }
        }
    };
//variables ti store data from form
    const[productGroup,setProductGroup] = useState(productData.product_group);
    const[company,setCompany] = useState(productData.company);
    const[productName,setProductName] = useState(productData.name);
    const[status,setStatus] = useState(productData.status);

    function showErrorProductGroup(){
        toast.error('Please select the product group', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
      function showErrorImage(){
        toast.error('Selected file is not a image', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
    const submit = () =>{
        alert(selectedImage);
        if(productGroup==="" || productGroup==="Select Product Group"){
            showErrorProductGroup();
            return; 
        }
        if(selectedImage===null){
            showErrorImage();
            return;
        }

        alert("DOOOOONE.");
    }

    return(
        <>
        <div className=" mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
           <div className="pl-10 mt-8 flex justify-start text-center text-xl font-semibold">Edit Product</div>
            
            <form className="p-10" onSubmit={(e) => { e.preventDefault(); submit(); }} >
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Company</label>
                        <input type="text"
                            value={company}
                            onChange={(e)=>{
                                setCompany(e.target.value);
                            }}
                        id="product_company" className="bg-gray-50 border border-pink-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 " placeholder="Company" required/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                        <input type="text" 
                            value={productName}
                            onChange={(e)=>{
                                setProductName(e.target.value);
                            }}
                            id="product_name" className="bg-gray-50 border border-pink-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 " placeholder="Product Name" required/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Product Group</label>
                        <select id="underline_select"  
                            className="p-2.5  bg-transparentborder-b-2  appearance-none focus:outline-none focus:ring-0 peer border border-pink-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full" 
                            value={productGroup}
                            onChange={(e)=>{
                                setProductGroup(e.target.value);
                            }}
                            required>
                            <option>Select Product Group</option>
                            {
                                data && data.map((i) => (
                                    <option key={i.name} value={i.name}>{i.name}</option>
                                ))
                            }
                        </select>
                        {/* {productGroupError && <p className="text-sm text-red-800">{productGroupError}</p>} */}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Product Status</label>
                        <select id="underline_select" 
                            value={status}
                            onChange={(e)=>{
                                setStatus(e.target.value);
                            }}
                            className="p-2.5 bg-transparentborder-b-2  appearance-none focus:outline-none focus:ring-0 peer border border-pink-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full">
                            <option>Active</option>
                            <option>In-Active</option>
                        </select>
                    </div> 
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload file</label>
                        <input
                            className="p-2 bg-transparentborder-b-2  appearance-none focus:outline-none focus:ring-0 peer border border-pink-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full"
                            aria-describedby="file_input_help"
                            id="file_input"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleFileChange}
                            required
                        />
                        {error && <p className="text-sm text-red-800">{error}</p>}
                    </div>
                    <div>
                    {selectedImage && (
                        <div>
                            <p className="block mb-2 text-sm font-medium text-gray-900">Selected Image:</p>
                            <img src={selectedImage} alt="Selected" className="mt-2 mx-auto h-96 object-fill"
                        style={{ maxHeight: '300px' }} />
                        </div>
            )}
                    </div>
                </div>
                <button type="submit" className="text-teal-9500 bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
            </form>

        </div>
        </>
    )
}

export default Editproduct;