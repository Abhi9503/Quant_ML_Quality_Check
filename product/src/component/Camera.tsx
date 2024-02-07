import { useRef, useEffect, useState, ChangeEvent } from "react";
import { useLocation } from 'react-router-dom';
import Header from "./Header";
import { useFrappeGetDocList } from "frappe-react-sdk";


const Camera = () => {
    type QualityInspection = {
        name: string;
        output_product_image: string;
    };

    const location = useLocation();
    const { id, name } = location.state;
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [hasNoCamera, setHasNoCamera] = useState(true);
    const [previewImage, setPreviewImage] = useState('');
    const [docName, setDocName] = useState("");
    const [loading, setLoading] = useState(false);
    const [parameters, SetParameters] = useState("");
    const [prodStatus,setProdStatus]=useState("");
    const [previewButtonStatus,setPreviewStatus]=useState(false);
    const [error, setError] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

    const { data, mutate } = useFrappeGetDocList<QualityInspection>('Quality Inspection', {
        fields: ["name", "output_product_image"],
        filters: [["name", "=", docName]],
      });

      
    useEffect(() => {
        if (data && data.length > 0) {
            setPreviewImage(data[0].output_product_image);
        } else if (!loading) {
            console.error("Document not found in the response data.");
        }
    }, [data, loading]);
      

    const getVideo = ()=>{
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                let flag = false; // Initialize flag
    
                for (let i = 10; i >= 0; i--) {
                    const externalCamera = videoDevices[i];
                    if (externalCamera) {
                        flag = true;
                        navigator.mediaDevices
                            .getUserMedia({
                                video: { deviceId: { exact: externalCamera.deviceId } }
                            })
                            .then(stream => {
                                const video = videoRef.current!;
                                video.srcObject = stream;
                                video.play();
                            })
                            .catch(err => {
                                console.error(err);
                            });
    
                        break;
                    }
                }
    
                if (!flag) {
                    setHasNoCamera(false);
                    console.error('No external camera found.');
                }
            })
            .catch(err => {
                console.error(err);
            });
    };    
    useEffect(() => {
        getVideo();
    }, [videoRef]);


    const handleSnap = async () => {
      
        setLoading(true);
        let imageData;
        if (selectedImage){
          setPreviewStatus(false)
          imageData = selectedImage
        }  
        else {
            const video = videoRef.current!;
            const canvas = photoRef.current!;
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context?.drawImage(video, 0, 0, canvas.width, canvas.height);
            setPreviewStatus(true)
            imageData = canvas.toDataURL('image/png');
        }
        try {
            const response = await fetch('/api/method/product_details.product_details.doctype.quality_inspection.quality_inspection.object_defect_detection', {
                method: 'POST', // Use POST method to send data
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image_data: imageData,prod_id:id}), // Send image data as JSON
            });
            if (response.status === 200) {
                mutate();
                const qualitydoc = await response.json();
                console.log(qualitydoc);
                setDocName(qualitydoc.message["docname"]);
                SetParameters(qualitydoc.message["parameters"]);
                setProdStatus(qualitydoc.message["prod_status"])
            } 
            else 
            {
                console.log(response.status);
            }
        } catch (error) {
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasPhoto) {
            handleSnap();
            setHasPhoto(false);
        }
    }, [hasPhoto]);

      
    return (
        <div className="App">
            <Header />
                <>
                <div className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
                    <div className=" mt-14 w-auto h-auto  grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
                    {hasNoCamera ? (
                        <div className="w-full">
                            <div className="flex items-center justify-center">
                            <video ref={videoRef} className="rounded-3xl"></video>
                            </div>
                            <div className="flex items-center justify-center mt-9">
                            <button
                                onClick={handleSnap}
                                className={`relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-pink-700 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group ${
                                loading ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                                disabled={loading}
                            >
                                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-pink-600 group-hover:h-full"></span>
                                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                                </span>
                                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                                </span>
                                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">CAPTURE</span>
                            </button>
                            </div>
                        </div>
                        ) : (
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload File</label>
                            <input
                                className="p-2 bg-transparent border-b-2  appearance-none focus:outline-none focus:ring-0 peer border border-pink-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full"
                                aria-describedby="file_input_help"
                                id="file_input"
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleFileChange}
                                required
                            />
                            {error && <p className="text-sm text-red-800">{error}</p>}

                            {selectedImage && (
                                    <div>
                                        <img
                                        src={selectedImage}
                                        alt="Selected"
                                        className="mt-2 mx-auto h-96 object-fill border border-transparent rounded-3xl items-center"
                                        style={{ maxHeight: '300px' }}
                                        />
                                        <div className="flex items-center justify-center mt-9">
                                            <button
                                                onClick={handleSnap}
                                                className={`relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-pink-700 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group ${
                                                loading ? 'cursor-not-allowed opacity-50' : ''
                                                }`}
                                                disabled={loading}
                                            >
                                                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-pink-600 group-hover:h-full"></span>
                                                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                </svg>
                                                </span>
                                                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                </svg>
                                                </span>
                                                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Process</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                        </div>
                        )}
                        <div className="w-full">
                            <div className={'result' + (hasPhoto ? ' hasPhoto' : '') }>
                                <canvas ref={photoRef} className="rounded-3xl w-full"></canvas>
                            </div>
                            { previewButtonStatus?(
                                <div className="flex items-center justify-center mt-9">
                                    <div className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-pink-600 border border-transparent rounded-md items-center ">
                                        Preview
                                    </div>
                                </div>
                            ): (null
                            )}
                        </div>
                        <div className="w-full">
                            <div>
                                {selectedImage ? (
                                        previewImage.trim() !== "" && (
                                            <img
                                            src={previewImage}
                                            alt="Product Image"
                                            className="rounded-3xl "
                                            style={{ maxHeight: '400px', marginTop: '80px', marginLeft:"60px"}} // Set the same maxHeight as the selected image
                                        />
                                        )
                                    ) : (
                                    previewImage.trim() !== "" && (
                                        <img src={previewImage} alt="Product Image" className="rounded-3xl" />
                                    )
                                    )}
                                    {loading ? (
                                    <div className="flex items-center justify-center mt-9">
                                        <div className="text-center">
                                        <div role="status">
                                            <div className="flex items-center justify-center">
                                            <svg aria-hidden="true" className="inline w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    ) : (
                                    <>
                                        {previewImage && (
                                        <div className="flex items-center justify-center mt-9">
                                            <div className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-pink-600 border border-transparent rounded-md items-center">
                                            Output
                                            </div>
                                        </div>
                                        )}
                                    </>
                                    )}
                            </div>
                        </div>
                    </div>

                    <div className="border-2 border-pink-800  w-full rounded-3xl">
                        <div className="grid gap-6 mb-6 grid-cols-3 m-10">
                            <div>
                                <div className="font-medium text-2xl">
                                    <span className="text-teal-600">Product ID:  </span><span>{id}</span>
                                </div>
                                <div className="font-medium mt-3.5 text-2xl">
                                    <span className="text-teal-600">Product Name:  </span><span>{name}</span>
                                </div>
                            </div>
                            <div>
                                <span className="font-medium text-2xl text-teal-600">Parameters:</span>
                                {parameters && (
                                    <ol>
                                         <div className="font-medium mt-3 text-2xl">
                                            {Object.entries(parameters).map(([key, value]) => (
                                                <li key={key}>
                                                <span className="font-semibold">{key}:</span> {value}
                                                </li>
                                            ))}
                                        </div>
                                    </ol>
                                )}
                            </div>
                            <div>
                                {prodStatus=="OK"?<div className="w-3/4 m-auto flex justify-center text-5xl text-white p-8 rounded-2xl font-extrabold bg-green-700">
                                    OK
                                </div>: null}
                                 {prodStatus=="NOT OK"?
                                <div className="w-3/4 m-auto flex justify-center text-5xl font-extrabold p-8 rounded-2xl text-white bg-red-700">
                                    NOT OK
                                </div>:null}
                            </div>
                        </div>
                    </div>
                </div>
                </>
                      
        </div>
    );
};

export default Camera;