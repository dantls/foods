import Image from "next/image";

type BannerProps = {
  alt: string;
  imageUrl: string;
};

export function Banner({ alt, imageUrl }: BannerProps) {
  return (
    <Image
      className="h-auto w-full object-contain"
      src={imageUrl}
      alt={alt}
      height={0}
      width={0}
      sizes="100vw"
      quality={100}
    />
  );
}
