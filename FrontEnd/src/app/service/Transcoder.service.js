import axios from "axios";

export default new (class TranscoderService {
  GetDashboardDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:4548/transcoder/operation/dashboard`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return await response.json();
    } catch (error) {
      console.error("TranscoderService", "GetFailFileDetails", error);
      return null;
    }
  };

  GetFailFileDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:4548/transcoder/operation/fail/details`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return await response.json();
    } catch (error) {
      console.error("TranscoderService", "GetFailFileDetails", error);
      return null;
    }
  };

  SendToProcess = async (data, config) => {
    try {
      const response = await axios.post(
        "http://localhost:4548/transcoder",
        { sessions: data },
        config
      );

      return response;
      /* const response = await fetch(
        `http://localhost:4548/transcoder`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({sessions:data}),
        }
      );
      return await response.json(); */
    } catch (error) {
      console.error("TranscoderService", "GetFailFileDetails", error);
      return null;
    }
  };
})();
