// BACKEND INTEGRATION REQUIRED
// This service defines the architecture for the WebRTC video consultation system.
// It currently provides stubbed methods that will be replaced with real
// STUN/TURN signaling and socket.io events once the PHP backend is ready.

export type VideoRoomStatus = 'Waiting' | 'Live' | 'Ended';

export interface VideoSession {
  roomId: string;
  appointmentId: string;
  status: VideoRoomStatus;
  startedAt?: string;
  endedAt?: string;
  durationInSeconds?: number;
}

export const videoService = {
  /**
   * Initializes a connection to the signaling server (e.g., via WebSockets)
   * This is required before attempting to join or start a room.
   */
  connectToSignalingServer: async (): Promise<boolean> => {
    // TODO: Implement actual Socket.io / WebSocket connection to PHP backend
    console.log('[VideoService] Mock connection to signaling server established.');
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  },

  /**
   * Joins a specific WebRTC room by ID.
   * In a real implementation, this would exchange ICE candidates and SDP offers.
   */
  joinRoom: async (roomId: string): Promise<VideoSession> => {
    console.log(`[VideoService] Joining room ${roomId}... (Mock)`);
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      roomId,
      appointmentId: roomId.replace('ROOM-', 'APT-'),
      status: 'Live',
      startedAt: new Date().toISOString()
    };
  },

  /**
   * Ends the consultation session and disconnects WebRTC peers.
   */
  endConsultation: async (roomId: string, durationInSeconds: number): Promise<boolean> => {
    console.log(`[VideoService] Ending room ${roomId} after ${durationInSeconds}s... (Mock)`);
    await new Promise(resolve => setTimeout(resolve, 600));
    // TODO: Send exact end time to backend, disconnect RTCPeerConnection
    return true;
  }
};
