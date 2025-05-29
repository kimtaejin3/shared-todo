import { StaticImageData } from "next/image";

export interface Friend {
  id: string;
  name: string;
  image: StaticImageData | string | null;
}
