const util = require('util');
const exec = util.promisify(require('child_process').exec);


// takes name and create directory..
async function mkdir(dir_name) {

    const { stdout, stderr } = await exec(`mkdir data/media/${dir_name} data/media/${dir_name}/posts
    data/temp/images/${dir_name}`);
    
    if(stderr) {
        console.log(`unable to created directory named ${dir_name}`);
    }
}

module.exports = mkdir;  