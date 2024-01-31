import React, { useRef, useEffect, useState } from "react";
import Header from "./Header";
// import { useFrappeAuth } from "frappe-react-sdk";

// import { Image, Breathing } from 'react-shimmer';


const Camera = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [hasNoCamera, setHasNoCamera] = useState(true);
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
        const video = videoRef.current!;
        const canvas = photoRef.current!;
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Make sure the video has loaded a frame
        // await new Promise(resolve => video.addEventListener('loadeddata', resolve));

        // Draw the video frame onto the canvas
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL('image/png');
        try {
            const response = await fetch('/api/method/product_details.product_details.doctype.quality_inspection.quality_inspection.model_computation', {
                method: 'POST', // Use POST method to send data
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image_data: imageData }), // Send image data as JSON
            });

            if (response.status === 200) {
                const result = await response.json();
                console.log(result);
            } else {
                console.log(response.status);
            }
        } catch (error) {
            console.error(error);
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
            {!hasNoCamera ? (
                <div className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
                    <div className="text-red-800 font-bold text-3xl mt-32 w-1/2 m-auto flex text-center justify-center">
                        Please Check Camera Connection.
                    </div>
                </div>
            ):(
                <div className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
                    <div className=" mt-14 w-auto h-96 md:flex">
                        <div className="w-auto md:w-1/2">
                            <div className="flex items-center justify-center">
                                <video ref={videoRef}></video>
                            </div>
                            <div className="flex items-center justify-center mt-9">
                                <button onClick={handleSnap} className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
                                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
                                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">CAPTURE</span>
                                </button>
                            </div>
                        </div>
                        <div className="w-auto md:w-1/2  mt-16 md:mt-0">
                            <div className={'result' + (hasPhoto ? ' hasPhoto' : '') + ' flex justify-center'}>
                                <canvas ref={photoRef}></canvas>
                            </div>
                            <div className="flex items-center justify-center mt-9">
                                <div className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md items-center hover:bg-blue-700 focus:bg-blue-700">
                                    Preview
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            )}            
        </div>
    );
};

export default Camera;















