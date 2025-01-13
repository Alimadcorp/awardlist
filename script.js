function validate(input) {
  let err = document.getElementById("errorMessage");
  let table = document.getElementById("scheduleTable");
  err.textContent = "";
  table.style.display = "none";

  if (!input.trim()) return (err.textContent = "Input cannot be empty."), false;
  if (/[a-zA-Z]/.test(input))
    return (err.textContent = "Input cannot contain alphabets."), false;
  if (!/^\d{1,4}-\d{1,2}(-\d{2})?$/.test(input))
    return (
      (err.textContent = 'Invalid format. Please enter in "XXXX-X-XX"'), false
    );
  if (extract(input)?.grade > 2 || extract(input)?.grade < 1)
    return (err.textContent = "You must be either 1st year or 2nd year"), false;
  return true;
}
