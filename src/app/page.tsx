import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="max-w-[600px] my-4">
        <CardHeader className="flex gap-3">
          <Image
            alt="Chillisoft Logo"
            height={200}
            radius="sm"
            src="https://www.chillisoft.co.za/wp-content/uploads/2019/12/cropped-Chilli-Logo-with-the-R.png-new.png"
            width={200}
          />
          <div className="flex flex-col">
            <p className="text-md font-semibold">Welcome to Chillisoft Meetings Portal</p>
            <p className="text-xs text-gray-500">Streamline Your Meetings with Ease</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="mt-[20px]">
          <p className="text-sm text-gray-700">
            Enhance your meeting experience and productivity with our intuitive and feature-rich meeting management platform.
          </p>
        </CardBody>
        <Divider  className="mt-[20px]" />
        <CardFooter className="mt-[20px]" >
          <Link
            showAnchorIcon
            href="/home"
            className="text-sm text-blue-600 hover:underline"
          >
            Get Started Now
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}

