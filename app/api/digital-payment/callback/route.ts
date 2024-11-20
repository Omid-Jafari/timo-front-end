import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const identifier = searchParams.get("identifier");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}payments/digital-payment/verify/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: identifier }),
    }
  );

  const varifyPayment = await res.json();

  if (varifyPayment?.status === "verify_success")
    redirect(`https://new.timobio.com/callback?status=verify_success`);
  else redirect(`https://new.timobio.com/callback?status=verify_failure`);
}
