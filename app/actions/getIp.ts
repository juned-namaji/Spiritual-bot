import { headers } from "next/headers";

export function IP() {
  const FALLBACK_IP_ADDRESS = '0.0.0.0';

  const allHeaders = headers();
  console.log("Headers: ", allHeaders);

  // Check for forwarded IP address (usually provided by proxies)
  const forwardedFor = allHeaders.get('x-forwarded-for');
  const realIp = allHeaders.get('x-real-ip');

  if (forwardedFor) {
    console.log("Forwarded IP detected:", forwardedFor.split(',')[0]);
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS;
  }

  if (realIp) {
    console.log("Real IP detected:", realIp);
    return realIp;
  }

  console.log("Falling back to default IP:", FALLBACK_IP_ADDRESS);
  return FALLBACK_IP_ADDRESS;
}
