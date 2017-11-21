import fs from 'fs';

function writeFile(file, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) {
                reject(err);
            }
            resolve(`Write file ${file} success.`);
        });
    });
}

export {
    writeFile,
};
