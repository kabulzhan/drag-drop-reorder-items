import React from "react";
import { useDropzone } from "react-dropzone";
import Compress from "compress.js";

function ImageUpload(props) {
  // const [imageToUpload, setImageToUpload] = useState(null);
  // const [exampleImage, setExampleImage] = useState(
  //   "https://cdn.vox-cdn.com/thumbor/Y5l7YvI75_OzJWlOfzrOe0XGWG4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/10581019/acastro_180403_1777_youtube_0002.jpg"
  // );
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      acceptedFiles.splice(1);
      const compress = new Compress();
      compress
        .compress(acceptedFiles, {
          quality: 1,
          maxHeight: 50,
          maxWidth: 50,
        })
        .then((data) => {
          props.setImageToUpload(`${data[0].prefix} ${data[0].data}`);
        });

      // setImageToUpload(
      //   Object.assign(acceptedFiles[0], {
      //     preview: URL.createObjectURL(acceptedFiles[0]),
      //   })
      // )
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        style={{
          backgroundColor: "#e5e5e5",
          height: "3rem",
          width: "40vw",
          display: "flex",
          flexDirection: "column",
          margin: "1rem",
        }}
      >
        <input {...getInputProps()} />
        <p
          style={{
            textAlign: "center",
            marginTop: "auto",
            color: `${
              props.imageToUpload ? "green" : props.error ? "red" : "black"
            } `,
          }}
        >
          {props.imageToUpload
            ? "Картинка загружена"
            : "Кликните или перетащите сюда картинку"}
        </p>
      </div>
    </>
  );
}

export default ImageUpload;
