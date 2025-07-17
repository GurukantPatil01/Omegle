import { useEffect, useRef, useState } from "react"
import { Room } from "./Room";

export const Landing = () => {
    const [name, setName] = useState("");
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [joined, setJoined] = useState(false);

    const getCam = async () => {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]
        setLocalAudioTrack(audioTrack);
        setlocalVideoTrack(videoTrack);
        if (!videoRef.current) {
            return;
        }
        videoRef.current.srcObject = new MediaStream([videoTrack])
        videoRef.current.play();
    }

    useEffect(() => {
        if (videoRef && videoRef.current) {
            getCam()
        }
    }, [videoRef]);

    if (!joined) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="flex w-full max-w-6xl gap-8">
                    {/* Left side - Dialog box */}
                    <div className="flex-1 bg-white rounded-2xl shadow-2xl p-8 max-w-md">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-slate-800 mb-2">Omee</h1>
                            <p className="text-slate-600">Connect with strangers instantly</p>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                    Enter your name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name..."
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            
                            <button
                                onClick={() => setJoined(true)}
                                disabled={!name.trim()}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                            >
                                Join Chat
                            </button>
                            
                            <div className="text-xs text-slate-500 text-center">
                                By joining, you agree to our terms of service and privacy policy
                            </div>
                        </div>
                    </div>
                    
                    {/* Right side - Video preview */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl">
                            <div className="mb-4">
                                <h3 className="text-white text-lg font-semibold mb-2">Camera Preview</h3>
                                <p className="text-slate-400 text-sm">Make sure you look good!</p>
                            </div>
                            <div className="relative">
                                <video 
                                    autoPlay 
                                    muted
                                    ref={videoRef}
                                    className="w-80 h-60 bg-slate-700 rounded-lg object-cover"
                                />
                                <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                                    You
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
}