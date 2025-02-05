


export function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}
export function reverseFormatDate(inputDate: string): string {
    const [year, month, day] = inputDate.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day)); // Month is zero-based
    
    const options: Intl.DateTimeFormatOptions = { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric' 
    };

    return date.toLocaleDateString('en-US', options);
}

console.log(reverseFormatDate("2025-02-05"));  // Output: "Feb 05, 2025"