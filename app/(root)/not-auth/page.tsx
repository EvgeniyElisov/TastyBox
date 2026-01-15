import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Title } from "shared/components/shared";
import { Button } from "shared/components/ui";
import Image from "next/image";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <div className={"flex items-center justify-between w-[840px] gap-12"}>
        <div className="flex flex-col">
          <div className="w-[445px]">
            <Title size="lg" text={"Доступ запрещён"} className="font-extrabold" />
            <p className="text-gray-400 text-lg">{"Данную страницу могут просматривать только авторизованные пользователи"}</p>
          </div>

          <div className="flex gap-5 mt-11">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft />
                На главную
              </Button>
            </Link>
            <a href="">
              <Button variant="outline" className="text-gray-500 border-gray-400 hover:bg-gray-50">
                Обновить
              </Button>
            </a>
          </div>
        </div>
        <Image src={"/assets/images/lock.png"} alt={"Доступ запрещён"} width={300} height={300} />
      </div>
    </div>
  );
}
