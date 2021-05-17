import axiosInstance from "./axiosApi";

class FileUploadService {
  upload(file, onUploadProgress) {

    return axiosInstance.post("/proofs/", proof, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new FileUploadService()
