Web scraping. - A TeamTreehouse techdegree project 6.

------- Instruction --------
In your cli run 

$ npm install 

then
$ npm start or 
$ node app.js


visits the website http://shirts4mike.com and uses http://shirts4mike.com/shirts.php as single entry point to scrape information 
for 8 tee-shirts from the site, without using any hard-coded urls like http://www.shirts4mike.com/shirt.php?id=101. 

Scraping and Saving Data:
The scraper should get the price, title, url and image url from the product page and save this information into a CSV file.
The information should be stored in an CSV file that is named for the date it was created, e.g. 2016-11-21.csv.
Assume that the the column headers in the CSV need to be in a certain order to be correctly entered into a database. They should be in this order: Title, Price, ImageURL, URL, and Time
The CSV file should be saved inside the ‘data’ folder.
If your program is run twice, it should overwrite the data in the CSV file with the updated information.

If http://shirts4mike.com is down, an error message describing the issue should appear in the console.
The error should be human-friendly, such as “There’s been a 404 error. Cannot connect to the to http://shirts4mike.com.”
To test and make sure the error message displays as expected, you can disable the wifi on your computer or device.