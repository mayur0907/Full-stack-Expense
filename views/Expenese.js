let myForm = document.querySelector("#my-Form");
let amountInput = document.querySelector("#amount");
let descriptionInput = document.querySelector("#description");
let categoryInput = document.querySelector("#category");
let itemInput = document.querySelector("#users");

myForm.addEventListener("submit", saveToStorage);

function saveToStorage(e) {
  e.preventDefault();
  let amountAdd = amountInput.value;
  let descriptionAdd = descriptionInput.value;
  let categoryAdd = categoryInput.value;

  let obj = { amountAdd, descriptionAdd, categoryAdd };

  axios
    .post(`http://localhost:8000/add-expense`, obj)
    .then((response) => {
      // console.log(response.data.newExpense);
      addItem(response.data.newExpense);
    })
    .catch((error) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h3> Something Went Wrong </h3>";
      console.log(error);
    });
}
function addItem(obj) {
  let amountAdd = obj.expenseAmount;
  let descriptionAdd = obj.description;
  let categoryAdd = obj.category;

  let li = document.createElement("li");
  li.className = "items";
  li.textContent =
    li.textContent +
    obj.expenseAmount +
    "     " +
    obj.description +
    "    " +
    obj.category;
  itemInput.append(li);

  let deletebtn = document.createElement("button");
  deletebtn.className = "btn btn-outline-dark";
  deletebtn.appendChild(document.createTextNode("Delete Expense"));
  li.append(deletebtn);

  deletebtn.onclick = (e) => {
    deleteExpense(e, obj.id);
  };

  let editbtn = document.createElement("button");
  editbtn.appendChild(document.createTextNode("Edit Expense"));
  editbtn.className = "btn btn-outline-dark";
  li.appendChild(editbtn);

  editbtn.onclick = (e) => {
    updateExpense(e, obj, obj.id);
  };

  myForm.reset();
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:8000/get-expenses")
    .then((response) => {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        addItem(response.data[i]);
      }
    })
    .catch((error) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h3> Something Went Wrong </h3>";
      console.log(error);
    });
});

function deleteExpense(e, obj_id) {
  const deletedItem = e.target.parentElement;
  itemInput.removeChild(deletedItem);
  axios
    .delete(`http://localhost:8000/delete-expense/${obj_id}`)
    .then((response) => {
      console.log("inside axios delete function");
    })
    .catch((error) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h3> Something Went Wrong </h3>";
      console.log(error);
    });
  myForm.reset();
}

function updateExpense(e, obj, obj_id) {
  console.log("updateExpense called !!!");
  console.log(obj);

  amountInput.value = obj.expenseAmount;
  descriptionInput.value = obj.description;
  category.value = obj.category;

  itemInput.removeChild(e.target.parentElement);

  myForm.removeEventListener("submit", saveToStorage); // disable adding new items while updating

  myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let updatedObj = {
      amountAdd: amountInput.value,
      descriptionAdd: descriptionInput.value,
      categoryAdd: categoryInput.value,
    };
    console.log(updatedObj);
    axios
      .put(`http://localhost:8000/update-expense/${obj_id}`, updatedObj)
      .then((response) => {
        console.log(response.data.updatedExpense);
        addItem(response.data.updatedExpense);
        myForm.removeEventListener("submit", arguments.callee);
        myForm.addEventListener("submit", saveToStorage);
      })
      .catch((error) => {
        document.body.innerHTML =
          document.body.innerHTML + "<h3> Something Went Wrong </h3>";
        console.log(error);
      });
  });
}
