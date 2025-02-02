export const cellStyle=(info:any)=>{
    const day = info.date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const today = new Date(); // Get today's date
    if (day === 0) {
        info.el.style.backgroundColor = "#FFCDB2"; // Light red for Sundays
    }

    // Check if the date is today
    if (info.date.toDateString() === today.toDateString()) {
        info.el.style.backgroundColor = "#BFBBA9"; // Change color to #BFBBA9 for today
    }

    // Apply improved border color and style
    info.el.style.border = "1px solid #D7D3BF"; // Lighter, cooler border color
    info.el.style.borderRadius = "5px"; // Optional: round the corners for a smoother look
}