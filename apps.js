//Listen for Submit
const form = document.querySelector('#loan-form');
form.addEventListener('submit', function(ian){
//Hide Results
document.getElementById('results').style.display = 'none';
//Show Loader
document.getElementById('loading').style.display = 'block';

setTimeout(calculateResults, 2000);
ian.preventDefault();
});

// Calculate Results
function calculateResults() {
  console.log('Cup')
//UI Vars
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment  = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');
const amount        = document.querySelector('#amount');
const interest      = document.querySelector('#interest');
const repayment     = document.querySelector('#repayment');


const principal          = parseFloat(amount.value);
const calculatedInterest = parseFloat(interest.value) / 100 / 12;
const calculatedPayments = parseFloat(repayment.value) * 12;

//compute monthly payment
const x       = Math.pow(1 + calculatedInterest, calculatedPayments);
const monthly = (principal*x*calculatedInterest)/(x-1);

if(isFinite(monthly)) {
  monthlyPayment.value  = monthly.toFixed(2);
  totalPayment.value    = (monthly * calculatedPayments).toFixed(2)
  totalInterest.value   =((monthly * calculatedPayments)-principal).toFixed(2);
  //Show Results
  document.getElementById('results').style.display = 'block';
  // Hide Loader
  document.getElementById('loading').style.display = 'none';
} else {
showError('Please Check Your Numbers')
document.getElementById('loading').style.display = 'none';
}
}


//Show Error
function showError(error) {
  // Create a div
  const errorDiv = document.createElement('div');
  //Get elements
  const card    = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  //Clear error after 2 secs
  setTimeout(clearError,2000);

}

function clearError() {
  document.querySelector('.alert').remove();
}