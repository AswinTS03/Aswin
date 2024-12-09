document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const updateExpenses = () => {
        expenseList.innerHTML = '';
        let total = 0;

        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${expense.title} - $${expense.amount} (${expense.category})</span>
                <button onclick="deleteExpense(${index})">Delete</button>
            `;
            expenseList.appendChild(li);
            total += parseFloat(expense.amount);
        });

        totalAmount.textContent = total.toFixed(2);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    const deleteExpense = (index) => {
        expenses.splice(index, 1);
        updateExpenses();
    };

    window.deleteExpense = deleteExpense;

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('category').value;

        if (title && amount && category) {
            expenses.push({ title, amount, category });
            expenseForm.reset();
            updateExpenses();
        }
    });

    updateExpenses();
});
