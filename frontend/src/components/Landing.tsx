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
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <div className="flex w-full max-w-6xl gap-8">
                    {/* Left side - Dialog box */}
                    <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-10 max-w-md transform hover:scale-[1.02] transition-all duration-300">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
                                <span className="text-2xl font-bold text-white"></span>
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">Omee</h1>
                            <p className="text-slate-500 text-lg font-medium">Connect with strangers instantly</p>
                            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-3"></div>
                        </div>
                        
                        <div className="space-y-8">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-3 tracking-wide uppercase">
                                    Enter your name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name..."
                                    className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 text-lg font-medium placeholder:text-slate-400 bg-slate-50/50 hover:bg-white"
                                />
                            </div>
                            
                            <button
                                onClick={() => setJoined(true)}
                                disabled={!name.trim()}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] transform active:scale-[0.98] text-lg tracking-wide"
                            >
                                🚀 Join Chat
                            </button>
                            
                            <div className="text-xs text-slate-400 text-center leading-relaxed">
                                By joining, you agree to our terms of service and privacy policy
                            </div>
                        </div>
                    </div>
                    
                    {/* Right side - Video preview */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="bg-slate-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-700/50 transform hover:scale-[1.02] transition-all duration-300">
                            <div className="mb-6">
                                <h3 className="text-white text-xl font-bold mb-2 flex items-center gap-2">
                                    📹 Camera Preview
                                </h3>
                                <p className="text-slate-300 text-sm font-medium">Make sure you look good!</p>
                            </div>
                            <div className="relative group">
                                <video 
                                    autoPlay 
                                    muted
                                    ref={videoRef}
                                    className="w-80 h-60 bg-slate-700 rounded-2xl object-cover shadow-lg border-2 border-slate-600/50 group-hover:border-blue-500/50 transition-all duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"></div>
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