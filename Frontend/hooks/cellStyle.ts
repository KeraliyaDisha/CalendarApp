export const cellStyle=(info:any)=>{
    const day = info.date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const today = new Date(); // Get today's date
    if (day === 0) {
        info.el.style.backgroundColor = "#F5F5F5"; // Light red for Sundays
    }

    // Check if the date is today
    if (info.date.toDateString() === today.toDateString()) {
        info.el.style.backgroundColor = "#C7B7A3"; // Change color to #BFBBA9 for today
    }
}