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
        const { page = 1, limit = 4 } = req.query;
        const result = await cloudinary.api.resources({
            type: "upload",
            prefix: "fileZero",
            max_results: limit,
            next_cursor: req.query.next_cursor || undefined
        })
        res.status(200).json({
            images: result.resources.map((img)=> img.secure_url),
            next_cursor: result.next_cursor,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Fehler beim Abrufen der Bilder!" });
    }
}

// export async function allImages(req, res) {
//     try {
//         const { page = 1, limit = 12 } = req.query;
//         const parsedPage = parseInt(page, 10);
//         const parsedLimit = parseInt(limit, 10);
        
//         // Hole die Ressourcen aus Cloudinary, wobei die Cursor-basierte Paginierung verwendet wird
//         const result = await cloudinary.api.resources({
//             type: "upload",
//             prefix: "fileZero",
//             max_results: parsedLimit,
//             next_cursor: req.query.next_cursor || undefined
//         });

//         // Berechne die Gesamtzahl der Seiten
//         const totalImages = result.resources.length;  // Gesamtanzahl der Bilder
//         const totalPages = Math.ceil(totalImages / parsedLimit); // Gesamtzahl der Seiten

//         // Erstelle die Antwort mit den Bildern und der Paginierung
//         res.status(200).json({
//             images: result.resources.map((img) => img.secure_url),
//             currentPage: parsedPage,  // Aktuelle Seite
//             totalPages: totalPages,   // Gesamtseitenzahl
//             next_cursor: result.next_cursor,  // Nächster Cursor, falls vorhanden
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: "Fehler beim Abrufen der Bilder!" });
//     }
// }