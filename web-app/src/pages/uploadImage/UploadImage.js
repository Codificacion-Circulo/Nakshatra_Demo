import { useState, useEffect, useCallback, useMemo } from "react";
import * as tf from "@tensorflow/tfjs";
import { useDropzone } from "react-dropzone";
import "./UploadImage.css";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fileUpload from "../../assets/fileUpload.png";
import axios from "axios";
import { create } from 'ipfs-http-client';
const client = create('https://ipfs.infura.io:5001/api/v0')
toast.configure();

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
  const [loading, setLoading] = useState(false);

  
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
  
  const handleUploadImage =async () => {
    try {
      const file = files[0];
      const classNames = ["covid", "normal", "pneumonia", "tuberculosis"];
      var result= 0;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.log("before");
      reader.onload = async() => {
        console.log("after");
        setLoading(true)
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
          // alert(classNames[pIndex]);
          result=pIndex;
        };
      };
      const token = localStorage.getItem('token');
      if(token){
        const added = await client.add({path:file.name,content:file},{
          wrapWithDirectory: true,
        })
        const url = `https://ipfs.infura.io/ipfs/${added.cid.toString()}/${file.name}`
        const response = await axios.post("https://nakshatra-demo.herokuapp.com/api/reports",
        {image:url,result:classNames[result]},
        { headers: { "Authorization": `Bearer ${token}` }});
        console.log(response)
      }
      setResult(classNames[result]);
      setLoading(false)
      setFiles([]);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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

  return (
    <>
      {loading && <LoadingSpinner />}
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
                <img src={fileUpload} alt="file upload logo" className="px-5" />
                <p className="uploadImage__dndPlaceSubHeading mt-3 my-0 text-center">
                  Drag and Drop your Chest X-Ray here
                </p>
              </>
            ) : (
              <>
                <img
                  src="https://images.unsplash.com/photo-1616012480717-fd9867059ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8eCUyMHJheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt="file upload logo"
                />
                <p className="text-success mt-3">File Uploaded Successfully</p>
              </>
            )}
          </div>
          <button
            className="uploadImage__uploadBtn"
            onClick={handleUploadImage}
          >
            Check Image
          </button>
        </div>
        {result && (
          <div className="uploadImage__resultDiv d-flex justify-content-center align-items-center flex-column">
            <p className="text-center fw-bolder">
              Your Chest X-Ray is classfied as {result}
            </p>
            <Link
              to={`/knowmore/${result && result}`}
              className="uploadImage__uploadBtn"
              style={{ textDecoration: "none" }}
            >
              Know More
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadImage;
