import fs from 'node:fs';
import path from 'node:path';

const _fileName = path.resolve('./assignment-1/test.txt');
const _dirName = path.dirname(_fileName);

// Returns a promise that when resolved will get you the type of file
// when error, it will come back with an Error with message "file system error"

function getFileType(path: string): Promise<'FILE'|'DIRECTORY'|'OTHER'> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.stat(path, (err, stats) => {
                if (err) { reject(err); return; }

                if (stats.isFile()) {
                    resolve('FILE');
                } else if (stats.isDirectory()) {
                    resolve('DIRECTORY');
                } else {
                    reject();
                }
            });
        })
    })
}

getFileType(_fileName)
    .then(type => console.log('Type:', type))
    .catch(err => console.error("file system error", err))

//function that gets you the file path of the file, or names of items of the folder
function getContents(path: string):Promise<string|string[]> {
    return new Promise((resolve, reject) => {
        getFileType(path)
            .then(type => {
                switch(type) {
                    case "FILE":
                        resolve(path);
                        break;
                    case "DIRECTORY":
                        fs.readdir(path, (err, files) => {
                            if(err) { reject(err); return; }
                            Promise.all(
                                files.map(item => getContents(`${path}/${item}`))
                            )
                            .then(result => resolve(result.flat()))
                            .catch(err => reject(err));
                        })
                        break;
                    case "OTHER":
                        reject(new Error("Unsupported file type"));
                        break;
                }
            })
            .catch(err => reject(err));
    })
}

getContents(_dirName)
    .then(pathName => console.log(pathName))
    .catch(err => console.error(err));

// function that gets the size of the file or folder at given path
function getSize(path:string):Promise<number> {
    return new Promise((resolve, reject) => {
    getFileType(path)
        .then(fileType => {
            switch (fileType) {
            case "FILE":
                fs.stat(path, (statErr, stats) => {
                    if (statErr) { reject(); return; }
                    resolve(stats.size);
                });
                break;

            case "DIRECTORY":
                fs.readdir(path, (readdirErr, files) => {
                    if (readdirErr) { reject(readdirErr); return; }
                    if (files.length === 0) { reject("No files available"); return; }

                    let totalSize = 0, pending = files.length;

                    files.forEach(file => {
                        const newPath = path+"/"+file;

                        getSize(newPath)
                        .then( size => {
                                totalSize += size;
                                if (--pending === 0) resolve(totalSize);
                            })
                        .catch( err => reject(err) );
                    });
                });
                break;
        }
        })
        .catch();
    })
}

getSize(_dirName)
    .then(size => console.log("size: "+size/1024+"kB"))
    .catch(err => console.error(err));