const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, 'assets');
const optimizedDir = path.join(assetsDir, 'optimized');

async function optimizeImages() {
    try {
        // Create optimized directory if it doesn't exist
        await fs.mkdir(optimizedDir, { recursive: true });

        // Get all jpeg files in the assets directory
        const files = await fs.readdir(assetsDir);
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