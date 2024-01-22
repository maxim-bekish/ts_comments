// Определение интерфейса для данных, которые ожидаются от сервера
interface ApiResponse {
  first: string;
  last: string;
  title: string;
  picture: string;
}

// Пример функции, делающей fetch запрос
export default async function fetchData(): Promise<ApiResponse> {
  try {
    const response = await fetch("https://randomuser.me/api/");

    if (!response.ok) {
      throw new Error("Ошибка сети");
    }

    // Десериализация данных в ожидаемый формат
    const data: {
      results: {
        name: { first: string; last: string; title: string };
        picture: { large: string };
      }[];
    } = await response.json();
    const x = data.results[0];

    return {
      first: x.name.first,
      last: x.name.last,
      title: x.name.title,
      picture: x.picture.large,
    };
  } catch (error) {
    console.error("Произошла ошибка:", error);
    throw error;
  }
}
