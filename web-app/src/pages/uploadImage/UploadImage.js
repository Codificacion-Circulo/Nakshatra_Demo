import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as tf from "@tensorflow/tfjs";
import { useDropzone } from "react-dropzone";
import ResultDescCard from "../../components/resultDescCard/ResultDescCard";
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
  marginBottom: "2rem"
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
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState("");
  const [modal, setModal] = useState(false);

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
        // const values = Array.from(predictions.dataSync());
        var pIndex = tf.argMax(predictions, 1).dataSync();
        var classNames = ["covid", "normal", "pneumonia", "tuberculosis"];
        // alert(classNames[pIndex]);
        setResult(classNames[pIndex]);
      };
    };
    setFiles([]);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setResult("");
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

  const modalChangeHandler = () => {
    setModal(false);
  };

  return (
    <div className="uploadImage__container container d-flex flex-column align-items-center">
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
          <input {...getInputProps()} className="uploadInput" />
          {files && files.length === 0 ? (
            <>
              <img src={fileUpload} alt="file upload logo" className="px-5"/>
              <p className="uploadImage__dndPlaceSubHeading mt-3 my-0 text-center">
                Drag and Drop your files here
              </p>
            </>
          ) : (
            <>
            <img src="https://images.unsplash.com/photo-1616012480717-fd9867059ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8eCUyMHJheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="file upload logo" />
            <p className="text-success mt-3">File Uploaded Successfully</p>
            </>
          )}
        </div>
        {/* {files.length > 0 && (
          <p className="text-success">File Uploaded Successfully</p>
        )} */}
        <button className="uploadImage__uploadBtn" onClick={handleUploadImage}>
          Check Image
        </button>
      </div>
      {result && (
        <div className="uploadImage__resultDiv d-flex justify-content-center align-items-center flex-column">
          <p className="text-center fw-bolder">Your result is: {result}</p>
          <button
            className="uploadImage__uploadBtn"
            onClick={() => {
              setModal(true);
            }}
          >
            Know More
          </button>
        </div>
      )}
      {modal && <ResultDescCard onClose={modalChangeHandler} />}
    </div>
  );
};

export default UploadImage;
