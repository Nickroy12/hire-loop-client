
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const serverFetch = async(path)=>{
try {
    const res = await fetch(`${baseUrl}${path}`)
  return await res.json();
  
} catch (error) {
  console.log(error);
  return {}
}
}

export const serverMutation = async (path , data, method = 'POST') => {
 console.log(baseUrl , path , data , "esr");
 try {
     const res = await fetch(`${baseUrl}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });



    return await res.json();
 } catch (error) {
    console.log(error);
  return {}
 }

}