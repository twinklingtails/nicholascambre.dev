import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32">
      <Image src="/logo-light.jpg" alt="Logo light" fill className="object-contain block dark:hidden" />
      <Image src="/logo-dark.jpg"  alt="Logo dark"  fill className="object-contain hidden light:hidden" />
    </div>
  );
}

