import React, { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./canvasPreview";

export default function ImageCrop() {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState({ unit: "%", width: 50, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
    }
  }, [completedCrop]);

  return (
    <div className="text-black h-[100dvh] flex justify-center items-center">
      <div className="flex justify-center flex-col items-center gap-3">
      <input
          type="file"
          id="rgba"
          accept="image/*"
          className=""
          // className="absolute bottom-0 left-0 w-px h-px overflow-hidden whitespace-nowrap clip-rect-0"
          onChange={onSelectFile}
        />
        {imgSrc && (
          <div>
            <div
              style={{
                maxWidth: "350px",
                maxHeight: "350px",
                overflow: "hidden",
              }}
            >
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                className="outline outline-2 outline-offset-2"
              >
                <img
                  src={imgSrc}
                  alt="Crop me"
                  ref={imgRef}
                  style={{
                    maxWidth: "100%",
                  }}
                />
              </ReactCrop>
            </div>
          </div>
        )}
        <input
          type="submit"
          className="bg-[#3EE4CA] text-[#12141d] py-2 px-5 rounded-lg"
          name="submit"
          onChange={onSelectFile}
        />
      </div>
    </div>
  );
}
