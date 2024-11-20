import { getDataSsr } from "@/app/_api/FetchSSR";
import { MapPin } from "lucide-react";

const FooterAddress = async () => {
  const addressData = await getDataSsr(`site-content/addresses/`);

  return (
    <div className="flex items-start gap-1">
      <MapPin size={20} />
      <span className="font-medium text-sm">
        {addressData?.results[0]?.address}
      </span>
    </div>
  );
};

export default FooterAddress;
