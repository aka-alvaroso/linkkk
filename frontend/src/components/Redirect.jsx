
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getIPData, getVPN } from "../utils/getUserData";


export default function Redirect() {
    const { shortCode } = useParams();
    
    useEffect(() => {

        const getLink = async () => {

            const { ip, country } = await getIPData();
            const { proxy, hosting } = await getVPN({ ip });
            const { device } = navigator.userAgentData.mobile;


            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}link/${shortCode}`);
                const data = await response.json();

                console.log(data)

                const access = await fetch(`${import.meta.env.VITE_API_URL}access/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        linkId: data.id,
                        device: device ? "MOBILE" : "DESKTOP",
                        ip: ip,
                        is_vpn: proxy || hosting ? "true" : "false",
                        country: country.toUpperCase(),
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