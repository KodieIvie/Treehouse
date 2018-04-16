// # PAGINATION SCRIPT
// ## OPEN WRAPPER FUNCTION
	// Wrapping script in function to keep variables out of page scope
(function() {
	// ## SCRIPT VARIABLES
			// Configure results per page and minimum count of students for search-ability
	const studentsPerPage = 10;
	const minStudentsToSearch = 2;
			// Define list of visible students (fitting search criteria, if any) and count of them
	let $students = $('.student-item:visible');
	let countOfStudents = $students.length;
	// ## FUNCTIONS
		// Style page links based on the active page 
	const styleLinksForPage = (pageNumber) => {
		$('.pagination ul')
			.find('li a')
			.removeClass("active")
			.addClass("page-link")
			.end()
			.find(`li:nth-child(${pageNumber}) a`)
			.addClass("active")
			.removeClass("page-link");
	} 
		// Show correct students, given the page number
	const filterStudentsForPage = (pageNumber) => {
			// * get upper and lower bounds of indexes for students to show
		const firstStudent = (pageNumber - 1) * studentsPerPage + 1;
		const lastStudent = ( pageNumber * studentsPerPage );
			// * show students in page's range
		for (s = 1; s <= countOfStudents; s++) {
			let thisStudent = $students.get(s-1);
			if (firstStudent <= s && s <= lastStudent) {
				$(thisStudent).css('display', 'block');
			} else {
				$(thisStudent).css('display', 'none');
			}
		}
	}
		// Generate correct number of page links in footer
	const createPageLinks = () => {
			// Get count of pages needed based on count of countOfStudents and studentsPerPage
		const pageCount = (countOfStudents > studentsPerPage) ? Math.ceil(countOfStudents/studentsPerPage) : 1;
				// * add pagination div and links for the correct number of pages to footer
		$('.page').append(
		`<!-- pagination HTML created dynamically -->
			<div class="pagination">
				<ul>
				</ul>
			</div>
		 <!-- end pagination -->`
			);
		for ( p = 1; p <= pageCount; p++ ) {
			$('.pagination ul').append(
				`<li>
					<a href="#${p}">${p}</a>
				</li>`
			);
		}
	}
		// Create search box and button in header
	const createSearchUi = () => {
			// IF enouch students exist to enable Search functinoality, 
		if (countOfStudents >= minStudentsToSearch) {
				// * add HTML for the search UI
			$('.page-header').append(
			`<!-- student search HTML added dynamically -->
						<div class="student-search">
						<input type="text" name="search" placeholder="Search for students...">
						<button type="submit">Search</button>
						</div>
			<!-- end search -->`
			);
		} 
	}
		// Create and hide "No results" message
	const createHideNoResultsMessage = () => {
		$('.student-list').append(
			`<p class="no-results">No results found. Try searching for something else.</p>`
		);
		$('.no-results').css('display', 'none');
	}
		// Remove page links from footer
	const removePageLinks = () => {
				$('.pagination').remove();
	}
		// Paginate a list of visible students (based on search query, if any)
	const paginate = () => {
				// Evaluate if pagination is needed; if so, setup first page...
		if (countOfStudents > studentsPerPage) {
					// Crate page links and style for the first page; and
			createPageLinks();
			styleLinksForPage(1);
					// Filter students to show only the first page
			filterStudentsForPage(1);
					// On click of a pagination link,
			$('.pagination').on("click", '.page-link',  function (e) {
						// * get page number of the clicked link
				let destinationPage = parseInt(+( $(this).text() ));
						// * style the footer links based on the click
				styleLinksForPage(destinationPage);
						// * filter the student list based on the clicked link
				filterStudentsForPage(destinationPage);
			});
		}
	};
		// Search for the string, given the text entered in Search box
	const search = () => {
			// Define list of all students and count of all students
		const $allStudents = $('.student-item');
		const countOfAllStudents = $allStudents.length;
			// * define the search query string, entered by user into Search box
		const thisQuery = $('.student-search input').val();
			// Remove page links from footer
		removePageLinks();
			// Loop through all students
		for (s = 0; s < countOfAllStudents; s++) {
				// * define the student (in DOM)
			let thisStudent = $allStudents.get(s);
				// * define student's name and email (to search in)
			let thisStudentName = $(thisStudent).find('h3').html();
			let thisStudentEmail = $(thisStudent).find('.email').html();
				// * IF student's name/email contain query, display the student;
				// * ELSE, hide student;
			if (thisStudentName.includes(thisQuery) || thisStudentEmail.includes(thisQuery)) {
				$(thisStudent).css('display', 'block');
			} else {
				$(thisStudent).css('display', 'none');
			}
		}
			// Re-define list of visible students (search results)
		$students = $('.student-item:visible');
			// Re-define count of visible students (search results)
		countOfStudents = $students.length;
			// IF students are visible,
		if (countOfStudents<1) {
				// * display the no-results message
			$('.no-results').css('display', 'block');
		} else {
			// ELSE, hide message and paginate for visible students (search results)
			$('.no-results').css('display', 'none');
			paginate();
		}
	}
		// Setup the page (for initial page load)
	const setupPage = () => {
		createSearchUi();
		createHideNoResultsMessage();
		paginate();
	}
	// ## EVENT HANDLERS
		// On page load, setup page
	$('page').on("load", setupPage());
		// On button click, search for text in Search box
	$('.student-search button').on('click', function () {
		search()
	});
		// On key press of Enter key (key code 13), simulate press of Search button 
	$('.student-search').keypress(function(e) {
			let key = e.which;
			if (key == 13) {
				$('.student-search button').click();
			}
	});
	// ## CLOSE WRAPPER FUNCTION
})();
// ✅ ✅ 🎉