import axios from "axios";
import {jwtDecode} from "jwt-decode";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

class ServerApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        //console.debug("API Call:", endpoint, data, method);
    
        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
        const params = (method === "get")
            ? data
            : {};
    
        try {
          return (await axios({ url, method, params, data: method != "get" ? data : undefined, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
    }
    /**AUTHENTICATION CALLS */
    /**login to authenticate user and retrieve token */
    static async getToken(email, password){
        const data = { email, password };
        let res = await this.request('auth/token/', data, "post");
        ServerApi.token = res.token;
        localStorage.setItem("token", res.token);
        return res.token;
    }
    /**Decode token and return currentUser Object */
    static async decodeToken(token){
        const decoded = jwtDecode(token);
        return decoded;
    }
    /**register a new user 
     * inputs: { name, password, email, phone, type }
    */
    static async registerUser(name, password, email, phone, type="client"){
        const data = {name, password, email, phone, type};
        try{
            let res = await this.request('auth/register', data, "post");
            return res.token;
        }catch (err){
            console.error("Error during registration", err);

            if (err.response?.status === 400) {
                throw new Error("Registration Failed. Please check your inputs and try again.");
            }else if (err.response?.status === 409) {
                throw new Error("A user with this email already exists.");
            }else{
                throw new Error("An unexpected error occurred. Please try again later.");
            }
        }
        
    }
    /**SERVICE RELATED CALLS */
    /**get a list of all services */
    static async getAllServices(){
        let res = await this.request('services/');
        return res;
    }

    /**get service using service ID */
    static async getService(id){
        let res = await this.request(`services/${id}`);
        return res;
    }
    /**CLIENT RELATED CALLS */
    /**Get a client */
    static async getClient(email){
        const data = {email};
        let res = await this.request('clients', data, "get");
        return res.clients[0];
    }

    /**Create a client */
    static async createClient(account_id, gender, birthday, address, city, state){
        const data = {account_id, gender ,birthday, address, city, state};
        let res = await this.request('clients/', data, "post");
        return res;
    }

    /**Update client details */
    static async updateClient(client_id, gender, birthday, address, city, state){
        const data = {
            "gender": gender,
            "birthday": birthday,
            "address": address,
            "city": city,
            "state": state
        }
        let res = await this.request(`clients/${client_id}`,data, "patch");
        return res;
    }

    /**APPOINTMENT RELATED CALLS */
    /** Get Appointments by client/provider/start_dt/end_dt */
    static async getAppointments(client_id, service_id, provider_id, start_dt, end_dt, status){
        
        const params = {
            "client_id": client_id, 
            "service_id": service_id, 
            "provider_id": provider_id, 
            "booking_dt_start": start_dt, 
            "booking_dt_end": end_dt, 
            "status": status
        };
        let res = await this.request(`appointments`, params, "get");
        return res;
    }

    static async bookAppointment(client_id, service_id, availabilityList, client_note ){
        const data = {
            "client_id": client_id, 
            "service_id": service_id, 
            "availabilities": availabilityList,
            "client_note": client_note
            };

        let res = await this.request(`appointments/`, data, "post");
        return res;
    }
    
    static async cancelAppointment(appointmentId){
        let res = await this.request(`appointments/cancel/${appointmentId}`,undefined,"patch");
        return res;
    }

    /**AVAILABILITY RELATED CALLS */
    //ADD TRY CATCH for complex calls (A)
    static async getAvailabilitiesByService(service_id, date){
        const data = {date};
        let res = await this.request(`availabilities/service/${service_id}`, data, "get");
        return res;
    }

    static async bookAvailabilities(appointment_id, availabilities){
        //link availabilities to appointment_id after booking
    }

    /**GOOGLE CALENDAR RELATED API CALL */
    static async createGoogleCalendarEvent(eventData) {
        const res = await this.request(`auth/create-event`, eventData, 'post');
        return res;
    }

    static async getGoogleToken(userId) {
        const res = await this.request(`auth/find-google-token/${userId}`);
        return res;
    }
}

export default ServerApi;