function formatDate(dateData) {
  const date = new Date(dateData);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

function generateSerialNumber(index, currentPage, itemsPerPage) {
  return index + 1 + (currentPage - 1) * itemsPerPage;
}

function jsonToCsv(jsonData) {
  let csv = "";
  let headers = Object.keys(jsonData[0]);
  csv += headers.join(",") + "\n";
  jsonData.forEach(function (row) {
    let data = headers.map((header) => JSON.stringify(row[header])).join(",");
    csv += data + "\n";
  });
  return csv;
}

export { formatDate, generateSerialNumber, jsonToCsv };
