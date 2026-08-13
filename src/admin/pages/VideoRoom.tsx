import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, 
  FileText, Maximize, Settings, AlertTriangle
} from 'lucide-react';
import type { VideoSession } from '../services/videoService';
import { videoService } from '../services/videoService';

export function VideoRoom() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [session, setSession] = useState<VideoSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  
  // Timer state
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const initRoom = async () => {
      if (!id) return;
      try {
        await videoService.connectToSignalingServer();
        const joinedSession = await videoService.joinRoom(id);
        setSession(joinedSession);
        
        // Start timer
        timerRef.current = setInterval(() => {
          setElapsedSeconds(prev => prev + 1);
        }, 1000);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initRoom();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [id]);

  const handleEndCall = async () => {
    if (window.confirm("Are you sure you want to end this consultation?")) {
      if (session) {
        await videoService.endConsultation(session.roomId, elapsedSeconds);
        navigate(`/admin/appointments/${session.appointmentId}`);
      }
    }
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center bg-gray-900 rounded-xl">
        <div className="text-center text-white">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal border-t-transparent mx-auto mb-4"></div>
          <p>Connecting to secure signaling server...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shadow-xl relative">
        
        {/* Topbar inside video */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-10 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <h3 className="font-medium text-shadow">Consultation {session?.appointmentId}</h3>
          </div>
          <div className="font-mono text-lg tracking-wider text-shadow">
            {formatTime(elapsedSeconds)}
          </div>
        </div>

        {/* Video Placeholders */}
        <div className="flex-1 relative flex items-center justify-center">
          
          {/* Missing Backend Warning */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 z-20 backdrop-blur-sm text-center p-6">
            <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Backend Integration Required</h2>
            <p className="text-gray-300 max-w-md mx-auto">
              This is the frontend architecture for the WebRTC video room. 
              Actual video streams require a STUN/TURN server and a WebSocket signaling backend (PHP/Node) to exchange ICE candidates.
            </p>
            <div className="mt-6 flex gap-4 text-sm font-mono bg-black/50 p-4 rounded text-gray-400 text-left">
              <div>
                [WebRTC] PeerConnection: STUB<br/>
                [Signaling] Socket: DISCONNECTED<br/>
                [Media] Streams: MUTED
              </div>
            </div>
          </div>

          {/* Self View (Doctor) - Bottom Right Corner */}
          <div className="absolute bottom-6 right-6 w-48 h-36 bg-gray-800 rounded-lg border-2 border-gray-700 shadow-lg overflow-hidden z-30 flex items-center justify-center">
            {cameraOn ? (
              <span className="text-gray-500 text-sm">Local Camera View</span>
            ) : (
              <VideoOff className="h-8 w-8 text-gray-500" />
            )}
          </div>
        </div>

        {/* Video Controls Bottom Bar */}
        <div className="h-20 bg-gray-950 flex items-center justify-center gap-4 px-6 relative z-30">
          <button 
            onClick={() => setMicOn(!micOn)}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${micOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-red-500 text-white'}`}
          >
            {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>
          
          <button 
            onClick={() => setCameraOn(!cameraOn)}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${cameraOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-red-500 text-white'}`}
          >
            {cameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </button>

          <button 
            onClick={handleEndCall}
            className="flex h-12 px-6 items-center justify-center gap-2 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 ml-4 shadow-lg shadow-red-900/20 transition-transform active:scale-95"
          >
            <PhoneOff className="h-5 w-5" /> End Call
          </button>

          <div className="absolute right-6 flex gap-3">
            <button 
              onClick={() => setShowChat(!showChat)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${showChat ? 'bg-teal text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              <MessageSquare className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setShowNotes(!showNotes)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${showNotes ? 'bg-teal text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              <FileText className="h-5 w-5" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar (Notes / Chat) */}
      {(showNotes || showChat) && (
        <div className="w-80 flex flex-col gap-4">
          {showNotes && (
            <div className="flex-1 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50 p-3 flex items-center justify-between">
                <h4 className="font-bold text-navy flex items-center gap-2">
                  <FileText className="h-4 w-4 text-teal" />
                  Clinical Notes
                </h4>
              </div>
              <div className="flex-1 p-0">
                <textarea 
                  className="w-full h-full resize-none border-0 p-4 text-sm outline-none bg-yellow-50/30"
                  placeholder="Type private clinical notes here during the consultation. These will be saved to the appointment record..."
                ></textarea>
              </div>
            </div>
          )}
          
          {showChat && (
            <div className="flex-1 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50 p-3">
                <h4 className="font-bold text-navy flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-teal" />
                  Room Chat
                </h4>
              </div>
              <div className="flex-1 p-4 bg-gray-50/50 flex flex-col justify-end">
                <div className="text-center text-xs text-gray-400 mb-2">End-to-end encrypted</div>
              </div>
              <div className="p-3 border-t border-gray-100">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-teal"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
