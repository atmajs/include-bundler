import memd from 'memd';
import axios from 'axios';
import { io } from '../global'

export const FileActions = {
    readFile (path: string, opts) {
        if (/^https?:/.test(path)) {
            return HttpLoader.load(path, opts);
        }
        return io.File.readAsync(path, opts)
    },
    writeFile (path, content, opts){
        return io.File.writeAsync(path, content, opts);
    },
    clearFileCache () {
        io.File.clearCache();
    }
};


class HttpLoader {
    @memd.deco.memoize()
    static async load (url: string, opts?) {
        let resp = await axios.get(url);
        if (resp.status !== 200) {
            throw new Error(`Network error ${resp.status} for a file ${url}`);
        }
        if (typeof resp.data !== 'string') {
            throw new Error(`Expects text content from ${url}`);
        }
        return resp.data;
    }
}
