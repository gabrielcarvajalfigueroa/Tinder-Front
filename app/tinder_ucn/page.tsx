import ProfileCard from "@/app/ui/profileCard";
import MatchCard from "@/app/ui/matchCard";

export default function UserPage(){
    const description = "Pequeño duende del mundo digital en busca de una compañera para compartir aventuras cibernéticas y momentos mágicos. Me encanta deslizarme por los algoritmos más intrincados y descubrir tesoros escondidos en líneas de código"
    const username = "Duende lab"
    return
    (
        <div className="flex items-start">
            <div className="w-1/2 flex justify-center mt-10">
                <ProfileCard username={username} career={"ICCI"} description={description}
                             imageUrl={"https://imgmedia.larepublica.pe/640x866/larepublica/migration/images/Q2NQAP4UOZDLVOUSAWLRU2WZZ4.webp"}/>
            </div>
            <div className="w-1/2 flex justify-center mt-10">
                <MatchCard username={username} career={"ICCI"}
                           imageUrl={"https://imgmedia.larepublica.pe/640x866/larepublica/migration/images/Q2NQAP4UOZDLVOUSAWLRU2WZZ4.webp"}/>
            </div>
        </div>
    );
}
