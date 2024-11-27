import { useDropzone } from "react-dropzone";

function Upload({ onUploadSuccess, fetchImages }) {

    const onDrop = async (acceptedFiles, rejectedFiles) => {
        console.log("Akzeptierte Dateien:", acceptedFiles);
        console.log("Abgelehnte Dateien:", rejectedFiles);

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
                alert("Upload erfolgreich!");
                onUploadSuccess();
            } else {
                alert(`Fehler: ${data.msg}`);
            }
        } catch (error) {
            console.error("Upload fehlgeschlagen:", error);
            alert("Ein Fehler ist beim Hochladen aufgetreten");
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/gif': ['.gif']
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
            {isDragActive ? (
                "Lass die Datei hier los!"
            ) : (
                "Ziehe ein Bild hierher oder klicke, um es hochzuladen"
            )}
        </div>
    );
}

export default Upload;