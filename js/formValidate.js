/********f************
    
	Project 4 Javascript
	Name: Jason Li
	Date: Dec 4, 2024
	Description: JS for Project 4

*********************/

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();

		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}

	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear Message?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("name").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
	//	Complete the validations below
	// Code for flag, add by Jason.
	let errorFlag = false;

	// Validate Shipping Information, added by Jason
	let requireFields = ["name", "phone", "email", "message"];
	for(let i = 0; i < requireFields.length; i++)
	{
		let textFields = document.getElementById(requireFields[i]);
		if(!formFieldHasInput(textFields))
		{
			document.getElementById(requireFields[i] + "_error").style.display = "block";

			if(!errorFlag)
			{
				textFields.focus();
				textFields.select();
			}
			errorFlag = true;
		}
	}

	// Validate phone, added by Jason
	let regexPostal = new RegExp(/^\d{10}$/);

	let postalValue = document.getElementById("phone").value;

	if(!regexPostal.test(postalValue) && formFieldHasInput(document.getElementById("phone")))
	{
		document.getElementById("phoneformat_error").style.display = "block";

		if(!errorFlag)
		{
			document.getElementById("phone").focus();
			document.getElementById("phone").select();
		}

		errorFlag = true;
	}

	// Validate Email, added by Jason
	let regexEmail =  new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

	let emailValue = document.getElementById("email").value;

	if(!regexEmail.test(emailValue) && formFieldHasInput(document.getElementById("email")))
	{
		document.getElementById("emailformat_error").style.display = "block";

		if(!errorFlag)
		{
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		errorFlag = true;
	}

	// Code above here
	return errorFlag;
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Determines if a text field element has input, added by Jason.
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement) {
	// Check if the text field has a value
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str) 
{
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}

/*
 * Handles the load event of the document.
 */
function load() {
	// Hide all the errors when the website initializes
	hideErrors();

	// Add event listener for the form submit
	document.getElementById("messageform").addEventListener("submit", validate);

	// Add event listener for the reset button, added by Jason.
	// document.getElementById('messageform').reset();
	document.getElementById("messageform").addEventListener("reset", resetForm); 
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);