export const mainHeader = () => {
    return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authentication'))?.token  // Use stored JWT token
    }
} 