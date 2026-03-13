import fs from 'node:fs';
import path from 'node:path';

const _fileName = path.resolve('./assignment-1/test.txt');
const _dirName = path.dirname(_fileName);

// Returns a promise that when resolved will get you the type of file
// when error, it will come back with an Error with message "file system error"
/**
 * Promise based implementation of fs.stat
 * @param path is the parameter that is a file, directory or other
 * @returns the type of the path provided
 */
function getFileType(path: string): Promise<'FILE'|'DIRECTORY'|'OTHER'> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.promises.stat(path)
            .then(stats => {
                if (stats.isFile()) {
                    resolve('FILE');
                } else if (stats.isDirectory()) {
                    resolve('DIRECTORY');
                } else {
                    reject();
                }
            })
        })
    })
}

getFileType(_fileName)
    .then(type => console.log('Type:', type))
    .catch(err => console.error("file system error", err))

//function that gets you the file path of the file, or names of items of the folder
/**
 * Promise based implementation of fs.readdir
 * @param path is the parameter that is a file, directory or other
 * @returns the content of a path; if path is a file, returns file name; if path is a directory, calls the function again on the inner path
 */
function getContents(path: string):Promise<string|string[]> {
    return getFileType(path)
            .then(type => {
                switch(type) {
                    case "FILE":
                        return path;
                    case "DIRECTORY":
                        return fs.promises.readdir(path)
                            .then(files => {
                                return Promise.all(
                                    files.map(item => getContents(`${path}/${item}`))
                                ).then(result => result.flat());
                            })
                    case "OTHER":
                        return Promise.reject(new Error("Unsupported file type"));
                }
            })
    }

getContents(_dirName)
    .then(pathName => console.log(pathName))
    .catch(err => console.error(err));

// function that gets the size of the file or folder at given path
/**
 * Promise based implementation fs.readdir to get the total size of a path
 * @param path is the parameter that is a file, directory or other
 * @returns the size of a path; if path is a file, returns size of the file; if path is a directory, calls the function again on the inner path and gets the size of the whole directory
 */
function getSize(path:string):Promise<number> {
    return getFileType(path)
        .then(fileType => {
            switch (fileType) {
                case "FILE":
                    return fs.promises.stat(path)
                        .then(stats => stats.size)
                case "DIRECTORY":
                    return fs.promises.readdir(path)
                        .then(files => {
                            if (files.length === 0) return Promise.reject("No files available");

                            return Promise.all(
                                files.map(file => getSize(`${path}/${file}`))
                            ).then(sizes => sizes.reduce((acc, curr) => acc+curr, 0))
                        })
                default:
                    return Promise.reject(new Error("Unsupported file type"));
            }
        })
}

getSize(_dirName)
    .then(size => console.log("size: "+size/1024+"kB"))
    .catch(err => console.error(err));