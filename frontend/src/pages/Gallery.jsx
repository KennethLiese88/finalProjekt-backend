import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Upload from "../components/Upload";
import "./Gallery.css";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [overlayImg, setOverlayImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/images?page=${page}&limit=8`);
      const data = await response.json();
      console.log(data);

    if (response.ok) {
      setImages(data.images);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    }
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("An error occurred while fetching the images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      fetchImages(page);
    }
  };

  const handleUploadSuccess = () => {
    fetchImages(); // currentPage
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <section className="gallery_section">
          {loading
            ? <p><i className="fa-solid fa-fan fa-spin"></i> loading... </p>
            : images.map((imgSrc, index) => (
                <div key={index} className="image_container">
                  <img
                    src={imgSrc}
                    alt={`img-${index}`}
                    onClick={() => openOverlay(imgSrc)}
                  />
                </div>
              ))}
        </section>

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
