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
        setTimeout(async () => {
            try {
                const stats = await fs.promises.stat(path)
                
                if (stats.isFile()) {
                    resolve('FILE');
                } else if (stats.isDirectory()) {
                    resolve('DIRECTORY');
                } else {
                    reject();
                }
            } catch(err) { reject(err); }
        })
    })
}

// getFileType(_fileName)
//     .then(type => console.log("Type:", type))
//     .catch(err => console.error(err))

//function that gets you the file path of the file, or names of items of the folder
/**
 * Promise based implementation of fs.readdir
 * @param path is the parameter that is a file, directory or other
 * @returns the content of a path; if path is a file, returns file name; if path is a directory, calls the function again on the inner path
 */
async function getContents(path: string):Promise<string|string[]> { 
    const type = await getFileType(path)
    switch(type) {
        case "FILE": {
            return path;
        }
        case "DIRECTORY": {
            const files = await fs.promises.readdir(path)
            const result = await Promise.all(
                files.map(item => getContents(`${path}/${item}`))
            )
            return result.flat();
        }
        case "OTHER": {
            return Promise.reject(new Error("Unsupported file type"));
        }
    }
}

getContents(_fileName)
    .then(files => console.log("Files:", files))
    .catch(err => console.error(err))

// function that gets the size of the file or folder at given path
/**
 * Promise based implementation fs.readdir to get the total size of a path
 * @param path is the parameter that is a file, directory or other
 * @returns the size of a path; if path is a file, returns size of the file; if path is a directory, calls the function again on the inner path and gets the size of the whole directory
 */
async function getSize(filePath: string): Promise<number> {
    const contents = await getContents(filePath);
    if (Array.isArray(contents)) {
        return Promise.all(
            contents.map(file => fs.promises.stat(file).then(stats => stats.size))
        ).then(sizes => sizes.reduce((acc, curr) => acc + curr, 0));
    } else {
        return fs.promises.stat(contents).then(stats => stats.size);
    }
}

getSize(_dirName)
    .then(size => console.log("Size: "+size/1024+"kB"))
    .catch(err => console.error(err))