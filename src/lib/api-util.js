export async function fetchPosts(page) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/laibo/api/posts/fetch?limit=20&page=${page}`);
        
        try {
        
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
         const responseData = await response.json();
        //  const data = responseData.data;
         
          // setPosts(prevPosts => [...prevPosts, ...data]);
          return responseData.data; 
      
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
    // setDetails(data?.data)
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
