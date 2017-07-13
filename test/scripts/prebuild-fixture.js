module.exports = {
    process () {
        global.__prebuildFixture = [ 1 ];

        return new Promise(resolve => {
            setTimeout(() => {
                global.__prebuildFixture.push(2);
                resolve();
            }, 50)
        })        
    }
}