
const body = document.querySelector('body');
let quote = document.querySelector('.quote').textContent;
let quoteBox = document.querySelector('#quote-box');
let citation = quoteBox.querySelector('.citation').textContent;
let year = quoteBox.querySelector('.year').textContent;
const btn = document.getElementById('loadQuote');
let count = 0;


// hardcoded quotes in array.
const quotes = [
{
	quote: 'Either write something worth reading or do something worth writing',
	source: 'Benjamin Franklin',
	citation: 'http://www.famousquotesandauthors.com/popular_quotes.html',
	year: '1706-1790',
	tags: '-funny, wise'
}, {
	quote: 'A happy man is too satisfied with the present to dwell too much on the future.',
	source: 'Albert Einstein',
	citation: 'Smithsonian',
	year: '1979',
	tags: '-humble'
}, {
	quote: 'Life is ten percent what happens to you and ninety percent how you respond to it.',
	source: 'Charles Swindoll',
	citation: 'http://brightdrops.com/famous-quotes-about-life',
	year: '1879-1955',
	tags: '-enthusiastic, powerful'
}, {
	quote: 'We should take care not to make the intellect our god; it has, of course, powerful muscles, but no personality.',
	source: 'Albert Einstein',
	citation: 'http://www.famousquotesandauthors.com/popular_quotes.html',
	year: '1879-1955',
	tags: '-wise, funny'
}, {
	quote: 'Hatred is the coward\'s revenge for being intimidated.',
	source: 'George Bernard Shaw',
	citation: 'http://www.famousquotesandauthors.com/popular_quotes.html',
	year: '1856-1950',
	tags: '-poetic, strength'
}
];
// create random number from array.
const getRandomQuote = () => Math.floor(Math.random() * quotes.length);

const printQuote = () => {
	let num = getRandomQuote();
	let source = quotes[num].source;
	citation = quotes[num].citation;
	year = quotes[num].year || '';
	quote = quotes[num].quote;
	tags = quotes[num].tags || '';
	btn.style.background = `#${getRandomQuote()+2}e${getRandomQuote()+1}f${getRandomQuote()}d`.slice(0, 7);
	body.style.background = `#${getRandomQuote()+2}f${getRandomQuote()+1}f${getRandomQuote()}f`.slice(0, 7);

	quoteBox.innerHTML = `
	<p class="quote"> ${quote} </p>
	<p class="source"> ${source}
  		<span class="citation"> ${citation} </span>
  		<span class="year"> ${year} </span><br>
  		<span class="tags"> ${tags} </span>
	</p>`
	// fetch more quotes and push them to the array
	if (count < 30 ){
		let newQuote = $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
		  let aq = { quote: a[0].content.slice(3,-5), source: a[0].title, citation: a[0].link, year: '' };
		  quotes.push(aq);
		});
		count += 1;	
	} 
}

// either on click load random quote and fetch a new quote
btn.onclick = () => printQuote();

setInterval(function(){ printQuote(); }, 30000);






