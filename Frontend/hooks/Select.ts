export const handleSelect = async (
  info: any, 
  setFormData: any
) => {
  const startTime = new Date(info.startStr);
  const endTime = new Date(info.endStr);
  console.log(startTime.toISOString());
  console.log(endTime.toISOString());
  setFormData({
    title: "",
    description: "",
    start: startTime.toISOString().slice(0, 16), // Store in ISO format
    end: endTime.toISOString().slice(0, 16),
  });
};