import { UploadDropzone } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";
import axios from "axios";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface IFileUpload {
  value: string;
  endpoint: "serverImage" | "messageFiles";
  handleChange(value: string): void;
}

export default function FileUpload({
  endpoint,
  handleChange,
  value,
}: IFileUpload) {
  const [fileKey, setFileKey] = useState("");
  const fileType = value.split(".").pop();

  const handleRemoveImage = async () => {
    await axios.delete("/api/uploadthing", {
      data: {
        fileKey,
      },
    });
    handleChange("");
  };

  // useEffect(() => {
  //   if (fileKey && !value) {
  //     axios
  //       .delete("/api/uploadthing", {
  //         data: {
  //           fileKey,
  //         },
  //       })
  //       .then()
  //       .catch(() => toast.error("Something went wrong!"));
  //     handleChange("");
  //   }
  // }, [fileKey, value, handleChange]);

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-52 w-52">
        <Image fill src={value} alt="Server image" className="rounded-full" />
        <button
          onClick={handleRemoveImage}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <UploadDropzone
        className="border-zinc-800 border-4"
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          handleChange(res[0].url);
          setFileKey(res[0].key);
        }}
        onUploadError={(e) => {
          console.log(e);
          toast.error("Something went wrong!");
        }}
      />
    </div>
  );
}
