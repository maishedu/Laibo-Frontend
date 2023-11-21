export async function fetchPosts(page) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/laibo/api/posts/fetch?limit=20&page=${page}`);
        
        try {
        
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
         const responseData = await response.json();
         const data = responseData.data;
          return data; 
      
        } catch (error) {
          console.error('Error fetching posts:', error);
          throw new Error('Failed to fetch posts');
        }
      
}

export async function fetchPost(postId) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}laibo/api/posts/postdetails/${postId}`);
 
  try {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
   
    return data;
  
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

export async function login(email,password){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "msisdn":email, //Pass email, phone number or username
            "password":password

        }),
    });
    const user = await response.json();
    return user;
}

export async function signUp(details){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/registration`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: details
    });
    const user = await response.json();
    return user;
}

export async function sendOTP(phone){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/otp/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "msisdn":phone, //Pass phone

        }),
    });
    const data = await response.json();
    return data;
}

export async function verifyOTP(phone,code){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/otp/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "msisdn":phone, //Pass phone
            "otp":code
        }),
    });
    const data = await response.json();
    return data;
}


export async function fetchUserPosts(page, userId) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/posts/user/${userId}?limit=10&page=${page}`);
  try {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    const data = responseData.data;
    return data;
  
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}


export async function fetchUserData(userId, bearerToken) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/info/${userId}`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json' 
  };

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: headers
  });

  try {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    const data = responseData.data;
      return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
}

export  async function fetchRichList(page) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/richlist?limit=10&page=${page}`);
  try {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    const data = responseData.data;
    return data;
  
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

export async function sendSTK(phone,amount,fcm, bearerToken) {
  const newAmount = parseFloat(amount)
  var params = JSON.stringify({
    msisdn: phone,
    amount: newAmount,
    fcm_token: fcm,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/mpesa/stk_push`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json' 
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: params,
  });
  
  const data = await response.json();
  return data;

}

export async function fetchCustomerTransactions(bearerToken) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/transactions/customer`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json' 
  };

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: headers
  });

  try {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    const data = responseData.data;
      return data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transactions');
  }
}


export async function fetchCustomerTransactionsSummary(bearerToken) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/transactions/customersummary`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json' 
  };

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: headers
  });

  try {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    const data = responseData.data;
      return data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transactions');
  }
}

export async function acceptOrDenyDeal(deal_id,deal_status ,bearerToken) {
 
  var params = JSON.stringify({
    id: deal_id,
    deal_accepted: deal_status,
   
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/deals/accept`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json' 
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: params,
  });
  
  const data = await response.json();
  return data;

}

export async function fetchOffers(bearerToken) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/offers/customer`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json' 
  };

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: headers
  });

  try {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
      return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
}

export async function fetchDeals(page,userId,bearerToken) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/deals/customer?page=${page}&limit=10&user_id=${userId}`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json' 
  };

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: headers
  });

  try {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
      return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
}

export  async function updateProfilePicture (selectedFile, bearerToken)  {
  
  const url = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/updateprofilepicture`;

  const formData = new FormData();

  formData.append("photos", selectedFile);
  
  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    }
  })

  const data = await response.json()
  return data;
    // .then((response) => response.json())

    // .then((result) => {
    //   console.log("Success:", result);
    // })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });

};

export async function updateName(bearerToken, details) {

  var params = JSON.stringify({
    first_name : details.first_name,
    last_name : details.last_name
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/updatename`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json' 
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: params,
  });
  
  const data = await response.json();
  return data;

}

export async function updateUsername(bearerToken, username) {

  var params = JSON.stringify({
    username : username,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/updateusername`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json' 
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: params,
  });
  
  const data = await response.json();
  return data;

}

export async function updateUserEmail(bearerToken, email) {

  var params = JSON.stringify({
    email : email,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/updateemail`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json' 
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: params,
  });
  
  const data = await response.json();
  return data;

}

export async function updateUserPhone(bearerToken, phone) {

  var params = JSON.stringify({
    msisdn : phone,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/updatemsisdn`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json' 
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: params,
  });
  
  const data = await response.json();
  return data;

}

export async function updateUserPassword(bearerToken, newPass , oldPass) {

  var params = JSON.stringify({
    old_password: oldPass,
    password: newPass
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/updatepassword`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json' 
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: params,
  });
  
  const data = await response.json();
  return data;

}

export  async function applyOverdraft(selectedFile, kraPin, bearerToken)  {
  
  const url = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/overdraftapplication`;

  const formData = new FormData();


  formData.append("id_card", selectedFile);
  formData.append("kra_pin", kraPin);
  
  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    }
  })

  const data = await response.json()
  return data;
    

};

export async function requestWithdrawal(phone,amount, bearerToken) {
  const newAmount = parseFloat(amount)
  var params = JSON.stringify({
    msisdn: phone,
    amount: newAmount,
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/mpesa/withdraw`;
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json' 
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: params,
  });
  
  const data = await response.json();
  return data;

}






