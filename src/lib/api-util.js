// api-util.js

const customFetch = async (url, options = {}) => {
  const headers = {
    'X-Device': 'web',
    ...options.headers,
  };

  const customOptions = {
    ...options,
    headers,
  };

  const response = await fetch(url, customOptions);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export async function fetchPosts(page) {
  try {
    const data = await customFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/laibo/api/posts/fetch?limit=20&page=${page}`);
    return data.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

export async function fetchPost(postId) {
  try {
    const data = await customFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/laibo/api/posts/postdetails/${postId}`, { next: { revalidate: 180 } });
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

export async function searchUsername(query) {
  try {
    const data = await customFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/laibo/api/customer/search?query=${query}&page=1&limit=10`);
    return data;
  } catch (error) {
    console.error('Error fetching usernames:', error);
    throw new Error('Failed to fetch usernames');
  }
}

export async function login(email, password) {
  const response = await customFetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "msisdn": email, //Pass email, phone number or username
      "password": password,
    }),
  });
  return response;
}

export async function signUp(details) {
  const response = await customFetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: details,
  });
  return response;
}

export async function sendOTP(phone) {
  const response = await customFetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/otp/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "msisdn": phone, //Pass phone
    }),
  });
  return response;
}

export async function verifyOTP(phone, code) {
  const response = await customFetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/otp/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "msisdn": phone, //Pass phone
      "otp": code,
    }),
  });
  return response;
}

export async function fetchUserPosts(page, userId) {
  try {
    const data = await customFetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/posts/user/${userId}?limit=10&page=${page}`, { next: { revalidate: 180 } });
    return data.data;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

export async function fetchUserData(userId, bearerToken) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/info/${userId}`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const data = await customFetch(apiUrl, { method: 'GET', headers });
    return data.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
}

export async function fetchRichList(page) {
  try {
    const data = await customFetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/richlist?limit=10&page=${page}`);
    return data.data;
  } catch (error) {
    console.error('Error fetching rich list:', error);
    throw new Error('Failed to fetch rich list');
  }
}

export async function sendSTK(phone, amount, fcm, bearerToken) {
  const newAmount = parseFloat(amount);
  const params = JSON.stringify({
    msisdn: phone,
    amount: newAmount,
    fcm_token: fcm,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/mpesa/stk_push`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}

export async function fetchCustomerTransactions(bearerToken) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/transactions/customer?&page=1&limit=5`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const data = await customFetch(apiUrl, { method: 'GET', headers });
    return data.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transactions');
  }
}

export async function fetchCustomerTransactionsSummary(bearerToken) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/transactions/customersummary`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const data = await customFetch(apiUrl, { method: 'GET', headers });
    return data.data;
  } catch (error) {
    console.error('Error fetching transaction summary:', error);
    throw new Error('Failed to fetch transaction summary');
  }
}

export async function acceptOrDenyDeal(deal_id, deal_status, bearerToken) {
  const params = JSON.stringify({
    id: deal_id,
    deal_accepted: deal_status,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/deals/accept`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}

export async function dealResponses(deal_id, deal_status, status, bearerToken) {
  const params = JSON.stringify({
    id: deal_id,
    status: status,
    is_books_exchanged: deal_status,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/deals/exchangedone`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}

export async function fetchOffers(page,bearerToken) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/offers/customer?page=${page}&limit=10`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const data = await customFetch(apiUrl, { method: 'GET', headers });
    return data;
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw new Error('Failed to fetch offers');
  }
}

export async function fetchDeals(page, userId, bearerToken) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/deals/customer?page=${page}&limit=10&user_id=${userId}`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const data = await customFetch(apiUrl, { method: 'GET', headers });
    return data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw new Error('Failed to fetch deals');
  }
}

export async function updateProfilePicture(selectedFile, bearerToken) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/updateprofilepicture`;

  const formData = new FormData();
  formData.append("photos", selectedFile);

  const response = await customFetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  return response;
}

export async function updateName(bearerToken, details) {
  const params = JSON.stringify({
    first_name: details.first_name,
    last_name: details.last_name,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/updatename`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}

export async function updateUsername(bearerToken, username) {
  const params = JSON.stringify({
    username: username,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/updateusername`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}

export async function updateUserEmail(bearerToken, email) {
  const params = JSON.stringify({
    email: email,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/updateemail`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}

export async function updateUserPhone(bearerToken, phone) {
  const params = JSON.stringify({
    msisdn: phone,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/updatemsisdn`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}
export async function updateUserLocation(bearerToken, location) {
  const params = JSON.stringify({
    location: location,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/update-location`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}

export async function updateUserPassword(bearerToken, details) {
  const params = JSON.stringify({
    old_password: details.oldPass,
    password: details.newPass,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/updatepassword`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}

export async function setUserPassword(bearerToken, details) {
  const params = JSON.stringify({
    password: details,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/setpassword`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}

export async function applyOverdraft(selectedFile, kraPin, bearerToken) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/overdraftapplication`;

  const formData = new FormData();
  formData.append("id_card", selectedFile);
  formData.append("kra_pin", kraPin);

  const response = await customFetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  return response;
}

export async function requestWithdrawal(phone, amount, bearerToken) {
  const newAmount = parseFloat(amount);
  const params = JSON.stringify({
    msisdn: phone,
    amount: newAmount,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/mpesa/withdraw`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}

export async function fetchCategories() {
  try {
    const data = await customFetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/categories/fetch`);
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function uploadPosts(newPhotos, userId, bookDetails, category, bearerToken) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/posts/upload`;

  const formData = new FormData();
  newPhotos?.forEach((file) => {
    formData.append('photos', file);
  });

  formData.append("user_id", userId);
  formData.append("category_id", category);
  formData.append("title", bookDetails.title);
  formData.append("author", bookDetails.author);
  formData.append("description", bookDetails.description);
  formData.append("selling_price", bookDetails.askPrice);
  formData.append("last_price", bookDetails.lastPrice);
  formData.append("condition", bookDetails.condition);
  formData.append("type", bookDetails.bookType);
  formData.append("quantity", bookDetails.quantity);
  formData.append("latitude", 0.0);
  formData.append("longitude", 0.0);

  try {
    const data = await customFetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return data;
  } catch (error) {
    console.error('Error uploading your post:', error);
    throw new Error('Failed to upload your post');
  }
}

export async function editPosts(userId, postId,location, bookDetails, newPhotos, deleted, bearerToken) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/posts/edit`;

  const formData = new FormData();
  if (newPhotos.length > 0) {
    newPhotos?.forEach((file) => {
      formData.append('photos', file);
    });
  }

  formData.append("user_id", userId);
  formData.append("post_id", postId);
  formData.append("location", location);
  formData.append("category_id", bookDetails.category_id);
  formData.append("title", bookDetails.title);
  formData.append("author", bookDetails.author);
  formData.append("description", bookDetails.description);
  formData.append("selling_price", bookDetails.selling_price);
  formData.append("last_price", bookDetails.last_price);
  formData.append("condition", bookDetails.book_condition);
  formData.append("type", bookDetails.type);
  formData.append("quantity", bookDetails.quantity);
  formData.append("latitude", 0.0);
  formData.append("longitude", 0.0);
  formData.append("deleted_files", deleted);

  try {
    const data = await customFetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return data;
  } catch (error) {
    console.error('Error uploading your post:', error);
    throw new Error('Failed to upload your post');
  }
}

export async function deletePost(bearerToken, postId) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/posts/delete/${postId}`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'DELETE', headers });
}

export async function postFeedback(bearerToken, userId, feedback) {
  const params = JSON.stringify({
    user_id: userId,
    feedback: feedback,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/feedback/submit`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}

export async function makeBidOffer(bearerToken, details) {
  const newQuantity = parseFloat(details.quantity);
  const params = JSON.stringify({
    quantity: newQuantity,
    amount: parseFloat(details.amount),
    post_id: parseFloat(details.postId),
    deal_type: 6,
    deal_from: details.customer_id,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/deals/makeoffer`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}

export async function makeExchangeOffer(bearerToken, details, books_exchanged) {
  const newQuantity = parseFloat(details.quantity);
  const params = JSON.stringify({
    quantity: newQuantity,
    books_exchanged: books_exchanged,
    post_id: parseFloat(details.postId),
    deal_type: 7,
    deal_from: details.customer_id,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/deals/makeoffer`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}

export async function makeBorrowOffer(bearerToken, details) {
  const newQuantity = parseFloat(details.quantity);
  const params = JSON.stringify({
    quantity: newQuantity,
    return_date: details.returnDate,
    post_id: parseFloat(details.postId),
    deal_type: 5,
    deal_from: parseFloat(details.customer_id),
    amount:details.amount
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/deals/makeoffer`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  return customFetch(apiUrl, { method: 'POST', headers, body: params });
}
