export async function getUserDetail(token, id) {
  const response = await fetch(`http://localhost:8080/api/v1/user/detail/${id}`,{
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to login.');
  }

  return responseData.data;
}