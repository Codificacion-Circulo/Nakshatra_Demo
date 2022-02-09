import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as tf from "@tensorflow/tfjs";
import { useDropzone } from "react-dropzone";
import "./UploadImage.css";

// assest imports
import fileUpload from "../../assets/fileUpload.png";

const url = {
  model: "model.json",
};

const baseStyle = {
  borderWidth: 2,
  borderRadius: "2rem",
  borderColor: "gray",
  borderStyle: "dashed",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
  padding: "3rem",
  marginBottom: "2rem",
  background: "#f9fafd",
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
    accept: "image/jpeg, image/png, image/jpg",
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

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className="uploadImage__container container d-flex justify-content-center">
      <div className="uploadImage__dndContainer d-flex justify-content-center align-items-center flex-column">
        <div className="uploadImage__dndTextDiv">
          <p className="uploadImage__dndTextHeading my-0 fw-bolder text-center">
            Upload your Files
          </p>
          <p className="uploadImage__dndTextSubHeading my-0 text-center">
            File should be in jpeg, png or jpg
          </p>
        </div>
        <div
          className="uploadImage__dndPlaceDiv d-flex justify-content-center align-items-center flex-column"
          {...getRootProps({ style })}
        >
          <input {...getInputProps()} />
          <img src={fileUpload} alt="file upload logo" />
          <p className="uploadImage__dndPlaceSubHeading mt-3 my-0 text-center">
            Drag and Drop your files here
          </p>
        </div>
        <button className="uploadImage__uploadBtn" onClick={handleUploadImage}>
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default UploadImage;
