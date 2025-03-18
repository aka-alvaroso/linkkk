
import { useEffect } from "react";
import { useParams } from "react-router-dom"
// import { getIP } from "../utils/getUserData";


export default function Redirect() {
    const { shortCode } = useParams();
    
    useEffect(() => {

        // const ip = getIP();

        const getLink = async () => {
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
                        linkId: '1',
                        device: "pc",
                        ip: "11.0.0.0",
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