// File: src/components/SizePredictor.jsx
import { useEffect, useRef, useState } from "react";
import { predictSizeFromImage } from "../service/service";
export default function SizePredictor({ onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Chờ video metadata load xong rồi mới play
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch((error) => {
              if (error.name !== "AbortError") {
                console.error("Lỗi khi play video:", error);
              }
            });
          };
        }
      } catch (err) {
        console.error("Lỗi khi mở camera:", err);
      }
    };

    startCamera();

    return () => {
      // Dừng tất cả track khi unmount
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handlePredict = async () => {
  setLoading(true);
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");

  const video = videoRef.current;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageBlob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg")
  );

  try {
    const data = await predictSizeFromImage(imageBlob);
    setResult(data.data || "Không rõ");
  } catch (err) {
    setResult("Lỗi dự đoán");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full h-full  flex flex-col items-center justify-center gap-4 ">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded z-30"
      >
        Đóng
      </button>

      <div className="relative w-3/4">
        <video
          ref={videoRef}
          className="rounded-xl shadow w-full"
          autoPlay
          muted
        />

        {/* Viền bầu dục */}

        {/* Overlay mask tối ngoài vùng ellipse */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <mask id="mask-ellipse">
                <rect width="100%" height="100%" fill="white" />
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx="25%" // = w/2 của div viền (40% width => rx=20%)
                  ry="50%" // = height/2 = 40% * 5/4 / 2 = 25%
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="rgba(0,0,0,0.5)"
              mask="url(#mask-ellipse)"
            />
          </svg>
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div>
        <div className="text-center text-lg font-semibold ">
          Đưa mặt vào khung hình để dự đoán kích thước kính
        </div>
      </div>
      <button
        onClick={handlePredict}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
      >
        {loading ? "Đang xử lý..." : "Dự đoán"}
      </button>

      {result && (
        <div className="text-xl font-semibold text-green-700 flex flex-col items-center ">
          <div>Kết quả dự đoán</div>
          <div>Kích cỡ mặt: {result.face_width_mm} Size kính: {result.predicted_size}</div>
        </div>
      )}
    </div>
  );
}
