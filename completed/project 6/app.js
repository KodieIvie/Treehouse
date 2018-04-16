// xray setup
const Xray = require('x-ray');
const x = Xray({
  filters: {
    slice: function (value, start , end) {
      return typeof value === 'string' ? value.slice(start, end) : value
    }
  }
});

// formatted dates
let date = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
let timeNow = new Date();

// file system management
const fs = require('fs');
const dir = './data';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// convert json to csv 
const json2csv = require('json2csv');
const fields = ['Title', 'Price', 'ImgUrl', 'Url', {label: 'Time', default: timeNow}];

// error handling
const handleErr = err => {
	if (err.code == 'ENOTFOUND'){
		const notFound = "Error 404, Not Found. Cannot connect to http://shirts4mike.com. @ " + timeNow + " \r\n";
		console.log(notFound);
		fs.appendFileSync('./scraper-error.log', notFound);
	} else {
		const errMsg =  timeNow + " There's been an error! " + err.message + " " + err.code + " \r\n";
		console.log(errMsg)
		fs.appendFileSync('./scraper-error.log', errMsg);
	}
}

// The Crawler/Scraper!!
x('http://shirts4mike.com/shirts.php', '.products li', [
{
  Title: x('a@href', '.shirt-details h1 | slice:4'),
  Price: x('a@href', '.price'),
  ImgUrl: 'img@src',
  Url: 'a@href'
}
])( (err, obj) => {
	if (err) handleErr(err);
	else {
		// convert to csv
		const csv = json2csv({ data: obj, fields: fields });
		// save file
		fs.writeFile(`data/${date}.csv`, csv, (err) => {
			if (err) handleErr(err);
		  	console.log('file saved!');
		});
		
	}
})
  
  

