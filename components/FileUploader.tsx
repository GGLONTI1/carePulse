import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import Image from "next/image";

interface FileUploaderProps {
  files: File[];
  onChange: (files: File[]) => void;
}

async function uploadFileToStorage(file: File): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fileUrl = `https://your-storage-service.com/uploads/${file.name}`;
      resolve(fileUrl);
    }, 1000);
  });
}

export function convertFileToUrl(file: File): string {
  return URL.createObjectURL(file);
}

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const uploadedFileUrls = await Promise.all(
          acceptedFiles.map((file) => uploadFileToStorage(file))
        );
        console.log("Uploaded File URLs:", uploadedFileUrls);
      }
      onChange(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
          unoptimized
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
            unoptimized
          />
          <div className="file-upload_label">
            <p className="text-14-regular ">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">
              SVG, PNG, JPG, or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};
