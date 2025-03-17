
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getIP } from "../utils/getUserData";


export default function Redirect() {
    const { shortCode } = useParams();
    console.log("Redirigiendo a: ", shortCode)
    
    useEffect(() => {

        const ip = getIP();

        const getLink = async () => {
            try {
                const response = await fetch(`http://localhost:3000/link/${shortCode}`);
                const data = await response.json();

                const access = await fetch(`http://localhost:3000/access/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        linkId: data.id,
                        device: "pc",
                        ip: ip,
                        is_vpn: "false",
                        country: "ES",
                        accessType: "link",
                    }),
                })


                if (access.status !== 201) {
                    console.error(access.json())
                }else{
                    const url = new URL(data.longUrl);
                    window.location.href = url;
                }

            }
            catch (e) {
                console.error(e)
            }
            
        }

        getLink()
        
    }, [shortCode])
    


  return (
    <div className="w-screen h-screen flex items-center justify-center">
      Redirigiendo...
    </div>
  )
}