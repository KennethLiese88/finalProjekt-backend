import cloudinary from "../config/cloudinary.js";

export async function uploadImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "Keine Datei hochgeladen!" });
          }
        console.log(req.file);
        const imageUrl = req.file.secure_url;
        res.status(201).json({msg: "Bild erfolgreich hochgeladen!", imageUrl})
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Fehler beim Hochladen!" });
    }
}

export async function allImages(req,res){
    try {
        const { page = 1, limit = 8 } = req.query;
        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);

        const result = await cloudinary.search
            .expression('folder:fileZero') 
            .sort_by('created_at', 'desc')      
            .max_results(500) // parsedLimit        
            .execute();

        const totalImages = result.resources.length; 
        const totalPages = Math.ceil(totalImages / parsedLimit);

        const startIndex = (parsedPage - 1) * parsedLimit;
        const endIndex = startIndex + parsedLimit;

        const images = result.resources.slice(startIndex, endIndex).map(img => img.secure_url);

        res.status(200).json({
            images,
            currentPage: parsedPage,
            totalPages: totalPages,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Fehler beim Abrufen der Bilder!" });
    }
}