class WebpackWatchRunPlugin {
    constructor() {}

    apply(compiler) {
        compiler.plugin('watch-run', (watching, done) => {
            const changedTimes = compiler.watchFileSystem.watcher.mtimes;
            const changedFiles = Object.keys(changedTimes)
                .map(file => `\n  ${file}`)
                .join("");
            if (changedFiles.length) {
                console.log('Files modified:', changedFiles);
            }
            done();
        });
    }
}

module.exports = WebpackWatchRunPlugin;
