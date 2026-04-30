import { User } from "lucide-react";
import { useRef, useState } from "react";

const Uploader = ({ methods, defaultImage }: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState(defaultImage || "");

  const handleClick = () => {
    inputRef?.current?.click();
  };

  const handleChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      methods.setValue("photo", e.target.files); // keep FileList for RHF
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        onClick={handleClick}
        className="w-28 h-28 rounded-full bg-black/5 flex items-center justify-center cursor-pointer overflow-hidden border hover:opacity-80 transition"
      >
        {preview ? (
          <img
            src={preview}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <User size={32} className="" />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
      />

      <label className=" ">Upload Photo</label>
      <label className=" text-[12px] -mt-3">( Optional )</label>
    </div>
  );
};

export default Uploader;
