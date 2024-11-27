import React, { useEffect, useState } from "react";
import Upload from "../components/Upload";
import "./Gallery.css";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  const [overlayImg, setOverlayImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (cursor = null) => {
    setLoading(true);
    try {
        const response = await fetch(
            `http://localhost:3000/images?limit=4${
                cursor ? `&next_cursor=${cursor}` : ""
            }`
        );

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            setImages((prev) => {
                if (!cursor) {
               
                    return data.images.reverse();
                }

                const newImages = data.images.reverse().filter(
                    (img) => !prev.some((prevImg) => prevImg.url === img.url)
                );
                return [...prev, ...newImages];
            });

            setNextCursor(data.next_cursor || null);
        }
    } catch (error) {
        console.error("Error fetching images:", error);
        alert("An error occurred while fetching the images.");
    } finally {
        setLoading(false);
    }
};

  // const fetchImages = async (cursor = null) => { // page = 1
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/images?limit=4${
  //         cursor ? `&next_cursor=${cursor}` : ""
  //       }`
  //     );
  //     // GET http://localhost:3000/images?page=2&limit=12&next_cursor=<next_cursor_value>

  //     const data = await response.json();
  //     console.log(data);
      
  //     if (response.ok) {
  //       setImages((prev) => {
  //         // Verhindert duplizierte Einträge
  //         const newImages = data.images.reverse().filter((img) => !prev.includes(img));
  //         return [...prev, ...newImages];
  //       });
  //       setNextCursor(data.next_cursor);
  //       // setCurrentPage(data.currentPage);
  //       // setTotalPages(data.totalPages);
  //     }
  //   } catch (error) {
  //     console.error("Fehler beim Abrufen der Bilder:", error);
  //     alert("An error occurred while fetching the images.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchImages();
  }, []);

  // useEffect(() => {
  //   fetchImages(currentPage);
  // }, [currentPage]);

  // const handlePageChange = (page) => {
  //   if (page > 0 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  const handleUploadSuccess = (imageUrl) => {
    // setImages((prevImages) => [
    //   { url: imageUrl, created_at: new Date().toISOString() }, 
    //   ...prevImages,
    //]);
    fetchImages();
  };

  const openOverlay = (imgSrc) => {
    setOverlayImg(imgSrc);
  };

  const closeOverlay = () => {
    setOverlayImg(null);
  };

  return (
    <>
      <main>
        <Upload
          onUploadSuccess={handleUploadSuccess}
          fetchImages={fetchImages}
        />

        {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}

        <section className="gallery_section">
          {images.map((imgSrc, index) => (
            <div key={index} className="image_container">
              <img
                src={imgSrc}
                alt={`img-${index}`}
                onClick={() => openOverlay(imgSrc)}
              />
            </div>
          ))}
        </section>

        {nextCursor && (
          <button onClick={() => fetchImages(nextCursor)} disabled={loading}>
            {loading ? "Laden..." : "Mehr anzeigen"}
          </button>
        )}

        {/* Overlay */}
        {overlayImg && (
          <div className="overlay" onClick={closeOverlay}>
            <div
              className="overlay_content"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={overlayImg} alt="Enlarged view" />
              <button onClick={closeOverlay}>Close</button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
