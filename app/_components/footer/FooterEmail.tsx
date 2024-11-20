import { getDataSsr } from "@/app/_api/FetchSSR";
import { Link } from "@/i18n.config";
import { Mail, MapPin } from "lucide-react";

const FooterEmail = async () => {
  const emailData = await getDataSsr(`site-content/emails/`);

  return (
    <Link
      href={`mailto:${emailData?.results[0]?.email}`}
      className="flex items-center gap-1"
    >
      <Mail size={20} />
      <span className="font-medium text-sm">
        {emailData?.results[0]?.email}
      </span>
    </Link>
  );
};

export default FooterEmail;
