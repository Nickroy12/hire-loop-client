
const baseUrl = process.env.NEXT_BASE_URL;

export const serverMutation = async (path , data) => {
 console.log(baseUrl , path , data , "esr");
    const res = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });



    return res.json();

}