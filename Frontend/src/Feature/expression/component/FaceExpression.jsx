import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import './face-expression.scss';

export default function FaceExpression({ onClick = () => {} }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);
    
    const [expression, setExpression] = useState("Detecting...");
    const [isDetecting, setIsDetecting] = useState(false);

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        setIsDetecting(true);
        // Simulate a tiny delay for visual "scanning" effect
        setTimeout(async () => {
            const exp = await detect({ landmarkerRef, videoRef, setExpression });
            setIsDetecting(false);
            onClick(exp);
        }, 800);
    }

    return (
        <div className="scanner-container">
            <div className={`video-frame ${isDetecting ? 'scanning' : ''}`}>
                {/* Visual sci-fi scanner corners */}
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
                
                {/* The actual video feed */}
                <video
                    ref={videoRef}
                    playsInline
                    autoPlay
                    muted
                />
                
                {/* Overlay Scanning Line */}
                {isDetecting && <div className="scan-line"></div>}
            </div>
            
            <div className="scanner-info">
                <div className="mood-badge">
                    Current Mood: <span className="highlight-mood">{expression}</span>
                </div>
                
                <button 
                    className={`btn-detect ${isDetecting ? 'processing' : ''}`}
                    onClick={handleClick}
                    disabled={isDetecting}
                >
                    {isDetecting ? 'Analyzing...' : 'Detect Expression'}
                </button>
            </div>
        </div>
    );
}