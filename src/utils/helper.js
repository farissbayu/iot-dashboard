function formatDate(dateData) {
  const date = new Date(dateData);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

export { formatDate };
