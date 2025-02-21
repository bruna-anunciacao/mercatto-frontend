import toast from "react-hot-toast";

export async function getAddressCorreios(
  zipcode: string,
  setIsLoading: (value: boolean) => void
) {
  try {
    setIsLoading(true);
    const response = await fetch(
      "https://viacep.com.br/ws/" + zipcode + "/json/"
    );
    const data = await response.json();
    if (data.erro === "true") {
        throw new Error("CEP não encontrado");
    }
    return data;
  } catch (error) {
    toast.error("Erro ao buscar CEP");
  } finally {
    setIsLoading(false);
  }
}
