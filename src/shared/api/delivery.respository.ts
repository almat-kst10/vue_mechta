import { http } from "shared/request/http";

export class DeliveryRequest {

    static async getCityRequest(city: string) {
        const response = await http.request(`?search=${city.toLowerCase()}`, {
            method: "GET",
        })
        return response
    }
}