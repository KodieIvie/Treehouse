$(function(){

const $page = $(".page");
const srchBtn = $('.student-search button');
const $pagination = $("<ul>", {"class": "pagination"});
let $list = $(".student-item");
let active = 1;
let filter = '';
	// create search box and append to page-header
let $search = $(`<div class="student-search">
		           <input placeholder="Search for students...">
		           <button>Search</button>
			     </div>`);
$('.page-header').append($search);

	// find out how many pages/buttons we need and create them, for pagination links.
let genList = (list) => {
	let pages = [];
	$list = list.filter('li:visible');
	y = 0;
	z = 10;
		// remove old before adding new pagination
	$('.pagination').remove();
	$page.append($pagination);

	let c10 = Math.floor($list.length / 10);
	if ($list.length % 10) c10++;
		// pagination creation
	for (let x = 1; x <= c10; x++){
		if ($list.length > 10) {
			let li = $(`<li><a href="#">${x}</a></li>`);
			$('.pagination').append(li);
		}
		pages.push($list.slice(y, z));
		y = z;
		z += 10;
	};

	// hide everything then show the first 10
	$list.hide();
	$list = $(pages);
	$list[0].show()
	
	$('.pagination a:first').addClass('active');
	// $list[0].show();
	// console.log($list)
	genLe();
};
	// add listeners to newly created buttons
let genLe = () => {
	// listen for click then hide/show li's and classes
	$('.pagination li').on('click', (event) => {
		// event.preventDefault();
		active = parseInt(event.target.textContent);
		let pageIndex = active - 1;
		let toShow = $list[pageIndex];

		// reassign class active
		$('.pagination a').removeClass('active');
		$(event.target).addClass('active');
		// hide present li's and show selected ones
		$('.student-item').hide();

		$(toShow).show();
	});
};

// create search functionality
$(".student-search input").on('change keyup', function () {
	$('.pagination').remove();
	
    let filter = $(this).val();

    if(filter) {
      // this finds all links in a list that contain the input,
      // and hide the ones not containing the input while showing the ones that do
      $('.student-item').find("h3:not(:Contains(" + filter + "))").parent().parent().slideUp();
      $('.student-item').find("h3:Contains(" + filter + ")").parent().parent().slideDown();
    } else {
      $('.student-item').find("li").slideDown();
      console.log('empty filter')
      init();
    }
    return false;
  
    	
   	// genList($($list))
    // let user know when search doesn't match anything
	if ($('.student-list').children(':visible').length == 0){
		$('.student-list').append('<li class="flash"><h3>Oops! nothing matched...</h3></li>');
	} else {
		$('.flash').remove();
	};
});
	// set state of page on load
const init = () => {
	active = 1;
	pages = [];
	$list = $('.student-item');
	$list.show();
	genList($list);
	
};
	// load page
init();
});