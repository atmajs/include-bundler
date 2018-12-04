export class Dictionary<T extends {id: string}> {
    hash: {[id: string]: T} = {}
    arr: T[] = []
    add (...arr: T[]) {
        for (let i = 0; i < arr.length; i++) {
            let x = arr[i];
            if (this.hash[x.id] != null) {
                continue;
            }
            this.hash[x.id] = x;
            this.arr.push(x);
        }
    }
    insert (x: T, i: number) {
        if (this.hash[x.id] != null) {
            this.remove(x);
        }
        this.hash[x.id] = x;
        this.arr.splice(i, 0, x);
    }
    has (x: T) {
        return this.hash[x.id] != null;
    }
    indexOf (x: T) {
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i].id === x.id) {
                return i;
            }
        }
        return -1;
    }    
    remove (x: T) {
        delete this.hash[x.id];
        let i = this.arr.findIndex(module => module.id === x.id);
        this.arr.splice(i, 1);
    }
    
    removeByFn (fn: (x: T) => boolean) {
        let handled = new Dictionary<T>();
        while (true) {
            
            let i = -1,
                length = this.arr.length;

            while(++i < length) {
                let x = this.arr[i];
                if (handled.has(x)) {
                    continue;
                }
                handled.add(x);
                if (fn(x)) { 
                    this.arr.splice(i, 1);
                    delete this.hash[x.id];                                        
                }
                break;
            }
            if (i === length) {
                break;
            }
        }
    }
    forEach (fn: (x: T, i?: number) => void | any) {
        let handled = new Dictionary<T>();
        while (true) {
            
            let i = -1,
                length = this.arr.length;

            while(++i < length) {
                let x = this.arr[i];
                if (handled.has(x)) {
                    continue;
                }
                handled.add(x);
                fn(x, i);
                break;
            }
            if (i === length) {
                break;
            }
        }
    }
}

