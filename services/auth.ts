export const login = async (username: string, password: string) => {
  const token = btoa(`${username}:${password}`);

  try {
    const response = await fetch("api/v2/", {
      method: "GET",
      headers: {
        Authorization: `Basic ${token}`,
      },
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};
