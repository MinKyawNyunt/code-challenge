const domain = 'https://interview.switcheo.com';

export async function get(url: string) 
{
  try {
    const response = await fetch(`${domain}/${url}`);

    if (!response.ok) {
      throw new Error("Failed to fetch token prices");
    }
    
    return await response.json();
  } catch (error) {
    console.error(`errror fetching ${url}`, error);
    throw error;
  }
}