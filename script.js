// Get the form element
const transactionForm = document.getElementById('transactionForm');

// Add event listener for form submission
transactionForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Collect form data
  const formData = new FormData(transactionForm);
  const data = {
    type: formData.get('type'),
    amount: formData.get('amount'),
    description: formData.get('description')
  };

  try {
    // Send a POST request to add a transaction
    const response = await fetch('/add-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      // If the transaction was added successfully, do something (e.g., update UI)
      console.log('Transaction added successfully');
      // Perform any necessary actions, such as updating the UI with the new transaction
    } else {
      console.error('Failed to add transaction');
    }
  } catch (error) {
    console.error('Error adding transaction:', error);
  }
});
