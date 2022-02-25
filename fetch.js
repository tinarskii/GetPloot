// Import axios
const axios = require('axios');
// Import fs
const fs = require('fs');
// Fetch data from the url
axios.get('https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&tags=pururut&limit=10000')
	.then(function (response) {
		// For each post
	  response.data.forEach(function (post) {
			// Download the image
			axios.get(`https://safebooru.org/images/${post.directory}/${post.image}`, { responseType: 'arraybuffer' })
				.then(function (response) {
					// Write image to directory '/images'
					fs.writeFile(`./images/${post.image}`, response.data, 'binary', function (err) {
						if (err) {
							console.log(err);
						}
					});
				});
		})
	})
	.catch(function (error) {
		// Handle error
		console.log(error);
	})
