"use server"

export async function performAction(action: string): Promise<string> {
  // Simulate server processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return different responses based on the action
  switch (action) {
    case "home":
      return "Home page content loaded"
    case "about":
      return "About information retrieved"
    case "contact":
      return "Contact details loaded"
    case "settings":
      return "Settings retrieved successfully"
    case "processData":
      try {
        const response = await fetch("http://localhost:3000/api/hello", {
          method: "GET",
        })
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        return data.message || JSON.stringify(data)
      } catch (error) {
        console.error("Error:", error)
        return "Error occurred while fetching data from external service"
      }
    case "fetchError":
      try {
        const response = await fetch("http://localhost:3000/api/exception", {
          method: "GET",
        })
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        return data.message || JSON.stringify(data)
      } catch (error) {
        console.error("Error:", error)
        return "Error occurred while fetching data from external service"
      }
    default:
      return `Action "${action}" completed successfully`
  }
}

