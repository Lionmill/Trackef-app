
const form = document.getElementById("expenses")
const descriptionInput = document.getElementById("description")
const amountInput = document.getElementById("amount")
const dateInput = document.getElementById("date")
const expenseList = document.getElementById("expenseList")
const balanceDisplay = document.querySelector(".balance")


let expenses = JSON.parse(localStorage.getItem("expenses")) || []

form.addEventListener("submit", function (e) {
  e.preventDefault()

  const desc = descriptionInput.value.trim()
  const amount = parseFloat(amountInput.value)
  const date = dateInput.value

  if (!desc || isNaN(amount) || !date) {
    alert("Please fill all fields correctly.")
    return
  }

  const expense = {
    id: Date.now(),
    description: desc,
    amount: amount,
    date: date,
  };

  expenses.push(expense)
  saveExpenses()
  showExpenses()
  updateBalance()
  form.reset()
});


function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses))
}


function showExpenses() {
  expenseList.innerHTML = ""

  expenses.forEach(function (exp) {
    const li = document.createElement("li");
    li.classList.add(exp.amount < 0 ? "expense" : "income")

    li.innerHTML = `
      ${exp.description} - Rwf ${exp.amount.toFixed(2)} on ${exp.date}
      <button onclick="editExpense(${exp.id})">Edit</button>
      <button onclick="deleteExpense(${exp.id})">Delete</button>
    `

    expenseList.appendChild(li)
  })
}

function updateBalance() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  balanceDisplay.textContent = total.toFixed(2)
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id)
  saveExpenses()
  showExpenses()
  updateBalance()
}


function editExpense(id) {
  const exp = expenses.find(exp => exp.id === id)
  if (!exp) return

  descriptionInput.value = exp.description
  amountInput.value = exp.amount
  dateInput.value = exp.date

  deleteExpense(id)
}

showExpenses()
updateBalance()
