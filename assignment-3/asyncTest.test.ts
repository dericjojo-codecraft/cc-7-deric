import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { getFileType, getContents, getSize } from "./asyncTest";
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

let _dirName: string;
let _fileName: string;

beforeAll(() => {
    _dirName = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
    
    _fileName = path.join(_dirName, 'test.txt');
    fs.writeFileSync(_fileName, 'hello world');
});

afterAll(() => {
    fs.rmSync(_dirName, { recursive: true });
});

describe("Files Data", () => {
    // -- 1. getFileType --
    it("getFileType: returns FILE for a file", async () => {
        const type = await getFileType(_fileName);
        expect(type).toBe("FILE");
    });

    it("getFileType: returns DIRECTORY for a directory", async () => {
        const type = await getFileType(_dirName);
        expect(type).toBe("DIRECTORY");
    });

    // -- 1. getContents --
    it("getContents: returns the file name", async () => {
        const content = await getContents(_fileName);
        expect(content).toBe(_dirName+'/test.txt');
    });

    it("getContents: returns the files present in the directory", async () => {
        const content = await getContents(_dirName);
        expect(content).toStrictEqual([
            _dirName+"/test.txt",
        ]);
    });

    // -- 1. getFileType --
    it("getSize: returns the size of a file", async () => {
        const size = await getSize(_fileName);
        expect(size).toBe(Buffer.byteLength('hello world'));
    });

    it("getSize: returns true if size is greater than 0", async () => {
        const size = await getSize(_dirName);
        expect(size).toBeGreaterThan(0);
    });
});