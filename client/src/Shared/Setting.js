export default class Setting {
  static resolveAPIURL(path) {
    let rootUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001" : "http://oivan-exam-api.clever-agent.com";
        //  "http://oivan-exam-api.clever-agent.com"
        //: "http://oivan-exam-api.clever-agent.com";

    return rootUrl + path;
  }
}
