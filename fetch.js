// Import axios
const axios = require('axios');
// Import fs
const fs = require('fs');

const fetchData = (tags, dir) => {
// Fetch data from the url
	axios.get(`https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&tags=${tags}&limit=10000`)
		.then(function (response) {
			// For each post
	  	response.data.forEach(function (post) {
				// Download the image
				axios.get(`https://safebooru.org/images/${post.directory}/${post.image}`, { responseType: 'arraybuffer' })
					.then(function (response) {
						// Check if the directory exists
						if (!fs.existsSync(dir)) {
							// Create the directory
							fs.mkdirSync(dir);
						}
						// Check if directory already has the image
				    if(!fs.existsSync(`./${dir}/${post.image}`)) {
							// Write image to directory 
							fs.writeFile(`./${dir}/${post.image}`, response.data, 'binary', function (err) {
							if (err) {
								console.log(err);
							}
							});
						}
					});
				});
			})
	.catch(function (error) {
		// Handle error
		console.log(error);
	})
}

fetchData('pururut', 'images/pururut');
fetchData('histoire', 'images/histoire');
