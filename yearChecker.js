// used to check dates before manually adding to database for seeding.

// const timestamp = 1709999290000
// Outputs: 09-03-2024 at 3:48 pm

// const timestamp = 1709999580000;
// Outputs: 09-03-2024 at 3:53 pm


const timestamp = 1709999680000; // amend timestamp and check for seeding
const date = new Date(timestamp);

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime = `${hours}:${minutes} ${ampm}`;

  return `${day}-${month}-${year} at ${strTime}`;
}

console.log(formatDate(date));

// node yearChecker.js