const logo = require("@/app/assets/MEDISAT.png");
import Slider from "@/components/Slider";
import ButtonHomeLogin from "@/components/ButtonHomeLogin";
import Image from "next/image";
// import sampleImage from "@/public/sample-image.jpg"; // Replace with your image path

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      <div className="w-full max-w-2xl p-6">
        <Image
          src={logo}
          alt="Beautiful image description"
          className="rounded-lg shadow-lg"
          width={800}
          height={400}
          objectFit="cover"
        />
      </div>
      <div className="w-full max-w-4xl mt-8">
        <Slider />
      </div>
      <div className="mt-10">
        <ButtonHomeLogin />
      </div>
    </div>
  );
}
