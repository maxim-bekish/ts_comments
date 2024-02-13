export class UserDataFetcher {
  static async fetchUserData(): Promise<any> {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error("Ошибка при запросе к API:", error);
      throw error;
    }
  }
}
