import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
function ImageUploader({ getImage,images=[]}) {
  
  const imagesFromParent=images
  const [fileerror, handleFileError] = useState("");
  const [imageFile, setImageFile] = useState(imagesFromParent);
  console.log(imageFile,imagesFromParent);
  
  const handleAddMedfile = (file) => {
    const newmedfile = [...imageFile];
    newmedfile.push(file);
    setImageFile(newmedfile);
    getImage(newmedfile);
    console.log(newmedfile);
  };
  const handleRemoveMedfile = (file) => {
    const newmedfile = imageFile.filter((t) => t !== file);
    setImageFile(newmedfile);
    getImage(newmedfile);
    if (imageFile.length == 1) {
      //to make value of file input when there are files uploaded and all are cleared
      console.log(imageFile.length);
      document.getElementById("file").value = null;
    }
  };
  function fileInput(event) {
    
    var file = event.target.files[0]; //assuming 1 file only
    if (!file) return;

    if (file.size <= 5243000) {
      //used to check file size is 5MB
      console.log(file.type);
      if (file.type == "image/jpeg" || file.type == "image/png") {
        //used to check file type
        handleFileError("");
        console.log(file.size);
        var reader = new FileReader(); //create a reader according to HTML5 File API
        reader.onload = function (event) {
          var buffer = new Uint8Array(reader.result); // convert to binary
          handleAddMedfile(buffer);
        };
        reader.readAsArrayBuffer(file); //read the file as arraybuffer
      } else {
        handleFileError("only jpg, jpeg and png files supported");
        document.getElementById("file").value = null;
      }
    } else {
      handleFileError("File Size more than 5MB");
      document.getElementById("file").value = null;
    }
  }

  return (
    <>
      {imageFile
        ? imageFile.map((img, index) => (
            <div key={index}className="upload-image-container">
              <img
                src={URL.createObjectURL(new Blob([img]))}
                className="upload-preview-image"
              />
              <button
                className="circle-x-button"
                onClick={() => {
                  handleRemoveMedfile(img);
                }}
              >
                &#10005;
              </button>
            </div>
          ))
        : null}
      <input
        className="file-input"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        id="file"
        required
        onChange={fileInput}
      />
      <Form.Label className="loginError" style={{ display: "inline-block" }}>
        {fileerror}
      </Form.Label>
    </>
  );
}

export default ImageUploader;
