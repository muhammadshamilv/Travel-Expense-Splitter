
let totalMembers = 0;
let memeberName = [];
let currentNameIndex = 0;

function startNames() {
    totalMembers = parseInt(document.getElementById("numMembers").value);
    if (isNaN(totalMembers) || totalMembers < 1) {
        alert("Please enter a valid number of members!");
        return;
    }

    document.getElementById("step-1").style.display = "none";
    document.getElementById("step-2").style.display = "block";
    document.getElementById("namePrompt").innerText = `Enter name for member 1:`;
}


function saveName(){
    const nameInput = document.getElementById("memberName");
    const name = nameInput.value.trim();

    if(name === ""){
        alert("Name canot be empty....!");
        return;
    }

    memeberName.push(name);
    nameInput.value = "";

    currentNameIndex++;
    if(currentNameIndex < totalMembers){
        document.getElementById("namePrompt").innerText = `Enter name for Member ${currentNameIndex + 1}:`;
    }else{
        document.getElementById("step-2").style.display = "none";
        showExpenseInputs();
    }
}

function showExpenseInputs(){
    const container = document.getElementById("expenseInputs");
    container.innerHTML = "";

    memeberName.forEach((name, index)=> {
        container.innerHTML += `<div style="margin: 10px;">
                                    <label>${name}'s Expense :</label><br>
                                    <input type="number" id="expense${index}" placeholder="₹ Amount">
                                </div>`;
    });

    document.getElementById("step-3").style.display = "block";
}

function calculateExpenses(){
    let total = 0;
    const expenses = [];

    for(let i=0; i<totalMembers; i++){
        const amount = parseFloat(document.getElementById(`expense${i}`).value) || 0;
        expenses.push(amount);
        total += amount;
    }

    const average = total / totalMembers;
    let resultHTML = `<h3>Total : ${total.toFixed(2)}, Per Person : ₹${average.toFixed(2)}</h3>`;

    for(let i=0; i<totalMembers; i++){
        const balance = (expenses[i] - average).toFixed(2);
        if(balance > 0){
            resultHTML += `<p>${memeberName[i]} should receive ₹${balance}</p>`;
        }else if(balance < 0){
            resultHTML += `<p>${memeberName[i]} should pay ₹${Math.abs(balance)}</p>`;
        }else{
            resultHTML += `<p>${memeberName[i]} is settled</p>`;
        }
    }

    document.getElementById("resultArea").innerHTML = resultHTML;
}

function resetForm() {
    // Reset all global variables
    totalMembers = 0;
    memberNames = [];
    currentNameIndex = 0;

    // Hide all steps
    document.getElementById("step-1").style.display = "block";
    document.getElementById("step-2").style.display = "none";
    document.getElementById("step-3").style.display = "none";

    // Clear inputs
    document.getElementById("numMembers").value = "";
    document.getElementById("memberName").value = "";
    document.getElementById("expenseInputs").innerHTML = "";
    document.getElementById("resultArea").innerHTML = "";

    // Reset prompt text
    document.getElementById("namePrompt").innerText = "";
}

