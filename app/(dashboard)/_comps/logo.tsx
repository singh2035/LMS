import Image from "next/image";

export const Logo = () => {
  return (
    <>
      <div>
        <Image
          className="cursor-pointer"
          height={100}
          width={100}
          alt="logo"
          src="./logo.svg"
        />
      </div>
    </>
  );
};
