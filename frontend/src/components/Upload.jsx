import { useDropzone } from "react-dropzone";

function Upload({ onUploadSuccess, fetchImages }) {
  const onDrop = async (acceptedFiles, rejectedFiles) => {
    console.log("Let's go!", acceptedFiles);
    console.log("Denied..", rejectedFiles);

    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert("Upload success!");
        onUploadSuccess();
      } else {
        alert(`Error: ${data.msg}`);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("An error occurred during the upload");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: isDragActive ? "2px dashed green" : "2px dashed gray",
        padding: "20px",
        textAlign: "center",
        backgroundColor: "transparent",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive
        ? "Drop it like it's hot!"
        : "Drag an image here or click to make the magic happen! (sometimes)"}
    </div>
  );
}

export default Upload;
