import { Filter } from "react-admin";

const apiUrl = process.env.REACT_APP_URL;

async function refreshTokens(request) {
  try{
    const refreshTokenResponse = await fetch("/api/user/refresh");
    if (refreshTokenResponse.ok) {
      const resultRefreshTokenResponse = await refreshTokenResponse.json();
      if(resultRefreshTokenResponse.data.accessToken !== undefined){
        localStorage.setItem("token", resultRefreshTokenResponse.data.accessToken);
        
        const newHeaders = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resultRefreshTokenResponse.data.accessToken}`,
        };

        const newRequest = new Request(request.url, {
          method: request.method,
          body: request.body,
          headers: newHeaders,
          credentials: "include"
        });

        const retryResponse = await fetch(newRequest);

        const retryData = await retryResponse.json();
        
        return retryData;
      }
      else{
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  }catch(error){
    localStorage.removeItem("token");
    window.location.reload();
    throw new Error("Unauthorised");
  }
}

export const dataProvider = {
  getList: (resource, params) => {
    let query = `/admin/find`;
    let request = new Request(apiUrl + `api/` + resource + query, {
      method: "GET",
      body: null,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return fetch(request)
      .then(async (response) => {
        if(response.status === 401 && localStorage.getItem("token")){
          refreshTokens(request);
        }
        else if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json["data"];
        for (let i = 0; i < data.length; i++) {
          data[i].id = data[i]._id;
          delete data[i]._id;
        }
        return { data: data, total: data.length };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  getOne: async (resource, params) => {
    let query = `/admin/find?_id=${params.id}`;
    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "GET",
      body: null,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return fetch(request)
      .then(async (response) => {
        if(response.status === 401 && localStorage.getItem("token")){
          refreshTokens(request);
        }
        else if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json["data"][0];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  update: async (resource, params) => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    let query = "/admin/update";
    let body = {
      _id: params.id,
      type: params.data.type,
      isPublish: params.data.isPublish,
      departingFrom: params.data.departingFrom,
      finalDestination: params.data.finalDestination,
      depatureDate: params.data.depatureDate,
      airline: params.data.airline,
      flightNumber: params.data.flightNumber,
      flightDisruption: params.data.flightDisruption,
      delayLength: params.data.delayLength,
      delayReason: params.data.delayReason,
      firstName: params.data.firstName,
      lastName: params.data.lastName,
      email: params.data.email,
      phoneNumber: params.data.phoneNumber,
      referenceNumber: params.data.referenceNumber,
      adressLine1: params.data.adressLine1,
      adressLine2: params.data.adressLine2,
      city: params.data.city,
      postalCode: params.data.postalCode,
      state: params.data.state,
      country: params.data.country,
      assistanceType: params.data.assistanceType,
      assistanceDetails: params.data.assistanceDetails,
    };

    body = JSON.stringify(body);

    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "PUT",
      body: body,
      headers: headers,
    });
    return fetch(request)
      .then(async (response) => {
        if(response.status === 401 && localStorage.getItem("token")){
          refreshTokens(request);
        }
        else if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json["data"];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  create: (resource, params) => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    let query = "";
    let body = {};

    query = "/create";
    body = {
      link: params.data.link,
      type: params.data.type,
      isPublish: params.data.isPublish,
      departingFrom: params.data.departingFrom,
      finalDestination: params.data.finalDestination,
      depatureDate: params.data.depatureDate,
      airline: params.data.airline,
      flightNumber: params.data.flightNumber,
      flightDisruption: params.data.flightDisruption,
      delayLength: params.data.delayLength,
      delayReason: params.data.delayReason,
      firstName: params.data.firstName,
      lastName: params.data.lastName,
      email: params.data.email,
      phoneNumber: params.data.phoneNumber,
      referenceNumber: params.data.referenceNumber,
      adressLine1: params.data.adressLine1,
      adressLine2: params.data.adressLine2,
      city: params.data.city,
      postalCode: params.data.postalCode,
      state: params.data.state,
      country: params.data.country,
      assistanceType: params.data.assistanceType,
      assistanceDetails: params.data.assistanceDetails,
    };

    body = JSON.stringify(body);

    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "POST",
      body: body,
      headers: headers,
    });
    return fetch(request)
      .then(async (response) => {
        if(response.status === 401 && localStorage.getItem("token")){
          refreshTokens(request);
        }
        else if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json["data"];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  delete: async (resource, params) => {
    let query = "/delete";
    let body = { _id: params.id };
    body = JSON.stringify(body);
    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "DELETE",
      body: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return fetch(request)
      .then(async (response) => {
        if(response.status === 401 && localStorage.getItem("token")){
          refreshTokens(request);
        }
        else if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json["data"];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  deleteMany: async (resource, params) => {
    let query = "/delete";
    const _ids = [];
    const response = await Promise.all(
      params.ids.map(async (id) => {
        let body = { _id: id };
        body = JSON.stringify(body);
        const request = new Request(apiUrl + `api/` + resource + query, {
          method: "DELETE",
          body: body,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        await fetch(request)
          .then(async (response) => {
            if(response.status === 401 && localStorage.getItem("token")){
              refreshTokens(request);
            }
            else if (response.status < 200 || response.status >= 300) {
              throw new Error(response.statusText);
            }
            const json = await response.json();
            _ids.push(json["data"]._id);
          })
          .catch(() => {
            throw new Error("Network error");
          });
      })
    );
    return { data: _ids };
  },
};
