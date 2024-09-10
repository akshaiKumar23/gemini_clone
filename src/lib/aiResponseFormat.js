const formatAIResponse = (response) => {
  return response
    .replace(/## (.+)/g, "<h3 class='font-semibold text-lg mb-2'>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/- (.+)/g, "<li class='ml-4'>$1</li>")
    .replace(/\n/g, "<br/>");
};

export default formatAIResponse;
