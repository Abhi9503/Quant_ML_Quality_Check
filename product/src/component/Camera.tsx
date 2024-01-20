import React, {useRef, useEffect, useState} from "react";
import Header from "./Header";



// const Camera = () => {
//     const videoRef = useRef(null);
//     const photoRef = useRef(null);

//     const [hasPhoto, setHasPhoto] = useState(false);
//     const getVideo = () => {
//         navigator.mediaDevices
//             .getUserMedia({
//                 video: { width: 1920, height: 1080 }
//             })
//             .then(stream => {
//                 let video = videoRef.current;
//                 video.srcObject = stream;
//                 video.play();
//             })
//             .catch(err => {
//                 console.error(err);
//             })
//     }
//     useEffect(() => {
//         getVideo();
//     }, [videoRef]);

//     return(
//         <div className="App">
//             <Header/>
//             <div className="flex items-center justify-center">
//                 <video ref={videoRef}></video>
//                 {/* <button>SNAP!</button> */}
//             </div>
//             {/* <div className={'result' + (hasPhoto ? 'hasPhoto'
//             : '')}>
//                 <canvas ref={photoRef}></canvas>
//                 <button>CLOSE!</button>
//             </div> */}
//         </div>
//     );
// }

// export default Camera;

// import React, { useRef, useEffect, useState } from "react";
const Camera = () => {
    const videoRef = useRef<HTMLVideoElement>(null); // Explicitly specify the type of the ref

    const getVideo = () => {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                const externalCamera = videoDevices[0];

                if (externalCamera) {
                    navigator.mediaDevices
                        .getUserMedia({
                            video: { deviceId: { exact: externalCamera.deviceId } }
                        })
                        .then(stream => {
                            const video = videoRef.current!; // Non-null assertion operator
                            video.srcObject = stream;
                            video.play();
                        })
                        .catch(err => {
                            console.error(err);
                        });
                } else {
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

    return (
        <div className="App">
            <Header />
            <div className="flex items-center justify-center">
                <video ref={videoRef}></video>
                {/* <button>SNAP!</button> */}
            </div>
            {/* <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                <canvas ref={photoRef}></canvas>
                <button>CLOSE!</button>
            </div> */}
        </div>
    );
};

export default Camera;
