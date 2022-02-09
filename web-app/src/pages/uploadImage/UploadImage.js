import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as tf from "@tensorflow/tfjs";
import { useDropzone } from "react-dropzone";
import "./UploadImage.css";

const url = {
  model: "model.json",
};

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const UploadImage = (props) => {
  const [model, setModel] = useState();
  const fileInputRef = useRef();

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
    const file = files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("before");
    reader.onload = () => {
      console.log("after");
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const tensor = tf.browser
          .fromPixels(img)
          .resizeBilinear([224, 224])
          .toFloat();
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
  };

  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <img src={file.preview} alt={file.name} />
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div>Drag and drop your images here.</div>
      </div>
      <aside>{thumbs}</aside>
      <button className="uploadImage" onClick={handleUploadImage}>
        Upload Image
      </button>
    </section>
  );
};

export default UploadImage;
