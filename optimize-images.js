const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, 'assets');
const optimizedDir = path.join(assetsDir, 'optimized');

/**
 * Asynchronously optimizes JPEG images in the assets directory.
 * Creates an optimized directory, resizes images to fit within 800x600 pixels,
 * reduces quality to 80%, and saves the optimized images.
 * @returns {Promise<void>} A promise that resolves when all images have been processed.
 */
async function optimizeImages() {
    try {
        // Create optimized directory if it doesn't exist
        await fs.mkdir(optimizedDir, { recursive: true });

        // Get all jpeg files in the assets directory
        const files = await fs.readdir(assetsDir);
        ```
        /**
         * Filters an array of files to return only JPEG image files.
         * @param {string[]} files - An array of file names to filter.
         * @returns {string[]} An array containing only the JPEG image file names (case-insensitive).
         */
        ```
        const imageFiles = files.filter(file => file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.jpg'));

        for (const file of imageFiles) {
            const inputPath = path.join(assetsDir, file);
            const outputPath = path.join(optimizedDir, file);

            try {
                await sharp(inputPath)
                    .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
                    .jpeg({ quality: 80 })
                    .toFile(outputPath);

                console.log(`Optimized: ${file}`);
            } catch (error) {
                console.error(`Error optimizing ${file}: ${error.message}`);
            }
        }

        console.log('Image optimization complete.');
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
}

optimizeImages();