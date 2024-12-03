const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Logger function
const p = _ => console.log(_);

const setup = () => {
    // Current working directory (where `node main.js` is executed from)
    const callerDir = process.cwd();

    // Simple dotenv loader
    const envPath = path.resolve(callerDir, '../.env');

    if (!fs.existsSync(envPath)) {
        console.warn('.env file not found. Skipping environment variable setup.');
        return null;
    }

    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');

        if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim();

            if (!process.env[key]) {
                process.env[key] = value.replace(/^['"]|['"]$/g, ''); // Strip quotes if present
            }
        }
    });

    const cookie = process.env.AOC_COOKIE;

    // Extract the folder name from the working directory
    const currentFolder = path.basename(callerDir);

    if (!fs.existsSync('input.txt')) {
        try {
            if (!cookie) {
                throw new Error('AOC_SESSION_COOKIE environment variable is not set');
            }

            execSync(`curl "https://adventofcode.com/2024/day/${currentFolder}/input" -H "cookie: session=${cookie}" -o "input.txt" 2>/dev/null`);
            p('Input file downloaded.');
        } catch (err) {
            p('Error fetching input file:', err.message);
            process.exit(1);
        }
    }

    return fs.readFileSync(path.resolve(callerDir, 'input.txt'), 'utf8');
};

module.exports = { setup, p };

