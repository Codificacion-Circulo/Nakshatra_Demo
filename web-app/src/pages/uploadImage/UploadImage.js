import { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "./UploadImage.css"

const url = {
  model: "model.json",
};

const UploadImage = () => {
    const [model, setModel] = useState();
  const fileInputRef = useRef()

  const loadModel = async (url) => {
    try {
      // For layered model
      const model = await tf.loadLayersModel(url.model);
      setModel(model);
      console.log("Load model success");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    tf.ready().then(() => {
      loadModel(url);
    });
  }, []);

  console.log(model);

  const handleUploadImage = () => {
    const file = fileInputRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("before");
    reader.onload = () => {
      console.log("after");
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const tensor = tf.browser.fromPixels(img).resizeBilinear([224, 224]).toFloat();
        const offset = tf.scalar(255.0);
        const normalized = tensor.div(offset).expandDims(0);
        const predictions = model.predict(normalized);
        const values = Array.from(predictions.dataSync());
        var pIndex = tf.argMax(predictions, 1).dataSync();
        var classNames = ["covid", "normal", "pneumonia", "tuberculosis"];  
        alert(classNames[pIndex]);
        console.log(values);
      };
    };
  }


    return (
        <div className="uploadImage__inputHolder">
            <input
          type="file"
          accept="image/*"
          capture="camera"
          className="uploadInput"
          ref={fileInputRef}
        />
        <button className="uploadImage" onClick={handleUploadImage}>
          Upload Image
        </button>
        </div>
    );
}

export default UploadImage;