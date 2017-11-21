import fs from 'fs';

function readdir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, fileList) => {
            if (err) {
                reject(err);
            }
            resolve(fileList);
        });
    });
}
export {
    readdir,
};
