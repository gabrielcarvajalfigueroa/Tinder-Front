import Image from "next/image";
import MatchCard from "@/app/ui/matchCard";
import ProfileCard from "@/app/ui/profileCard";
import { HeartIcon } from "@/app/ui/heartIcon";
import { Button } from "@nextui-org/button";

export default function Home() {
    const description = "Pequeño duende del mundo digital en busca de una compañera para compartir aventuras cibernéticas y momentos mágicos. Me encanta deslizarme por los algoritmos más intrincados y descubrir tesoros escondidos en líneas de código";
    const title = "Duende lab";

    return (
        <div className="flex items-start">
            <div className="w-1/2 flex justify-center mt-10">
                <ProfileCard
                    username={title}
                    career={"ICCI"}
                    description={description}
                    imageUrl={"https://imgmedia.larepublica.pe/640x866/larepublica/migration/images/Q2NQAP4UOZDLVOUSAWLRU2WZZ4.webp"}
                />
            </div>
            <div className="w-1/2 flex items-center mt-10 flex-col">
                <div className="flex-1">
                    <MatchCard
                        username={title}
                        career={"ICCI"}
                        imageUrl={"https://imgmedia.larepublica.pe/640x866/larepublica/migration/images/Q2NQAP4UOZDLVOUSAWLRU2WZZ4.webp"}
                    />
                </div>
                <div className="flex-1">
                    <Button isIconOnly color="danger" aria-label="Like">
                        <HeartIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
}
