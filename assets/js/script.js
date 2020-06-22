window.onload = function () {
	const submitButton = document.querySelector('.submit');
	const display = Array.from(document.querySelectorAll('.weak ul'));
	const displayLi = Array.from(document.querySelectorAll('.weak ul li'));
	let url = 'https://aarkamprdxn.github.io/birthday-calender/assets/Json/User.json';
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
	const givenData = document.querySelector('textarea');
	let UsersData;
	let lastPick;
	let rand;
	displayLi.forEach((element) => {
		element.setAttribute('background',randomColor());
	})

	function randomColor() {
	  var color = ["green","blue","gray","yellow","orange","purple","pink"];
	  different = color[Math.floor(Math.random() * color.length)];
	  different == lastPick ? randomColor():different;
	  lastPick = different;
	  return different;
	}

	function getData() {
		// Fetching data 
		fetch(url)
		.then(function (response) {
			return response.json();
			})
			.then(function (data) {   
				UsersData = data;
				calculateDate(data);
			})
			.catch(function (error) {
				console.error("Get error on somewhere!!", error);
		});  
	}
	getData();

	function calculateDate(data,yearInput) {
		if(yearInput === undefined) {
			givenData.innerHTML = JSON.stringify(data,null,1);
			givenData.readOnly = true;
		} else {
			for (const [index, obj] of Object.entries(data)) {
				let name = obj.fullName;
				let birthDate = obj.Birthdate;
				let currentDate = yearInput + birthDate.slice(4);
				let nameArray = name.split(' ');
				let initials = nameArray[0].charAt(0) + nameArray[1].charAt(0);
				let birthDay = new Date(birthDate).getDay();
				let currentDay = new Date(currentDate).getDay();
				console.log(birthDay);
				console.log(currentDay);
				display.forEach((element) => {
					if(element.className === weekdays[currentDay]) {
						element.innerHTML += initials+" ";
					}
				});
			}	
		}
	}

	submitButton.addEventListener('click', (e) => {
		e.preventDefault();
		const yearInput = document.querySelector('.year').value;
		const validYear = /^[0-9]{4}$/;
		// Validation of year
		if (!validYear.test(yearInput)) {
			alert('Invalid input');
		}
		else {
			calculateDate(UsersData,yearInput);
		}
	});
}