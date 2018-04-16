$(function () {
	// ajax api variables
	const url = 'https://randomuser.me/api/?results=12&nat=us';
	const employeeList = [];
	const $employees = $('#employees');
	const searchBox = $('<span><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFQcbmPv14dPlnEXTyMeIdXN7JoYAhTUvXxlsZW2D4lmedfzqq"><input type="search" class="search" name="search" value="" placeholder="Search Employee\'s"></span>');

	// creates employee and modal
	const append = () => {
		// iterates through employees
		$(...employeeList).each((i, val) => {
			 let $newDiv = $(`
			 	<div class="col-4 employee" id="${i}" data-toggle="modal" data-target="#modal${i}">
					<div class="photo">
						<img src=${val.picture.large} alt="" class="rounded-circle">
					</div>	
					<div class="details">
						<p class="name text-capitalize">${val.name.first} ${val.name.last}</p>
						<p class="email">${val.email}</p>
						<p class="text-capitalize city">${val.location.city}</p>
						<p class="uName">${val.login.username}</p>
					</div>	
				</div>

				<!-- creates modal -->
				<div class="modal " id="modal${i}">
					<div class="modal-dialog">
						<div class="modal-content">

							<!-- Modal Header -->
							<div class="modal-header">
								<h4 class="modal-title"></h4>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
								<div class="container">
									<div class="row">
										<div class="col text-center mdetails">
											<img src=${val.picture.large} alt="" class="rounded-circle">
											<p class="name text-capitalize">${val.name.first} ${val.name.last}</p>
											<p class="email">${val.email}</p>
											<p class="city text-capitalize">${val.location.city}</p>
											<hr class="w80 pt-1 pb-1">
											<p class="username">${val.login.username}</p>
											<p class="cell">${val.cell}</p>
											<p class="address text-capitalize">${val.location.street}<br>${val.location.city}, ${val.location.state} ${val.location.postcode}</p>
											<p class="bday">Birthday: ${val.dob.slice(5, 7)}/${val.dob.slice(8, 10)}/${val.dob.slice(2,4)}</p>
											<br>
										</div>
									</div>
								</div>
							</div>
							<!-- Modal footer -->
							<div class="modal-footer">                
								<button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#modal${i-1}">&lang;</button>
								<button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#modal${i+1}">&rang;</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`);

			$newDiv.appendTo($employees);
		});
	};
	// initialize ajax to collect random user info and append with click listeners
	$.get(url, (data) => {
		employeeList.push(data.results);
		append();
		modal();
		searchBoxHandler();

		$('button[data-target$="-1"]').html("&chi;")
		$('button[data-target$="12"]').html("&chi;")
	});

	const modal = () => {
	// listen for modal click
		$('#employees').on('click', (e) => {
			let $ind = e.target.id;
		});
	};
	// filter search results
	const searchBoxHandler = () => {
		$('p.title').append(searchBox);
		$('.search').on("keyup change",function () {
		    filter = $(this).val();
		    $('.details p.name').each(function () {
		    	// reset back to normal
		    	if (filter === ''){
		        	$('.employees').children().show();
		        };
		        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
		            $(this).parent().parent().hide();
		        } else {
		            $(this).parent().parent().show();
		        };
		    });
		});
	};



}); // end jquery
